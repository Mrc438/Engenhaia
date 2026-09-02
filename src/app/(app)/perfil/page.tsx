import { requireUser } from "@/lib/auth-helpers";
import { updateProfileAction } from "@/lib/actions/profile";
import { Icon } from "@/components/icon";

export default async function PerfilPage() {
  const user = await requireUser();

  return (
    <div className="mx-auto max-w-lg px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold">Meu perfil</h1>
      <p className="mt-1 text-sm text-muted">
        Como você quer aparecer aqui dentro da plataforma.
      </p>

      <form action={updateProfileAction} className="card-surface-static mt-6 space-y-4 rounded-xl p-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Nome de exibição</label>
          <input
            name="name"
            defaultValue={user.name ?? ""}
            className="w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-accent"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-muted">E-mail</label>
          <input
            disabled
            value={user.email ?? ""}
            className="w-full cursor-not-allowed rounded-lg border border-border bg-surface-2/50 px-3.5 py-2.5 text-sm text-muted"
          />
        </div>
        <button
          type="submit"
          className="btn-primary rounded-lg px-4 py-2.5 text-sm font-semibold"
        >
          Salvar
        </button>
      </form>

      <div className="card-surface-static mt-6 rounded-xl p-5">
        <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold">
          <span className="icon-chip h-6 w-6 rounded-md"><Icon name="badge-check" className="h-3.5 w-3.5" /></span>
          Acesso vitalício
        </h2>
        <p className="text-sm text-muted">
          Sua compra dá acesso permanente à plataforma, sem mensalidade.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {["Skills + Prompts + Aulas", "Comunidade"].map((tag) => (
            <span key={tag} className="rounded-full bg-surface-2 px-3 py-1 text-xs text-muted">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
