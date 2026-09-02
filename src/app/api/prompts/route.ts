import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getPromptsByCategorySlug, searchPrompts } from "@/lib/queries";

// Busca prompts sob demanda (por categoria, paginado, ou por termo de
// busca cruzando categorias) — a página de Prompts não embute mais os 1312
// itens de uma vez no HTML/props iniciais, só pede o que a UI precisa a
// cada momento.
export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim();
  const category = searchParams.get("category");
  const offset = Number(searchParams.get("offset") ?? 0);
  const limit = Number(searchParams.get("limit") ?? 9);

  if (q) {
    const items = await searchPrompts(q, 60);
    return NextResponse.json({ items });
  }

  if (!category) {
    return NextResponse.json({ error: "missing_category" }, { status: 400 });
  }

  const { items } = await getPromptsByCategorySlug(category, { limit, offset });
  return NextResponse.json({ items });
}
