import Link from "next/link";
import { requireUser } from "@/lib/auth-helpers";
import { getBonusItems } from "@/lib/queries";
import { Icon } from "@/components/icon";
import { skillEmoji } from "@/lib/skill-emoji";

export default async function BonusPage() {
  const user = await requireUser();
  const items = await getBonusItems();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <span className="badge-accent inline-flex items-center rounded-full px-3 py-1 text-xs font-medium">
        Bônus exclusivo
      </span>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
        10 Skills do engenheiro, prontas dentro do ChatGPT.
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Além do pacote no Claude, você também tem acesso a essas 10 skills especializadas rodando
        direto no ChatGPT. Clique, abra a skill e comece a usar — sem prompt nenhum pra colar.
      </p>
      <p className="mt-1 text-xs text-muted">
        Você precisa estar logado na sua conta ChatGPT (Plus, Team ou Enterprise) pra abrir.
      </p>

      {/* Produto extra com gate real (mesma entitlement hasProjetosPacote da
          página /projetos) — não é um item da tabela de bônus porque
          depende da compra real da pessoa, não é um link estático. */}
      <div
        className={`mt-8 rounded-xl p-5 transition-all ${
          user.hasProjetosPacote ? "card-surface" : "border border-dashed border-accent/40 bg-accent/5"
        }`}
      >
        <div className="flex items-start gap-4">
          <div className="icon-chip h-11 w-11 shrink-0 rounded-lg text-xl">
            {skillEmoji("folder-cog")}
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-1.5">
              <span className="inline-block rounded-full bg-surface-2 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted">
                Produto extra
              </span>
              <span className="badge-accent inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium">
                Acesso exclusivo
              </span>
            </div>
            <h3 className="font-semibold">250 Mil Projetos Editáveis no AutoCAD</h3>
            <p className="mt-1 text-sm text-muted">
              Biblioteca gigantesca com mais de 250 mil projetos prontos em .DWG pra você editar,
              adaptar e usar como base nos seus projetos. Liberado apenas pra quem comprou o
              produto extra.
            </p>

            {user.hasProjetosPacote ? (
              <Link
                href="/projetos"
                className="btn-primary mt-3 inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold"
              >
                Acessar projetos
                <Icon name="arrow-right" className="h-3.5 w-3.5" />
              </Link>
            ) : (
              <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
                <Icon name="lock" className="h-3.5 w-3.5" />
                Conteúdo bloqueado — disponível apenas pra quem adquiriu o produto extra “250 Mil
                Projetos Editáveis no AutoCAD”.
              </p>
            )}
          </div>
        </div>
      </div>

      <h2 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
        Skills no ChatGPT
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.slug} className="card-surface rounded-xl p-5 transition-all">
            <div className="flex items-start justify-between gap-2">
              <span className="badge-outline inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium">
                <Icon name="sparkles" className="h-3 w-3" />
                ChatGPT
              </span>
              <div className="icon-chip h-9 w-9 shrink-0 rounded-lg text-base">
                {skillEmoji(item.icon)}
              </div>
            </div>
            <h3 className="mt-3 font-semibold">{item.title}</h3>
            <p className="mt-1 text-sm text-muted">{item.description}</p>

            {item.actionUrl && (
              <a
                href={item.actionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold"
              >
                {item.actionLabel}
                <Icon name="external-link" className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
