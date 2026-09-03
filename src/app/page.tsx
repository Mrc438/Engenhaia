import { redirect } from "next/navigation";
import { auth } from "@/auth";

// A landing page (pra campanha/anúncio) mora em /landing e é servida na raiz
// do subdomínio de marketing via src/proxy.ts (reescrita por hostname). Aqui,
// no domínio principal do app, a raiz continua indo direto pro login/painel.
export default async function RootPage() {
  const session = await auth();
  redirect(session?.user ? "/inicio" : "/auth");
}
