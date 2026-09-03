import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Mesmo projeto Vercel, dois domínios: o domínio principal do app (onde "/"
// já vai direto pro login/painel — ver src/app/page.tsx) e um subdomínio só
// pra campanha/anúncio, que deve mostrar a landing page na raiz. Em vez de
// duplicar deploy, a raiz desse subdomínio é reescrita (por dentro, sem o
// visitante ver a mudança de URL) pra rota real da landing em /landing.
//
// Pra trocar o subdomínio da campanha no futuro, só editar a lista abaixo —
// não precisa mexer em mais nada nem redeployar a rota /landing em si.
const LANDING_HOSTS = new Set(["iaclaude.engenhaia.com.br"]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // `request.nextUrl.hostname` reflete a URL que o servidor Next enxerga (em
  // produção na Vercel isso já vem certo, mas não dá pra confiar nisso em
  // todo ambiente) — o header Host é a fonte confiável do domínio que o
  // visitante realmente digitou/clicou.
  const host = (request.headers.get("host") ?? "").split(":")[0];

  if (LANDING_HOSTS.has(host) && pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/landing";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// Só roda na raiz "/" — todo o resto (inclusive /landing, /auth, /inicio,
// estáticos) segue o roteamento normal, em qualquer domínio.
export const config = {
  matcher: "/",
};
