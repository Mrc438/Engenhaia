// ============================================================================
// Configuração central de marca — troque tudo aqui quando o nome final for
// definido. Nenhum outro arquivo deve ter o nome do produto "hardcoded".
// ============================================================================

export const siteConfig = {
  brandName: "[SEU NOME AQUI]",
  brandTagline: "Copiloto de IA do Engenheiro Civil",
  productClaim:
    "Skills e prompts prontos para acelerar cálculo, documentação, gestão de obra e comercial — com IA.",
  price: "R$ 39,90",
  supportEmail: "suporte@engenhaia.com.br",
  // Link de checkout (Payt) da oferta principal. TROCAR pelo link real antes
  // de publicar a landing page — todos os botões "Quero..." apontam pra cá.
  checkoutUrl: "https://pay.payt.com.br/COLOQUE-O-LINK-REAL-AQUI",
  // Link da pasta/arquivo com o pacote de 250 mil projetos. TROCAR pelo link
  // real do Drive antes de publicar — a página /projetos usa este valor.
  projetosPacoteLink: "https://drive.google.com/COLOQUE-O-LINK-REAL-AQUI",
  navItems: [
    { href: "/inicio", label: "Início", icon: "home" },
    { href: "/skills", label: "Skills", icon: "sparkles" },
    { href: "/prompts", label: "Prompts", icon: "library" },
    { href: "/aulas", label: "Aulas", icon: "book-open" },
    { href: "/bonus", label: "Bônus", icon: "gift" },
    { href: "/comunidade", label: "Comunidade", icon: "users" },
    // Só aparece pra quem comprou o pacote separado (user.hasProjetosPacote) —
    // ver filtro em sidebar.tsx / mobile-nav.tsx. Liberação hoje é manual no
    // banco; automação com webhook da Payt é tarefa futura (lembrete criado).
    { href: "/projetos", label: "Projetos AutoCAD", icon: "folder-cog", requires: "projetosPacote" },
  ],
} as const;
