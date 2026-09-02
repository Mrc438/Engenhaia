// Skeleton de carregamento usado nos loading.tsx de cada rota do (app).
//
// Sem loading.tsx, o Next.js só troca a tela quando a página de destino
// termina de renderizar no servidor (com requireUser() lendo cookie de
// sessão, toda página aqui é dinâmica — sem cache, sem prefetch completo).
// Isso dá a sensação de "cliquei na aba e não aconteceu nada", levando o
// usuário a clicar de novo (o bug de "clique duplo/triplo"). Com este
// componente como fallback do Suspense automático do loading.tsx, o clique
// já troca a aba ativa na sidebar e mostra este esqueleto na hora — depois
// o conteúdo real entra por cima assim que a página termina de carregar.
export function PageLoading({
  maxWidth = "max-w-5xl",
  cards = 6,
  variant = "cards",
}: {
  maxWidth?: string;
  cards?: number;
  variant?: "cards" | "form";
}) {
  return (
    <div className={`mx-auto ${maxWidth} animate-pulse px-4 py-8 sm:px-6 lg:px-8`}>
      <div className="h-5 w-28 rounded-full bg-surface-2" />
      <div className="mt-4 h-9 w-2/3 rounded-lg bg-surface-2 sm:h-11 lg:h-12" />
      <div className="mt-3 h-4 w-1/2 rounded bg-surface-2" />

      {variant === "cards" ? (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: cards }).map((_, i) => (
            <div key={i} className="h-32 rounded-xl border border-border bg-surface-2/60" />
          ))}
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          <div className="h-40 rounded-xl border border-border bg-surface-2/60" />
          <div className="h-24 rounded-xl border border-border bg-surface-2/60" />
        </div>
      )}
    </div>
  );
}
