import Link from "next/link";
import { requireUser } from "@/lib/auth-helpers";
import { getModulesWithLessons } from "@/lib/queries";
import { db } from "@/db";
import { lessonProgress } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Icon } from "@/components/icon";

export default async function AulasPage() {
  const user = await requireUser();
  const modules = await getModulesWithLessons();
  const progressRows = await db
    .select({ lessonId: lessonProgress.lessonId })
    .from(lessonProgress)
    .where(eq(lessonProgress.userId, user.id));
  const completedIds = new Set(progressRows.map((p) => p.lessonId));

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalDone = modules.reduce(
    (acc, m) => acc + m.lessons.filter((l) => completedIds.has(l.id)).length,
    0
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <span className="badge-accent inline-flex items-center rounded-full px-3 py-1 text-xs font-medium">
        Curso
      </span>
      <h1 className="mt-4 text-2xl font-bold sm:text-3xl">Apresentação do curso e visão geral da plataforma</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Passo a passo em vídeo pra instalar, configurar e usar as Skills e Prompts no dia a dia.{" "}
        {totalDone}/{totalLessons} aulas concluídas.
      </p>

      <div className="mt-4 h-2 w-full max-w-sm overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full bg-accent transition-all"
          style={{ width: `${totalLessons ? (totalDone / totalLessons) * 100 : 0}%` }}
        />
      </div>

      <h2 className="mt-10 text-sm font-semibold uppercase tracking-wide text-muted">
        Módulos do curso
      </h2>
      <div className="mt-4 space-y-4">
        {modules.map((m) => {
          const doneInModule = m.lessons.filter((l) => completedIds.has(l.id)).length;
          return (
            <div key={m.slug} className="card-surface rounded-xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{m.title}</h3>
                  <p className="mt-1 text-sm text-muted">{m.summary}</p>
                </div>
                <span className="shrink-0 text-xs text-muted">
                  {doneInModule}/{m.lessons.length}
                </span>
              </div>
              <ul className="mt-4 space-y-2">
                {m.lessons.map((l, i) => (
                  <li key={l.slug}>
                    <Link
                      href={`/aulas/${l.slug}`}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-surface-2"
                    >
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                          completedIds.has(l.id)
                            ? "bg-success/20 text-success"
                            : "bg-surface-2 text-muted"
                        }`}
                      >
                        {completedIds.has(l.id) ? <Icon name="check" className="h-3.5 w-3.5" /> : i + 1}
                      </span>
                      <span className="flex-1">{l.title}</span>
                      <span className="text-xs text-muted">Aula {i + 1}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
