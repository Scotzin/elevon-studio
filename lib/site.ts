/* ==========================================================================
   ARQUIVO CENTRAL DE CONTEUDO E CONFIGURACAO
   --------------------------------------------------------------------------
   Quase tudo que voce vai querer editar no site esta AQUI.
   Troque os textos, numeros e links abaixo e o site inteiro se atualiza.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1) DADOS PRINCIPAIS DA MARCA  ->  TROQUE AQUI
   -------------------------------------------------------------------------- */
export const siteConfig = {
  // Nome da marca exibido no header, rodape e titulo da pagina.
  brand: "Elevon Studio",

  // Nome e idade usados na secao "Quem sou eu".
  personName: "Enzo Tofani Ramos",
  personAge: 18,

  // Frase curta usada em SEO e no rodape (slogan da marca).
  tagline: "Sites profissionais para negocios que querem crescer no digital.",

  // >>> NUMERO DO WHATSAPP <<<
  // Formato internacional, SO numeros: 55 (Brasil) + DDD + numero.
  // Ex.: "5511999999999". Troque "55SEUNUMERO" pelo seu numero real.
  whatsappNumber: "5511973200958",

  // >>> LINK DO INSTAGRAM <<<  (troque pelo seu @)
  instagram: "https://www.instagram.com/enzotofani/?hl=pt-br",

  // E-mail de contato (opcional, aparece no rodape). Deixe "" para esconder.
  email: "enzotofani30@gmail.com",

  // Cidade/regiao de atendimento (opcional, aparece no rodape).
  location: "Atendimento online para todo o Brasil",

  // Endereco final do site quando publicado (usado em SEO). Troque ao publicar.
  url: "https://elevon-studio.vercel.app",
};

/* --------------------------------------------------------------------------
   2) GERADOR DE LINK DO WHATSAPP
   -------------------------------------------------------------------------- */
// Monta automaticamente o link do WhatsApp com uma mensagem pronta.
// Nao precisa editar esta funcao - so o numero la em cima.
export function waLink(
  message = "Ola, tenho interesse em criar um site profissional."
) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}

/* --------------------------------------------------------------------------
   3) MENU DE NAVEGACAO (links ancora do header)
   -------------------------------------------------------------------------- */
export const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Modelos", href: "#modelos" },
  { label: "Quem sou eu", href: "#sobre" },
  { label: "Feedbacks", href: "#feedbacks" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Planos", href: "#planos" },
];

/* --------------------------------------------------------------------------
   4) MINI CARDS DO HERO (primeira dobra)
   -------------------------------------------------------------------------- */
export const heroHighlights = [
  { icon: "Sparkles", label: "Site moderno" },
  { icon: "MessageCircle", label: "Botao para WhatsApp" },
  { icon: "Smartphone", label: "100% responsivo" },
  { icon: "ShieldCheck", label: "Hospedagem e suporte" },
  { icon: "LayoutGrid", label: "Personalizacao por nicho" },
];

/* --------------------------------------------------------------------------
   5) SECAO DE AUTORIDADE / CONFIANCA
   -------------------------------------------------------------------------- */
// Frases curtas que aparecem como faixa de confianca.
export const trustPhrases = [
  "Sites criados com foco em clareza, aparencia profissional e conversao.",
  "Modelos adaptaveis para diferentes tipos de negocio.",
  "Atendimento direto, simples e transparente pelo WhatsApp.",
  "Voce acompanha o processo e aprova antes da publicacao.",
];

// Cards com icone da secao de confianca.
export const trustCards = [
  {
    icon: "Palette",
    title: "Visual profissional",
    text: "Design limpo e premium que passa seriedade e valoriza o seu negocio.",
  },
  {
    icon: "Briefcase",
    title: "Adaptado ao seu negocio",
    text: "Cada site e ajustado ao seu nicho, com as secoes que fazem sentido para voce.",
  },
  {
    icon: "MessageCircle",
    title: "Integracao com WhatsApp",
    text: "Botoes diretos para o cliente falar com voce e fechar pelo WhatsApp.",
  },
  {
    icon: "Wrench",
    title: "Suporte e manutencao",
    text: "Hospedagem, correcoes simples e pequenas alteracoes combinadas.",
  },
];

/* --------------------------------------------------------------------------
   6) MODELOS DISPONIVEIS  (vitrine principal)  ->  EDITE OS MODELOS AQUI
   --------------------------------------------------------------------------
   Para adicionar um modelo novo, copie um bloco { ... } e mude os campos.
   - icon: nome de um icone (ver lista em components/Icon.tsx)
   - preview: cole o LINK da previa online do modelo quando tiver.
              Deixe "" (vazio) para esconder o botao "Ver previa".
   -------------------------------------------------------------------------- */
export const models = [
  {
    id: "barbearia",
    icon: "Scissors",
    name: "Barbearia",
    description:
      "Site moderno para barbearias mostrarem servicos, barbeiros, fotos, localizacao e receberem agendamentos pelo WhatsApp.",
    features: [
      "Servicos e precos",
      "Galeria de cortes",
      "Botao de agendamento",
      "Localizacao no mapa",
      "Instagram e WhatsApp",
    ],
    preview: "", // <-- cole aqui o link da previa, ex.: "https://demo-barbearia.vercel.app"
    popular: true, // marca este card com um selo de destaque
  },
  {
    id: "restaurante",
    icon: "UtensilsCrossed",
    name: "Pizzaria ou restaurante",
    description:
      "Pagina profissional para apresentar cardapio, promocoes, fotos dos produtos e receber pedidos pelo WhatsApp.",
    features: [
      "Cardapio digital",
      "Promocoes em destaque",
      "Fotos dos pratos",
      "Botao de pedido",
      "Localizacao",
    ],
    preview: "",
    popular: false,
  },
  {
    id: "loja-roupa",
    icon: "ShoppingBag",
    name: "Loja de roupa",
    description:
      "Vitrine online para lojas mostrarem produtos, colecoes e direcionarem clientes para a compra pelo WhatsApp.",
    features: [
      "Galeria de produtos",
      "Destaques da loja",
      "Botao de atendimento",
      "Instagram integrado",
      "Pagina responsiva",
    ],
    preview: "",
    popular: false,
  },
  {
    id: "hamburgueria",
    icon: "Beef",
    name: "Hamburgueria",
    description:
      "Site chamativo e profissional para hamburguerias divulgarem combos, cardapio, promocoes e pedidos.",
    features: [
      "Combos em destaque",
      "Cardapio visual",
      "Botao de pedido",
      "Fotos dos produtos",
      "Localizacao",
    ],
    preview: "",
    popular: false,
  },
  {
    id: "estetica",
    icon: "Sparkles",
    name: "Estetica e beleza",
    description:
      "Site elegante para profissionais de estetica, manicure, cilios, sobrancelha, cabelo e beleza em geral.",
    features: [
      "Lista de servicos",
      "Antes e depois",
      "Agendamento",
      "Depoimentos",
      "WhatsApp direto",
    ],
    preview: "",
    popular: false,
  },
  {
    id: "loja-virtual",
    icon: "Store",
    name: "Loja virtual / dropshipping",
    description:
      "Estrutura profissional para quem deseja apresentar produtos online com visual confiavel e organizado.",
    features: [
      "Pagina de produtos",
      "Categorias",
      "Produtos em destaque",
      "Pagina institucional",
      "Botao de compra ou atendimento",
    ],
    preview: "",
    popular: false,
  },
];

/* --------------------------------------------------------------------------
   7) SECAO "QUEM SOU EU"
   -------------------------------------------------------------------------- */
export const aboutParagraphs = [
  "Meu nome e Enzo Tofani Ramos, tenho 18 anos e estou construindo minha trajetoria criando sites profissionais para pequenos negocios. Comecei esse projeto com a intencao de crescer na vida fazendo algo util, moderno e que realmente ajude empreendedores a se posicionarem melhor na internet.",
  "Meu foco e criar sites bonitos, diretos e funcionais, sem enrolacao. A ideia e entregar uma presenca digital mais profissional para quem hoje depende apenas do Instagram, WhatsApp ou indicacoes.",
  "Mesmo sendo jovem, levo cada projeto com responsabilidade, atencao aos detalhes e compromisso com o resultado. Meu objetivo e que cada cliente tenha um site que passe confianca, facilite o contato e ajude o negocio a ser visto de forma mais profissional.",
];

export const aboutCards = [
  { icon: "Headphones", title: "Atendimento direto" },
  { icon: "PenTool", title: "Projetos personalizados" },
  { icon: "Target", title: "Foco em pequenos negocios" },
  { icon: "BadgeCheck", title: "Compromisso com qualidade" },
];

/* --------------------------------------------------------------------------
   8) FEEDBACKS / DEPOIMENTOS  ->  TROQUE OS TEXTOS QUANDO TIVER REAIS
   -------------------------------------------------------------------------- */
export const testimonials = [
  {
    quote:
      "O site ficou muito mais profissional do que eu imaginava. Agora consigo mostrar meus servicos de um jeito muito melhor.",
    author: "Cliente de barbearia",
  },
  {
    quote:
      "Atendimento rapido, visual bonito e tudo bem explicado. Ficou facil mandar o link para os clientes.",
    author: "Cliente de loja",
  },
  {
    quote:
      "Antes eu dependia so do Instagram. Agora tenho uma pagina propria com WhatsApp, localizacao e meus servicos organizados.",
    author: "Cliente de restaurante",
  },
];

/* --------------------------------------------------------------------------
   9) COMO FUNCIONA (passo a passo)
   -------------------------------------------------------------------------- */
export const steps = [
  {
    icon: "MessageCircle",
    title: "Voce me chama no WhatsApp",
    text: "Voce me fala qual e o seu negocio e que tipo de site precisa.",
  },
  {
    icon: "LayoutGrid",
    title: "Escolhemos o melhor modelo",
    text: "Voce pode usar um modelo pronto como base ou pedir algo personalizado.",
  },
  {
    icon: "PenTool",
    title: "Eu personalizo o site",
    text: "Adapto cores, textos, fotos, servicos, WhatsApp, localizacao e redes sociais.",
  },
  {
    icon: "Rocket",
    title: "Voce aprova e o site vai ao ar",
    text: "Depois da aprovacao, publico o site e sigo com suporte e manutencao.",
  },
];

/* --------------------------------------------------------------------------
   10) PLANOS E PRECOS  ->  TROQUE OS VALORES AQUI
   -------------------------------------------------------------------------- */
export const pricing = {
  planName: "Site Profissional",
  price: "A partir de R$400", // <-- valor da criacao do site
  priceNote: "Criacao do site + personalizacao inicial.",
  includes: [
    "Layout moderno",
    "Pagina 100% responsiva",
    "Botao para WhatsApp",
    "Secoes do seu negocio",
    "Integracao com redes sociais",
    "Publicacao na web",
  ],
  monthly: "Manutencao a partir de R$100/mes", // <-- valor da mensalidade
  monthlyNote:
    "Inclui hospedagem, suporte, correcoes simples e pequenas alteracoes combinadas.",
  disclaimer:
    "O valor final pode variar conforme o tipo de site, quantidade de paginas e funcionalidades desejadas.",
};

/* --------------------------------------------------------------------------
   11) FAQ (perguntas frequentes)
   -------------------------------------------------------------------------- */
export const faq = [
  {
    question: "Quanto tempo demora para ficar pronto?",
    answer:
      "Depende do tipo de site, mas modelos simples podem ficar prontos em poucos dias apos o envio das informacoes.",
  },
  {
    question: "Preciso ter dominio?",
    answer:
      "Nao obrigatoriamente. Posso te orientar sobre dominio, publicacao e hospedagem.",
  },
  {
    question: "Voce faz site para qualquer nicho?",
    answer:
      "Sim. Tenho modelos para alguns nichos, mas tambem posso criar algo personalizado para o seu tipo de negocio.",
  },
  {
    question: "A mensalidade e obrigatoria?",
    answer:
      "Sim, a mensalidade mantem o site no ar com suporte, hospedagem, correcoes simples e pequenas alteracoes.",
  },
  {
    question: "Posso pedir alteracoes depois?",
    answer:
      "Sim. Pequenas alteracoes fazem parte da manutencao mensal, conforme combinado.",
  },
];
