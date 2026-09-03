"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/icon";
import { modulosSeed } from "@/data/aulas/modulos";

// Carrossel de aulas pra landing page — estrutura pedida pelo usuário com
// print de referência: cards de imagem lado a lado (2 por vez), legenda
// (título + descrição) dentro do próprio card, abaixo da imagem, botão de
// play que só aparece no hover, setas flutuando sobre as bordas, e sem
// bolinhas de contagem.
//
// Só 3 cards no carrossel (a pedido: "são só 3 cards") — as 3 artes reais
// que o usuário forneceu (public/aulas/*.webp, vindas de
// "Downloads/EngenhaIA/Slides Landing Page"). Título de cada card vem do
// próprio nome do arquivo de origem; descrição é texto original nosso
// (não copiado de referência nenhuma) batendo com os números REAIS do
// catálogo (51 skills — não "50"). TOTAL_AULAS/TOTAL_MODULOS (usados no
// resto da página, ex. pill "8 aulas em 3 módulos") continuam vindo dos
// módulos REAIS de src/data/aulas/modulos.ts — nada inventado ali.

type CarouselItem = {
  title: string;
  description: string;
  image: string;
};

const ALL_LESSONS_COUNT = modulosSeed.reduce((sum, modulo) => sum + modulo.lessons.length, 0);

export const TOTAL_AULAS = ALL_LESSONS_COUNT;
export const TOTAL_MODULOS = modulosSeed.length;

const ITEMS: CarouselItem[] = [
  {
    title: "Comece Aqui",
    description: "Como entrar na plataforma e dar os primeiros passos com o Claude.",
    image: "/aulas/comece-aqui.webp",
  },
  {
    title: "Instalando as Skills",
    // 51 = soma real de SKILL_CATEGORIES em landing-page.tsx (TOTAL_SKILLS_BASICO) —
    // mesma fonte da verdade, só não dá pra importar direto (landing-page.tsx já
    // importa TOTAL_AULAS/TOTAL_MODULOS deste arquivo, criaria import circular).
    description: "Passo a passo pra instalar e ativar as 51 skills da engenharia civil.",
    image: "/aulas/instalando-skills.webp",
  },
  {
    title: "Use o Claude como um Profissional",
    description: "Boas práticas e atalhos pra integrar o Claude na sua rotina de verdade.",
    image: "/aulas/use-profissional.webp",
  },
];

const AUTO_ADVANCE_MS = 4500;
const DRAG_THRESHOLD_PX = 40;

function LessonCard({ item, className = "", featured = false }: { item: CarouselItem; className?: string; featured?: boolean }) {
  return (
    <div
      className={`lp-aula-card card-surface group overflow-hidden rounded-2xl ${
        featured ? "ring-2 ring-accent/40" : ""
      } ${className}`}
      style={featured ? { boxShadow: "var(--shadow-glow)" } : undefined}
    >
      <div className="relative aspect-[2/3]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 640px) 340px, 90vw"
          className="object-cover"
        />
        {/* botão de play só aparece no hover — a aula em si ainda não tem vídeo */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity duration-200 group-hover:bg-black/20 group-hover:opacity-100">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-accent-2 bg-black/40 text-white backdrop-blur-sm">
            <Icon name="play" className="h-5 w-5 translate-x-0.5" />
          </span>
        </div>
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="text-lg font-bold">{item.title}</h3>
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
  const dragStartX = useRef<number | null>(null);
  const dragging = useRef(false);

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

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    dragStartX.current = e.clientX;
    dragging.current = true;
    setPaused(true);
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current || dragStartX.current === null) {
      setPaused(false);
      return;
    }
    const delta = e.clientX - dragStartX.current;
    if (delta > DRAG_THRESHOLD_PX) {
      goTo(index - 1);
    } else if (delta < -DRAG_THRESHOLD_PX) {
      goTo(index + 1);
    }
    dragStartX.current = null;
    dragging.current = false;
    setPaused(false);
  }

  function handlePointerLeave() {
    if (dragging.current) {
      dragStartX.current = null;
      dragging.current = false;
    }
    setPaused(false);
  }

  const first = ITEMS[index];
  const second = ITEMS[(index + 1) % total];

  return (
    <div
      className="relative mx-auto mt-10 w-full max-w-2xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={handlePointerLeave}
    >
      <button
        type="button"
        onClick={() => goTo(index - 1)}
        aria-label="Aula anterior"
        className="absolute left-0 top-[38%] z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background text-foreground shadow-md transition-transform hover:scale-105"
      >
        <Icon name="chevron-left" className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => goTo(index + 1)}
        aria-label="Próxima aula"
        className="absolute right-0 top-[38%] z-10 flex h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-background text-foreground shadow-md transition-transform hover:scale-105"
      >
        <Icon name="chevron-right" className="h-4 w-4" />
      </button>

      <div
        className="grid cursor-grab touch-pan-y grid-cols-1 select-none gap-4 active:cursor-grabbing sm:grid-cols-2 sm:gap-6"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <LessonCard key={first.title} item={first} featured />
        <LessonCard key={second.title} item={second} className="hidden sm:block" />
      </div>

      <p className="mt-3 text-center text-xs text-muted">Arraste para o lado para ver mais</p>
    </div>
  );
}
