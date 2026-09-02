import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getPromptBySlug } from "@/lib/queries";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const prompt = await getPromptBySlug(slug);
  if (!prompt) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  return NextResponse.json({ prompt });
}
