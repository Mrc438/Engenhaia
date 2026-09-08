"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";
import { Modal } from "@/components/modal";
import { siteConfig } from "@/lib/site-config";

// Texto próprio (não copiado de nenhum produto de referência) — resume as
// regras de base que valem pra toda skill/prompt do pacote, antes de
// qualquer instrução específica de cada uma.
const NUCLEO_RULES = [
  "Apoio técnico, não substituição: quem assina o projeto, laudo ou memorial com ART/RRT é sempre o engenheiro responsável.",
  "Nunca inventa número de norma, preço de tabela (SINAPI/SICRO), prazo legal ou qualquer dado técnico que não foi informado — se faltar, pergunta ou marca como pendente de confirmação.",
  "Mostra o raciocínio, não só o resultado — memória de cálculo auditável, passo a passo.",
  "Todo material gerado é rascunho de trabalho, sujeito a revisão e validação do responsável técnico antes de qualquer uso oficial.",
  "Pede os dados que faltam antes de avançar; quando precisa adotar uma premissa no lugar de um dado não-crítico, deixa isso explícito na resposta.",
  "Usa a terminologia técnica correta da engenharia civil brasileira.",
  "Sinaliza divergências e pontos de atenção com clareza, em vez de deixar passar batido.",
];

export function NucleoButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-secondary inline-flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold"
      >
        <BookOpen className="h-4 w-4" />
        Núcleo
      </button>

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <span className="badge-outline inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide">
            Herdado por todos os agentes
          </span>
          <h2 className="mt-3 text-xl font-bold tracking-tight">
            Núcleo — {siteConfig.brandTagline}
          </h2>
          <p className="mt-1 text-sm text-muted">
            As regras que toda skill segue sempre, antes de qualquer instrução específica dela.
          </p>

          <ol className="mt-5 space-y-3">
            {NUCLEO_RULES.map((rule, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed">
                <span className="mt-0.5 shrink-0 font-semibold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{rule}</span>
              </li>
            ))}
          </ol>

          <div className="mt-5 rounded-lg border border-border bg-surface-2 px-4 py-3 text-xs text-muted">
            Formato padrão de resposta: resumo → premissas assumidas → memória técnica → resultado
            → pontos a confirmar. Rascunho técnico — sempre exige validação e ART do responsável.
          </div>
        </Modal>
      )}
    </>
  );
}
