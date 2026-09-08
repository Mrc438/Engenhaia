"use client";

import { useState, useSyncExternalStore } from "react";
import { Icon } from "@/components/icon";
import { Modal } from "@/components/modal";

const STORAGE_KEY = "guia-rapido-visto";

const steps = [
  {
    title: "Escolha uma área",
    description: "Skills, Prompts, Aulas ou Bônus.",
    icon: "target",
  },
  {
    title: "Copie ou abra o conteúdo",
    description: "Cada skill tem um prompt pronto pra colar — ou abre direto no ChatGPT, no bônus.",
    icon: "copy",
  },
  {
    title: "Comece a usar",
    description: "Aplique no seu projeto, com os dados reais da sua obra.",
    icon: "rocket",
  },
];

// "Já visto" é estado externo (localStorage) — lido via useSyncExternalStore
// em vez de useState+useEffect, pra abrir sozinho na primeira vez sem cair
// no anti-padrão de "setState dentro de effect" (e sem risco de warning de
// hidratação: o snapshot do servidor é sempre "já visto", então o auto-open
// só acontece depois, já no cliente).
function readSeen(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return true; // sem localStorage (modo privado etc.) — trata como visto, não incomoda.
  }
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("guia-rapido-change", onStoreChange);
  return () => window.removeEventListener("guia-rapido-change", onStoreChange);
}

function getServerSnapshot(): boolean {
  return true;
}

export function QuickGuideButton() {
  const seen = useSyncExternalStore(subscribe, readSeen, getServerSnapshot);
  const [manuallyOpened, setManuallyOpened] = useState(false);
  const open = manuallyOpened || !seen;

  function close() {
    setManuallyOpened(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // sem problema, só não persiste — pode abrir de novo na próxima visita.
    }
    window.dispatchEvent(new Event("guia-rapido-change"));
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setManuallyOpened(true)}
        className="btn-secondary inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium"
      >
        <Icon name="circle-help" className="h-4 w-4" />
        Abrir guia rápido
      </button>

      {open && (
        <Modal onClose={close}>
          <h2 className="text-lg font-bold">Guia rápido em 3 passos</h2>
          <p className="mt-1 text-sm text-muted">Leva menos de um minuto pra começar a usar.</p>
          <ol className="mt-5 space-y-4">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="icon-chip flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                  {i + 1}
                </span>
                <div className="pt-1">
                  <p className="flex items-center gap-1.5 text-sm font-semibold">
                    <Icon name={step.icon} className="h-3.5 w-3.5 text-accent" />
                    {step.title}
                  </p>
                  <p className="mt-0.5 text-sm text-muted">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <button
            type="button"
            onClick={close}
            className="btn-primary mt-6 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold"
          >
            Entendi, vamos lá
            <Icon name="arrow-right" className="h-4 w-4" />
          </button>
        </Modal>
      )}
    </>
  );
}
