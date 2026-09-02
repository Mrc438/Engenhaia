import { requireUser } from "@/lib/auth-helpers";
import { getPromptCategoriesWithCounts, getPromptCounts, getPromptsByCategorySlug } from "@/lib/queries";
import { PromptsExplorer } from "@/components/prompts-explorer";

const PAGE_SIZE = 9;

export default async function PromptsPage() {
  await requireUser();
  const [categories, total] = await Promise.all([
    getPromptCategoriesWithCounts(),
    getPromptCounts(),
  ]);

  // Só a primeira página da primeira categoria vem pronta do servidor (pra
  // já ter conteúdo na primeira renderização). O resto — trocar de
  // categoria, "ver mais", buscar — é buscado sob demanda pelo cliente.
  // Embutir os 1312 prompts inteiros nas props, como era antes, deixava a
  // página pesada demais pra hidratar.
  const firstCategorySlug = categories[0]?.slug ?? "";
  const { items: initialItems } = firstCategorySlug
    ? await getPromptsByCategorySlug(firstCategorySlug, { limit: PAGE_SIZE, offset: 0 })
    : { items: [] };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <span className="inline-flex items-center rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
        {total} prompts
      </span>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
        Biblioteca de prompts prontos.
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Copie, cole no seu assistente de IA e ajuste com os dados reais da sua obra. Todo prompt é
        um rascunho técnico — revise sempre com o engenheiro responsável (ART).
      </p>

      <div className="mt-8">
        <PromptsExplorer
          categories={categories}
          initialCategorySlug={firstCategorySlug}
          initialItems={initialItems}
        />
      </div>
    </div>
  );
}
