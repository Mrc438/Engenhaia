import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth-helpers";
import { siteConfig } from "@/lib/site-config";
import { Icon } from "@/components/icon";

// Trava de verdade fica aqui, não só em esconder o item da sidebar — sem
// isso, quem não comprou o pacote poderia digitar /projetos direto na barra
// de endereço e acessar mesmo assim.
export default async function ProjetosPage() {
  const user = await requireUser();
  if (!user.hasProjetosPacote) {
    redirect("/inicio");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <span className="badge-accent inline-flex items-center rounded-full px-3 py-1 text-xs font-medium">
        Pacote de projetos
      </span>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
        Seus 250 mil projetos de AutoCAD.
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Acesso liberado pela sua compra do pacote. O link abaixo leva direto pra pasta com todos os
        arquivos.
      </p>

      <div className="card-surface-static mt-8 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="icon-chip h-11 w-11 shrink-0 rounded-lg">
            <Icon name="folder-cog" className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-semibold">Pasta com o pacote completo</h2>
            <p className="mt-1 text-sm text-muted">
              Guarde este link — ele também fica salvo aqui na plataforma pra você acessar quando
              quiser, sem precisar procurar no e-mail de compra.
            </p>
            <a
              href={siteConfig.projetosPacoteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold"
            >
              Abrir pasta de projetos
              <Icon name="external-link" className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Problema pra acessar o link? Fala com a gente em{" "}
        <a href={`mailto:${siteConfig.supportEmail}`} className="text-accent hover:underline">
          {siteConfig.supportEmail}
        </a>
        .
      </p>
    </div>
  );
}
