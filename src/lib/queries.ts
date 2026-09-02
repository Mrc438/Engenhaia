import { asc, count, desc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  skillCategories,
  skills,
  promptCategories,
  prompts,
  modules,
  lessons,
  lessonProgress,
  bonusItems,
  communityPosts,
  communityComments,
  communityLikes,
  users,
} from "@/db/schema";

export async function getSkillCounts() {
  const [row] = await db.select({ value: count() }).from(skills);
  return row?.value ?? 0;
}

export async function getPromptCounts() {
  const [row] = await db.select({ value: count() }).from(prompts);
  return row?.value ?? 0;
}

export async function getSkillCategories() {
  return db.query.skillCategories.findMany({
    orderBy: asc(skillCategories.order),
    with: {
      skills: {
        orderBy: asc(skills.order),
        columns: {
          id: true,
          slug: true,
          name: true,
          icon: true,
          shortDescription: true,
          featured: true,
          order: true,
        },
      },
    },
  });
}

export async function getSkillBySlug(slug: string) {
  return db.query.skills.findFirst({
    where: eq(skills.slug, slug),
    with: { category: true },
  });
}

export async function getPromptCategoriesWithCounts() {
  const rows = await db
    .select({
      id: promptCategories.id,
      slug: promptCategories.slug,
      name: promptCategories.name,
      order: promptCategories.order,
      total: count(prompts.id),
    })
    .from(promptCategories)
    .leftJoin(prompts, eq(prompts.categoryId, promptCategories.id))
    .groupBy(promptCategories.id)
    .orderBy(asc(promptCategories.order));
  return rows;
}

export async function getPromptsByCategorySlug(categorySlug: string) {
  const category = await db.query.promptCategories.findFirst({
    where: eq(promptCategories.slug, categorySlug),
  });
  if (!category) return { category: null, items: [] };

  const items = await db.query.prompts.findMany({
    where: eq(prompts.categoryId, category.id),
    orderBy: asc(prompts.order),
    columns: { id: true, slug: true, title: true, tags: true, order: true },
  });
  return { category, items };
}

export async function getPromptBySlug(slug: string) {
  return db.query.prompts.findFirst({
    where: eq(prompts.slug, slug),
    with: { category: true },
  });
}

export async function getModulesWithLessons() {
  return db.query.modules.findMany({
    orderBy: asc(modules.order),
    with: {
      lessons: {
        orderBy: asc(lessons.order),
        columns: { id: true, slug: true, title: true, description: true, order: true, videoUrl: true },
      },
    },
  });
}

export async function getLessonBySlug(slug: string, userId: string) {
  const lesson = await db.query.lessons.findFirst({
    where: eq(lessons.slug, slug),
    with: { module: { with: { lessons: { orderBy: asc(lessons.order) } } } },
  });
  if (!lesson) return null;

  const progressRows = await db
    .select({ lessonId: lessonProgress.lessonId })
    .from(lessonProgress)
    .where(eq(lessonProgress.userId, userId));
  const completedIds = new Set(progressRows.map((p) => p.lessonId));

  return { lesson, completedIds };
}

export async function getBonusItems() {
  return db.query.bonusItems.findMany({ orderBy: asc(bonusItems.order) });
}

export async function getCommunityStats() {
  const [postCount] = await db.select({ value: count() }).from(communityPosts);
  const [memberCount] = await db.select({ value: count() }).from(users);
  return { posts: postCount?.value ?? 0, members: memberCount?.value ?? 0 };
}

export async function getCommunityPosts() {
  const rows = await db.query.communityPosts.findMany({
    orderBy: [desc(communityPosts.pinned), desc(communityPosts.createdAt)],
    with: {
      author: { columns: { id: true, name: true } },
      comments: {
        orderBy: (c, { asc }) => asc(c.createdAt),
        with: { author: { columns: { id: true, name: true } } },
      },
    },
  });

  const likeCounts = await db
    .select({ postId: communityLikes.postId, value: count() })
    .from(communityLikes)
    .groupBy(communityLikes.postId);
  const likeMap = new Map(likeCounts.map((l) => [l.postId, l.value]));

  return rows.map((r) => ({ ...r, likeCount: likeMap.get(r.id) ?? 0 }));
}

export async function hasUserLiked(postId: string, userId: string) {
  const row = await db.query.communityLikes.findFirst({
    where: (l, { and, eq }) => and(eq(l.postId, postId), eq(l.userId, userId)),
  });
  return Boolean(row);
}

export async function getUserRanking(userId: string) {
  const [postCount] = await db
    .select({ value: count() })
    .from(communityPosts)
    .where(eq(communityPosts.authorId, userId));
  const [commentCount] = await db
    .select({ value: count() })
    .from(communityComments)
    .where(eq(communityComments.authorId, userId));
  const [likeCount] = await db
    .select({ value: count() })
    .from(communityLikes)
    .where(eq(communityLikes.userId, userId));
  return {
    posts: postCount?.value ?? 0,
    comments: commentCount?.value ?? 0,
    likes: likeCount?.value ?? 0,
  };
}

export const sqlNow = sql`now()`;
