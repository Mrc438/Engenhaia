"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

function CategoryTag({ name, index }: { name: string; index: number }) {
  const c = categoryColor(index);
  return (
    <span
      style={{ background: c.bg, color: c.text, boxShadow: `inset 0 0 0 1px ${c.ring}` }}
      className="mb-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium"
    >
      {name}
    </span>
  );
}

const PAGE_SIZE = 9;

export function PromptsExplorer({
  categories,
  initialCategorySlug,
  initialItems,
}: {
  categories: Category[];
  initialCategorySlug: string;
  initialItems: PromptListItem[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategorySlug);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [items, setItems] = useState<PromptListItem[]>(initialItems);
  const [loadingItems, setLoadingItems] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchResults, setSearchResults] = useState<PromptListItem[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [detail, setDetail] = useState<PromptDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const requestId = useRef(0);

  // índice fixo por categoria (não muda com filtro/busca) — cada categoria
  // sempre cai na mesma cor da paleta, sem duas vizinhas repetirem.
  const categoryIndexBySlug = useMemo(
    () => Object.fromEntries(categories.map((c, i) => [c.slug, i])),
    [categories]
  );
  const categoryNameBySlug = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.slug, c.name])),
    [categories]
  );

  const isSearching = debouncedSearch.trim().length > 0;

  // debounce da busca — evita disparar uma request por tecla digitada
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    const term = debouncedSearch.trim();
    // string vazia: não há nada pra buscar. Não precisa limpar searchResults
    // aqui — enquanto isSearching for false a UI nem renderiza esse estado,
    // e ele é sobrescrito assim que uma busca de verdade roda de novo.
    if (!term) return;
    const myRequest = ++requestId.current;
    // Padrão de fetch-em-effect com guard de corrida (myRequest) — é o caso
    // que a própria doc do React aceita pra "Fetching data" em efeitos;
    // o lint novo marca qualquer setState direto no corpo do efeito, mas
    // aqui é necessário pra mostrar o loading assim que o termo muda.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchLoading(true);
    fetch(`/api/prompts?q=${encodeURIComponent(term)}`)
      .then((res) => res.json())
      .then((data) => {
        if (myRequest !== requestId.current) return; // resposta velha, ignora
        setSearchResults(data.items ?? []);
      })
      .finally(() => {
        if (myRequest === requestId.current) setSearchLoading(false);
      });
  }, [debouncedSearch]);

  const activeCategoryName = categoryNameBySlug[activeCategory];
  const activeCategoryTotal = categories.find((c) => c.slug === activeCategory)?.total ?? 0;
  const remaining = activeCategoryTotal - items.length;

  const switchCategory = (slug: string) => {
    if (slug === activeCategory) return;
    setActiveCategory(slug);
    setItems([]);
    setLoadingItems(true);
    const myRequest = ++requestId.current;
    fetch(`/api/prompts?category=${encodeURIComponent(slug)}&offset=0&limit=${PAGE_SIZE}`)
      .then((res) => res.json())
      .then((data) => {
        if (myRequest !== requestId.current) return;
        setItems(data.items ?? []);
      })
      .finally(() => {
        if (myRequest === requestId.current) setLoadingItems(false);
      });
  };

  const loadMore = () => {
    setLoadingMore(true);
    fetch(
      `/api/prompts?category=${encodeURIComponent(activeCategory)}&offset=${items.length}&limit=${PAGE_SIZE}`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems((prev) => [...prev, ...(data.items ?? [])]);
      })
      .finally(() => setLoadingMore(false));
  };

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
              onClick={() => switchCategory(c.slug)}
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
        searchLoading && searchResults.length === 0 ? (
          <div className="py-12 text-center text-sm text-muted">Buscando...</div>
        ) : (
          <PromptGrid items={searchResults} onOpen={openPrompt} categoryIndexBySlug={categoryIndexBySlug} />
        )
      ) : (
        <>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
            {activeCategoryName}{" "}
            <span className="text-muted/60">
              — {items.length} de {activeCategoryTotal}
            </span>
          </h2>
          {loadingItems ? (
            <div className="py-12 text-center text-sm text-muted">Carregando...</div>
          ) : (
            <PromptGrid
              items={items}
              onOpen={openPrompt}
              categorySlug={activeCategory}
              categoryName={activeCategoryName}
              categoryIndexBySlug={categoryIndexBySlug}
            />
          )}
          {remaining > 0 && !loadingItems && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="btn-secondary rounded-lg px-5 py-2 text-sm font-medium disabled:opacity-60"
              >
                {loadingMore ? "Carregando..." : `Ver mais (${remaining} restantes)`}
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
  categoryIndexBySlug,
}: {
  items: PromptListItem[];
  onOpen: (slug: string) => void;
  categorySlug?: string;
  categoryName?: string;
  categoryIndexBySlug: Record<string, number>;
}) {
  if (items.length === 0) {
    return <p className="py-12 text-center text-sm text-muted">Nenhum prompt encontrado.</p>;
  }
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => {
        const slug = p.categorySlug ?? categorySlug;
        const name = p.categoryName ?? categoryName;
        const index = slug ? categoryIndexBySlug[slug] ?? 0 : 0;
        return (
          <button
            key={p.slug}
            onClick={() => onOpen(p.slug)}
            className="card-surface flex flex-col items-start rounded-xl p-5 text-left hover:border-accent/50"
          >
            {slug && name && <CategoryTag name={name} index={index} />}
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
