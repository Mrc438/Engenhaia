// Tipagem mínima do Pixel da Meta (window.fbq), carregado via script no
// layout raiz (src/app/layout.tsx) e usado no clique dos botões de compra
// (src/components/landing-page.tsx) pra disparar InitiateCheckout.
export {};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}
