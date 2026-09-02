import { requireUser } from "@/lib/auth-helpers";
import { getSkillCategories, getSkillCounts } from "@/lib/queries";
import { SkillsExplorer } from "@/components/skills-explorer";

export default async function SkillsPage() {
  await requireUser();
  const [categories, total] = await Promise.all([getSkillCategories(), getSkillCounts()]);
  const packEspecialista = categories.find((c) => c.slug === "pack-especialista");
  const packCount = packEspecialista?.skills.length ?? 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <span className="badge-accent inline-flex items-center rounded-full px-3 py-1 text-xs font-medium">
        {total} skills liberadas · {packCount} no Pack Especialista
      </span>
      <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
        Cada etapa da obra com a skill certa no seu bolso.
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Skills prontas cobrindo cálculo estrutural, documentação técnica, gestão de obra e
        comercial. Copie o prompt, cole no seu assistente de IA de confiança e comece a trabalhar.
      </p>

      <div className="mt-8">
        <SkillsExplorer categories={categories} />
      </div>
    </div>
  );
}
