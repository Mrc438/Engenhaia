"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth-helpers";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function updateProfileAction(formData: FormData) {
  const user = await requireUser();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;

  await db.update(users).set({ name, updatedAt: new Date() }).where(eq(users.id, user.id));
  revalidatePath("/perfil");
  revalidatePath("/inicio");
}
