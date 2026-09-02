"use client";

import { useState } from "react";
import { Icon } from "@/components/icon";
import { Modal } from "@/components/modal";

const steps = [
  'Escolha uma skill em "Skills" e copie o prompt pronto.',
  "Cole no seu assistente de IA de confiança.",
  "Ajuste com os dados reais da sua obra ou projeto — a IA nunca inventa números.",
  'Quer ver na prática? As "Aulas" têm o passo a passo completo em vídeo.',
];

export function QuickGuideButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-secondary inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium"
      >
        <Icon name="circle-help" className="h-4 w-4" />
        Abrir guia rápido
      </button>

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <span className="badge-accent inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium">
            <Icon name="compass" className="h-3.5 w-3.5" />
            Guia rápido
          </span>
          <h2 className="mt-3 text-lg font-bold">Como usar em 4 passos</h2>
          <ol className="mt-4 space-y-3">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed">
                <span className="icon-chip flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
                  {i + 1}
                </span>
                <span className="pt-0.5 text-foreground/90">{step}</span>
              </li>
            ))}
          </ol>
        </Modal>
      )}
    </>
  );
}
