/* ==========================================================================
   ARQUIVO CENTRAL DE CONTEÚDO E CONFIGURAÇÃO
   --------------------------------------------------------------------------
   Quase tudo que você vai querer editar no site está AQUI.
   Troque os textos, números e links abaixo e o site inteiro se atualiza.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1) DADOS PRINCIPAIS DA MARCA  ->  TROQUE AQUI
   -------------------------------------------------------------------------- */
export const siteConfig = {
  // Nome da marca exibido no header, rodapé e título da página.
  brand: "Elevon Studio",

  // Nome usado na seção "Quem sou eu".
  personName: "Enzo Tofani Ramos",

  // Frase curta usada em SEO e no rodapé (slogan da marca).
  tagline: "Sites profissionais para negócios que querem crescer no digital.",

  // >>> NÚMERO DO WHATSAPP <<<
  // Formato internacional, SÓ números: 55 (Brasil) + DDD + número.
  // Ex.: "5511999999999".
  whatsappNumber: "5511973200958",

  // >>> LINK DO INSTAGRAM <<<  (troque pelo seu @)
  instagram: "https://www.instagram.com/enzotofani/?hl=pt-br",

  // E-mail de contato (opcional, aparece no rodapé). Deixe "" para esconder.
  email: "enzotofani30@gmail.com",

  // Cidade/região de atendimento (opcional, aparece no rodapé).
  location: "Atendimento online para todo o Brasil",

  // Endereço final do site quando publicado (usado em SEO).
  url: "https://elevon-studio.vercel.app",
};

/* --------------------------------------------------------------------------
   2) GERADOR DE LINK DO WHATSAPP
   -------------------------------------------------------------------------- */
// Monta automaticamente o link do WhatsApp com uma mensagem pronta.
// Não precisa editar esta função - só o número lá em cima.
export function waLink(
  message = "Olá, tenho interesse em criar um site profissional."
) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}

/* --------------------------------------------------------------------------
   3) MENU DE NAVEGAÇÃO (links âncora do header)
   -------------------------------------------------------------------------- */
export const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Modelos", href: "#modelos" },
  { label: "Quem sou eu", href: "#sobre" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Planos", href: "#planos" },
];

/* --------------------------------------------------------------------------
   4) MINI CARDS DO HERO (primeira dobra)
   -------------------------------------------------------------------------- */
export const heroHighlights = [
  { icon: "Sparkles", label: "Site moderno" },
  { icon: "MessageCircle", label: "Botão para WhatsApp" },
  { icon: "Smartphone", label: "100% responsivo" },
  { icon: "ShieldCheck", label: "Hospedagem e suporte" },
  { icon: "LayoutGrid", label: "Personalização por nicho" },
];

/* --------------------------------------------------------------------------
   5) SEÇÃO DE AUTORIDADE / CONFIANÇA
   -------------------------------------------------------------------------- */
// Frases curtas que aparecem como faixa de confiança.
export const trustPhrases = [
  "Sites criados com foco em clareza, aparência profissional e conversão.",
  "Modelos adaptáveis para diferentes tipos de negócio.",
  "Atendimento direto, simples e transparente pelo WhatsApp.",
  "Você acompanha o processo e aprova antes da publicação.",
];

// Cards com ícone da seção de confiança.
export const trustCards = [
  {
    icon: "Palette",
    title: "Visual profissional",
    text: "Design limpo e premium que passa seriedade e valoriza o seu negócio.",
  },
  {
    icon: "Briefcase",
    title: "Adaptado ao seu negócio",
    text: "Cada site é ajustado ao seu nicho, com as seções que fazem sentido para você.",
  },
  {
    icon: "MessageCircle",
    title: "Integração com WhatsApp",
    text: "Botões diretos para o cliente falar com você e fechar pelo WhatsApp.",
  },
  {
    icon: "Wrench",
    title: "Suporte e manutenção",
    text: "Hospedagem, correções simples e pequenas alterações combinadas.",
  },
];

/* --------------------------------------------------------------------------
   6) MODELOS DISPONÍVEIS  (vitrine principal)  ->  EDITE OS MODELOS AQUI
   --------------------------------------------------------------------------
   Para adicionar um modelo novo, copie um bloco { ... } e mude os campos.
   - icon:    nome de um ícone (ver lista em components/Icon.tsx)
   - image:   caminho de um PRINT real do modelo (ex.: "/modelos/barbearia.png"
              dentro da pasta /public). Se ficar "", aparece um mockup
              desenhado em CSS no lugar (já fica bonito).
   - preview: cole o LINK da prévia online quando tiver. Se ficar "", o botão
              "Ver prévia" abre o WhatsApp pedindo uma demonstração.
   -------------------------------------------------------------------------- */
export const models = [
  {
    id: "barbearia",
    icon: "Scissors",
    name: "Barbearia",
    description:
      "Site moderno para barbearias mostrarem serviços, barbeiros, fotos, localização e receberem agendamentos pelo WhatsApp.",
    features: [
      "Serviços e preços",
      "Galeria de cortes",
      "Botão de agendamento",
      "Localização no mapa",
      "Instagram e WhatsApp",
    ],
    image: "", // <-- print real do modelo (opcional)
    preview: "", // <-- link da prévia online (opcional)
    popular: true, // marca este card com um selo de destaque
  },
  {
    id: "restaurante",
    icon: "UtensilsCrossed",
    name: "Pizzaria ou restaurante",
    description:
      "Página profissional para apresentar cardápio, promoções, fotos dos produtos e receber pedidos pelo WhatsApp.",
    features: [
      "Cardápio digital",
      "Promoções em destaque",
      "Fotos dos pratos",
      "Botão de pedido",
      "Localização",
    ],
    image: "",
    preview: "",
    popular: false,
  },
  {
    id: "loja-roupa",
    icon: "ShoppingBag",
    name: "Loja de roupa",
    description:
      "Vitrine online para lojas mostrarem produtos, coleções e direcionarem clientes para a compra pelo WhatsApp.",
    features: [
      "Galeria de produtos",
      "Destaques da loja",
      "Botão de atendimento",
      "Instagram integrado",
      "Página responsiva",
    ],
    image: "",
    preview: "",
    popular: false,
  },
  {
    id: "hamburgueria",
    icon: "Beef",
    name: "Hamburgueria",
    description:
      "Site chamativo e profissional para hamburguerias divulgarem combos, cardápio, promoções e pedidos.",
    features: [
      "Combos em destaque",
      "Cardápio visual",
      "Botão de pedido",
      "Fotos dos produtos",
      "Localização",
    ],
    image: "",
    preview: "",
    popular: false,
  },
  {
    id: "estetica",
    icon: "Sparkles",
    name: "Estética e beleza",
    description:
      "Site elegante para profissionais de estética, manicure, cílios, sobrancelha, cabelo e beleza em geral.",
    features: [
      "Lista de serviços",
      "Antes e depois",
      "Agendamento",
      "Depoimentos",
      "WhatsApp direto",
    ],
    image: "",
    preview: "",
    popular: false,
  },
  {
    id: "loja-virtual",
    icon: "Store",
    name: "Loja virtual / dropshipping",
    description:
      "Estrutura profissional para quem deseja apresentar produtos online com visual confiável e organizado.",
    features: [
      "Página de produtos",
      "Categorias",
      "Produtos em destaque",
      "Página institucional",
      "Botão de compra ou atendimento",
    ],
    image: "",
    preview: "",
    popular: false,
  },
];

/* --------------------------------------------------------------------------
   7) SEÇÃO "QUEM SOU EU"
   -------------------------------------------------------------------------- */
export const aboutParagraphs = [
  "Sou Enzo Tofani Ramos, criador da Elevon Studio. Desenvolvo sites profissionais para pequenos negócios que querem melhorar sua presença digital, organizar seus serviços e facilitar o contato com clientes pelo WhatsApp.",
  "A Elevon Studio nasceu com o objetivo de entregar sites modernos, objetivos e acessíveis para empreendedores que precisam transmitir mais confiança na internet.",
  "Meu foco é criar páginas bonitas, rápidas e funcionais, com atenção aos detalhes, comunicação clara e uma experiência simples para o cliente. Cada projeto é pensado para valorizar o negócio, facilitar o atendimento e ajudar a marca a se apresentar de forma mais profissional.",
];

// Frase de fechamento (tom mais humano), exibida em destaque.
export const aboutClosing =
  "Estou construindo minha trajetória com dedicação, responsabilidade e vontade de crescer entregando um trabalho bem-feito para cada cliente.";

export const aboutCards = [
  { icon: "Headphones", title: "Atendimento direto" },
  { icon: "PenTool", title: "Projetos personalizados" },
  { icon: "Target", title: "Foco em pequenos negócios" },
  { icon: "BadgeCheck", title: "Compromisso com qualidade" },
];

/* --------------------------------------------------------------------------
   8) DEPOIMENTOS  ->  TROQUE OS TEXTOS QUANDO TIVER REAIS
   --------------------------------------------------------------------------
   Use identificações genéricas (sem inventar nomes reais) enquanto não
   tiver depoimentos verdadeiros.
   -------------------------------------------------------------------------- */
export const testimonials = [
  {
    quote:
      "O site deixou meus serviços muito mais organizados e fáceis de apresentar para os clientes.",
    author: "Cliente de barbearia",
  },
  {
    quote:
      "Agora consigo enviar um link profissional, com WhatsApp, localização e as informações do meu negócio.",
    author: "Cliente de loja",
  },
  {
    quote:
      "A página ficou limpa, rápida e com uma aparência muito mais profissional.",
    author: "Cliente de restaurante",
  },
];

/* --------------------------------------------------------------------------
   9) COMO FUNCIONA (passo a passo)
   -------------------------------------------------------------------------- */
export const steps = [
  {
    icon: "MessageCircle",
    title: "Você me chama no WhatsApp",
    text: "Você me conta qual é o seu negócio e que tipo de site precisa.",
  },
  {
    icon: "LayoutGrid",
    title: "Escolhemos o melhor modelo",
    text: "Você pode usar um modelo pronto como base ou pedir algo personalizado.",
  },
  {
    icon: "PenTool",
    title: "Eu personalizo o site",
    text: "Adapto cores, textos, fotos, serviços, WhatsApp, localização e redes sociais.",
  },
  {
    icon: "Rocket",
    title: "Você aprova e o site vai ao ar",
    text: "Depois da aprovação, publico o site e sigo com suporte e manutenção.",
  },
];

/* --------------------------------------------------------------------------
   10) PLANOS E PREÇOS  ->  TROQUE OS VALORES AQUI
   -------------------------------------------------------------------------- */
export const pricing = {
  planName: "Site Profissional",
  price: "A partir de R$400", // <-- valor da criação do site
  priceNote: "Criação do site + personalização inicial.",
  includes: [
    "Layout moderno",
    "Página 100% responsiva",
    "Botão para WhatsApp",
    "Seções do seu negócio",
    "Integração com redes sociais",
    "Publicação na web",
  ],
  monthly: "Manutenção a partir de R$100/mês", // <-- valor da mensalidade
  monthlyNote:
    "Inclui hospedagem, suporte, correções simples e pequenas alterações combinadas.",
  disclaimer:
    "O valor final pode variar conforme o tipo de site, quantidade de páginas e funcionalidades desejadas.",
};

/* --------------------------------------------------------------------------
   11) FAQ (perguntas frequentes)
   -------------------------------------------------------------------------- */
export const faq = [
  {
    question: "Quanto tempo demora para ficar pronto?",
    answer:
      "Depende do tipo de site, mas modelos simples podem ficar prontos em poucos dias após o envio das informações.",
  },
  {
    question: "Preciso ter domínio?",
    answer:
      "Não obrigatoriamente. Posso te orientar sobre domínio, publicação e hospedagem.",
  },
  {
    question: "Você faz site para qualquer nicho?",
    answer:
      "Sim. Tenho modelos para alguns nichos, mas também posso criar algo personalizado para o seu tipo de negócio.",
  },
  {
    question: "A mensalidade é obrigatória?",
    answer:
      "Sim, a mensalidade mantém o site no ar com suporte, hospedagem, correções simples e pequenas alterações.",
  },
  {
    question: "Posso pedir alterações depois?",
    answer:
      "Sim. Pequenas alterações fazem parte da manutenção mensal, conforme combinado.",
  },
];
