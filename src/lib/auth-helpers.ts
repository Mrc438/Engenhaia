import { redirect } from "next/navigation";
import { auth } from "@/auth";

// Helper de servidor: garante que existe um usuário logado, ou manda pra
// tela de login. Usar no topo de layouts/páginas protegidas.
export async function requireUser() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth");
  }
  return session.user;
}
