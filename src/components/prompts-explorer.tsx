"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Modal } from "@/components/modal";
import { CopyButton } from "@/components/copy-button";
import { categoryColor } from "@/lib/category-colors";

type PromptListItem = {
  id: string;
  slug: string;
  title: string;
  tags: string[];
  order: number;
  categorySlug?: string;
  categoryName?: string;
};

function CategoryTag({ slug, name }: { slug: string; name: string }) {
  const c = categoryColor(slug);
  return (
    <span
      style={{ background: c.bg, color: c.text, boxShadow: `inset 0 0 0 1px ${c.ring}` }}
      className="mb-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium"
    >
      {name}
    </span>
  );
}

type Category = {
  id: string;
  slug: string;
  name: string;
  order: number;
  total: number;
};

type PromptDetail = {
  slug: string;
  title: string;
  tags: string[];
  body: string;
  category: { name: string };
};

const PAGE_SIZE = 9;

export function PromptsExplorer({
  categories,
  promptsByCategory,
}: {
  categories: Category[];
  promptsByCategory: Record<string, PromptListItem[]>;
}) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.slug ?? "");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [detail, setDetail] = useState<PromptDetail | null>(null);
  const [loading, setLoading] = useState(false);

  const term = search.trim().toLowerCase();
  const isSearching = term.length > 0;

  const categoryNameBySlug = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.slug, c.name])),
    [categories]
  );

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    return Object.entries(promptsByCategory)
      .flatMap(([slug, items]) =>
        items.map((p) => ({ ...p, categorySlug: slug, categoryName: categoryNameBySlug[slug] }))
      )
      .filter(
        (p) =>
          p.title.toLowerCase().includes(term) || p.tags.some((t) => t.toLowerCase().includes(term))
      )
      .slice(0, 60);
  }, [isSearching, term, promptsByCategory, categoryNameBySlug]);

  const activeCategoryName = categoryNameBySlug[activeCategory];
  const categoryItems = promptsByCategory[activeCategory] ?? [];
  const shown = categoryItems.slice(0, visibleCount);
  const remaining = categoryItems.length - shown.length;

  const openPrompt = async (slug: string) => {
    setOpenSlug(slug);
    setLoading(true);
    try {
      const res = await fetch(`/api/prompts/${slug}`);
      const data = await res.json();
      setDetail(data.prompt ?? null);
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
          placeholder="Buscar prompt (ex.: laje, RDO, BDI, laudo...)"
          className="w-full rounded-lg border border-border bg-surface-2 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-accent"
        />
      </div>

      {!isSearching && (
        <div className="mb-6 flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => {
                setActiveCategory(c.slug);
                setVisibleCount(PAGE_SIZE);
              }}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                activeCategory === c.slug
                  ? "btn-primary border-transparent"
                  : "border-border bg-surface text-foreground/80 hover:border-border-strong hover:bg-surface-2"
              }`}
            >
              {c.name} <span className="opacity-70">({c.total})</span>
            </button>
          ))}
        </div>
      )}

      {isSearching ? (
        <PromptGrid items={searchResults} onOpen={openPrompt} />
      ) : (
        <>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
            {categories.find((c) => c.slug === activeCategory)?.name}{" "}
            <span className="text-muted/60">
              — {shown.length} de {categoryItems.length}
            </span>
          </h2>
          <PromptGrid
            items={shown}
            onOpen={openPrompt}
            categorySlug={activeCategory}
            categoryName={activeCategoryName}
          />
          {remaining > 0 && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
                className="btn-secondary rounded-lg px-5 py-2 text-sm font-medium"
              >
                Ver mais ({remaining} restantes)
              </button>
            </div>
          )}
        </>
      )}

      {openSlug && (
        <Modal onClose={() => setOpenSlug(null)}>
          {loading || !detail ? (
            <div className="py-10 text-center text-sm text-muted">Carregando...</div>
          ) : (
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                {detail.category?.name}
              </span>
              <h2 className="mt-1 text-lg font-bold">{detail.title}</h2>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {detail.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted"
                  >
                    #{t}
                  </span>
                ))}
              </div>
              <div className="mt-4 rounded-lg border border-border bg-surface-2 p-4 text-sm">
                <p className="prose-body font-mono text-xs leading-relaxed">{detail.body}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <CopyButton text={detail.body} />
                <p className="text-xs text-muted">
                  Rascunho técnico — revisar sempre com o engenheiro responsável (ART).
                </p>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

function PromptGrid({
  items,
  onOpen,
  categorySlug,
  categoryName,
}: {
  items: PromptListItem[];
  onOpen: (slug: string) => void;
  categorySlug?: string;
  categoryName?: string;
}) {
  if (items.length === 0) {
    return <p className="py-12 text-center text-sm text-muted">Nenhum prompt encontrado.</p>;
  }
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => {
        const slug = p.categorySlug ?? categorySlug;
        const name = p.categoryName ?? categoryName;
        return (
        <button
          key={p.slug}
          onClick={() => onOpen(p.slug)}
          className="card-surface flex flex-col items-start rounded-xl p-5 text-left hover:border-accent/50"
        >
          {slug && name && <CategoryTag slug={slug} name={name} />}
          <h3 className="font-semibold leading-snug">{p.title}</h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {p.tags.slice(0, 3).map((t) => (
              <span key={t} className="rounded-full bg-surface-2 px-2 py-0.5 text-[11px] text-muted">
                #{t}
              </span>
            ))}
          </div>
        </button>
        );
      })}
    </div>
  );
}
