"use client";

import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { Wrench } from "lucide-react";

// Wrapper em volta do DynamicIcon do lucide-react: recebe o nome em
// kebab-case gerado pelo conteúdo (skills/prompts/bônus) e cai num ícone
// padrão se o nome não existir na biblioteca (evita quebrar a página).
export function Icon({ name, className }: { name: string; className?: string }) {
  return (
    <span className={className}>
      <DynamicIcon
        name={name as IconName}
        fallback={() => <Wrench className={className} />}
      />
    </span>
  );
}
