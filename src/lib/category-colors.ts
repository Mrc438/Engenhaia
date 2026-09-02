// Paleta de cores por categoria — pra dar variedade visual às pills de
// categoria (skills e prompts), do jeito que a referência usa uma cor
// diferente por área (estrutural, geotecnia, gestão, etc.) em vez de um
// único tom âmbar repetido em toda a biblioteca.
//
// A cor é escolhida pela POSIÇÃO da categoria na lista (índice), não por
// hash do nome/slug — hash de string pode colidir em duas categorias
// específicas (aconteceu com "Projeto & Cálculo" e "Documentação Técnica",
// que caíam na mesma cor). Por índice, categorias vizinhas na mesma lista
// nunca repetem cor enquanto a lista for menor que a paleta.
const PALETTE = [
  { bg: "rgba(242, 118, 46, 0.16)", text: "#ffb15c", ring: "rgba(242, 118, 46, 0.4)" }, // laranja (marca)
  { bg: "rgba(59, 130, 246, 0.16)", text: "#93c5fd", ring: "rgba(59, 130, 246, 0.4)" }, // azul
  { bg: "rgba(34, 197, 94, 0.16)", text: "#86efac", ring: "rgba(34, 197, 94, 0.4)" }, // verde
  { bg: "rgba(168, 85, 247, 0.16)", text: "#d8b4fe", ring: "rgba(168, 85, 247, 0.4)" }, // roxo
  { bg: "rgba(34, 211, 238, 0.16)", text: "#67e8f9", ring: "rgba(34, 211, 238, 0.4)" }, // ciano
  { bg: "rgba(244, 63, 94, 0.16)", text: "#fda4af", ring: "rgba(244, 63, 94, 0.4)" }, // rosa
  { bg: "rgba(234, 179, 8, 0.16)", text: "#fde68a", ring: "rgba(234, 179, 8, 0.4)" }, // amarelo
  { bg: "rgba(20, 184, 166, 0.16)", text: "#5eead4", ring: "rgba(20, 184, 166, 0.4)" }, // teal
  { bg: "rgba(236, 72, 153, 0.16)", text: "#f9a8d4", ring: "rgba(236, 72, 153, 0.4)" }, // pink
  { bg: "rgba(132, 204, 22, 0.16)", text: "#bef264", ring: "rgba(132, 204, 22, 0.4)" }, // lima
] as const;

export function categoryColor(index: number) {
  return PALETTE[((index % PALETTE.length) + PALETTE.length) % PALETTE.length];
}
