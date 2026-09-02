// Seed de posts da Comunidade — conteúdo 100% original e fictício.

import { CommunityPostSeed } from "../types";

export const communityPostsSeed: CommunityPostSeed[] = [
  {
    authorName: "Equipe EngApp",
    body: "Seja muito bem-vindo(a) à comunidade! Esse espaço é pra trocar experiência real de obra e canteiro com quem também usa IA no dia a dia — sem enrolação, sem fórmula mágica, só prática. Comenta aqui embaixo se apresentando: seu nome, sua cidade, o tipo de obra que você mais atende hoje e onde você mais perde tempo (RDO, orçamento, memorial, o que for). A gente lê tudo e vai usar isso pra melhorar as skills também.",
    tags: ["apresentacao"],
    pinned: true,
    daysAgo: 60,
    likeCount: 14,
    comments: [
      {
        authorName: "Marcos Vinícius",
        body: "Show de bola! Já vim me apresentar no post abaixo, seguindo aqui firme.",
      },
      {
        authorName: "Fernanda Ribeiro",
        body: "Ansiosa pra ver a comunidade crescer, obrigada pelo espaço!",
      },
    ],
  },
  {
    authorName: "Thiago Almeida",
    body: "E aí, pessoal! Sou o Thiago, engenheiro civil recém-formado aqui de Uberlândia-MG, trabalhando numa construtora pequena que faz residencial de médio padrão. Entrei agora na comunidade e já usei a skill de gerar RDO ontem mesmo, economizei uns 40 minutos que ia gastar redigitando as mesmas frases de sempre. Quero aprender a usar melhor as ferramentas de orçamento também, se alguém tiver dica manda aí.",
    tags: ["apresentacao", "rdo"],
    pinned: false,
    daysAgo: 52,
    likeCount: 9,
    comments: [
      {
        authorName: "Camila Duarte",
        body: "Bem-vindo, Thiago! A skill de composição de BDI aqui ajuda bastante, testa também.",
      },
    ],
  },
  {
    authorName: "Roberto Cavalcante",
    body: "Pessoal, alguém mais aqui do Nordeste enfrentando fissura em alvenaria de vedação recorrente em edifício de 8 pavimentos? Já verifiquei junta de dilatação e parece ok, mas as trincas continuam aparecendo nos mesmos pontos perto de viga. Estou desconfiando de deformação lenta da estrutura, mas queria trocar ideia antes de fechar o laudo.",
    tags: ["patologia", "duvida"],
    pinned: false,
    daysAgo: 47,
    likeCount: 11,
    comments: [
      {
        authorName: "Juliana Prado",
        body: "Já vi caso parecido, quase sempre é flecha excessiva da viga mesmo. Vale medir com nível a laser.",
      },
      {
        authorName: "Eduardo Nascimento",
        body: "Confere também a espessura da argamassa de assentamento, às vezes é isso.",
      },
    ],
  },
  {
    authorName: "Camila Duarte",
    body: "Quero deixar registrado um case rápido: usei a skill de memorial descritivo pra um projeto de reforma comercial e o texto saiu tão redondo que o cliente aprovou de primeira, sem nenhuma rodada de ajuste. Antes eu gastava uma tarde inteira nisso, agora é questão de 20 minutos revisando o que a IA gerou. Recomendo demais pra quem tem preguiça dessa parte burocrática.",
    tags: ["memorial", "case"],
    pinned: false,
    daysAgo: 41,
    likeCount: 13,
    comments: [],
  },
  {
    authorName: "Fernanda Ribeiro",
    body: "Dica de produtividade que uso todo dia: eu deixo um modelo padrão de prompt salvo pra descrição de serviço de planilha orçamentária, só troco os dados da obra e mando pra IA revisar a redação técnica. Economizo um tempão em cada orçamento novo. Se alguém quiser eu compartilho a estrutura que uso.",
    tags: ["dica", "orcamento"],
    pinned: false,
    daysAgo: 38,
    likeCount: 8,
    comments: [
      {
        authorName: "Thiago Almeida",
        body: "Manda sim, Fernanda! Preciso muito organizar isso melhor aqui.",
      },
    ],
  },
  {
    authorName: "Eduardo Nascimento",
    body: "Dúvida de BDI: pra obra pública de pequeno porte aqui no interior de Goiás, vocês costumam usar taxa mais próxima de 20% ou tem enxugado pra ficar mais competitivo na licitação? Sinto que a concorrência anda apertando muito a margem e não sei até onde vale a pena reduzir sem comprometer o resultado.",
    tags: ["orcamento", "duvida"],
    pinned: false,
    daysAgo: 34,
    likeCount: 6,
    comments: [],
  },
  {
    authorName: "Juliana Prado",
    body: "Desabafo de sexta-feira: prazo apertado de novo, cliente pedindo pra antecipar entrega de uma laje que ainda depende de liberação da concreteira. Às vezes parece que empreiteiro nenhum entende que engenharia não é mágica. De qualquer forma, bom final de semana pra todo mundo que também está correndo contra o relógio.",
    tags: ["dica"],
    pinned: false,
    daysAgo: 30,
    likeCount: 15,
    comments: [
      {
        authorName: "Roberto Cavalcante",
        body: "Sinto exatamente isso todo mês, força aí!",
      },
    ],
  },
  {
    authorName: "Bruno Siqueira",
    body: "Alguém sabe se dá pra usar a skill de RDO pra registrar ocorrência de acidente leve também, ou é melhor eu fazer isso separado num documento próprio? Nunca fiz isso antes e não quero errar a formalização caso precise apresentar depois.",
    tags: ["rdo", "duvida"],
    pinned: false,
    daysAgo: 27,
    likeCount: 4,
    comments: [
      {
        authorName: "Marcos Vinícius",
        body: "Melhor separado, Bruno. Ocorrência de segurança tem formulário próprio na maioria das construtoras.",
      },
    ],
  },
  {
    authorName: "Patrícia Gomes",
    body: "Boa tarde, comunidade! Sou a Patrícia, de Curitiba-PR, atuo com projetos estruturais em concreto armado há uns 6 anos. Vim conhecer a plataforma por indicação de uma colega e já estou gostando bastante do jeito que as skills organizam o raciocínio antes de gerar qualquer texto técnico.",
    tags: ["apresentacao", "estrutural"],
    pinned: false,
    daysAgo: 23,
    likeCount: 7,
    comments: [],
  },
  {
    authorName: "Marcos Vinícius",
    body: "Fechei ontem uma licitação municipal aqui em Belo Horizonte usando a skill de organização de documentação, ajudou muito a estruturar o checklist de itens exigidos no edital. Fica a dica pra quem também trabalha com obra pública: revisar duas vezes o item de qualificação técnica, foi onde quase travei.",
    tags: ["licitacao", "case"],
    pinned: false,
    daysAgo: 19,
    likeCount: 10,
    comments: [
      {
        authorName: "Patrícia Gomes",
        body: "Boa, Marcos! Licitação pública é osso mesmo, parabéns pela aprovação.",
      },
    ],
  },
  {
    authorName: "Juliana Prado",
    body: "Pergunta técnica: alguém já usou skill pra apoiar redação de laudo pericial de infiltração em cobertura? Quero um jeito de organizar melhor a parte de nexo causal antes de escrever, porque costumo enrolar demais nessa etapa e perder tempo revisando texto.",
    tags: ["patologia", "duvida"],
    pinned: false,
    daysAgo: 15,
    likeCount: 5,
    comments: [],
  },
  {
    authorName: "Rafael Monteiro",
    body: "Compartilhando uma dica boba mas que me salvou essa semana: criei uma pasta só com os PDFs de ART e RRT já assinados, organizados por obra, e uso a busca da própria plataforma pra achar rapidinho o número quando o cliente pergunta. Parece óbvio, mas antes eu vivia procurando e-mail antigo pra isso.",
    tags: ["art-rrt", "dica"],
    pinned: false,
    daysAgo: 11,
    likeCount: 6,
    comments: [
      {
        authorName: "Bruno Siqueira",
        body: "Simples e funciona, vou copiar essa ideia aqui.",
      },
    ],
  },
  {
    authorName: "Fernanda Ribeiro",
    body: "Alguém mais sentiu diferença na fluidez da reunião de apresentação de orçamento depois que passou a levar um resumo gerado por IA em vez do PDF cru da planilha? Testei numa reunião com cliente de reforma residencial semana passada e o entendimento dele foi muito mais rápido.",
    tags: ["apresentacao", "orcamento"],
    pinned: false,
    daysAgo: 6,
    likeCount: 9,
    comments: [],
  },
  {
    authorName: "Rafael Monteiro",
    body: "Bom dia! Alguém da região Sul já precisou adaptar memorial descritivo pra obra com exigência extra de acessibilidade da prefeitura local? Estou revisando um projeto aqui em Porto Alegre e quero garantir que não vou esquecer nenhum item específico da norma municipal.",
    tags: ["memorial", "duvida"],
    pinned: false,
    daysAgo: 2,
    likeCount: 3,
    comments: [],
  },
];
