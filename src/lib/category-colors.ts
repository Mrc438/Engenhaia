// Paleta de cores por categoria — pra dar variedade visual às pills de
// categoria (skills e prompts), do jeito que a referência usa uma cor
// diferente por área (estrutural, geotecnia, gestão, etc.) em vez de um
// único tom âmbar repetido em toda a biblioteca.
const PALETTE = [
  { bg: "rgba(242, 118, 46, 0.16)", text: "#ffb15c", ring: "rgba(242, 118, 46, 0.4)" }, // laranja (marca)
  { bg: "rgba(59, 130, 246, 0.16)", text: "#93c5fd", ring: "rgba(59, 130, 246, 0.4)" }, // azul
  { bg: "rgba(34, 197, 94, 0.16)", text: "#86efac", ring: "rgba(34, 197, 94, 0.4)" }, // verde
  { bg: "rgba(168, 85, 247, 0.16)", text: "#d8b4fe", ring: "rgba(168, 85, 247, 0.4)" }, // roxo
  { bg: "rgba(34, 211, 238, 0.16)", text: "#67e8f9", ring: "rgba(34, 211, 238, 0.4)" }, // ciano
  { bg: "rgba(244, 63, 94, 0.16)", text: "#fda4af", ring: "rgba(244, 63, 94, 0.4)" }, // rosa
  { bg: "rgba(234, 179, 8, 0.16)", text: "#fde68a", ring: "rgba(234, 179, 8, 0.4)" }, // amarelo
] as const;

function hashString(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

// Mesma categoria sempre cai na mesma cor (hash determinístico do slug) —
// não depende de posição na lista, então não muda se a ordem das categorias
// mudar no banco.
export function categoryColor(slug: string) {
  return PALETTE[hashString(slug) % PALETTE.length];
}
