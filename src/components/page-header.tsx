"use client";

import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { Icon } from "@/components/icon";
import { NucleoButton } from "@/components/nucleo-button";
import { ThemeToggle } from "@/components/theme-toggle";

// Barra fixa no topo do conteúdo, presente em toda página logada — mostra
// em qual seção o usuário está (mesma lógica de "ativo" da sidebar) e
// concentra as ações globais (Núcleo, tema) no canto direito.
export function PageHeader() {
  const pathname = usePathname();
  const current =
    siteConfig.navItems.find((item) => pathname === item.href) ??
    siteConfig.navItems.find((item) => pathname?.startsWith(item.href + "/"));

  return (
    <header className="flex items-center justify-between gap-3 border-b border-border bg-surface px-4 py-3 sm:px-6">
      <div className="flex min-w-0 items-center gap-2.5">
        {current && (
          <span className="icon-chip hidden h-8 w-8 shrink-0 rounded-lg sm:flex">
            <Icon name={current.icon} className="h-4 w-4" />
          </span>
        )}
        <h1 className="truncate text-base font-semibold sm:text-lg">
          {current?.label ?? siteConfig.brandTagline}
        </h1>
      </div>

      <div className="flex shrink-0 items-center gap-2.5">
        <NucleoButton />
        <ThemeToggle />
      </div>
    </header>
  );
}
