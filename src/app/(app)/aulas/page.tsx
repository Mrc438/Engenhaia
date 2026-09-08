import Link from "next/link";
import Image from "next/image";
import { requireUser } from "@/lib/auth-helpers";
import { getModulesWithLessons } from "@/lib/queries";
import { db } from "@/db";
import { lessonProgress } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Icon } from "@/components/icon";

// Capa de cada módulo — só os 2 primeiros têm arte própria hoje (as mesmas
// peças usadas no carrossel da landing page, public/aulas/*.webp, batem
// exatamente com o conteúdo desses módulos). O 3º módulo ainda não tem arte
// dedicada, então cai no fallback em gradiente (ver ModuleCard) em vez de
// reusar uma capa de tema errado.
const MODULE_COVERS: Record<string, string> = {
  "primeiros-passos": "/aulas/instalando-skills.webp",
  "usando-como-profissional": "/aulas/use-profissional.webp",
};

const MODULE_ICONS: Record<string, string> = {
  "primeiros-passos": "rocket",
  "usando-como-profissional": "briefcase-business",
  "comunidade-proximos-passos": "users",
};

export default async function AulasPage() {
  const user = await requireUser();
  const modules = await getModulesWithLessons();
  const progressRows = await db
    .select({ lessonId: lessonProgress.lessonId })
    .from(lessonProgress)
    .where(eq(lessonProgress.userId, user.id));
  const completedIds = new Set(progressRows.map((p) => p.lessonId));

  const firstLesson = modules[0]?.lessons[0];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="card-surface-static relative overflow-hidden rounded-2xl p-6 sm:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 select-none overflow-hidden"
        >
          <span className="absolute -top-3 right-2 whitespace-nowrap text-[4.5rem] font-black uppercase leading-none tracking-tight text-foreground/[0.04] sm:text-[6.5rem]">
            Engenharia
          </span>
          <span className="absolute -bottom-6 right-2 whitespace-nowrap text-[4.5rem] font-black uppercase leading-none tracking-tight text-accent/10 sm:text-[6.5rem]">
            Civil
          </span>
        </div>

        <div className="relative">
          <span className="badge-accent inline-flex items-center rounded-full px-3 py-1 text-xs font-medium">
            Curso
          </span>
          <h1 className="mt-4 max-w-xl text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Apresentação do curso e visão geral da plataforma
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            Passo a passo em vídeo pra instalar, configurar e usar as Skills e Prompts no dia a
            dia.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {firstLesson && (
              <Link
                href={`/aulas/${firstLesson.slug}`}
                className="btn-primary inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold"
              >
                <Icon name="play" className="h-4 w-4" />
                Assistir
              </Link>
            )}
            <a
              href="#modulos"
              className="btn-secondary inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold"
            >
              Ver módulos
            </a>
          </div>
        </div>
      </div>

      <h2 id="modulos" className="mt-10 scroll-mt-6 text-sm font-semibold uppercase tracking-wide text-muted">
        Módulos do curso
      </h2>
      {/* Largura de cada card fixa (não esticar pra preencher a linha) — só o
          espaço necessário pros pôsteres, com o resto do espaço livre. */}
      <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(220px,260px))] gap-5">
        {/* Só os módulos com arte própria aparecem aqui por enquanto — ver
            MODULE_COVERS acima. O módulo 3 ainda não tem capa dedicada. */}
        {modules
          .filter((m) => MODULE_COVERS[m.slug])
          .map((m, idx) => {
            const nextLesson = m.lessons.find((l) => !completedIds.has(l.id)) ?? m.lessons[0];
            const cover = MODULE_COVERS[m.slug];
            return (
              <Link
                key={m.slug}
                href={nextLesson ? `/aulas/${nextLesson.slug}` : "/aulas"}
                className="card-surface group block overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  {cover ? (
                    <Image
                      src={cover}
                      alt={m.title}
                      fill
                      sizes="260px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(160deg,var(--accent-2),var(--accent))]">
                      <Icon name={MODULE_ICONS[m.slug] ?? "clapperboard"} className="h-12 w-12 text-accent-foreground" />
                    </div>
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                    Módulo {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold leading-snug">{m.title}</h3>
                  {/* Botão só aparece no hover — sem deslocar o layout no estado normal */}
                  <span className="mt-3 inline-flex -translate-y-1 items-center gap-1.5 rounded-lg bg-foreground px-3 py-1.5 text-xs font-semibold text-background opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                    <Icon name="play" className="h-3 w-3" />
                    Assistir
                  </span>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
