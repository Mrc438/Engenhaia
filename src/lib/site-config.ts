// ============================================================================
// Configuração central de marca — troque tudo aqui quando o nome final for
// definido. Nenhum outro arquivo deve ter o nome do produto "hardcoded".
// ============================================================================

export const siteConfig = {
  brandName: "[SEU NOME AQUI]",
  brandTagline: "Copiloto de IA do Engenheiro Civil",
  productClaim:
    "Skills e prompts prontos para acelerar cálculo, documentação, gestão de obra e comercial — com IA.",
  price: "R$ 19,90",
  supportEmail: "suporte@seudominio.com.br",
  navItems: [
    { href: "/inicio", label: "Início", icon: "home" },
    { href: "/skills", label: "Skills", icon: "sparkles" },
    { href: "/prompts", label: "Prompts", icon: "library" },
    { href: "/aulas", label: "Aulas", icon: "book-open" },
    { href: "/bonus", label: "Bônus", icon: "gift" },
    { href: "/comunidade", label: "Comunidade", icon: "users" },
  ],
} as const;
