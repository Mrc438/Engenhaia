"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth-helpers";
import { db } from "@/db";
import { communityPosts, communityLikes } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function createPostAction(formData: FormData) {
  const user = await requireUser();
  const body = String(formData.get("body") ?? "").trim();
  const tagsRaw = String(formData.get("tags") ?? "");
  if (!body) return;

  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim().toLowerCase().replace(/\s+/g, "-"))
    .filter(Boolean)
    .slice(0, 5);

  await db.insert(communityPosts).values({ body, tags, authorId: user.id });
  revalidatePath("/comunidade");
}

export async function toggleLikeAction(postId: string) {
  const user = await requireUser();
  const existing = await db.query.communityLikes.findFirst({
    where: and(eq(communityLikes.postId, postId), eq(communityLikes.userId, user.id)),
  });

  if (existing) {
    await db
      .delete(communityLikes)
      .where(and(eq(communityLikes.postId, postId), eq(communityLikes.userId, user.id)));
  } else {
    await db.insert(communityLikes).values({ postId, userId: user.id });
  }
  revalidatePath("/comunidade");
}
