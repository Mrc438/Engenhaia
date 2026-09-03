import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { LandingPage } from "@/components/landing-page";

// Rota real da landing page. No domínio principal ela fica acessível aqui
// (/landing), só pra teste/fallback — o link que vai pro anúncio é o
// subdomínio de marketing, cujo proxy (src/proxy.ts) reescreve a raiz "/"
// pra esta rota, então quem visita o subdomínio nem vê "/landing" na URL.
export const metadata: Metadata = {
  title: siteConfig.brandTagline,
  description: siteConfig.productClaim,
};

export default function LandingRoute() {
  return <LandingPage />;
}
