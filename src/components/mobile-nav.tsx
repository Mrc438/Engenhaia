"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { Icon } from "@/components/icon";
import { NavLinkPendingDot } from "@/components/nav-link-status";

export function MobileNav({ hasProjetosPacote }: { hasProjetosPacote: boolean }) {
  const pathname = usePathname();

  const visibleNavItems = siteConfig.navItems.filter(
    (item) => !("requires" in item) || (item.requires === "projetosPacote" && hasProjetosPacote)
  );

  return (
    <nav className="flex md:hidden items-center gap-1 overflow-x-auto border-b border-border bg-surface px-2 py-2 scrollbar-thin">
      {visibleNavItems.map((item) => {
        const active = pathname === item.href || pathname?.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              active ? "badge-accent font-semibold" : "text-foreground/80 hover:bg-surface-2"
            }`}
          >
            <Icon name={item.icon} className={`h-3.5 w-3.5 ${active ? "" : "text-muted"}`} />
            {item.label}
            <NavLinkPendingDot />
          </Link>
        );
      })}
    </nav>
  );
}
