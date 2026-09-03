"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";
import { modulosSeed } from "@/data/aulas/modulos";

// Carrossel de aulas pra landing page. Usa os módulos/aulas REAIS de
// src/data/aulas/modulos.ts (nada inventado) — só não tem imagem ainda
// (placeholder), a pedido: "vamos popular com as imagens depois".
//
// Formato pedido: cards verticais (retrato), dois por vez, avançando
// sozinho — com pausa ao passar o mouse e setas/dots como alternativa manual.

type CarouselItem = {
  moduleOrder: number;
  moduleTitle: string;
  title: string;
  description: string;
};

const ITEMS: CarouselItem[] = modulosSeed
  .slice()
  .sort((a, b) => a.order - b.order)
  .flatMap((modulo) =>
    modulo.lessons
      .slice()
      .sort((a, b) => a.order - b.order)
      .map((lesson) => ({
        moduleOrder: modulo.order,
        moduleTitle: modulo.title,
        title: lesson.title,
        description: lesson.description,
      })),
  );

export const TOTAL_AULAS = ITEMS.length;
export const TOTAL_MODULOS = modulosSeed.length;

const AUTO_ADVANCE_MS = 4500;

function LessonCard({ item }: { item: CarouselItem }) {
  return (
    <div className="card-surface flex h-full flex-col overflow-hidden rounded-2xl">
      {/* placeholder de imagem — populamos com prints reais das aulas depois */}
      <div className="flex aspect-[3/4] items-center justify-center bg-surface-2">
        <div className="flex flex-col items-center gap-2 text-muted">
          <span className="icon-chip flex h-12 w-12 rounded-full sm:h-14 sm:w-14">
            <Icon name="play" className="h-5 w-5" />
          </span>
          <span className="text-xs font-medium">Imagem da aula em breve</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span className="text-xs font-semibold uppercase tracking-wide text-accent-2">
          Módulo {item.moduleOrder} · {item.moduleTitle}
        </span>
        <h3 className="mt-2 text-base font-bold sm:text-lg">{item.title}</h3>
        <p className="mt-1.5 text-sm text-muted">{item.description}</p>
      </div>
    </div>
  );
}

export function AulasCarousel() {
  const total = ITEMS.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function goTo(next: number) {
    setIndex(((next % total) + total) % total);
  }

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, total]);

  const first = ITEMS[index];
  const second = ITEMS[(index + 1) % total];

  return (
    <div
      className="mx-auto mt-10 w-full max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        <LessonCard key={first.title} item={first} />
        <LessonCard key={second.title} item={second} />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Aula anterior"
          className="icon-chip flex h-10 w-10 rounded-full transition-transform hover:scale-105"
        >
          <Icon name="chevron-left" className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-1.5">
          {ITEMS.map((lesson, i) => (
            <span
              key={lesson.title}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-accent-2" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Próxima aula"
          className="icon-chip flex h-10 w-10 rounded-full transition-transform hover:scale-105"
        >
          <Icon name="chevron-right" className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-muted">
        Aulas {index + 1}-{((index + 1) % total) + 1} de {total}
      </p>
    </div>
  );
}
