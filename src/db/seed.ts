// Script de seed — popula o banco com o conteúdo gerado (skills, prompts,
// aulas, comunidade, bônus) e cria usuários de teste (admin + autores fictícios
// da comunidade, só pra exibição — não são contas reais de login).
// Rodar com: npm run db:seed

import "dotenv/config";
import bcrypt from "bcryptjs";
import { db } from "./index";
import {
  users,
  skillCategories,
  skills,
  promptCategories,
  prompts,
  modules,
  lessons,
  bonusItems,
  communityPosts,
  communityComments,
  communityLikes,
} from "./schema";

import { projetoCalculoSkills } from "@/data/skills/projeto-calculo";
import { documentacaoTecnicaSkills } from "@/data/skills/documentacao-tecnica";
import { gestaoDeObraSkills } from "@/data/skills/gestao-de-obra";
import { comercialLicitacoesSkills } from "@/data/skills/comercial-licitacoes";
import { packEspecialistaSkills } from "@/data/skills/pack-especialista";

import { arquiteturaProjetoDoZeroPrompts } from "@/data/prompts/arquitetura-projeto-do-zero";
import { arquiteturaProjetoDoZeroPrompts2 } from "@/data/prompts/arquitetura-projeto-do-zero-2";
import { estruturalCalculoPrompts } from "@/data/prompts/estrutural-calculo";
import { estruturalCalculoPrompts2 } from "@/data/prompts/estrutural-calculo-2";
import { estruturalCalculoPrompts3 } from "@/data/prompts/estrutural-calculo-3";
import { geotecniaFundacoesPrompts } from "@/data/prompts/geotecnia-fundacoes";
import { geotecniaFundacoesPrompts2 } from "@/data/prompts/geotecnia-fundacoes-2";
import { instalacoesPrediaisPrompts } from "@/data/prompts/instalacoes-prediais";
import { instalacoesPrediaisPrompts2 } from "@/data/prompts/instalacoes-prediais-2";
import { documentacaoTecnicaPrompts } from "@/data/prompts/documentacao-tecnica";
import { documentacaoTecnicaPrompts2 } from "@/data/prompts/documentacao-tecnica-2";
import { documentacaoTecnicaPrompts3 } from "@/data/prompts/documentacao-tecnica-3";
import { laudosPericiasPrompts } from "@/data/prompts/laudos-pericias";
import { laudosPericiasPrompts2 } from "@/data/prompts/laudos-pericias-2";
import { gestaoDeObraPrompts } from "@/data/prompts/gestao-de-obra";
import { gestaoDeObraPrompts2 } from "@/data/prompts/gestao-de-obra-2";
import { gestaoDeObraPrompts3 } from "@/data/prompts/gestao-de-obra-3";
import { orcamentoCustosPrompts } from "@/data/prompts/orcamento-custos";
import { orcamentoCustosPrompts2 } from "@/data/prompts/orcamento-custos-2";
import { qualidadeSegurancaPrompts } from "@/data/prompts/qualidade-seguranca";
import { qualidadeSegurancaPrompts2 } from "@/data/prompts/qualidade-seguranca-2";
import { comercialLicitacoesPrompts } from "@/data/prompts/comercial-licitacoes";
import { comercialLicitacoesPrompts2 } from "@/data/prompts/comercial-licitacoes-2";
import { comercialLicitacoesPrompts3 } from "@/data/prompts/comercial-licitacoes-3";
import { comercialLicitacoesPrompts4 } from "@/data/prompts/comercial-licitacoes-4";

import { modulosSeed } from "@/data/aulas/modulos";
import { communityPostsSeed } from "@/data/comunidade/posts";
import { bonusItemsSeed } from "@/data/comunidade/bonus";

import type { SkillCategorySeed, PromptCategorySeed } from "@/data/types";

const skillCategoriesData: SkillCategorySeed[] = [
  { slug: "projeto-calculo", name: "Projeto & Cálculo", order: 1, skills: projetoCalculoSkills },
  { slug: "documentacao-tecnica", name: "Documentação Técnica", order: 2, skills: documentacaoTecnicaSkills },
  { slug: "gestao-de-obra", name: "Gestão de Obra", order: 3, skills: gestaoDeObraSkills },
  { slug: "comercial-licitacoes", name: "Comercial & Licitações", order: 4, skills: comercialLicitacoesSkills },
  { slug: "pack-especialista", name: "Pack Especialista", order: 5, skills: packEspecialistaSkills },
];

const promptCategoriesData: PromptCategorySeed[] = [
  { slug: "arquitetura-projeto-do-zero", name: "Arquitetura & Projeto do Zero", order: 1, prompts: [...arquiteturaProjetoDoZeroPrompts, ...arquiteturaProjetoDoZeroPrompts2] },
  { slug: "estrutural-calculo", name: "Estrutural & Cálculo", order: 2, prompts: [...estruturalCalculoPrompts, ...estruturalCalculoPrompts2, ...estruturalCalculoPrompts3] },
  { slug: "geotecnia-fundacoes", name: "Geotecnia & Fundações", order: 3, prompts: [...geotecniaFundacoesPrompts, ...geotecniaFundacoesPrompts2] },
  { slug: "instalacoes-prediais", name: "Instalações Prediais", order: 4, prompts: [...instalacoesPrediaisPrompts, ...instalacoesPrediaisPrompts2] },
  { slug: "documentacao-tecnica", name: "Documentação Técnica", order: 5, prompts: [...documentacaoTecnicaPrompts, ...documentacaoTecnicaPrompts2, ...documentacaoTecnicaPrompts3] },
  { slug: "laudos-pericias", name: "Laudos & Perícias", order: 6, prompts: [...laudosPericiasPrompts, ...laudosPericiasPrompts2] },
  { slug: "gestao-de-obra", name: "Gestão de Obra", order: 7, prompts: [...gestaoDeObraPrompts, ...gestaoDeObraPrompts2, ...gestaoDeObraPrompts3] },
  { slug: "orcamento-custos", name: "Orçamento & Custos", order: 8, prompts: [...orcamentoCustosPrompts, ...orcamentoCustosPrompts2] },
  { slug: "qualidade-seguranca", name: "Qualidade & Segurança", order: 9, prompts: [...qualidadeSegurancaPrompts, ...qualidadeSegurancaPrompts2] },
  { slug: "comercial-licitacoes", name: "Comercial & Licitações", order: 10, prompts: [...comercialLicitacoesPrompts, ...comercialLicitacoesPrompts2, ...comercialLicitacoesPrompts3, ...comercialLicitacoesPrompts4] },
];

function slugifyName(name: string, salt: string) {
  const base = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/(^\.|\.$)/g, "");
  return `${base}.${salt}@exemplo.com.br`;
}

async function getOrCreateFakeUser(name: string, salt: string, dummyHash: string) {
  const email = slugifyName(name, salt);
  const existing = await db.query.users.findFirst({ where: (u, { eq }) => eq(u.email, email) });
  if (existing) return existing;
  const [created] = await db
    .insert(users)
    .values({ name, email, passwordHash: dummyHash, role: "member" })
    .onConflictDoNothing({ target: users.email })
    .returning();
  return (
    created ?? (await db.query.users.findFirst({ where: (u, { eq }) => eq(u.email, email) }))!
  );
}

async function main() {
  console.log("Seed: iniciando...");

  const passwordHash = await bcrypt.hash("mudeisso123", 10);
  const [admin] = await db
    .insert(users)
    .values({
      name: "Admin",
      email: "admin@exemplo.com.br",
      passwordHash,
      role: "admin",
      plan: "especialista", // conta de teste com tudo liberado, Pack Especialista incluso
      hasProjetosPacote: true, // e também o pacote de projetos, pra testar a aba liberada
    })
    .onConflictDoNothing({ target: users.email })
    .returning();
  const adminUser =
    admin ??
    (await db.query.users.findFirst({ where: (u, { eq }) => eq(u.email, "admin@exemplo.com.br") }));
  if (!adminUser) throw new Error("Não foi possível criar/encontrar usuário admin");

  // conta de teste com o plano básico (sem o Pack Especialista) — pra
  // conferir que o acabamento de bloqueio bate com quem NÃO comprou o pack.
  await db
    .insert(users)
    .values({
      name: "Teste Básico",
      email: "teste.basico@exemplo.com.br",
      passwordHash,
      role: "member",
      plan: "basico",
    })
    .onConflictDoNothing({ target: users.email });

  const dummyHash = await bcrypt.hash(`conta-de-exibicao-${Date.now()}`, 4);

  // pool de "leitores" fictícios pra distribuir curtidas de forma realista
  const likerPool: string[] = [];
  for (let i = 1; i <= 25; i++) {
    likerPool.push((await getOrCreateFakeUser(`Leitor ${i}`, "liker", dummyHash)).id);
  }

  // --- skills ---
  let totalSkills = 0;
  for (const cat of skillCategoriesData) {
    const [row] = await db
      .insert(skillCategories)
      .values({ slug: cat.slug, name: cat.name, order: cat.order })
      .onConflictDoNothing({ target: skillCategories.slug })
      .returning();
    const catRow =
      row ?? (await db.query.skillCategories.findFirst({ where: (c, { eq }) => eq(c.slug, cat.slug) }));
    if (!catRow) continue;

    for (const s of cat.skills) {
      await db
        .insert(skills)
        .values({ ...s, categoryId: catRow.id })
        .onConflictDoNothing({ target: skills.slug });
      totalSkills++;
    }
  }

  // --- prompts ---
  let totalPrompts = 0;
  for (const cat of promptCategoriesData) {
    const [row] = await db
      .insert(promptCategories)
      .values({ slug: cat.slug, name: cat.name, order: cat.order })
      .onConflictDoNothing({ target: promptCategories.slug })
      .returning();
    const catRow =
      row ?? (await db.query.promptCategories.findFirst({ where: (c, { eq }) => eq(c.slug, cat.slug) }));
    if (!catRow) continue;

    for (const p of cat.prompts) {
      await db
        .insert(prompts)
        .values({ ...p, categoryId: catRow.id })
        .onConflictDoNothing({ target: prompts.slug });
      totalPrompts++;
    }
  }

  // --- aulas ---
  let totalLessons = 0;
  for (const mod of modulosSeed) {
    const [row] = await db
      .insert(modules)
      .values({ slug: mod.slug, title: mod.title, summary: mod.summary, order: mod.order })
      .onConflictDoNothing({ target: modules.slug })
      .returning();
    const modRow =
      row ?? (await db.query.modules.findFirst({ where: (m, { eq }) => eq(m.slug, mod.slug) }));
    if (!modRow) continue;

    for (const l of mod.lessons) {
      await db
        .insert(lessons)
        .values({ ...l, moduleId: modRow.id })
        .onConflictDoNothing({ target: lessons.slug });
      totalLessons++;
    }
  }

  // --- bônus ---
  for (const b of bonusItemsSeed) {
    await db.insert(bonusItems).values(b).onConflictDoNothing({ target: bonusItems.slug });
  }

  // --- comunidade ---
  let totalPosts = 0;
  let likerCursor = 0;
  for (const p of communityPostsSeed) {
    const author = await getOrCreateFakeUser(p.authorName, "autor", dummyHash);
    const createdAt = new Date(Date.now() - p.daysAgo * 24 * 60 * 60 * 1000);

    const [post] = await db
      .insert(communityPosts)
      .values({
        body: p.body,
        tags: p.tags,
        pinned: p.pinned ?? false,
        authorId: author.id,
        createdAt,
      })
      .returning();
    totalPosts++;

    const likeCount = Math.min(p.likeCount, likerPool.length);
    for (let i = 0; i < likeCount; i++) {
      const userId = likerPool[(likerCursor + i) % likerPool.length];
      await db.insert(communityLikes).values({ postId: post.id, userId }).onConflictDoNothing();
    }
    likerCursor += likeCount;

    for (const c of p.comments ?? []) {
      const commentAuthor = await getOrCreateFakeUser(c.authorName, "autor", dummyHash);
      await db.insert(communityComments).values({
        body: c.body,
        postId: post.id,
        authorId: commentAuthor.id,
      });
    }
  }

  console.log(
    `Seed concluído: ${totalSkills} skills, ${totalPrompts} prompts, ${totalLessons} aulas, ${totalPosts} posts de comunidade, ${bonusItemsSeed.length} itens de bônus.`
  );
  console.log(`Login de teste (plano especialista, tudo liberado) -> email: admin@exemplo.com.br / senha: mudeisso123 (TROQUE em produção)`);
  console.log(`Login de teste (plano básico, Pack Especialista bloqueado) -> email: teste.basico@exemplo.com.br / senha: mudeisso123`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Erro no seed:", err);
  process.exit(1);
});
