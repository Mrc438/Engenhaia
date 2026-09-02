"use client";

import { useState } from "react";
import { X, Sparkles } from "lucide-react";

export function TopBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="flex items-center gap-2 border-b border-border bg-accent/10 px-4 py-2.5 text-sm text-accent">
      <Sparkles className="h-4 w-4 shrink-0" />
      <p className="min-w-0 flex-1 truncate">
        Seu acesso está liberado — explore Skills, Prompts, Aulas e Bônus no menu ao lado.
      </p>
      <button
        onClick={() => setDismissed(true)}
        className="shrink-0 rounded p-1 text-accent/70 hover:text-accent"
        aria-label="Fechar aviso"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
