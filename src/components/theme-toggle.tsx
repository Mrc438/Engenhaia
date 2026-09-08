"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

// Tema persistido em localStorage ("theme": "light" | "dark") e aplicado
// como atributo data-theme na <html> — o script inline em layout.tsx já
// aplica o valor salvo ANTES da hidratação, pra não piscar o tema errado.
//
// useSyncExternalStore em vez de useState+useEffect: o valor real vem de
// fora do React (o atributo no <html>), e é assim que se lê estado externo
// sem cair no anti-padrão de "setState dentro de effect" — e ele já resolve
// sozinho a diferença entre o snapshot do servidor (sempre "dark", já que o
// SSR não sabe a preferência salva) e o do cliente, sem gerar warning de
// hidratação.
type Theme = "light" | "dark";

function readTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("theme-change", onStoreChange);
  return () => window.removeEventListener("theme-change", onStoreChange);
}

function getServerSnapshot(): Theme {
  return "dark";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, readTheme, getServerSnapshot);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    if (next === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem("theme", next);
    } catch {
      // localStorage indisponível (modo privado etc.) — o tema só não persiste entre visitas.
    }
    window.dispatchEvent(new Event("theme-change"));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="icon-chip flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
      aria-label={theme === "light" ? "Mudar para tema escuro" : "Mudar para tema claro"}
      title={theme === "light" ? "Tema escuro" : "Tema claro"}
    >
      {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}
