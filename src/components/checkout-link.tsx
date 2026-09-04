"use client";

// Client Component isolado só pra permitir o onClick (dispara
// InitiateCheckout do Pixel da Meta antes de sair pro checkout da Payt) —
// landing-page.tsx continua sendo Server Component, sem precisar virar
// "use client" inteira por causa de dois botões.
export function CheckoutLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  function trackInitiateCheckout() {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "InitiateCheckout");
    }
  }

  return (
    <a href={href} onClick={trackInitiateCheckout} className={className}>
      {children}
    </a>
  );
}
