import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";

// ============================================================================
// Webhook (postback) da Payt — libera acesso automaticamente quando uma
// compra é confirmada. Contexto completo e decisões em
// claude/webhook-payt-todo.md (ler antes de mexer aqui).
//
// FORMATO DO PAYLOAD — confirmado via exemplos reais publicados em
// github.com/ventuinha/payt-postback/tree/master/examples (o artigo oficial
// help.payt.com.br/article/155-postback bloqueia fetch automatizado, então
// essa foi a fonte usada). No painel da Payt, escolher o tipo de postback
// "Payt V1" (não "Payt V1 Flat") — é esse o formato aninhado abaixo:
//   {
//     integration_key: "...",
//     test?: true,                 // true no payload de teste do cadastro da URL
//     type: "order" | "upsell" | "manual_upsell" | "abandoned-cart" | "cash_on_delivery",
//     status: "paid" | "waiting_payment" | "canceled" | ...,  // "paid" confirmado no exemplo real
//     transaction_id: "...",
//     customer: { name, email, doc, phone, ... },
//     product: { name, code, sku, type, quantity, price, ... },   // produto principal
//     order_bumps?: [                                              // 1 por bump comprado junto
//       { code, name, product: { name, code, sku, type, quantity, price, items? } }
//     ],
//     transaction: { payment_status, total_price, payment_method, ... },
//   }
//
// AUTENTICAÇÃO: a Payt inclui "integration_key" na raiz do próprio corpo do
// postback (confirmado no exemplo real) pra validar que a chamada é dela
// mesma — no painel: Cadastro de postback → "Chave única". Comparamos com a
// env var PAYT_INTEGRATION_KEY — sem isso configurado, TODA chamada é
// rejeitada (fail closed), porque um webhook sem essa checagem é uma porta
// aberta pra qualquer um criar conta de graça.
//
// ORDER BUMPS: um pedido pode trazer o produto principal E um ou mais order
// bumps no MESMO postback (`order_bumps[].product.code`). A rota soma o
// produto principal + todos os bumps pra decidir o que liberar — qualquer
// um deles pode ser o que dá direito a "especialista" ou ao pacote de
// projetos, não só o produto principal. Por isso no cadastro do postback,
// em "Produtos ou ofertas de afiliação", selecionar o produto principal E
// os order bumps — um bump que não estiver selecionado ali corre o risco de
// nem gerar o postback quando comprado junto.
//
// ESCOPO / MAPEAMENTO DE PRODUTO: preencher PRODUCT_ENTITLEMENTS com os
// códigos reais dos produtos cadastrados na Payt (cada produto → o que
// liberar: plano básico, plano especialista, ou o pacote de projetos). Os
// valores abaixo são placeholders — nenhum bate com nada até serem
// trocados pelos códigos reais.
//
// SENHA PADRÃO: toda conta nova nasce com a senha fixa "123456" (pedido
// explícito). Isso é uma senha previsível pro universo inteiro de clientes —
// funciona pra liberar acesso sem precisar de e-mail transacional agora,
// mas o ideal antes de escalar é: (a) forçar troca de senha no primeiro
// login, ou (b) gerar senha aleatória por pessoa e mandar por e-mail. Não
// implementado ainda porque não existe e-mail transacional no projeto (ver
// bloqueio 2 do claude/webhook-payt-todo.md).
//
// REVOGAÇÃO (reembolso/chargeback/cancelamento): NÃO implementada ainda —
// esta rota só concede acesso em status de pagamento confirmado. A Payt tem
// eventos distintos pra isso ("Cancelada", "Cancelada - Chargeback",
// "Cancelada - Reembolsada") — no cadastro do postback, deixar esses
// desmarcados por enquanto pra não gerar chamada que a rota vai ignorar sem
// fazer nada de útil ainda.
// ============================================================================

const DEFAULT_PASSWORD = "123456";

// TROCAR pelos códigos/SKUs reais de cada produto no painel da Payt
// (Produtos → abrir o produto → Código/SKU). Vale tanto pro produto
// principal quanto pra qualquer order bump que deva liberar algo.
const PRODUCT_ENTITLEMENTS: Record<
  string,
  { plan?: "basico" | "especialista"; hasProjetosPacote?: boolean }
> = {
  TROCAR_PELO_CODIGO_DO_BASICO: { plan: "basico" },
  TROCAR_PELO_CODIGO_DO_ESPECIALISTA: { plan: "especialista" },
  TROCAR_PELO_CODIGO_DO_PACOTE_DE_PROJETOS: { hasProjetosPacote: true },
};

type JsonRecord = Record<string, unknown>;
type Entitlement = { plan?: "basico" | "especialista"; hasProjetosPacote?: boolean };

function pick(obj: unknown, paths: string[][]): string | undefined {
  for (const path of paths) {
    let cur: unknown = obj;
    for (const key of path) {
      if (cur == null || typeof cur !== "object") {
        cur = undefined;
        break;
      }
      cur = (cur as JsonRecord)[key];
    }
    if (typeof cur === "string" && cur.trim()) return cur.trim();
  }
  return undefined;
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

// Junta o produto principal com todo order bump da mesma compra — qualquer
// um pode ser o item que dá direito a um plano/flag.
function collectProductCodes(body: JsonRecord): string[] {
  const codes: string[] = [];

  const mainCode = pick(body, [
    ["product", "code"],
    ["product", "sku"],
    ["product_code"],
    ["sku"],
  ]);
  if (mainCode) codes.push(mainCode);

  const orderBumps = body.order_bumps;
  if (Array.isArray(orderBumps)) {
    for (const bump of orderBumps) {
      const bumpCode = pick(bump, [["product", "code"], ["product", "sku"], ["code"]]);
      if (bumpCode) codes.push(bumpCode);
    }
  }

  return codes;
}

function mergeEntitlements(entitlements: Entitlement[]): Entitlement {
  const hasEspecialista = entitlements.some((e) => e.plan === "especialista");
  const hasBasico = entitlements.some((e) => e.plan === "basico");
  const hasProjetosPacote = entitlements.some((e) => e.hasProjetosPacote === true);
  return {
    plan: hasEspecialista ? "especialista" : hasBasico ? "basico" : undefined,
    hasProjetosPacote,
  };
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const expectedKey = process.env.PAYT_INTEGRATION_KEY;
  const receivedKey = pick(body, [["integration_key"]]);
  if (!expectedKey || !receivedKey || !safeEqual(receivedKey, expectedKey)) {
    console.warn("[webhook/payt] rejeitado: integration_key ausente ou não confere");
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // Payload de teste que a Payt manda ao cadastrar a URL no painel dela —
  // só confirma que chegou até aqui, não mexe em conta nenhuma.
  if ((body as JsonRecord)?.test === true) {
    console.log("[webhook/payt] payload de teste recebido:", JSON.stringify(body));
    return NextResponse.json({ ok: true, test: true });
  }

  const status = pick(body, [["status"], ["payment_status"], ["transaction", "payment_status"]]);
  const isPaid = status === "paid" || status === "approved" || status === "compra-realizada";
  if (!isPaid) {
    console.log(`[webhook/payt] status "${status}" ignorado (só processa pagamento confirmado). Payload:`, JSON.stringify(body));
    return NextResponse.json({ ok: true, ignored: true, status: status ?? null });
  }

  const email = pick(body, [["customer", "email"], ["email"], ["buyer", "email"]]);
  const name = pick(body, [["customer", "name"], ["name"], ["buyer", "name"]]) ?? "Aluno";

  if (!email) {
    console.error("[webhook/payt] payload pago sem e-mail identificável:", JSON.stringify(body));
    return NextResponse.json({ error: "email not found in payload" }, { status: 422 });
  }

  const productCodes = collectProductCodes(body as JsonRecord);
  const matchedEntitlements = productCodes
    .map((code) => PRODUCT_ENTITLEMENTS[code])
    .filter((e): e is Entitlement => Boolean(e));

  if (matchedEntitlements.length === 0) {
    console.error(
      `[webhook/payt] nenhum dos produtos ${JSON.stringify(productCodes)} está mapeado em PRODUCT_ENTITLEMENTS — nada liberado. Payload:`,
      JSON.stringify(body)
    );
    return NextResponse.json({ error: "unmapped product", productCodes }, { status: 422 });
  }

  const entitlement = mergeEntitlements(matchedEntitlements);
  const normalizedEmail = email.toLowerCase().trim();
  const [existing] = await db.select().from(users).where(eq(users.email, normalizedEmail)).limit(1);

  if (existing) {
    // Nunca reduz o que a pessoa já tem — só soma/faz upgrade.
    const nextPlan: "basico" | "especialista" =
      existing.plan === "especialista" || entitlement.plan === "especialista"
        ? "especialista"
        : (entitlement.plan ?? (existing.plan as "basico" | "especialista"));

    await db
      .update(users)
      .set({
        plan: nextPlan,
        hasProjetosPacote: existing.hasProjetosPacote || entitlement.hasProjetosPacote === true,
        updatedAt: new Date(),
      })
      .where(eq(users.id, existing.id));

    console.log(`[webhook/payt] acesso atualizado pra ${normalizedEmail} (produtos ${JSON.stringify(productCodes)}).`);
    return NextResponse.json({ ok: true, updated: true });
  }

  const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, 10);
  await db.insert(users).values({
    name,
    email: normalizedEmail,
    passwordHash,
    plan: entitlement.plan ?? "basico",
    hasProjetosPacote: entitlement.hasProjetosPacote === true,
  });

  console.log(`[webhook/payt] conta criada pra ${normalizedEmail} (produtos ${JSON.stringify(productCodes)}).`);
  return NextResponse.json({ ok: true, created: true });
}
