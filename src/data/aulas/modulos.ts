import { ModuleSeed } from "../types";

export const modulosSeed: ModuleSeed[] = [
  {
    slug: "primeiros-passos",
    title: "Primeiros passos",
    summary: "Visão geral do app e primeiros usos práticos das Skills e Prompts.",
    order: 1,
    lessons: [
      {
        slug: "como-funciona-o-app",
        title: "Como funciona o app",
        description: "Visão geral rápida do painel e de onde fica cada coisa.",
        script: `## Objetivo da aula
Deixar a pessoa capaz de abrir o app e se localizar sozinha entre as seções Skills, Prompts, Aulas, Bônus e Comunidade.

## Duração estimada
3-4 min

## Roteiro passo a passo

1. FALA: "Bem-vindo! Nos próximos minutos eu vou te mostrar rapidinho como esse app é organizado, pra você não perder tempo procurando onde as coisas ficam."
   TELA: tela inicial do app já logada, com o menu principal visível.

2. FALA: "Aqui em cima (ou no menu lateral) você tem cinco áreas principais: Skills, Prompts, Aulas, Bônus e Comunidade. Vamos passar por cada uma."
   TELA: passar o cursor devagar sobre cada item do menu, destacando um por um sem clicar ainda.

3. FALA: "Skills são instruções prontas e completas que você configura uma vez no seu assistente de IA — tipo o Claude ou o ChatGPT — e ele passa a responder sempre seguindo aquele padrão, sem você precisar reexplicar toda vez."
   TELA: clicar em "Skills" e mostrar a lista de skills disponíveis, com categorias na lateral.

4. FALA: "Já os Prompts são comandos avulsos, prontos pra copiar e colar quando você tem uma dúvida pontual — não precisam ser configurados como instrução fixa."
   TELA: clicar em "Prompts", mostrar a biblioteca com categorias e a barra de busca.

5. FALA: "Aqui em Aulas é onde você está agora: vídeos curtos de onboarding, organizados em módulos, pra você aprender a tirar o máximo do app."
   TELA: clicar em "Aulas", mostrar a lista de módulos com as aulas dentro de cada um.

6. FALA: "Em Bônus ficam materiais extras — modelos, planilhas, checklists — que vêm junto com o seu acesso."
   TELA: clicar em "Bônus", mostrar os itens listados, incluindo algum que esteja bloqueado como exemplo.

7. FALA: "E na Comunidade você troca experiência com outros engenheiros que também usam o app: posta um caso, vê o que os outros estão perguntando, e isso também conta pro seu ranking dentro da plataforma."
   TELA: clicar em "Comunidade", mostrar o feed de posts e, se existir, o ranking lateral.

8. FALA: "Resumindo: Skills pra automatizar sua rotina, Prompts pra resolver uma dúvida pontual, Aulas pra aprender a usar tudo isso, Bônus pra ganhar tempo, e Comunidade pra trocar ideia. Simples assim."
   TELA: voltar pra tela inicial com o menu completo visível.

## Frase de encerramento sugerida
"Agora que você já sabe onde fica cada coisa, na próxima aula eu vou te mostrar como instalar sua primeira Skill na prática. Vamos lá?"`,
        order: 1,
      },
      {
        slug: "como-instalar-sua-primeira-skill",
        title: "Como instalar sua primeira Skill",
        description: "Passo a passo pra copiar uma Skill e configurar no seu assistente de IA.",
        script: `## Objetivo da aula
Deixar a pessoa capaz de pegar o texto de uma Skill do app e configurá-la como instrução persistente no assistente de IA que ela usa (Claude, ChatGPT ou outro).

## Duração estimada
4-5 min

## Roteiro passo a passo

1. FALA: "Nessa aula eu vou te mostrar como pegar uma Skill daqui do app e deixar ela configurada no seu assistente de IA, pra ele já responder do jeito certo toda vez que você abrir uma conversa nova."
   TELA: tela inicial do app, menu visível.

2. FALA: "Primeiro, vamos entrar na aba Skills e escolher uma pra testar. Vou usar essa aqui como exemplo."
   TELA: clicar em "Skills", navegar até uma categoria e abrir o card de uma skill específica.

3. FALA: "Repara que a Skill tem um nome, uma descrição curta do que ela faz, e o corpo completo com as instruções. É esse corpo que a gente vai copiar."
   TELA: rolar a tela da skill aberta, mostrando o título, a descrição curta e o corpo do texto.

4. FALA: "Clica aqui no botão de copiar. Isso já coloca todo o texto da instrução na sua área de transferência."
   TELA: clicar no botão "Copiar" (ou ícone de cópia) no topo do corpo da skill; se aparecer um feedback visual tipo "Copiado!", mostrar esse momento.

5. FALA: "Agora vamos até o assistente de IA. Eu vou usar o Claude como exemplo, mas o processo é parecido em qualquer outro: você quer criar uma instrução que fique salva e valha pra toda conversa nova."
   TELA: trocar de janela/aba e abrir o site do assistente de IA (ex.: claude.ai) numa aba nova do navegador.

6. FALA: "No Claude, isso é feito criando um Projeto, e colando esse texto nas Instruções Personalizadas do projeto. Se você usa o ChatGPT, o caminho é parecido: entra nas configurações e procura por 'Instruções Personalizadas' ou 'Instruções do Projeto'."
   TELA: no assistente de IA, abrir o menu de criação de projeto/configurações e localizar o campo de instruções personalizadas.

7. FALA: "Colamos o texto que copiamos ali dentro, e salvamos."
   TELA: colar (Ctrl+V) o conteúdo da skill no campo de instruções e clicar em "Salvar".

8. FALA: "Pronto. A partir de agora, toda vez que você abrir uma conversa nova dentro desse projeto, a IA já vai seguir esse padrão automaticamente — sem você precisar reexplicar o contexto toda hora."
   TELA: abrir uma conversa nova dentro do projeto configurado e digitar uma pergunta simples de teste, mostrando que a resposta já sai no formato esperado pela skill.

9. FALA: "Dica: se depois de um tempo você quiser trocar de Skill, é só voltar aqui, copiar a próxima e substituir o texto das instruções do projeto."
   TELA: voltar pro app, mostrar novamente a lista de Skills.

## Frase de encerramento sugerida
"Com a sua primeira Skill instalada, na próxima aula eu mostro quando faz mais sentido usar essa instrução fixa ou puxar um prompt avulso da biblioteca. Até lá."`,
        order: 2,
      },
      {
        slug: "como-usar-a-biblioteca-de-prompts",
        title: "Como usar a Biblioteca de Prompts no dia a dia",
        description: "Quando usar uma Skill fixa e quando usar um prompt avulso, e como buscar por categoria.",
        script: `## Objetivo da aula
Deixar a pessoa capaz de decidir entre usar uma Skill fixa ou um prompt avulso, e de encontrar rapidamente o prompt certo usando busca e filtro por categoria.

## Duração estimada
3-4 min

## Roteiro passo a passo

1. FALA: "Uma dúvida comum é: 'eu uso uma Skill ou pego um prompt da biblioteca?'. Nessa aula eu explico a diferença na prática e te mostro como navegar na Biblioteca de Prompts."
   TELA: tela inicial do app.

2. FALA: "Regra simples: se é algo que você vai fazer toda semana — tipo gerar memorial de cálculo, revisar um laudo, montar uma proposta comercial — vale configurar como Skill fixa, porque aí a IA já responde sempre naquele padrão."
   TELA: abrir a aba "Skills" e mostrar rapidamente 2 ou 3 exemplos de skills de uso recorrente.

3. FALA: "Já quando é uma dúvida pontual, específica daquele dia — uma pergunta técnica avulsa, um texto que você só precisa uma vez — aí faz mais sentido pegar um prompt pronto da biblioteca e usar direto, sem precisar configurar nada."
   TELA: clicar na aba "Prompts", mostrar a tela inicial da biblioteca.

4. FALA: "Aqui em cima tem a busca. Vamos supor que eu preciso de um prompt sobre orçamento de obra. Eu digito a palavra-chave..."
   TELA: clicar na barra de busca e digitar um termo de exemplo (ex.: "orçamento").

5. FALA: "...e o app já filtra os prompts que têm relação com esse termo, seja no título ou nas tags."
   TELA: mostrar a lista de resultados filtrados aparecendo.

6. FALA: "Se você preferir navegar por categoria em vez de buscar, é só usar esse menu lateral (ou os filtros no topo) e escolher a categoria que faz sentido pro que você precisa agora."
   TELA: limpar a busca e clicar em uma categoria na lateral, mostrando os prompts daquela categoria.

7. FALA: "Ao abrir um prompt, você vê as tags dele, o texto completo, e o botão de copiar — igual fizemos com a Skill. Só que aqui você não precisa configurar como instrução fixa: é só colar direto na conversa com a IA e already usar."
   TELA: clicar em um prompt específico, mostrar o corpo do texto e o botão "Copiar".

8. FALA: "Dica prática: comece toda semana revisando se surgiu alguma tarefa nova que você repete direto — se sim, vale a pena promover ela de 'prompt avulso' pra 'Skill fixa' no seu assistente de IA."
   TELA: voltar pra tela com as duas abas, Skills e Prompts, lado a lado no menu.

## Frase de encerramento sugerida
"Agora você já sabe quando usar cada um. No próximo módulo eu vou te mostrar como conversar com a IA como um profissional de verdade, revisando premissas e evitando erros bobos. Te espero lá."`,
        order: 3,
      },
    ],
  },
  {
    slug: "usando-como-profissional",
    title: "Usando como um profissional",
    summary: "Boas práticas, prompt universal e erros comuns ao usar IA no dia a dia da engenharia.",
    order: 2,
    lessons: [
      {
        slug: "boas-praticas-ao-conversar-com-a-ia",
        title: "Boas práticas ao conversar com a IA",
        description: "Como dar contexto, revisar premissas marcadas e pedir ajustes.",
        script: `## Objetivo da aula
Deixar a pessoa capaz de conduzir uma conversa com a IA fornecendo contexto suficiente e revisando corretamente as premissas assumidas antes de usar qualquer resposta.

## Duração estimada
4-5 min

## Roteiro passo a passo

1. FALA: "A qualidade da resposta que você recebe da IA depende diretamente da qualidade do contexto que você dá pra ela. Nessa aula eu vou te mostrar como fazer isso direito."
   TELA: tela de uma conversa aberta no assistente de IA, em branco.

2. FALA: "Primeiro passo: sempre que for pedir algo técnico, informe os dados da obra. Localização, tipo de solo se souber, dimensões, finalidade da edificação, o que for relevante pro cálculo ou análise em questão."
   TELA: digitar um exemplo de mensagem com dados da obra (ex.: "Preciso de uma estimativa de carga para uma laje de 4x5m, uso residencial, região de São Paulo").

3. FALA: "Segundo: sempre cite a norma técnica aplicável, se você já sabe qual é. Isso evita que a IA generalize ou use uma referência desatualizada."
   TELA: complementar a mensagem digitada com a norma (ex.: "seguindo a NBR 6118").

4. FALA: "Agora repara uma coisa importante: quando a IA está configurada com as Skills desse app, ela marca no texto os pontos que são premissas ou que precisam da sua confirmação, com as tags [PREMISSA] e [A CONFIRMAR]."
   TELA: enviar a mensagem e mostrar a resposta da IA contendo pelo menos uma marcação [PREMISSA] ou [A CONFIRMAR] destacada no texto.

5. FALA: "Isso não é enfeite. Toda vez que você ver uma dessas marcações, pare e confira: aquele número, aquela suposição, faz sentido pro seu caso real? Nunca leve adiante um cálculo sem validar essas marcações primeiro."
   TELA: apontar (com o cursor ou zoom) para a marcação [A CONFIRMAR] na resposta.

6. FALA: "Se alguma premissa estiver errada, ou se você tiver o dado real, é só responder corrigindo. Por exemplo: 'a premissa de solo tipo 2 está errada, é solo tipo 3, refaz considerando isso'."
   TELA: digitar uma mensagem de correção como essa e enviar.

7. FALA: "Terceiro ponto: se a resposta não ficou boa, não teve tudo o que você precisava, ou saiu confusa, você pode pedir pra IA refazer só aquele trecho. Não precisa reiniciar a conversa inteira."
   TELA: digitar algo como "Refaça só a parte do dimensionamento, mantendo o resto igual" e enviar.

8. FALA: "Resumindo: dado da obra, norma aplicável, revisão de toda marcação [PREMISSA] e [A CONFIRMAR], e pedido de ajuste pontual quando precisar. Esse é o combo de uma conversa profissional com a IA."
   TELA: tela final da conversa, com a resposta corrigida e completa visível.

## Frase de encerramento sugerida
"Na próxima aula eu mostro um prompt universal que você pode usar antes de qualquer pergunta solta, pra manter esse padrão de qualidade sempre. Vamos nessa."`,
        order: 1,
      },
      {
        slug: "prompt-universal-para-qualquer-pergunta-tecnica",
        title: "Prompt universal pra usar em qualquer pergunta técnica",
        description: "Um prompt-guarda-chuva pra manter o padrão de qualidade em perguntas soltas.",
        script: `## Objetivo da aula
Deixar a pessoa capaz de usar um prompt universal antes de perguntas técnicas soltas, garantindo que a IA sempre responda seguindo o mesmo padrão de rigor e transparência.

## Duração estimada
3-4 min

## Roteiro passo a passo

1. FALA: "Às vezes você tem uma pergunta técnica rápida, fora de qualquer Skill específica, e quer garantir que a IA vai responder com o mesmo cuidado que ela responde dentro de uma Skill configurada. Pra isso existe o prompt universal."
   TELA: abrir a aba "Prompts" no app e navegar até a categoria de prompts gerais/universais.

2. FALA: "Esse prompt funciona como um guarda-chuva: você cola ele uma vez no início da conversa, antes da sua pergunta, e ele define o padrão de comportamento que a IA deve seguir dali pra frente."
   TELA: abrir o prompt universal e mostrar o corpo do texto na tela.

3. FALA: "Repara que ele pede coisas como: agir como engenheiro consultor, sempre marcar premissas assumidas, sempre citar a norma usada quando houver, nunca inventar número sem avisar, e perguntar de volta quando faltar informação crítica."
   TELA: rolar o texto do prompt, destacando essas instruções específicas conforme fala.

4. FALA: "Vamos ver funcionando. Primeiro copio o prompt universal."
   TELA: clicar no botão "Copiar" no prompt universal.

5. FALA: "Colo ele no início de uma conversa nova com a IA."
   TELA: trocar para o assistente de IA, abrir uma conversa nova, colar o texto do prompt universal e enviar.

6. FALA: "Agora, na mesma conversa, eu faço minha pergunta solta, sem me preocupar em reexplicar todo o contexto de padrão de resposta, porque isso já foi fixado pelo prompt."
   TELA: digitar uma pergunta técnica solta (ex.: "Qual a espessura mínima recomendada pra uma laje maciça de 4 metros de vão?") e enviar.

7. FALA: "Vê que a resposta já veio no padrão esperado: com a premissa marcada, com referência à norma quando aplicável, sem inventar dado. Isso é o prompt universal trabalhando por trás."
   TELA: mostrar a resposta da IA com as marcações e referências visíveis.

8. FALA: "Dica: se você usa muito esse prompt, vale considerar deixá-lo fixo como instrução do projeto, do jeito que aprendemos lá na aula de instalação de Skill. Aí você nem precisa colar de novo toda vez."
   TELA: voltar rapidamente pra aba de configurações do projeto no assistente de IA, mostrando onde isso ficaria.

## Frase de encerramento sugerida
"Com esse prompt universal na manga, sua régua de qualidade fica sempre alta, mesmo fora das Skills fixas. Na próxima aula eu vou mostrar os erros mais comuns que engenheiros cometem usando IA — e como evitar cada um."`,
        order: 2,
      },
      {
        slug: "erros-comuns-e-como-evitar",
        title: "Erros comuns e como evitar",
        description: "Confiar cegamente em número da IA, falta de contexto e esquecer da revisão técnica.",
        script: `## Objetivo da aula
Deixar a pessoa capaz de reconhecer e evitar os três erros mais comuns ao usar IA no trabalho técnico de engenharia.

## Duração estimada
4-5 min

## Roteiro passo a passo

1. FALA: "Pra fechar esse módulo, eu quero te mostrar os três erros mais comuns que vejo engenheiros cometendo quando começam a usar IA no dia a dia — e como evitar cada um deles."
   TELA: tela de abertura simples, com o título "Erros comuns" ou similar, se o app tiver esse recurso; senão, tela inicial do app.

2. FALA: "Erro número um: confiar cegamente em um número que a IA gerou, sem conferir. A IA pode calcular errado, pode partir de uma premissa que não bate com a sua obra, ou simplesmente errar a conta. Ela é uma ferramenta de apoio, não a palavra final."
   TELA: abrir uma conversa de exemplo no assistente de IA mostrando um cálculo numérico gerado pela IA.

3. FALA: "Como evitar: todo número crítico — carga, dimensionamento, quantitativo — precisa passar por uma conferência sua, com sua régua técnica, antes de ir pra qualquer projeto ou proposta."
   TELA: mostrar, ao lado do número gerado, uma anotação ou calculadora simulando a conferência manual.

4. FALA: "Erro número dois: não dar contexto suficiente. Perguntas genéricas geram respostas genéricas. Se você pergunta 'qual a espessura ideal de uma laje' sem dizer o vão, o uso, a norma, a IA vai responder de forma vaga ou vai assumir premissas que podem não bater com a sua realidade."
   TELA: digitar um exemplo de pergunta vaga na conversa e mostrar uma resposta genérica.

5. FALA: "Como evitar: sempre volte pra aula de boas práticas — dados da obra, norma aplicável, e revisão das marcações de premissa antes de aceitar a resposta."
   TELA: reformular a mesma pergunta agora com contexto completo e mostrar a resposta mais precisa e específica.

6. FALA: "Erro número três, e talvez o mais importante: esquecer de revisar e assinar como responsável técnico. A IA não tem CREA, não assume responsabilidade técnica — quem assina o projeto, o laudo ou o memorial é você."
   TELA: mostrar um documento de exemplo (memorial ou laudo) gerado com apoio da IA, com um campo de assinatura/ART em destaque.

7. FALA: "Como evitar: trate todo material gerado com apoio de IA como uma minuta — um ponto de partida que precisa da sua revisão técnica completa antes de virar um documento oficial com sua responsabilidade."
   TELA: mostrar o mesmo documento com anotações de revisão feitas por cima (ou um checklist de revisão).

8. FALA: "Resumindo os três: sempre confira o número, sempre dê contexto completo, e sempre revise e assine como responsável técnico. A IA acelera seu trabalho, mas a responsabilidade continua sendo sua."
   TELA: tela final com os três pontos resumidos, se o app permitir mostrar um resumo em tela.

## Frase de encerramento sugerida
"Com isso a gente fecha o módulo de uso profissional. No próximo módulo eu vou te mostrar como aproveitar a Comunidade do app e pra onde ir depois dessas aulas. Nos vemos lá."`,
        order: 3,
      },
    ],
  },
  {
    slug: "comunidade-proximos-passos",
    title: "Comunidade e próximos passos",
    summary: "Como participar da comunidade e recapitulação do que foi visto até aqui.",
    order: 3,
    lessons: [
      {
        slug: "como-aproveitar-a-comunidade",
        title: "Como aproveitar a Comunidade",
        description: "Como postar um caso, usar tags e por que compartilhar experiência ajuda todo mundo.",
        script: `## Objetivo da aula
Deixar a pessoa capaz de publicar um caso na Comunidade do app usando tags corretamente, e entender por que participar beneficia ela e o grupo.

## Duração estimada
3-4 min

## Roteiro passo a passo

1. FALA: "Vamos falar da Comunidade, uma das partes mais subestimadas do app — e uma das que mais rende valor com o tempo."
   TELA: clicar na aba "Comunidade" no menu principal.

2. FALA: "Aqui você vê os posts de outros engenheiros usando o app: dúvidas, casos resolvidos, dicas de como adaptaram uma Skill pra situação específica deles."
   TELA: mostrar o feed de posts da comunidade, rolando por alguns exemplos.

3. FALA: "Pra postar o seu, clica nesse botão aqui, 'Novo post' (ou o equivalente na tela)."
   TELA: clicar no botão de criar novo post.

4. FALA: "Escreva o caso de forma objetiva: o que você estava tentando resolver, o que a IA te ajudou a fazer, e se teve algum ajuste ou aprendizado no meio do caminho. Não precisa ser longo — o importante é ser útil pra quem for ler depois."
   TELA: digitar um exemplo curto de post no campo de texto (ex.: "Usei a Skill de memorial de cálculo pra uma laje de vão grande, precisei ajustar a premissa de carga acidental e funcionou bem").

5. FALA: "Agora adiciona as tags. Elas ajudam outras pessoas a encontrar seu post quando estiverem buscando por um tema parecido — por exemplo, 'laje', 'memorial-de-calculo', 'nbr-6118'."
   TELA: clicar no campo de tags e adicionar 2-3 tags relacionadas ao post de exemplo.

6. FALA: "Clica em publicar."
   TELA: clicar no botão "Publicar".

7. FALA: "Por que isso importa? Primeiro, porque quando você compartilha um caso, você ajuda outro engenheiro a não travar no mesmo ponto que você travou. Segundo, porque a participação conta pro seu ranking dentro da plataforma — quanto mais você contribui, mais visibilidade e reputação você ganha na comunidade."
   TELA: mostrar o post recém-publicado aparecendo no feed, e em seguida mostrar a tela de ranking (se existir) com a posição do usuário.

8. FALA: "E não esquece: você também pode comentar em posts de outras pessoas, curtir o que achar útil, e usar a busca por tag pra encontrar casos parecidos com o que você está resolvendo agora."
   TELA: mostrar a barra de busca por tag na Comunidade e um exemplo de busca sendo feita.

## Frase de encerramento sugerida
"Toda contribuição sua deixa a comunidade mais forte pra todo mundo, incluindo você no futuro. Na última aula do módulo eu fecho recapitulando tudo o que vimos e te mostro pra onde ir a partir daqui."`,
        order: 1,
      },
      {
        slug: "para-onde-ir-depois",
        title: "Para onde ir depois",
        description: "Recapitulação do conteúdo e convite pra explorar o Bônus e continuar aprendendo.",
        script: `## Objetivo da aula
Deixar a pessoa com uma visão clara de tudo o que foi ensinado nas aulas anteriores e saber exatamente qual é o próximo passo prático depois de terminar o onboarding.

## Duração estimada
3 min

## Roteiro passo a passo

1. FALA: "Chegamos na última aula desse onboarding. Vamos recapitular rapidinho tudo o que você já sabe fazer até aqui."
   TELA: tela inicial do app com o menu completo visível.

2. FALA: "Você já sabe como o app é organizado: Skills, Prompts, Aulas, Bônus e Comunidade."
   TELA: passar o cursor por cada item do menu, um a um.

3. FALA: "Você já sabe instalar uma Skill como instrução fixa no seu assistente de IA, e sabe quando faz mais sentido usar um prompt avulso da biblioteca em vez disso."
   TELA: abrir rapidamente a aba "Skills" e depois a aba "Prompts".

4. FALA: "Você aprendeu a dar contexto de verdade pra IA, revisar as marcações de premissa, usar o prompt universal antes de perguntas soltas, e evitar os três erros mais comuns: confiar cegamente em número, faltar contexto, e esquecer da revisão técnica final."
   TELA: mostrar rapidamente uma conversa de exemplo com uma marcação [PREMISSA] visível, remetendo à aula anterior.

5. FALA: "E você acabou de aprender como postar na Comunidade e por que isso vale a pena a médio prazo."
   TELA: abrir a aba "Comunidade" rapidamente.

6. FALA: "Agora, o próximo passo prático: vai lá na aba Bônus e dá uma olhada nos materiais extras disponíveis. Tem modelo pronto, checklist e outros recursos que vão acelerar ainda mais o seu dia a dia."
   TELA: clicar na aba "Bônus", mostrar a lista de itens disponíveis.

7. FALA: "E o mais importante: sempre que bater uma dúvida nova, sobre qualquer parte do app ou sobre como usar a IA no seu trabalho, volta aqui nas Aulas. Esse conteúdo fica disponível pra você revisar quantas vezes precisar."
   TELA: voltar pra aba "Aulas", mostrando a lista completa dos três módulos concluídos.

8. FALA: "Valeu por chegar até aqui. Agora é hora de colocar em prática: escolhe uma Skill, testa numa obra ou num caso real, e começa a economizar tempo de verdade."
   TELA: tela final, de volta ao painel inicial do app.

## Frase de encerramento sugerida
"Esse foi o fim do onboarding — mas é só o começo do seu uso do app. Bons projetos, e nos vemos na Comunidade."`,
        order: 2,
      },
    ],
  },
];
