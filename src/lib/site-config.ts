// ============================================================================
// Configuração central de marca — troque tudo aqui quando o nome final for
// definido. Nenhum outro arquivo deve ter o nome do produto "hardcoded".
// ============================================================================

export const siteConfig = {
  brandName: "EngenhaIA",
  brandTagline: "Copiloto de IA do Engenheiro Civil",
  productClaim:
    "Skills e prompts prontos para acelerar cálculo, documentação, gestão de obra e comercial — com IA.",
  price: "R$ 47",
  // preço "de" pra mostrar riscado ao lado do desconto — TEM que ser um preço
  // que realmente já foi cobrado por esse produto em algum momento (senão é
  // propaganda enganosa pelo CDC). Confirma esse valor antes de publicar.
  originalPrice: "R$ 197",
  supportEmail: "suporte@engenhaia.com.br",
  // Link de checkout (Payt) da oferta principal. TROCAR pelo link real antes
  // de publicar a landing page — todos os botões "Quero..." apontam pra cá.
  checkoutUrl: "https://pay.payt.com.br/COLOQUE-O-LINK-REAL-AQUI",
  // ID do Pixel da Meta (Events Manager) — usado no layout raiz (PageView
  // automático em toda página) e no clique dos botões de compra
  // (InitiateCheckout, ver landing-page.tsx).
  metaPixelId: "1960478244625063",
  // Link da pasta do Drive com o pacote de 250 mil projetos (definido pelo
  // usuário, 2026-09-08). Compartilhamento precisa estar como "qualquer
  // pessoa com o link pode ver" — a página /projetos usa este valor direto.
  projetosPacoteLink: "https://drive.google.com/drive/folders/1ZWxq6Ot4DS1JAF2lqVJ8E-gTWkUIyaK_?usp=sharing",
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
