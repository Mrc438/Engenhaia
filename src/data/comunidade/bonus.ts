// Seed de itens de Bônus — 10 skills do pacote adaptadas pra rodar como GPT
// dentro do ChatGPT (bônus cross-plataforma: quem só usa ChatGPT no dia a
// dia também aproveita). Conteúdo (nome/descrição) reaproveita as mesmas 60
// skills originais do produto — ver src/data/skills/. Os actionUrl são
// placeholder: trocar por cada GPT publicado antes de divulgar (mesma
// convenção de site-config.ts pros outros links reais pendentes).

import { BonusItemSeed } from "../types";

export const bonusItemsSeed: BonusItemSeed[] = [
  {
    slug: "gpt-estrutural",
    title: "Skill Estrutural",
    description:
      "Pré-dimensionamento e memória de cálculo de lajes, vigas, pilares e fundações rasas, com verificações e checklist técnico.",
    icon: "layers",
    actionLabel: "Abrir no ChatGPT",
    actionUrl: "https://chatgpt.com/g/COLOQUE-O-LINK-DO-GPT-ESTRUTURAL-AQUI",
    locked: false,
    lockNote: undefined,
    order: 1,
  },
  {
    slug: "gpt-laudos-e-pericias",
    title: "Skill de Laudos & Perícias",
    description:
      "Estrutura laudos técnicos e periciais, organiza vistorias e formula respostas a quesitos em linguagem pericial adequada.",
    icon: "scale",
    actionLabel: "Abrir no ChatGPT",
    actionUrl: "https://chatgpt.com/g/COLOQUE-O-LINK-DO-GPT-LAUDOS-E-PERICIAS-AQUI",
    locked: false,
    lockNote: undefined,
    order: 2,
  },
  {
    slug: "gpt-planejamento-de-obras",
    title: "Skill de Planejamento de Obras",
    description:
      "Monta EAP, cronograma físico-financeiro e curva S a partir do escopo da obra, apontando o caminho crítico e os riscos de prazo.",
    icon: "calendar-clock",
    actionLabel: "Abrir no ChatGPT",
    actionUrl: "https://chatgpt.com/g/COLOQUE-O-LINK-DO-GPT-PLANEJAMENTO-DE-OBRAS-AQUI",
    locked: false,
    lockNote: undefined,
    order: 3,
  },
  {
    slug: "gpt-orcamento",
    title: "Skill de Orçamento",
    description:
      "Estrutura composições de custo unitário, calcula BDI e monta planilha orçamentária com referência a bases oficiais como SINAPI/SICRO.",
    icon: "coins",
    actionLabel: "Abrir no ChatGPT",
    actionUrl: "https://chatgpt.com/g/COLOQUE-O-LINK-DO-GPT-ORCAMENTO-AQUI",
    locked: false,
    lockNote: undefined,
    order: 4,
  },
  {
    slug: "gpt-memoriais",
    title: "Skill de Memoriais",
    description:
      "Organiza memorial descritivo de projeto e caderno de especificações técnicas por disciplina, a partir dos dados que você já tem.",
    icon: "file-text",
    actionLabel: "Abrir no ChatGPT",
    actionUrl: "https://chatgpt.com/g/COLOQUE-O-LINK-DO-GPT-MEMORIAIS-AQUI",
    locked: false,
    lockNote: undefined,
    order: 5,
  },
  {
    slug: "gpt-normas-nbr",
    title: "Skill de Normas (NBR)",
    description:
      "Identifica a NBR aplicável ao caso descrito e devolve um checklist de conformidade, sem nunca reproduzir texto literal da norma.",
    icon: "book-open",
    actionLabel: "Abrir no ChatGPT",
    actionUrl: "https://chatgpt.com/g/COLOQUE-O-LINK-DO-GPT-NORMAS-NBR-AQUI",
    locked: false,
    lockNote: undefined,
    order: 6,
  },
  {
    slug: "gpt-art-e-rrt",
    title: "Skill ART e RRT",
    description:
      "Orienta a emissão correta de ART/RRT, o preenchimento de cada campo e a organização de defesa técnica em caso de questionamento.",
    icon: "stamp",
    actionLabel: "Abrir no ChatGPT",
    actionUrl: "https://chatgpt.com/g/COLOQUE-O-LINK-DO-GPT-ART-E-RRT-AQUI",
    locked: false,
    lockNote: undefined,
    order: 7,
  },
  {
    slug: "gpt-diario-de-obra",
    title: "Skill de Diário de Obra",
    description:
      "Transforma anotações soltas de campo em Relatório Diário de Obra padronizado, com os campos fixos e controle de produtividade.",
    icon: "clipboard-list",
    actionLabel: "Abrir no ChatGPT",
    actionUrl: "https://chatgpt.com/g/COLOQUE-O-LINK-DO-GPT-DIARIO-DE-OBRA-AQUI",
    locked: false,
    lockNote: undefined,
    order: 8,
  },
  {
    slug: "gpt-patologias",
    title: "Skill de Patologias",
    description:
      "Diagnóstico de manifestações patológicas em edificações e plano de recuperação, com metodologia estruturada tipo anamnese.",
    icon: "stethoscope",
    actionLabel: "Abrir no ChatGPT",
    actionUrl: "https://chatgpt.com/g/COLOQUE-O-LINK-DO-GPT-PATOLOGIAS-AQUI",
    locked: false,
    lockNote: undefined,
    order: 9,
  },
  {
    slug: "gpt-comercial",
    title: "Skill Comercial",
    description:
      "Redige propostas técnico-comerciais, relatórios executivos e e-mails de fechamento a partir dos dados que você já definiu.",
    icon: "file-signature",
    actionLabel: "Abrir no ChatGPT",
    actionUrl: "https://chatgpt.com/g/COLOQUE-O-LINK-DO-GPT-COMERCIAL-AQUI",
    locked: false,
    lockNote: undefined,
    order: 10,
  },
];
