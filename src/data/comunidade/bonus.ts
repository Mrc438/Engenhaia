// Seed de itens de Bônus — 10 skills do pacote adaptadas pra rodar como GPT
// dentro do ChatGPT (bônus cross-plataforma: quem só usa ChatGPT no dia a
// dia também aproveita). Conteúdo (nome/descrição) reaproveita as mesmas 60
// skills originais do produto — ver src/data/skills/. Os actionUrl apontam
// para os GPTs publicados de cada skill.

import { BonusItemSeed } from "../types";

export const bonusItemsSeed: BonusItemSeed[] = [
  {
    slug: "gpt-estrutural",
    title: "Skill Estrutural",
    description:
      "Pré-dimensionamento e memória de cálculo de lajes, vigas, pilares e fundações rasas, com verificações e checklist técnico.",
    icon: "layers",
    actionLabel: "Abrir no ChatGPT",
    actionUrl: "https://chatgpt.com/g/g-6a2a03da91908191b9f7076ecfa4a3ef-skill-estrutural",
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
    actionUrl: "https://chatgpt.com/g/g-6a2a0475dac48191a8df52479396c288-skill-de-laudos-pericias",
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
    actionUrl: "https://chatgpt.com/g/g-6a2a051b992481918617645307519f54-skill-de-planejamento-de-obras",
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
    actionUrl: "https://chatgpt.com/g/g-6a2a0605be40819182600b7172079f40-skill-de-orcamento",
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
    actionUrl: "https://chatgpt.com/g/g-6a2a069fa27c8191b09a1199a8da5fe4-skill-de-memoriais",
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
    actionUrl: "https://chatgpt.com/g/g-6a2a0742d9e481918b77a68956e6f363-skill-de-normas-nbr",
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
    actionUrl: "https://chatgpt.com/g/g-6a2a08349a6481918c724da533c2fe66-skill-art-e-rrt",
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
    actionUrl: "https://chatgpt.com/g/g-6a2a093f940081918b3c9e4390515153-skill-de-diario-de-obra",
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
    actionUrl: "https://chatgpt.com/g/g-6a2a09e9032481918331640084dcdca0-skill-de-patologias",
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
    actionUrl: "https://chatgpt.com/g/g-6a2a0b2ca0e88191a3fa8dd919b69a54-skill-comercial",
    locked: false,
    lockNote: undefined,
    order: 10,
  },
];
