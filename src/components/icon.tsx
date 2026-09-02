"use client";

import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { Wrench } from "lucide-react";

// Wrapper em volta do DynamicIcon do lucide-react: recebe o nome em
// kebab-case gerado pelo conteúdo (skills/prompts/bônus) e cai num ícone
// padrão se o nome não existir na biblioteca (evita quebrar a página).
//
// O className (h-4 w-4, etc.) precisa ir DIRETO no DynamicIcon — não numa
// <span> em volta. Numa span, o SVG interno do lucide renderiza no
// tamanho padrão dele (24px) e vaza pra fora da caixinha pequena,
// sobrepondo o texto ao lado (era o bug do ícone "grudado"/gigante em
// cima do texto nas badges "Painel inicial", "Em destaque", etc.).
export function Icon({ name, className }: { name: string; className?: string }) {
  return (
    <DynamicIcon
      name={name as IconName}
      className={className}
      fallback={() => <Wrench className={className} />}
    />
  );
}
