"use client";

import { useLinkStatus } from "next/link";

// Precisa ser um componente FILHO do <Link>, não pode ficar no próprio
// Link nem no pai — o useLinkStatus só funciona assim. Dá o feedback visual
// instantâneo (antes mesmo do loading.tsx aparecer) de que o clique
// registrou, mesmo com o servidor ainda respondendo.
export function NavLinkPendingDot() {
  const { pending } = useLinkStatus();
  if (!pending) return null;
  return <span className="ml-auto h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-accent" />;
}
