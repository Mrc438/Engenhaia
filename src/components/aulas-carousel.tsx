"use client";

import { useState } from "react";
import { Icon } from "@/components/icon";
import { modulosSeed } from "@/data/aulas/modulos";

// Carrossel de aulas pra landing page. Usa os módulos/aulas REAIS de
// src/data/aulas/modulos.ts (nada inventado) — só não tem imagem ainda
// (placeholder), a pedido: "vamos popular com as imagens depois".

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

export function AulasCarousel() {
  const [index, setIndex] = useState(0);
  const total = ITEMS.length;
  const item = ITEMS[index];

  function goTo(next: number) {
    setIndex(((next % total) + total) % total);
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-2xl">
      <div className="card-surface overflow-hidden rounded-2xl">
        {/* placeholder de imagem — populamos com prints reais das aulas depois */}
        <div className="flex aspect-video items-center justify-center bg-surface-2">
          <div className="flex flex-col items-center gap-2 text-muted">
            <span className="icon-chip flex h-14 w-14 rounded-full">
              <Icon name="play" className="h-5 w-5" />
            </span>
            <span className="text-xs font-medium">Imagem da aula em breve</span>
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <span className="text-xs font-semibold uppercase tracking-wide text-accent-2">
            Módulo {item.moduleOrder} · {item.moduleTitle}
          </span>
          <h3 className="mt-2 text-lg font-bold">{item.title}</h3>
          <p className="mt-1.5 text-sm text-muted">{item.description}</p>
        </div>
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
        Aula {index + 1} de {total}
      </p>
    </div>
  );
}
