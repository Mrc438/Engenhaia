import { requireUser } from "@/lib/auth-helpers";
import { getBonusItems } from "@/lib/queries";
import { Icon } from "@/components/icon";
import { skillEmoji } from "@/lib/skill-emoji";

export default async function BonusPage() {
  await requireUser();
  const items = await getBonusItems();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <span className="badge-accent inline-flex items-center rounded-full px-3 py-1 text-xs font-medium">
        Bônus exclusivo
      </span>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
        Materiais extras da sua compra.
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Além das Skills e da Biblioteca de Prompts, você também tem acesso a estes materiais de
        apoio.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.slug}
            className={`rounded-xl p-5 transition-all ${
              item.locked
                ? "border border-dashed border-accent/40 bg-accent/5"
                : "card-surface"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="icon-chip h-11 w-11 shrink-0 rounded-lg text-xl">
                {skillEmoji(item.icon)}
              </div>
              <div className="min-w-0 flex-1">
                {item.locked && (
                  <span className="mb-1 inline-block rounded-full bg-surface-2 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted">
                    Produto extra
                  </span>
                )}
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted">{item.description}</p>

                {item.locked ? (
                  <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
                    <Icon name="lock" className="h-3.5 w-3.5" />
                    {item.lockNote ?? "Conteúdo bloqueado — disponível apenas para quem adquiriu o produto extra."}
                  </p>
                ) : item.actionUrl ? (
                  <a
                    href={item.actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold"
                  >
                    {item.actionLabel}
                    <Icon name="external-link" className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                    {item.actionLabel}
                    <Icon name="arrow-right" className="h-3.5 w-3.5" />
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
