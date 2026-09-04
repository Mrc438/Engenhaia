import "@fontsource/space-grotesk/latin.css";
import "@fontsource/inter/latin.css";
import { siteConfig } from "@/lib/site-config";
import { Icon } from "@/components/icon";
import { AulasCarousel, TOTAL_AULAS, TOTAL_MODULOS } from "@/components/aulas-carousel";
import { CheckoutLink } from "@/components/checkout-link";

// Tipografia copiada da lander de referência: Space Grotesk nos títulos,
// Inter no corpo — só se aplica dentro desta página (ver .font-lp-body em
// globals.css), o resto do app (logado) continua no --font-sans padrão.
// Vêm de @fontsource (arquivos de fonte auto-hospedados via npm) em vez de
// next/font/google pra não depender de rede até o Google Fonts em build.

// ============================================================================
// Landing page institucional (pública, fora do login). Nível de acabamento
// pedido pelo usuário: mesmo padrão visual e de copy de uma referência de
// mercado (iaclaude.iaengenhariacivil.com.br) — estrutura de seções e
// hierarquia inspiradas nela, mas 100% original: texto próprio, sem
// nenhuma frase copiada, e usando o sistema de acabamento que a própria
// engapp já tem (card-surface, card-glow, btn-primary, badge-*, ver
// globals.css) em vez de recriar um tema à parte.
//
// Todo número usado aqui vem direto do catálogo real (src/data/**) — nunca
// inventado. Ver contagem em cada seção comentada abaixo.
// ============================================================================

const SKILL_CATEGORIES = [
  {
    icon: "calculator",
    name: "Projeto & Cálculo",
    count: 22,
    description: "Dimensionamento, verificação e decisão técnica com norma embutida no raciocínio.",
    examples: ["Estrutural", "Normas (NBR)", "Patologias", "Tecnologia do Concreto"],
  },
  {
    icon: "file-text",
    name: "Documentação Técnica",
    count: 12,
    description: "Laudo, memorial e registro que você assina com respaldo técnico.",
    examples: ["Laudos & Perícias", "Memoriais Descritivos", "CREA (ART/RRT)", "Pontes & OAEs"],
  },
  {
    icon: "hard-hat",
    name: "Gestão de Obra",
    count: 12,
    description: "Planejamento, controle e operação do canteiro no dia a dia.",
    examples: ["Planejamento de Obras", "Orçamento", "Diário de Obra (RDO)", "Qualidade (PBQP-H)"],
  },
  {
    icon: "briefcase",
    name: "Comercial & Licitações",
    count: 5,
    description: "Proposta, edital e viabilidade pra fechar contrato com mais segurança.",
    examples: ["Comercial", "Mestre de Licitações", "Fiscalização de Obras Públicas"],
  },
] as const;

const TOTAL_SKILLS_BASICO = SKILL_CATEGORIES.reduce((sum, c) => sum + c.count, 0); // 51
const PACK_ESPECIALISTA_COUNT = 10;

const PROMPT_EXAMPLES = [
  {
    category: "Gestão de Obra",
    title: "Cronograma físico-financeiro do zero",
    description: "Organiza etapas, prazos e desembolso a partir dos dados da sua obra real.",
  },
  {
    category: "Comercial & Licitações",
    title: "Proposta comercial — reforma residencial",
    description: "Estrutura escopo, prazo e condições numa proposta pronta pra enviar.",
  },
  {
    category: "Documentação Técnica",
    title: "Memorial descritivo — estrutura em concreto armado",
    description: "Redige o memorial na estrutura e linguagem técnica que você já usaria.",
  },
  {
    category: "Estrutural & Cálculo",
    title: "Memória de cálculo — viga contínua de 3 vãos",
    description: "Organiza a memória de cálculo com os dados e critérios que você informar.",
  },
  {
    category: "Qualidade & Segurança",
    title: "Análise Preliminar de Risco (APR) de tarefa",
    description: "Monta a APR da atividade com os perigos e medidas de controle do serviço.",
  },
  {
    category: "Gestão de Obra",
    title: "Modelo de RDO padronizado",
    description: "Transforma anotação solta de campo num RDO com o padrão que você adota.",
  },
] as const;

const TOTAL_PROMPTS = 1312;
const PROMPT_CATEGORY_COUNT = 10;

const BONUS_ITEMS = [
  {
    icon: "table",
    title: "Kit de Planilhas de Obra",
    description:
      "Orçamento simples por etapa, controle de RDO semanal e cronograma físico-financeiro básico — é só duplicar e adaptar.",
  },
  {
    icon: "clipboard-check",
    title: "Checklist de Entrega de Obra",
    description:
      "Os pontos mais esquecidos na vistoria final, organizados por ambiente, pra você não deixar nada passar.",
  },
  {
    icon: "file-text",
    title: "Banco de Modelos de Memorial e ART",
    description: "Modelos já estruturados pra você adaptar aos dados do seu projeto sem começar do zero.",
  },
  {
    icon: "book-open",
    title: "Glossário de Normas Técnicas Essenciais",
    description: "Consulta rápida dos termos e siglas de NBR mais usados no dia a dia de projeto e obra.",
  },
  {
    icon: "refresh-cw",
    title: "Trilha de Atualização de Normas",
    description: "Leituras curtas sobre mudanças recentes em normas relevantes pra quem está na ponta.",
  },
  {
    icon: "users",
    title: "Comunidade de engenheiros",
    description: "Feed fechado pra trocar prompt, caso real e dúvida com quem também usa IA no operacional.",
  },
] as const;

const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Escolha sua IA de confiança",
    description: "ChatGPT, Claude, Gemini ou outra baseada em texto — não trocamos o que você já usa e paga.",
  },
  {
    step: 2,
    title: "Copie a skill ou o prompt",
    description: "Texto pronto, sem instalar nada e sem escrever prompt do zero.",
  },
  {
    step: 3,
    title: "Cole e mande a tarefa real",
    description: "A resposta já sai no contexto técnico certo — você revisa, ajusta e assina.",
  },
] as const;

const OUTCOMES = [
  {
    icon: "calculator",
    title: "Orçamento e composição",
    before: "Montar do zero, conferir item por item na mão.",
    after: "Rascunho organizado por etapa pra você revisar e ajustar.",
  },
  {
    icon: "file-text",
    title: "Memorial e laudo",
    before: "Redigir do começo toda vez que o cliente cobra pra ontem.",
    after: "Estrutura e linguagem técnica prontas, você completa com os dados do projeto.",
  },
  {
    icon: "briefcase",
    title: "Proposta comercial",
    before: "Escrever a proposta enquanto o cliente espera resposta.",
    after: "Proposta estruturada em minutos, só ajustar valor e prazo antes de enviar.",
  },
] as const;

const FAQ_ITEMS = [
  {
    question: "Preciso saber usar IA?",
    answer:
      "Não. As skills e os prompts já vêm prontos pra copiar e colar. Se travar em algum passo, as aulas mostram exatamente onde clicar.",
  },
  {
    question: "Funciona com qual assistente de IA?",
    answer:
      "Funciona com o que você já usa: ChatGPT, Claude, Gemini ou qualquer outro assistente baseado em texto. Não é preciso assinar nenhum plano específico além do que você já tem hoje.",
  },
  {
    question: "Vocês ensinam engenharia?",
    answer:
      "Não. Você é o responsável técnico. As skills e os prompts fazem o operacional — rascunho, estrutura, cálculo organizado, redação — e você revisa e assina.",
  },
  {
    question: "Serve pra autônomo e pra escritório?",
    answer: "Os dois. Autônomo ganha tempo sozinho; escritório padroniza o time inteiro com o mesmo método.",
  },
  {
    question: "Como recebo o acesso?",
    answer: "Assim que o pagamento é confirmado, você recebe o login por e-mail e já entra na plataforma.",
  },
  {
    question: "E se não servir pra mim?",
    answer: "Você tem 7 dias de garantia incondicional. Não gostou, devolvemos 100% — sem perguntas.",
  },
] as const;

function CheckIcon() {
  return (
    <span className="icon-chip flex h-5 w-5 shrink-0 rounded-full">
      <Icon name="check" className="h-3 w-3" />
    </span>
  );
}

function PrimaryCta({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <CheckoutLink
      href={siteConfig.checkoutUrl}
      className={`btn-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold uppercase tracking-wide sm:px-8 sm:text-base ${className}`}
    >
      {children}
      <Icon name="arrow-right" className="h-4 w-4" />
    </CheckoutLink>
  );
}

export function LandingPage() {
  return (
    <div className="font-lp-body flex min-h-screen flex-col pb-24 lg:pb-0">
      {/* ---------------------------------------------------------------- */}
      {/* Header                                                            */}
      {/* ---------------------------------------------------------------- */}
      <header className="w-full border-b border-border/60 bg-black/40 px-5 py-2.5 sm:px-8">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-2 text-center text-xs font-medium sm:text-sm">
          <Icon name="users" className="h-3.5 w-3.5 shrink-0 text-accent-2" />
          <p className="min-w-0">
            <strong className="font-bold text-accent-2">
              {TOTAL_SKILLS_BASICO} skills e {TOTAL_PROMPTS} prompts prontos
            </strong>{" "}
            pra engenharia civil — é só copiar e usar.
          </p>
        </div>
      </header>

      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="section-dark relative overflow-hidden">
        <div
          className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{ maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)" }}
        />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-5 py-20 sm:px-8">
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[60px] lg:leading-[63px]">
              <span className="block">O assistente de IA que você já usa</span>
              <span className="text-gradient-accent block">vira seu engenheiro civil</span>
              <span className="text-gradient-accent block">sênior.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted sm:text-lg">
              {TOTAL_SKILLS_BASICO} skills prontas de{" "}
              <strong className="font-semibold text-foreground">cálculo, documentação, gestão de obra e comercial</strong>,
              mais uma biblioteca com {TOTAL_PROMPTS} prompts avançados. Tudo por{" "}
              <strong className="font-semibold text-accent-2">{siteConfig.price}</strong>, pagamento único. Você cola,
              manda a tarefa do dia real e recebe um rascunho técnico pra revisar, ajustar e assinar.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4">
              <a
                href="#oferta"
                className="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-wide sm:text-base"
              >
                Ver a oferta
                <Icon name="arrow-right" className="h-4 w-4" />
              </a>
              <p className="text-xs text-muted">
                Acesso imediato · Copia e cola · Funciona com o assistente de IA que você já usa
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-2.5 text-sm sm:grid-cols-3">
              {[
                { icon: "shield-check", label: "Garantia de 7 dias" },
                { icon: "zap", label: "Acesso imediato" },
                { icon: "library", label: `${TOTAL_PROMPTS} prompts avançados` },
              ].map((item) => (
                <span
                  key={item.label}
                  className="card-surface-static inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-medium sm:text-sm"
                >
                  <Icon name={item.icon} className="h-3.5 w-3.5 text-accent-2" />
                  {item.label}
                </span>
              ))}
            </div>
          </div>

          {/* Mockup ilustrativo — composição própria, não é screenshot de nenhum produto */}
          <div className="relative flex w-full justify-center">
            <div className="relative w-full max-w-lg">
              <div
                className="absolute -inset-6 -z-10 rounded-[2rem] opacity-40 blur-3xl"
                style={{ backgroundImage: "linear-gradient(135deg, var(--accent-2), var(--accent))" }}
              />
              <div className="card-glow overflow-hidden rounded-2xl">
                <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#f2b02e]/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
                  <span className="ml-2 text-xs font-medium text-muted">Skill: Memorial Descritivo</span>
                </div>
                <div className="space-y-3 p-4 sm:p-5">
                  <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-surface-2 px-4 py-2.5 text-sm">
                    Cola aí o memorial da reforma do apartamento 302: 68m², alvenaria + reforço em concreto,
                    troca de instalação elétrica e hidráulica.
                  </div>
                  <div className="mr-auto max-w-[90%] rounded-2xl rounded-tl-sm border border-border bg-surface px-4 py-3 text-sm">
                    <p className="font-semibold text-accent-2">Memorial Descritivo — Reforma Ap. 302</p>
                    <p className="mt-2 text-muted">1. Identificação da obra e responsável técnico (ART)</p>
                    <p className="text-muted">2. Descrição dos serviços — demolição, alvenaria, reforço</p>
                    <p className="text-muted">3. Instalações elétricas e hidrossanitárias (NBR 5410 / 5626)</p>
                    <p className="mt-2 text-xs italic text-muted">
                      Revise os dados de projeto antes de assinar — texto gerado com o que você informou.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-dashed border-border px-3 py-2 text-xs text-muted">
                    <Icon name="clock" className="h-3.5 w-3.5" />
                    Rascunho pronto em segundos — a revisão técnica continua sendo sua.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Marquee                                                           */}
      {/* ---------------------------------------------------------------- */}
      <div className="section-dark marquee-viewport overflow-hidden border-y border-border py-4">
        <div className="marquee-track gap-10 whitespace-nowrap text-sm font-semibold uppercase tracking-wide text-muted">
          {[...Array(2)].map((_, dup) => (
            <span key={dup} className="flex items-center gap-10 pr-10">
              {[
                "ORÇAMENTO",
                "MEMORIAL DESCRITIVO",
                "CRONOGRAMA FÍSICO-FINANCEIRO",
                "LAUDO TÉCNICO",
                "ART/RRT",
                "NBR",
                "RDO",
                "PATOLOGIAS",
                "LICITAÇÕES",
                `${TOTAL_PROMPTS} PROMPTS`,
              ].map((term) => (
                <span key={term} className="flex items-center gap-10">
                  <span className="text-foreground/70">{term}</span>
                  <Icon name="star" className="h-3 w-3 fill-current text-accent-2" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Problema + Solução (bloco claro — mesmo tratamento da referência)  */}
      {/* ---------------------------------------------------------------- */}
      <section className="section-light-alt">
        <div className="mx-auto w-full max-w-3xl px-5 py-20 sm:px-8">
          <h2 className="text-center text-4xl font-semibold tracking-tight sm:text-5xl">
            Você não virou engenheiro pra passar a noite mexendo em planilha.
          </h2>
          <div className="mt-8 space-y-4 text-base text-muted">
            <p>
              Nem pra remontar o mesmo orçamento pela enésima vez. Nem pra conferir composição na mão, redigir
              laudo do zero ou correr atrás de cronograma quando o prazo já venceu.
            </p>
            <p className="font-semibold text-foreground">É aí que o seu dia desaparece.</p>
            <p>
              O trabalho que paga — calcular, decidir, assinar — fica esperando. Tarefa repetitiva toma a agenda
              inteira. Tarefa que um bom assistente de IA resolveria em minutos.
            </p>
          </div>
          <div className="card-surface-static mt-8 rounded-xl border-l-4 border-l-danger/60 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-danger">Aí você já tentou usar IA</p>
            <p className="mt-3 text-base text-muted">Abriu o ChatGPT, pediu um orçamento e recebeu resposta genérica.</p>
            <p className="mt-2 text-base text-muted">Sem base técnica. Sem norma. Sem contexto da sua obra.</p>
            <p className="mt-2 text-base text-muted">
              Concluiu que IA não serve pra engenharia — mas o problema nunca foi a IA. Foi ela vir crua, sem
              configuração.
            </p>
          </div>
        </div>
      </section>

      <section className="section-light">
        <div className="mx-auto w-full max-w-3xl px-5 py-20 sm:px-8">
          <h2 className="text-center text-4xl font-semibold tracking-tight sm:text-5xl">
            Foi exatamente isso
            <span className="text-gradient-accent block">que a gente resolveu.</span>
          </h2>
          <div className="card-surface-static mt-8 rounded-2xl p-6 sm:p-8">
            <span className="lp-pill inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-wide">
              <Icon name="sparkles" className="h-4 w-4 text-accent-2" />
              {siteConfig.brandTagline}
            </span>
            <p className="mt-4 text-sm text-muted sm:text-base">
              É um conjunto de <strong className="font-semibold text-foreground">skills e prompts já configurados
              pra engenharia civil</strong>. Cada um vem com o contexto técnico, o método e a estrutura de resposta
              certa embutidos — você não escreve prompt nenhum. Copia, manda a tarefa do dia real, e a resposta já
              sai no formato que você já usaria.
            </p>
            <p className="mt-3 text-sm text-muted sm:text-base">
              Não é mágica e não substitui você. Você continua sendo o responsável técnico. A IA faz o trabalho
              pesado de rascunho, cálculo organizado e redação — você revisa, ajusta e assina. Um jeito de ter
              esse apoio técnico disponível 24h, por {siteConfig.price}.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Skills                                                            */}
      {/* ---------------------------------------------------------------- */}
      <section className="section-light-alt">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="lp-pill inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-wide">
              <Icon name="sparkles" className="h-4 w-4 text-accent-2" />
              {TOTAL_SKILLS_BASICO} skills inclusas
            </span>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Cada etapa da obra, uma skill.</h2>
            <p className="mt-3 text-sm text-muted sm:text-base">
              Todas as {TOTAL_SKILLS_BASICO} skills vêm juntas no pacote, organizadas por categoria. Sem versão
              capada, sem upsell escondido.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {SKILL_CATEGORIES.map((cat) => (
              <div key={cat.name} className="card-surface rounded-2xl p-6">
                <div className="flex items-start justify-between gap-3">
                  <span className="icon-chip flex h-11 w-11 rounded-xl">
                    <Icon name={cat.icon} className="h-5 w-5" />
                  </span>
                  <span className="badge-outline rounded-full px-2.5 py-1 text-xs font-semibold">
                    {cat.count} SKILLS
                  </span>
                </div>
                <h3 className="mt-4 font-semibold">{cat.name}</h3>
                <p className="mt-1 text-sm text-muted">{cat.description}</p>
                <ul className="mt-4 space-y-1.5 border-t border-border pt-4 text-sm text-muted">
                  {cat.examples.map((ex) => (
                    <li key={ex} className="flex items-center gap-2">
                      <Icon name="sparkles" className="h-3 w-3 shrink-0 text-accent-2" />
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="card-surface-static mt-6 flex flex-col items-start gap-3 rounded-xl p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="icon-chip flex h-10 w-10 shrink-0 rounded-lg">
                <Icon name="star" className="h-4.5 w-4.5" />
              </span>
              <p className="text-sm text-muted">
                Quer ir além? O <strong className="text-foreground">Pack Especialista</strong> soma mais{" "}
                {PACK_ESPECIALISTA_COUNT} skills (fundações, elétrica, PPCI, topografia e mais) — liberado dentro
                da própria plataforma, quando você quiser.
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center gap-3">
            <PrimaryCta>Quero as {TOTAL_SKILLS_BASICO} skills</PrimaryCta>
            <p className="text-xs text-muted">
              Tudo por {siteConfig.price} · Garantia de 7 dias
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Prompts                                                           */}
      {/* ---------------------------------------------------------------- */}
      <section className="section-light">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="lp-pill inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-wide">
              <Icon name="library" className="h-4 w-4 text-accent-2" />
              {TOTAL_PROMPTS} prompts avançados
            </span>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Pras situações que não cabem numa skill fixa.
            </h2>
            <p className="mt-3 text-sm text-muted sm:text-base">
              Uma biblioteca com {TOTAL_PROMPTS} prompts prontos, em {PROMPT_CATEGORY_COUNT} categorias da rotina
              real de engenharia. Copia, cola no seu assistente de IA e resolve.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROMPT_EXAMPLES.map((p) => (
              <div key={p.title} className="card-surface rounded-xl p-5">
                <span className="text-xs font-semibold uppercase tracking-wide text-accent-2">{p.category}</span>
                <h3 className="mt-2 text-sm font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{p.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted">
            + outros {TOTAL_PROMPTS - PROMPT_EXAMPLES.length} prompts cobrindo geotecnia, instalações prediais,
            qualidade e segurança, licitação e muito mais.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <PrimaryCta>Pegar os {TOTAL_PROMPTS} prompts + {TOTAL_SKILLS_BASICO} skills</PrimaryCta>
            <p className="text-xs text-muted">
              Tudo por {siteConfig.price} · Garantia de 7 dias
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Como funciona                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="section-light">
        <div className="mx-auto w-full max-w-5xl px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Você está usando em menos de 5 minutos.
            </h2>
            <p className="mt-3 text-sm text-muted sm:text-base">
              Sem instalar nada no computador, sem código. Se você sabe copiar e colar, você consegue.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="card-surface-static rounded-2xl p-6">
                <span className="icon-chip-solid flex h-10 w-10 rounded-full text-sm font-bold">{step.step}</span>
                <h3 className="mt-4 font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Bônus                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="section-light-alt">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="badge-solid-accent inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              <Icon name="gift" className="h-3.5 w-3.5" />
              Incluso no pacote
            </span>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              + 6 bônus, sem custo extra.
            </h2>
            <p className="mt-3 text-sm text-muted sm:text-base">
              Junto com as skills e os prompts, você leva também esses materiais e a comunidade — tudo dentro do
              mesmo acesso.
            </p>
          </div>
          <div className="mx-auto mt-10 flex w-full max-w-3xl flex-col gap-5">
            {BONUS_ITEMS.map((item, i) => (
              <div key={item.title} className="card-surface overflow-hidden rounded-2xl">
                <div className="lp-bonus-bar px-5 py-2.5 text-xs font-bold uppercase tracking-wide sm:px-6">
                  Bônus {i + 1}
                </div>
                <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:p-8">
                  <div className="lp-bonus-box h-16 w-16 shrink-0 sm:h-[4.5rem] sm:w-[4.5rem]">
                    <div className="lp-bonus-box-face icon-chip-solid flex h-full w-full items-center justify-center rounded-2xl">
                      <Icon name={item.icon} className="h-7 w-7" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="mt-1.5 text-sm text-muted">{item.description}</p>
                    <p className="mt-2.5 text-sm">
                      <span className="text-muted line-through">Valor R$97</span>{" "}
                      <span className="font-bold text-success">GRÁTIS</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Aulas                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="section-light">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="lp-pill inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-wide">
              <Icon name="book-open" className="h-4 w-4 text-accent-2" />
              {TOTAL_AULAS} aulas em {TOTAL_MODULOS} módulos
            </span>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Do zero ao dia a dia, em aulas curtas.
            </h2>
            <p className="mt-3 text-sm text-muted sm:text-base">
              Passo a passo pra instalar sua primeira skill, usar a biblioteca de prompts e aproveitar a
              comunidade — sem enrolação.
            </p>
          </div>
          <AulasCarousel />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Comunidade                                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="section-light-alt">
        <div className="mx-auto w-full max-w-3xl px-5 py-20 sm:px-8">
          <div className="card-surface-static flex flex-col items-center gap-4 rounded-2xl p-6 text-center sm:p-8">
            <span className="icon-chip flex h-11 w-11 rounded-xl">
              <Icon name="users" className="h-5 w-5" />
            </span>
            <h3 className="text-xl font-bold">Comunidade de engenheiros</h3>
            <p className="max-w-md text-sm text-muted">
              Travou numa NBR, num BDI, num laudo pra ontem? Joga no feed fechado e troca ideia com quem também
              usa IA no operacional — sem custo extra, incluso no pacote.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Preço — bloco inteiro escuro (igual à referência: o card de oferta   */}
      {/* não é um card claro flutuando num fundo claro, é a seção INTEIRA    */}
      {/* que fica escura, com o card em si sendo um painel translúcido).     */}
      {/* ---------------------------------------------------------------- */}
      <section id="oferta" className="section-dark">
        <div className="mx-auto w-full max-w-3xl px-5 py-20 sm:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Tudo pronto por menos do que custa
              <span className="text-gradient-accent block">uma hora do seu tempo.</span>
            </h2>
            <p className="mt-3 text-sm text-muted sm:text-base">
              {TOTAL_SKILLS_BASICO} skills + biblioteca com {TOTAL_PROMPTS} prompts + aulas + comunidade. Um
              investimento só, acesso vitalício.
            </p>
          </div>

          <div className="card-glow backdrop-blur-sm relative mt-10 overflow-hidden rounded-2xl p-6 sm:p-8">
            <span className="badge-solid-accent inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              <Icon name="star" className="h-3.5 w-3.5" />
              Oferta única
            </span>
            <h3 className="mt-4 text-2xl font-bold">{siteConfig.brandTagline}</h3>
            <p className="mt-1 text-sm text-muted">
              {siteConfig.productClaim}
            </p>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-lg font-semibold text-muted">R$</span>
              <span className="text-5xl font-extrabold text-accent-2">
                {siteConfig.price.replace("R$", "").trim()}
              </span>
            </div>
            <p className="text-sm text-muted">pagamento único · acesso vitalício</p>

            <ul className="mt-6 space-y-3 text-sm">
              {[
                `As ${TOTAL_SKILLS_BASICO} skills completas`,
                `Biblioteca com ${TOTAL_PROMPTS} prompts avançados`,
                "Guia de instalação passo a passo",
                "Aulas: como usar a plataforma na prática",
                "Comunidade de engenheiros usando IA no operacional",
                "6 bônus inclusos (planilhas, checklist, modelos e mais)",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-5 text-xs text-muted">
              Se paga na primeira tarefa que você não refaz do zero à mão.
            </p>

            <PrimaryCta className="mt-6 w-full">Quero começar agora — {siteConfig.price}</PrimaryCta>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Garantia — seção clara própria, separada do bloco escuro de preço,  */}
      {/* igual à referência.                                                */}
      {/* ---------------------------------------------------------------- */}
      <section className="section-light">
        <div className="mx-auto w-full max-w-3xl px-5 py-20 sm:px-8">
          <div
            className="card-surface-static mx-auto flex max-w-4xl flex-col items-center gap-8 rounded-3xl p-8 text-center sm:p-10 md:flex-row md:text-left"
            style={{ borderColor: "rgba(255, 129, 1, 0.4)" }}
          >
            <span className="icon-chip-solid flex size-24 shrink-0 rounded-full">
              <Icon name="shield-check" className="h-10 w-10" />
            </span>
            <div>
              <h3 className="text-xl font-bold">7 dias de garantia incondicional</h3>
              <p className="mt-2 text-sm text-muted md:max-w-md">
                Testa nas suas tarefas reais. Se em 7 dias achar que não economizou tempo nenhum, manda um e-mail
                e devolvemos <strong className="text-foreground">cada centavo</strong>. Sem pergunta, sem letra
                miúda.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs font-medium text-muted md:justify-start">
                <span className="flex items-center gap-1.5">
                  <Icon name="check" className="h-3.5 w-3.5 text-success" /> Zero risco
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="check" className="h-3.5 w-3.5 text-success" /> 7 dias completos
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="check" className="h-3.5 w-3.5 text-success" /> Reembolso 100%
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* "A gente não vende curso" — faixa própria (bg alternado), igual à   */}
      {/* referência.                                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="section-light-alt">
        <div className="mx-auto w-full max-w-3xl px-5 py-20 sm:px-8">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            A gente não vende curso de engenharia.
          </h2>
          <div className="mt-6 space-y-4 text-lg text-muted">
            <p>
              Você é o engenheiro — quem entende de cálculo, norma e responsabilidade técnica é você.
            </p>
            <p>
              O que a gente entrega é o assistente de IA que você já usa, já configurado com o contexto técnico
              certo, pra você parar de perder tempo no operacional e voltar a focar no que só você pode fazer:
              decidir, revisar e assinar.
            </p>
            <p className="font-semibold text-foreground">
              A ferramenta acelera. A responsabilidade técnica continua sendo sua — como tem que ser.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Resultados esperados (sem depoimento fabricado) — ocupa aqui a mesma */}
      {/* posição que a referência dá aos depoimentos: depois da garantia,     */}
      {/* antes do FAQ.                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="section-light">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">O que muda no seu dia a dia.</h2>
            <p className="mt-3 text-sm text-muted sm:text-base">
              Três exemplos de tarefa operacional que costuma tomar tempo — e como fica com a skill certa.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {OUTCOMES.map((o) => (
              <div key={o.title} className="card-surface rounded-2xl p-6">
                <span className="icon-chip flex h-10 w-10 rounded-lg">
                  <Icon name={o.icon} className="h-4.5 w-4.5" />
                </span>
                <h3 className="mt-3 font-semibold">{o.title}</h3>
                <div className="mt-3 space-y-2 text-sm">
                  <p className="flex items-start gap-2 text-muted">
                    <Icon name="x" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-danger" />
                    {o.before}
                  </p>
                  <p className="flex items-start gap-2 text-foreground">
                    <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
                    {o.after}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FAQ                                                               */}
      {/* ---------------------------------------------------------------- */}
      <section className="section-light-alt">
        <div className="mx-auto w-full max-w-2xl px-5 py-20 sm:px-8">
          <h2 className="text-center text-4xl font-semibold tracking-tight sm:text-5xl">Perguntas frequentes</h2>
          <div className="mt-8 space-y-3">
            {FAQ_ITEMS.map((item) => (
              <details key={item.question} className="card-surface-static group rounded-xl px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold marker:content-none">
                  {item.question}
                  <Icon
                    name="chevron-down"
                    className="h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="mt-3 text-sm text-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* CTA final                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="section-dark relative overflow-hidden">
        <div className="relative mx-auto w-full max-w-2xl px-5 py-20 text-center sm:px-8">
          <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Você pode continuar refazendo planilha na mão.
            <span className="text-gradient-accent block">Ou botar {TOTAL_SKILLS_BASICO} skills pra trabalhar hoje.</span>
          </h2>
          <p className="mt-4 text-sm text-muted sm:text-base">
            Por {siteConfig.price}. Acesso imediato. Garantia de 7 dias.
          </p>
          <div className="mt-8 flex justify-center">
            <PrimaryCta>Quero minhas skills agora — {siteConfig.price}</PrimaryCta>
          </div>
          <p className="mt-4 text-xs text-muted">Acesso imediato · 7 dias de garantia</p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Footer                                                            */}
      {/* ---------------------------------------------------------------- */}
      <footer className="section-light">
        <div className="mx-auto w-full max-w-4xl px-5 py-10 text-center sm:px-8">
          <p className="font-semibold">{siteConfig.brandTagline}</p>
          <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-muted">
            Este produto é um acesso digital imediato que disponibiliza skills e prompts prontos para uso com
            assistentes de IA de terceiros (como ChatGPT, Claude e Gemini). Não possui vínculo institucional com
            OpenAI, Anthropic, Google ou qualquer outro provedor de IA. Os resultados podem variar conforme o uso
            e não substituem o julgamento profissional do engenheiro habilitado nem a responsabilidade técnica
            (ART/RRT).
          </p>
          <p className="mt-4 text-xs text-muted">
            Dúvidas?{" "}
            <a href={`mailto:${siteConfig.supportEmail}`} className="text-accent-2 hover:underline">
              {siteConfig.supportEmail}
            </a>
          </p>
          <p className="mt-4 text-xs text-muted">
            © {new Date().getFullYear()} {siteConfig.brandTagline} · Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* ---------------------------------------------------------------- */}
      {/* CTA fixo mobile                                                   */}
      {/* ---------------------------------------------------------------- */}
      <div className="sticky-cta-bar px-4 py-3 lg:hidden">
        <CheckoutLink
          href={siteConfig.checkoutUrl}
          className="btn-primary flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-bold uppercase tracking-wide"
        >
          Quero as {TOTAL_SKILLS_BASICO} skills — {siteConfig.price}
          <Icon name="arrow-right" className="h-4 w-4" />
        </CheckoutLink>
      </div>
    </div>
  );
}
