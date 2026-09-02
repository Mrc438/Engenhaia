import { requireUser } from "@/lib/auth-helpers";
import { getCommunityPosts, getCommunityStats, getUserRanking } from "@/lib/queries";
import { db } from "@/db";
import { communityLikes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createPostAction } from "@/lib/actions/community";
import { LikeButton } from "@/components/like-button";
import { Icon } from "@/components/icon";

const RULES = [
  "Respeito sempre. Discussão técnica é bem-vinda, ataque pessoal não.",
  "Não compartilhe dados sensíveis de clientes, contratos ou laudos sem autorização.",
  "Antes de perguntar, busca rápido se já existe post sobre o assunto.",
  "Use tags pra ajudar quem chega depois (ex.: estrutural, rdo, orçamento).",
  "Foto de obra é ouro — poste sempre que puder, com contexto.",
  "Mostre o que funcionou, não só venda.",
];

const SUGGESTED_TAGS = [
  "apresentacao",
  "estrutural",
  "orcamento",
  "rdo",
  "planejamento",
  "patologia",
  "licitacao",
  "memorial",
  "art-rrt",
  "duvida",
  "dica",
  "case",
];

function timeAgo(date: Date) {
  const diffMs = Date.now() - date.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) return "hoje";
  if (days === 1) return "1 dia";
  if (days < 30) return `${days} dias`;
  const months = Math.floor(days / 30);
  return `${months} ${months === 1 ? "mês" : "meses"}`;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default async function ComunidadePage() {
  const user = await requireUser();
  const [posts, stats, ranking] = await Promise.all([
    getCommunityPosts(),
    getCommunityStats(),
    getUserRanking(user.id),
  ]);

  const myLikes = await db
    .select({ postId: communityLikes.postId })
    .from(communityLikes)
    .where(eq(communityLikes.userId, user.id));
  const likedSet = new Set(myLikes.map((l) => l.postId));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <span className="badge-accent inline-flex items-center rounded-full px-3 py-1 text-xs font-medium">
        Espaço da comunidade
      </span>
      <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
        Onde a <span className="text-accent">obra</span> conversa.
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Poste caso, poste erro, poste foto suja de barro. Quem ensina mais sobe no ranking — e
        ajuda todo mundo a virar um engenheiro melhor.
      </p>
      <div className="mt-4 flex gap-6 text-sm">
        <span>
          <strong>{stats.posts}</strong> <span className="text-muted">publicações</span>
        </span>
        <span>
          <strong>{stats.members}</strong> <span className="text-muted">engenheiros ativos</span>
        </span>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
        <div>
          <form action={createPostAction} className="card-surface-static rounded-xl p-4">
            <div className="flex gap-3">
              <div className="icon-chip-solid flex h-9 w-9 shrink-0 rounded-full text-xs font-semibold">
                {initials(user.name ?? "Você")}
              </div>
              <textarea
                name="body"
                required
                rows={3}
                placeholder="O que rolou hoje na obra? Conta um caso, pede uma opinião, mostra uma foto..."
                className="w-full resize-none rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-accent"
              />
            </div>
            <div className="mt-3 flex items-center gap-3 pl-12">
              <input
                name="tags"
                placeholder="tags separadas por vírgula — estrutural, rdo, dica"
                className="w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2 text-sm outline-none transition-colors focus:border-accent"
              />
              <button
                type="submit"
                className="btn-primary inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold"
              >
                <Icon name="send" className="h-4 w-4" />
                Publicar
              </button>
            </div>
          </form>

          <div className="mt-6 space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className={`rounded-xl p-5 transition-all ${
                  post.pinned
                    ? "border border-accent/50 bg-accent/5 shadow-[var(--shadow-sm)]"
                    : "card-surface hover:-translate-y-0.5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-2 text-xs font-semibold">
                    {initials(post.author.name)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-semibold">{post.author.name}</p>
                      {post.pinned && (
                        <span className="badge-accent inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase">
                          <Icon name="pin" className="h-3 w-3" />
                          Em destaque
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted">{timeAgo(post.createdAt)}</p>
                  </div>
                </div>

                <p className="prose-body mt-3 whitespace-pre-wrap text-sm leading-relaxed">
                  {post.body}
                </p>

                {post.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {post.tags.map((t) => (
                      <span key={t} className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-4 flex items-center gap-5 border-t border-border pt-3">
                  <LikeButton
                    postId={post.id}
                    initialLiked={likedSet.has(post.id)}
                    initialCount={post.likeCount}
                  />
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                    <Icon name="message-circle" className="h-4 w-4" />
                    {post.comments.length}
                  </span>
                </div>

                {post.comments.length > 0 && (
                  <div className="mt-3 space-y-2 border-t border-border pt-3">
                    {post.comments.map((c) => (
                      <p key={c.id} className="text-sm">
                        <span className="font-semibold">{c.author.name}:</span>{" "}
                        <span className="text-muted">{c.body}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-5">
          <div className="card-surface-static rounded-xl p-5">
            <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <span className="icon-chip h-6 w-6 rounded-md"><Icon name="trophy" className="h-3.5 w-3.5" /></span>
              Ranking
            </h2>
            <p className="text-sm text-muted">
              post ×{ranking.posts} · comentário ×{ranking.comments} · curtida ×{ranking.likes}
            </p>
          </div>

          <div className="card-surface-static rounded-xl p-5">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <span className="icon-chip h-6 w-6 rounded-md"><Icon name="book-marked" className="h-3.5 w-3.5" /></span>
              Regras
            </h2>
            <ol className="space-y-2.5">
              {RULES.map((rule, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted">
                  <span className="font-semibold text-accent">{String(i + 1).padStart(2, "0")}</span>
                  {rule}
                </li>
              ))}
            </ol>
          </div>

          <div className="card-surface-static rounded-xl p-5">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <span className="icon-chip h-6 w-6 rounded-md"><Icon name="hash" className="h-3.5 w-3.5" /></span>
              Tags sugeridas
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED_TAGS.map((t) => (
                <span key={t} className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
