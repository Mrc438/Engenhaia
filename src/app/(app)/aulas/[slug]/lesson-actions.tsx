"use client";

import { useTransition } from "react";
import Link from "next/link";
import { markLessonCompleteAction } from "@/lib/actions/lessons";
import { Icon } from "@/components/icon";

export function LessonActions({
  lessonId,
  lessonSlug,
  completed,
  nextSlug,
}: {
  lessonId: string;
  lessonSlug: string;
  completed: boolean;
  nextSlug: string | null;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <button
        disabled={completed || isPending}
        onClick={() => startTransition(() => markLessonCompleteAction(lessonId, lessonSlug))}
        className="btn-secondary inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-60"
      >
        <Icon name={completed ? "check-circle-2" : "circle"} className="h-4 w-4" />
        {completed ? "Aula concluída" : "Marcar concluída"}
      </button>
      {nextSlug && (
        <Link
          href={`/aulas/${nextSlug}`}
          className="btn-primary inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold"
        >
          Próxima
          <Icon name="play" className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
