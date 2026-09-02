import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getSkillBySlug } from "@/lib/queries";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const skill = await getSkillBySlug(slug);
  if (!skill) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  // trava real no servidor — o Pack Especialista só sai daqui pra quem tem
  // o plano "especialista", independente do que a UI já esconde/desabilita.
  if (skill.category.slug === "pack-especialista" && session.user.plan !== "especialista") {
    return NextResponse.json({ error: "locked" }, { status: 403 });
  }

  return NextResponse.json({ skill });
}
