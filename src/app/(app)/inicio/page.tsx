import Link from "next/link";
import { requireUser } from "@/lib/auth-helpers";
import { siteConfig } from "@/lib/site-config";
import { Icon } from "@/components/icon";
import { QuickGuideButton } from "@/components/quick-guide-button";

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
  const firstName = (user.name ?? "").split(" ")[0] || "engenheiro";

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="card-glow rounded-2xl p-6 sm:p-8">
        <span className="badge-accent inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium">
          <Icon name="layout-dashboard" className="h-3.5 w-3.5" />
          Painel inicial
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
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
          <QuickGuideButton />
        </div>
      </div>

      <div className="card-surface-static mt-6 flex items-start gap-3 rounded-xl border-dashed p-4">
        <Icon name="lock" className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
        <p className="text-sm text-muted">
          Alguns conteúdos são exclusivos: eles só aparecem liberados pra quem adquiriu o produto
          correspondente (como o Pack Especialista, dentro de Skills). Se você comprou e ainda
          aparece bloqueado, saia e entre novamente na conta.
        </p>
      </div>

      <h2 className="mt-10 text-sm font-semibold uppercase tracking-wide text-muted">
        Áreas do sistema
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {areas.map((area) => (
          <Link
            key={area.href}
            href={area.href}
            className="card-surface flex flex-col rounded-2xl p-5"
          >
            <div className="icon-chip mb-3 h-11 w-11 rounded-full">
              <Icon name={area.icon} className="h-5 w-5" />
            </div>
            <h3 className="font-semibold">{area.title}</h3>
            <p className="mt-1 flex-1 text-sm text-muted">{area.description}</p>
            <span className="btn-primary pointer-events-none mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold">
              {area.cta}
              <Icon name="arrow-right" className="h-3.5 w-3.5" />
            </span>
          </Link>
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
