# [SEU NOME AQUI] — plataforma web

App completo em Next.js (App Router) para venda do produto: skills prontas, biblioteca de prompts, aulas em vídeo, bônus e comunidade com ranking. Login com e‑mail/senha, tudo protegido atrás de autenticação.

**Antes de lançar, troque o placeholder:** o nome da marca está como `[SEU NOME AQUI]` em `src/lib/site-config.ts`. É só editar esse arquivo (nome, slogan, preço, e‑mail de suporte) — o resto do app já usa essas variáveis em todo lugar.

## Stack

- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
- Tailwind CSS v4
- Drizzle ORM + PostgreSQL
- NextAuth v5 (login por e‑mail/senha, sessão em JWT — não precisa de tabela de sessão)
- Zero dependências de binário nativo ou CDN restrita (por isso não usa Prisma nem Google Fonts) — builda em qualquer host sem downloads extras

## O que já está pronto

- **Skills**: 61 itens (60 + 1 "skill mestre" em destaque) organizados em 5 categorias, cada uma com prompt principal e, na skill em destaque, prompts avançados extras.
- **Prompts**: biblioteca com **1312 prompts** organizados em 10 categorias, com busca e paginação — mesmo volume do concorrente pesquisado, mas com texto 100% original (nenhum prompt copiado ou reaproveitado por template, redigido item a item).
- **Aulas**: 3 módulos, 8 aulas. Cada aula já tem o roteiro completo de gravação (o que falar, o que mostrar na tela) e um espaço reservado no player para você plugar o vídeo real depois (`videoUrl` na tabela `lessons` — enquanto estiver vazio, a página mostra o roteiro no lugar do vídeo).
- **Bônus**: 6 itens originais, incluindo um bloqueado (upsell) como exemplo de como travar conteúdo.
- **Comunidade**: feed de posts, curtidas, comentários, ranking de membros e regras — tudo funcional (like otimista, criação de post).
- **Perfil**: edição de nome/dados básicos e logout.

Tudo com conteúdo 100% original (nada copiado do concorrente pesquisado).

## Rodando localmente

1. Suba um Postgres (local ou um serviço tipo Neon/Supabase/Railway) e copie a connection string.
2. Copie `.env.example` para `.env` e preencha:
   - `DATABASE_URL` — connection string do Postgres
   - `AUTH_SECRET` — gere um valor aleatório forte, por exemplo com `openssl rand -base64 32`
   - `NEXTAUTH_URL` — `http://localhost:3000` em dev, ou a URL final do site em produção
3. Instale e prepare o banco:

   ```bash
   npm install
   npm run db:push    # cria as tabelas a partir de src/db/schema.ts
   npm run db:seed     # popula skills, prompts, aulas, bônus e comunidade
   ```

4. Rode:

   ```bash
   npm run dev
   ```

   Acesse `http://localhost:3000/auth`.

**Login de teste criado pelo seed**: `admin@exemplo.com.br` / `mudeisso123`. Troque essa senha (ou apague esse usuário e crie o seu) antes de vender o produto — ela está em texto aberto no script de seed só para desenvolvimento.

## Deploy (sugestão: Vercel + banco Postgres gerenciado)

1. Suba o código para um repositório Git (GitHub/GitLab).
2. Crie um banco Postgres gerenciado (Neon, Supabase, Railway, Vercel Postgres etc.) e pegue a `DATABASE_URL`.
3. Na Vercel, importe o repositório e configure as variáveis de ambiente (`DATABASE_URL`, `AUTH_SECRET`, `NEXTAUTH_URL` = domínio final).
4. Rode as migrações contra o banco de produção uma vez (pode ser da sua máquina, apontando `DATABASE_URL` para produção):

   ```bash
   npm run db:push
   npm run db:seed
   ```

5. Deploy. Depois do primeiro deploy, edite o usuário admin (nome/senha) e o conteúdo de `src/lib/site-config.ts` com a marca definitiva.

## Estrutura de pastas (resumo)

```
src/
  app/            rotas (App Router) — (app)/ é a área logada, auth/ é o login
  components/     componentes de UI reutilizáveis
  data/           conteúdo original (skills, prompts, aulas, comunidade, bônus)
  db/             schema Drizzle, client, script de seed
  lib/            queries, server actions, config de marca
  auth.ts         configuração do NextAuth
```

## Scripts úteis

- `npm run dev` — ambiente de desenvolvimento
- `npm run build` / `npm start` — build e execução de produção
- `npm run db:generate` — gera uma nova migração a partir de mudanças no schema
- `npm run db:push` — aplica o schema direto no banco (bom para começar)
- `npm run db:seed` — popula o banco com todo o conteúdo original

## Próximos passos sugeridos

- Definir o nome final da marca e trocar em `site-config.ts` (e no `metadata` de `layout.tsx`, que já lê de lá).
- Gravar os vídeos das 8 aulas usando os roteiros prontos e preencher `videoUrl` de cada aula (pode ser um link de player tipo Panda Video, YouTube não-listado, etc. — o componente de player só precisa de uma URL embutível).
- Se quiser aproximar dos ~1312 prompts do concorrente pesquisado, gerar mais lotes de prompts originais nas mesmas categorias.
- Trocar/remover o usuário admin de teste antes de vender.
