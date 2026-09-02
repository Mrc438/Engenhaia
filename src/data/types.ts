// Tipos compartilhados dos dados de seed (conteúdo 100% original).

export type RuleFamily =
  | "calculo-nbr"
  | "registro-administrativa"
  | "preco-custo"
  | "documento-fornecido"
  | "laudo-pericia"
  | "planejamento-estimativa"
  | "demolicao-seguranca"
  | "comercial-redacional"
  | "consultivo-imparcial";

export interface AdvancedPrompt {
  title: string;
  prompt: string;
}

export interface SkillSeed {
  slug: string;
  name: string;
  icon: string; // nome de ícone lucide-react, kebab-case
  shortDescription: string;
  ruleFamily: RuleFamily;
  template: "enxuto" | "estendido";
  body: string; // markdown
  advancedPrompts: AdvancedPrompt[];
  featured?: boolean;
  order: number;
}

export interface PromptSeed {
  slug: string;
  title: string;
  tags: string[];
  body: string;
  order: number;
}

export interface SkillCategorySeed {
  slug: string;
  name: string;
  order: number;
  skills: SkillSeed[];
}

export interface PromptCategorySeed {
  slug: string;
  name: string;
  order: number;
  prompts: PromptSeed[];
}

export interface LessonSeed {
  slug: string;
  title: string;
  description: string;
  script: string;
  order: number;
}

export interface ModuleSeed {
  slug: string;
  title: string;
  summary: string;
  order: number;
  lessons: LessonSeed[];
}

export interface BonusItemSeed {
  slug: string;
  title: string;
  description: string;
  icon: string;
  actionLabel: string;
  actionUrl?: string;
  locked?: boolean;
  lockNote?: string;
  order: number;
}

export interface CommunityPostSeed {
  authorName: string;
  body: string;
  tags: string[];
  pinned?: boolean;
  daysAgo: number; // usado no seed pra gerar createdAt realista
  likeCount: number;
  comments?: { authorName: string; body: string }[];
}
