import Link from "next/link";
import { requireUser } from "@/lib/auth-helpers";
import { getSkillCounts, getPromptCounts, getCommunityStats } from "@/lib/queries";
import { siteConfig } from "@/lib/site-config";
import { Icon } from "@/components/icon";

const areas = [
  {
    href: "/skills",
    icon: "sparkles",
    title: "Skills",
    description: "Prompts prontos pra instalar no seu assistente de IA e acelerar o trabalho técnico.",
    cta: "Acessar skills",
  },
  {
    href: "/prompts",
    icon: "library",
    title: "Biblioteca de Prompts",
    description: "Centenas de prompts organizados por área da engenharia civil e arquitetura.",
    cta: "Abrir biblioteca",
  },
  {
    href: "/aulas",
    icon: "book-open",
    title: "Aulas",
    description: "Passo a passo para instalar, configurar e usar tudo na prática.",
    cta: "Assistir aulas",
  },
  {
    href: "/bonus",
    icon: "gift",
    title: "Bônus",
    description: "Materiais extras liberados junto com o seu acesso.",
    cta: "Ver bônus",
  },
  {
    href: "/comunidade",
    icon: "users",
    title: "Comunidade",
    description: "Troque experiência real de obra com outros engenheiros da plataforma.",
    cta: "Entrar na comunidade",
  },
];

export default async function InicioPage() {
  const user = await requireUser();
  const [skillCount, promptCount, communityStats] = await Promise.all([
    getSkillCounts(),
    getPromptCounts(),
    getCommunityStats(),
  ]);

  const firstName = (user.name ?? "").split(" ")[0] || "engenheiro";

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="card-glow rounded-2xl p-6 sm:p-8">
        <span className="badge-accent inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium">
          <Icon name="layout-dashboard" className="h-3.5 w-3.5" />
          Painel inicial
        </span>
        <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
          Bem-vindo de volta, {firstName}.
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Escolha uma área abaixo pra começar. Tudo o que está liberado na sua conta aparece
          direto no painel.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/skills"
            className="btn-primary inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold"
          >
            Começar agora
            <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
          <Link
            href="/aulas"
            className="btn-secondary inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium"
          >
            <Icon name="circle-help" className="h-4 w-4" />
            Abrir guia rápido
          </Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon="sparkles" label="Skills disponíveis" value={skillCount} />
        <StatCard icon="library" label="Prompts na biblioteca" value={promptCount} />
        <StatCard icon="users" label="Engenheiros na comunidade" value={communityStats.members} />
      </div>

      <h2 className="mt-10 text-sm font-semibold uppercase tracking-wide text-muted">
        Áreas do sistema
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {areas.map((area) => (
          <div key={area.href} className="card-surface flex flex-col rounded-2xl p-5">
            <div className="icon-chip mb-3 h-11 w-11 rounded-full">
              <Icon name={area.icon} className="h-5 w-5" />
            </div>
            <h3 className="font-semibold">{area.title}</h3>
            <p className="mt-1 flex-1 text-sm text-muted">{area.description}</p>
            <Link
              href={area.href}
              className="btn-primary mt-4 inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold"
            >
              {area.cta}
              <Icon name="arrow-right" className="h-3.5 w-3.5" />
            </Link>
          </div>
        ))}
      </div>

      <p className="mt-8 text-xs text-muted">
        Dúvidas ou problema de acesso? Fale com a gente em{" "}
        <a href={`mailto:${siteConfig.supportEmail}`} className="text-accent hover:underline">
          {siteConfig.supportEmail}
        </a>
        .
      </p>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: number }) {
  return (
    <div className="card-surface flex items-center gap-3 rounded-xl px-5 py-4">
      <div className="icon-chip h-10 w-10 rounded-full">
        <Icon name={icon} className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xl font-bold leading-tight">{value.toLocaleString("pt-BR")}</p>
        <p className="text-xs text-muted">{label}</p>
      </div>
    </div>
  );
}
