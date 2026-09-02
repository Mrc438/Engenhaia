"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Icon } from "@/components/icon";
import { Modal } from "@/components/modal";
import { CopyButton } from "@/components/copy-button";
import { siteConfig } from "@/lib/site-config";
import { categoryColor } from "@/lib/category-colors";
import { skillEmoji } from "@/lib/skill-emoji";

function CategoryTag({ index, name }: { index: number; name: string }) {
  const c = categoryColor(index);
  return (
    <span
      style={{ background: c.bg, color: c.text, boxShadow: `inset 0 0 0 1px ${c.ring}` }}
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
    >
      {name}
    </span>
  );
}

type SkillListItem = {
  id: string;
  slug: string;
  name: string;
  icon: string;
  shortDescription: string;
  featured: boolean;
  order: number;
  categorySlug?: string;
};

type Category = {
  id: string;
  slug: string;
  name: string;
  order: number;
  skills: SkillListItem[];
};

type AdvancedPrompt = { title: string; prompt: string };

type SkillDetail = {
  slug: string;
  name: string;
  icon: string;
  shortDescription: string;
  body: string;
  advancedPrompts: AdvancedPrompt[];
  category: { name: string };
};

export function SkillsExplorer({
  categories,
  hasPackEspecialista,
}: {
  categories: Category[];
  hasPackEspecialista: boolean;
}) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [detail, setDetail] = useState<SkillDetail | null>(null);
  const [tab, setTab] = useState<"skill" | "advanced">("skill");
  const [loading, setLoading] = useState(false);
  const [locked, setLocked] = useState(false);

  // índice fixo por categoria (ordem em que o servidor mandou) — usado só
  // pra escolher a cor da pill, sem depender de hash de string.
  const categoryIndexBySlug = useMemo(
    () => Object.fromEntries(categories.map((c, i) => [c.slug, i])),
    [categories]
  );

  // slugs do Pack Especialista — só entram aqui de fato bloqueados quando o
  // usuário não tem o plano "especialista" (checado de novo no servidor).
  const lockedSlugs = useMemo(() => {
    if (hasPackEspecialista) return new Set<string>();
    const pack = categories.find((c) => c.slug === "pack-especialista");
    return new Set(pack?.skills.map((s) => s.slug) ?? []);
  }, [categories, hasPackEspecialista]);

  const featured = useMemo(
    () =>
      categories.flatMap((c) =>
        c.skills.filter((s) => s.featured).map((s) => ({ ...s, categorySlug: c.slug }))
      ),
    [categories]
  );

  const visibleCategories = useMemo(() => {
    const term = search.trim().toLowerCase();
    return categories
      .filter((c) => activeCategory === "all" || c.slug === activeCategory)
      .map((c) => ({
        ...c,
        skills: c.skills.filter(
          (s) =>
            !s.featured &&
            (term === "" ||
              s.name.toLowerCase().includes(term) ||
              s.shortDescription.toLowerCase().includes(term))
        ),
      }))
      .filter((c) => c.skills.length > 0);
  }, [categories, activeCategory, search]);

  const openSkill = async (slug: string) => {
    if (lockedSlugs.has(slug)) return; // botão já não é clicável — só uma trava extra
    setOpenSlug(slug);
    setLoading(true);
    setLocked(false);
    setTab("skill");
    try {
      const res = await fetch(`/api/skills/${slug}`);
      if (res.status === 403) {
        setLocked(true);
        setDetail(null);
        return;
      }
      const data = await res.json();
      setDetail(data.skill ?? null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="relative mb-5">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar skill (ex.: estrutural, orçamento, RDO...)"
          className="w-full rounded-lg border border-border bg-surface-2 py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-accent"
        />
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
        <FilterChip active={activeCategory === "all"} onClick={() => setActiveCategory("all")}>
          Todas
        </FilterChip>
        {categories.map((c) => (
          <FilterChip
            key={c.slug}
            active={activeCategory === c.slug}
            onClick={() => setActiveCategory(c.slug)}
          >
            {c.name}
          </FilterChip>
        ))}
      </div>

      {activeCategory === "all" && search.trim() === "" && featured.length > 0 && (
        <div className="mb-8 space-y-3">
          {featured.map((s) => {
            const isLocked = lockedSlugs.has(s.slug);
            return (
              <button
                key={s.slug}
                onClick={() => openSkill(s.slug)}
                disabled={isLocked}
                className={`card-glow relative w-full rounded-2xl p-5 text-left transition-transform ${
                  isLocked ? "opacity-70" : "hover:-translate-y-0.5"
                }`}
              >
                <span className="badge-solid-accent inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide">
                  {isLocked ? <Icon name="lock" className="h-3 w-3" /> : "🔥"} Skill em destaque
                </span>
                <span className="absolute right-5 top-5 text-2xl drop-shadow-[0_0_10px_rgba(242,118,46,0.5)]">
                  {isLocked ? "🔒" : skillEmoji(s.icon)}
                </span>
                <h3 className="mt-4 pr-8 text-lg font-bold">{s.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.shortDescription}</p>
              </button>
            );
          })}
        </div>
      )}

      <div className="space-y-10">
        {visibleCategories.map((c) => {
          const isPack = c.slug === "pack-especialista" && !hasPackEspecialista;
          return (
            <section key={c.slug}>
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted">
                {c.name} <span className="text-muted/60">— {c.skills.length} skill(s)</span>
                {isPack && (
                  <span className="badge-outline inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] normal-case tracking-normal">
                    <Icon name="lock" className="h-3 w-3" />
                    Bloqueado
                  </span>
                )}
              </h2>
              {isPack && (
                <div className="card-surface-static mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border-dashed p-4">
                  <p className="text-sm text-muted">
                    Essas {c.skills.length} skills fazem parte do <strong className="text-foreground">Pack Especialista</strong>,
                    um upsell separado do seu acesso atual.
                  </p>
                  <a
                    href={`mailto:${siteConfig.supportEmail}?subject=${encodeURIComponent("Quero liberar o Pack Especialista")}`}
                    className="btn-secondary inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold"
                  >
                    Quero desbloquear
                  </a>
                </div>
              )}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {c.skills.map((s) =>
                  isPack ? (
                    <div
                      key={s.slug}
                      className="card-surface-static relative flex flex-col items-start rounded-2xl border-dashed p-5 text-left opacity-70"
                    >
                      <span className="badge-outline inline-flex items-center rounded-full px-3 py-1 text-xs font-medium">
                        <Icon name="lock" className="mr-1 h-3 w-3" />
                        {c.name}
                      </span>
                      <Icon name="lock" className="absolute right-5 top-5 h-5 w-5 text-muted" />
                      <h3 className="mt-4 pr-6 font-semibold text-foreground/70">{s.name}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.shortDescription}</p>
                    </div>
                  ) : (
                    <button
                      key={s.slug}
                      onClick={() => openSkill(s.slug)}
                      className="card-surface relative flex flex-col items-start rounded-2xl p-5 text-left hover:border-accent/50"
                    >
                      <CategoryTag index={categoryIndexBySlug[c.slug] ?? 0} name={c.name} />
                      <span className="absolute right-5 top-5 text-xl">{skillEmoji(s.icon)}</span>
                      <h3 className="mt-4 pr-6 font-semibold">{s.name}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.shortDescription}</p>
                    </button>
                  )
                )}
              </div>
            </section>
          );
        })}
        {visibleCategories.length === 0 && (
          <p className="py-12 text-center text-sm text-muted">Nenhuma skill encontrada.</p>
        )}
      </div>

      {openSlug && (
        <Modal onClose={() => setOpenSlug(null)}>
          {locked ? (
            <div className="py-6 text-center">
              <Icon name="lock" className="mx-auto mb-3 h-8 w-8 text-muted" />
              <h3 className="font-semibold">Essa skill é do Pack Especialista</h3>
              <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted">
                Ela não faz parte do seu acesso atual. Fale com a gente pra liberar o pack
                completo.
              </p>
              <a
                href={`mailto:${siteConfig.supportEmail}?subject=${encodeURIComponent("Quero liberar o Pack Especialista")}`}
                className="btn-primary mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold"
              >
                Quero desbloquear
              </a>
            </div>
          ) : loading || !detail ? (
            <div className="py-10 text-center text-sm text-muted">Carregando...</div>
          ) : (
            <div>
              <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-accent">
                <span className="text-sm">{skillEmoji(detail.icon)}</span>
                {detail.category?.name}
              </div>
              <h2 className="text-lg font-bold">{detail.name}</h2>
              <p className="mt-1 text-sm text-muted">{detail.shortDescription}</p>

              <div className="mt-4 flex gap-1 border-b border-border">
                <TabButton active={tab === "skill"} onClick={() => setTab("skill")}>
                  Prompt da skill
                </TabButton>
                <TabButton active={tab === "advanced"} onClick={() => setTab("advanced")}>
                  Prompts avançados ({detail.advancedPrompts?.length ?? 0})
                </TabButton>
              </div>

              {tab === "skill" ? (
                <div className="mt-4">
                  <div className="max-h-80 overflow-y-auto rounded-lg border border-border bg-surface-2 p-4 text-sm scrollbar-thin">
                    <p className="prose-body whitespace-pre-wrap font-mono text-xs leading-relaxed">
                      {detail.body}
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <CopyButton text={detail.body} label="Copiar prompt" />
                    <a
                      href={`data:text/markdown;charset=utf-8,${encodeURIComponent(detail.body)}`}
                      download={`${detail.slug}.md`}
                      className="btn-secondary inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium"
                    >
                      Baixar .md
                    </a>
                  </div>
                </div>
              ) : (
                <div className="mt-4 max-h-96 space-y-3 overflow-y-auto pr-1 scrollbar-thin">
                  {(detail.advancedPrompts ?? []).map((ap, i) => (
                    <div key={i} className="rounded-lg border border-border bg-surface-2 p-4">
                      <p className="mb-1.5 text-sm font-semibold">{ap.title}</p>
                      <p className="text-sm text-muted">{ap.prompt}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
        active
          ? "btn-primary border-transparent"
          : "border-border bg-surface text-foreground/80 hover:border-border-strong hover:bg-surface-2"
      }`}
    >
      {children}
    </button>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
        active ? "border-accent text-accent" : "border-transparent text-muted hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
