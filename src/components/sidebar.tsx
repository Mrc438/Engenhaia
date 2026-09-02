"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { Icon } from "@/components/icon";
import { SignOutButton } from "@/components/sign-out-button";

export function Sidebar({ user }: { user: { name: string; email: string } }) {
  const pathname = usePathname();
  const initials = user.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <aside className="hidden md:flex md:w-64 shrink-0 flex-col border-r border-border bg-surface">
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-border">
        <div className="icon-chip h-9 w-9 rounded-lg">
          <Icon name="hard-hat" className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold leading-tight">{siteConfig.brandName}</p>
          <p className="truncate text-xs text-muted leading-tight">{siteConfig.brandTagline}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {siteConfig.navItems.map((item) => {
          const active = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                active
                  ? "bg-accent-soft text-accent font-medium"
                  : "text-foreground/85 hover:bg-surface-2 hover:text-foreground hover:translate-x-0.5"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-accent" />
              )}
              <Icon
                name={item.icon}
                className={`h-4 w-4 transition-colors ${active ? "text-accent" : "text-muted group-hover:text-foreground"}`}
              />
              {item.label}
            </Link>
          );
        })}

        <div className="!mt-4 border-t border-border pt-3 space-y-1">
          <a
            href="https://claude.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground/70 transition-all hover:bg-surface-2 hover:text-foreground hover:translate-x-0.5"
          >
            <Icon name="sparkle" className="h-4 w-4 text-muted transition-colors group-hover:text-foreground" />
            Abrir Claude
            <Icon name="external-link" className="ml-auto h-3.5 w-3.5 text-muted/70" />
          </a>
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground/40">
            <Icon name="folder-cog" className="h-4 w-4 text-muted/50" />
            <span className="flex-1">Projetos AutoCAD</span>
            <span className="badge-accent rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide">
              Em breve
            </span>
          </div>
        </div>
      </nav>

      <div className="border-t border-border px-3 py-4 space-y-1">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="icon-chip-solid h-8 w-8 rounded-full text-xs font-semibold">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium leading-tight">{user.name}</p>
            <Link href="/perfil" className="truncate text-xs text-muted hover:text-accent leading-tight">
              Editar perfil
            </Link>
          </div>
        </div>
        <SignOutButton />
      </div>
    </aside>
  );
}
