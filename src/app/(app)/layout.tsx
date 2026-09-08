import { requireUser } from "@/lib/auth-helpers";
import { Sidebar } from "@/components/sidebar";
import { TopBanner } from "@/components/top-banner";
import { PageHeader } from "@/components/page-header";
import { MobileNav } from "@/components/mobile-nav";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();

  // Altura travada no viewport (h-screen + overflow-hidden) em vez de
  // min-h-screen: sem isso, a Sidebar esticava (align-items: stretch do
  // flex) até a altura do CONTEÚDO da página — numa página comprida (ex.
  // Skills), ela ficava mais alta que a tela e o bloco de baixo
  // (Editar perfil/Sair) saía da viewport, dando a impressão de "sumir"
  // ao trocar de aba. Com altura travada, só o <main> rola por dentro e a
  // Sidebar fica sempre do tamanho exato da tela.
  return (
    <div className="flex h-screen flex-1 overflow-hidden">
      <Sidebar
        user={{ name: user.name ?? "Você", email: user.email ?? "", hasProjetosPacote: user.hasProjetosPacote }}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <PageHeader />
        <TopBanner />
        <MobileNav hasProjetosPacote={user.hasProjetosPacote} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
