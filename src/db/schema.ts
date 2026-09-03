// ============================================================================
// Schema do banco (Drizzle ORM / PostgreSQL) — estrutura ORIGINAL própria,
// inspirada apenas no PADRÃO funcional documentado (nunca no texto/copy) do
// produto de referência.
// Ver: claude/referencia-estrutura-engen-ia.md, claude/padrao-prompt-engen-ia.md
// ============================================================================

import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

const id = () => text("id").primaryKey().$defaultFn(() => createId());

// --- Usuários / Autenticação (credenciais próprias, sessão JWT) -----------

export const users = pgTable("users", {
  id: id(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  image: text("image"),
  role: text("role").notNull().default("member"), // "member" | "admin"
  plan: text("plan").notNull().default("basico"), // "basico" | "especialista" (Pack Especialista)
  hasProjetosPacote: boolean("has_projetos_pacote").notNull().default(false), // compra separada, ainda liberada manualmente até o webhook da Payt existir (ver claude/webhook-payt-todo.md)
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// --- Skills ------------------------------------------------------------

export const skillCategories = pgTable("skill_categories", {
  id: id(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  order: integer("order").notNull().default(0),
});

export const skills = pgTable(
  "skills",
  {
    id: id(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    icon: text("icon").notNull().default("wrench"),
    shortDescription: text("short_description").notNull(),
    ruleFamily: text("rule_family").notNull(), // uma das 9 famílias mapeadas
    template: text("template").notNull().default("enxuto"), // "enxuto" | "estendido"
    body: text("body").notNull(), // texto 100% original
    advancedPrompts: jsonb("advanced_prompts").notNull().default([]), // [{title, prompt}]
    featured: boolean("featured").notNull().default(false),
    order: integer("order").notNull().default(0),
    categoryId: text("category_id")
      .notNull()
      .references(() => skillCategories.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [index("skills_category_idx").on(t.categoryId)]
);

// --- Biblioteca de Prompts ----------------------------------------------

export const promptCategories = pgTable("prompt_categories", {
  id: id(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  order: integer("order").notNull().default(0),
});

export const prompts = pgTable(
  "prompts",
  {
    id: id(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    tags: text("tags").array().notNull().default([]),
    body: text("body").notNull(), // texto único, nunca reaproveitado literalmente
    order: integer("order").notNull().default(0),
    categoryId: text("category_id")
      .notNull()
      .references(() => promptCategories.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [index("prompts_category_idx").on(t.categoryId)]
);

// --- Aulas (módulos/lições) ------------------------------------------------

export const modules = pgTable("modules", {
  id: id(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  order: integer("order").notNull().default(0),
});

export const lessons = pgTable(
  "lessons",
  {
    id: id(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    script: text("script").notNull(), // roteiro completo — vídeo plugado depois
    videoUrl: text("video_url"),
    order: integer("order").notNull().default(0),
    moduleId: text("module_id")
      .notNull()
      .references(() => modules.id),
  },
  (t) => [index("lessons_module_idx").on(t.moduleId)]
);

export const lessonProgress = pgTable(
  "lesson_progress",
  {
    id: id(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    lessonId: text("lesson_id")
      .notNull()
      .references(() => lessons.id),
    completedAt: timestamp("completed_at").notNull().defaultNow(),
  },
  (t) => [uniqueIndex("lesson_progress_user_lesson_idx").on(t.userId, t.lessonId)]
);

// --- Bônus -----------------------------------------------------------------

export const bonusItems = pgTable("bonus_items", {
  id: id(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull().default("gift"),
  actionLabel: text("action_label").notNull().default("Abrir"),
  actionUrl: text("action_url"),
  locked: boolean("locked").notNull().default(false),
  lockNote: text("lock_note"),
  order: integer("order").notNull().default(0),
});

// --- Comunidade --------------------------------------------------------

export const communityPosts = pgTable("community_posts", {
  id: id(),
  body: text("body").notNull(),
  tags: text("tags").array().notNull().default([]),
  pinned: boolean("pinned").notNull().default(false),
  authorId: text("author_id")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const communityComments = pgTable("community_comments", {
  id: id(),
  body: text("body").notNull(),
  postId: text("post_id")
    .notNull()
    .references(() => communityPosts.id),
  authorId: text("author_id")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const communityLikes = pgTable(
  "community_likes",
  {
    id: id(),
    postId: text("post_id")
      .notNull()
      .references(() => communityPosts.id),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [uniqueIndex("community_likes_post_user_idx").on(t.postId, t.userId)]
);

// --- Relations (para queries aninhadas via db.query.*) ----------------------

export const skillCategoriesRelations = relations(skillCategories, ({ many }) => ({
  skills: many(skills),
}));

export const skillsRelations = relations(skills, ({ one }) => ({
  category: one(skillCategories, {
    fields: [skills.categoryId],
    references: [skillCategories.id],
  }),
}));

export const promptCategoriesRelations = relations(promptCategories, ({ many }) => ({
  prompts: many(prompts),
}));

export const promptsRelations = relations(prompts, ({ one }) => ({
  category: one(promptCategories, {
    fields: [prompts.categoryId],
    references: [promptCategories.id],
  }),
}));

export const modulesRelations = relations(modules, ({ many }) => ({
  lessons: many(lessons),
}));

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  module: one(modules, { fields: [lessons.moduleId], references: [modules.id] }),
  progress: many(lessonProgress),
}));

export const usersRelations = relations(users, ({ many }) => ({
  lessonProgress: many(lessonProgress),
  posts: many(communityPosts),
  comments: many(communityComments),
  likes: many(communityLikes),
}));

export const communityPostsRelations = relations(communityPosts, ({ one, many }) => ({
  author: one(users, { fields: [communityPosts.authorId], references: [users.id] }),
  comments: many(communityComments),
  likes: many(communityLikes),
}));

export const communityCommentsRelations = relations(communityComments, ({ one }) => ({
  post: one(communityPosts, { fields: [communityComments.postId], references: [communityPosts.id] }),
  author: one(users, { fields: [communityComments.authorId], references: [users.id] }),
}));

export const communityLikesRelations = relations(communityLikes, ({ one }) => ({
  post: one(communityPosts, { fields: [communityLikes.postId], references: [communityPosts.id] }),
  user: one(users, { fields: [communityLikes.userId], references: [users.id] }),
}));
