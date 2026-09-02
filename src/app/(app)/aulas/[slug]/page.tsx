import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth-helpers";
import { getLessonBySlug } from "@/lib/queries";
import { Icon } from "@/components/icon";
import { LessonActions } from "./lesson-actions";

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const user = await requireUser();
  const { slug } = await params;
  const data = await getLessonBySlug(slug, user.id);
  if (!data) notFound();

  const { lesson, completedIds } = data;
  const siblings = lesson.module.lessons;
  const index = siblings.findIndex((l) => l.id === lesson.id);
  const next = siblings[index + 1] ?? null;
  const doneInModule = siblings.filter((l) => completedIds.has(l.id)).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center gap-3 text-sm text-muted">
        <Link href="/aulas" className="inline-flex items-center gap-1.5 hover:text-foreground">
          <Icon name="arrow-left" className="h-4 w-4" />
          Módulos
        </Link>
        <span>/</span>
        <span>{lesson.module.title}</span>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="flex aspect-video items-center justify-center rounded-xl border border-dashed border-border bg-surface shadow-[var(--shadow-sm)] text-center">
            {lesson.videoUrl ? (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video controls className="h-full w-full rounded-xl" src={lesson.videoUrl} />
            ) : (
              <div className="px-6 text-sm text-muted">
                <span className="icon-chip mx-auto mb-2 h-12 w-12 rounded-full">
                  <Icon name="video" className="h-5 w-5" />
                </span>
                Vídeo ainda não gravado — siga o roteiro abaixo enquanto isso.
              </div>
            )}
          </div>

          <span className="badge-accent mt-6 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium">
            Aula {index + 1} de {siblings.length}
          </span>
          <h1 className="mt-2 text-2xl font-bold">{lesson.title}</h1>
          <p className="mt-1 text-sm text-muted">{lesson.description}</p>

          <LessonActions
            lessonId={lesson.id}
            lessonSlug={lesson.slug}
            completed={completedIds.has(lesson.id)}
            nextSlug={next?.slug ?? null}
          />

          <div className="card-surface-static mt-8 rounded-xl p-5">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
              Roteiro da aula
            </h2>
            <div className="prose-body whitespace-pre-wrap text-sm leading-relaxed">
              {lesson.script}
            </div>
          </div>
        </div>

        <aside className="card-surface-static rounded-xl p-5 lg:sticky lg:top-6 lg:self-start">
          <h2 className="mb-1 text-sm font-semibold">Conteúdo do módulo</h2>
          <p className="mb-3 text-xs text-muted">
            {doneInModule}/{siblings.length}
          </p>
          <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full bg-accent"
              style={{ width: `${(doneInModule / siblings.length) * 100}%` }}
            />
          </div>
          <ul className="space-y-1">
            {siblings.map((l, i) => (
              <li key={l.slug}>
                <Link
                  href={`/aulas/${l.slug}`}
                  className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors ${
                    l.id === lesson.id ? "badge-accent font-medium" : "hover:bg-surface-2"
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${
                      completedIds.has(l.id) ? "bg-success/20 text-success" : "bg-surface-2 text-muted"
                    }`}
                  >
                    {completedIds.has(l.id) ? <Icon name="check" className="h-3 w-3" /> : i + 1}
                  </span>
                  <span className="flex-1 truncate">{l.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
