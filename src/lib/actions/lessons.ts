"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth-helpers";
import { db } from "@/db";
import { lessonProgress } from "@/db/schema";

export async function markLessonCompleteAction(lessonId: string, lessonSlug: string) {
  const user = await requireUser();
  await db
    .insert(lessonProgress)
    .values({ userId: user.id, lessonId })
    .onConflictDoNothing({ target: [lessonProgress.userId, lessonProgress.lessonId] });
  revalidatePath(`/aulas/${lessonSlug}`);
  revalidatePath("/aulas");
}
