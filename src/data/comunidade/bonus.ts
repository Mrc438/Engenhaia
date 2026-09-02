// Seed de itens de Bônus da Comunidade — conteúdo 100% original.

import { BonusItemSeed } from "../types";

export const bonusItemsSeed: BonusItemSeed[] = [
  {
    slug: "kit-planilhas-de-obra",
    title: "Kit de Planilhas de Obra",
    description:
      "Três planilhas prontas pra usar no dia a dia: orçamento simples por etapa, controle de RDO semanal e cronograma físico-financeiro básico. É só duplicar e adaptar pra sua obra.",
    icon: "table",
    actionLabel: "Baixar kit",
    actionUrl: undefined,
    locked: false,
    lockNote: undefined,
    order: 1,
  },
  {
    slug: "checklist-de-entrega-de-obra",
    title: "Checklist de Entrega de Obra",
    description:
      "Guia em PDF com os pontos mais esquecidos na vistoria final — instalações, acabamentos, documentação e pendências — organizado por ambiente pra você não deixar nada passar.",
    icon: "clipboard-check",
    actionLabel: "Ver checklist",
    actionUrl: undefined,
    locked: false,
    lockNote: undefined,
    order: 2,
  },
  {
    slug: "banco-de-modelos-memorial-art",
    title: "Banco de Modelos de Memorial e ART",
    description:
      "Modelos de memorial descritivo e de preenchimento de ART/RRT já estruturados, prontos pra você adaptar aos dados do seu projeto sem começar do zero a cada obra.",
    icon: "file-text",
    actionLabel: "Ver modelos",
    actionUrl: undefined,
    locked: false,
    lockNote: undefined,
    order: 3,
  },
  {
    slug: "glossario-de-normas-tecnicas",
    title: "Glossário de Normas Técnicas Essenciais",
    description:
      "Consulta rápida com os principais termos e siglas de NBRs usadas no dia a dia de projeto e obra, explicados em linguagem direta pra você não perder tempo procurando em texto de norma.",
    icon: "book-open",
    actionLabel: "Abrir glossário",
    actionUrl: undefined,
    locked: false,
    lockNote: undefined,
    order: 4,
  },
  {
    slug: "banco-de-composicoes-de-orcamento",
    title: "Banco de Composições de Orçamento",
    description:
      "Composições de custo unitário organizadas por tipo de serviço, prontas pra servir de referência na hora de montar seu próprio orçamento com mais agilidade.",
    icon: "calculator",
    actionLabel: "Solicitar acesso",
    actionUrl: undefined,
    locked: true,
    lockNote:
      "Liberado só pra quem já comprou o Módulo Extra de Orçamento Avançado. Se você já é aluno desse módulo, entra em contato pelo suporte pra desbloquear.",
    order: 5,
  },
  {
    slug: "trilha-de-atualizacao-de-normas",
    title: "Trilha de Atualização de Normas",
    description:
      "Uma sequência curta de leituras e resumos sobre mudanças recentes em normas técnicas relevantes pra quem atua com projeto e obra, atualizada periodicamente.",
    icon: "refresh-cw",
    actionLabel: "Acompanhar trilha",
    actionUrl: undefined,
    locked: false,
    lockNote: undefined,
    order: 6,
  },
];
