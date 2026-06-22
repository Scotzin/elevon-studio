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
  { label: "Quem somos", href: "#sobre" },
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
   6) MODELOS / NICHOS  (vitrine principal)  ->  EDITE OS NICHOS AQUI
   --------------------------------------------------------------------------
   Para adicionar um nicho novo, copie um bloco { ... } e mude os campos.
   - icon:    nome de um ícone (ver lista em components/Icon.tsx)
   - tagline: frase curta de apoio exibida abaixo do nome do nicho.
   - image:   caminho da imagem do nicho dentro da pasta /public
              (ex.: "/images/nichos/barbearia.jpg"). Enquanto o arquivo não
              existir, o card mostra automaticamente um fundo em gradiente com
              o ícone do nicho (fallback), sem quebrar o layout.
   - preview: cole o LINK da prévia online quando tiver. Se ficar "", o botão
              "Ver prévia" abre o WhatsApp pedindo uma demonstração.
   -------------------------------------------------------------------------- */
export const models = [
  {
    id: "barbearia",
    icon: "Scissors",
    name: "Barbearias",
    tagline:
      "Serviços, galeria de cortes, localização e agendamento direto pelo WhatsApp.",
    image: "/images/nichos/barbearia.jpg",
    preview: "",
    popular: true, // marca este card com um selo de destaque
  },
  {
    id: "restaurante",
    icon: "UtensilsCrossed",
    name: "Restaurantes e Pizzarias",
    tagline:
      "Cardápio digital, fotos dos pratos, promoções e pedidos pelo WhatsApp.",
    image: "/images/nichos/restaurante.jpg",
    preview: "",
    popular: false,
  },
  {
    id: "loja-roupas",
    icon: "ShoppingBag",
    name: "Lojas de roupas",
    tagline:
      "Vitrine de produtos e coleções com atendimento direto pelo WhatsApp.",
    image: "/images/nichos/loja-roupas.jpg",
    preview: "",
    popular: false,
  },
  {
    id: "estetica",
    icon: "Sparkles",
    name: "Clínicas e Estéticas",
    tagline:
      "Serviços, antes e depois, depoimentos e agendamento em poucos cliques.",
    image: "/images/nichos/estetica.jpg",
    preview: "",
    popular: false,
  },
  {
    id: "imobiliaria",
    icon: "Building2",
    name: "Imobiliárias",
    tagline:
      "Imóveis em destaque, fotos organizadas e contato rápido com o corretor.",
    image: "/images/nichos/imobiliaria.jpg",
    preview: "",
    popular: false,
  },
  {
    id: "servicos",
    icon: "Wrench",
    name: "Prestadores de serviço",
    tagline:
      "Serviços organizados, orçamentos e contato direto pelo WhatsApp.",
    image: "/images/nichos/servicos.jpg",
    preview: "",
    popular: false,
  },
];

/* --------------------------------------------------------------------------
   7) SEÇÃO "QUEM ESTÁ POR TRÁS DA ELEVON STUDIO"  (equipe)
   -------------------------------------------------------------------------- */
// Texto principal da seção (apresenta a equipe e o que ela faz).
export const aboutParagraphs = [
  "A Elevon Studio é formada por uma equipe focada em ajudar negócios a se posicionarem melhor no digital. Unimos desenvolvimento, estratégia comercial, organização e criatividade para entregar sites modernos, acessíveis e pensados para gerar mais confiança, mais contatos e mais oportunidades para cada cliente.",
];

// Frase de fechamento (tom mais humano), exibida em destaque.
export const aboutClosing =
  "Trabalhamos com dedicação, responsabilidade e proximidade, entregando um trabalho bem-feito e pensado para o crescimento de cada cliente.";

// Pequenos selos de valor (chips) exibidos ao lado do texto.
export const aboutCards = [
  { icon: "Headphones", title: "Atendimento direto" },
  { icon: "PenTool", title: "Projetos personalizados" },
  { icon: "Target", title: "Foco em cada cliente" },
  { icon: "BadgeCheck", title: "Compromisso com qualidade" },
];

/* INTEGRANTES DA EQUIPE  ->  EDITE NOMES, FUNÇÕES E DESCRIÇÕES AQUI */
export const team = [
  {
    name: "Enzo Tofani Ramos",
    role: "Desenvolvimento e Produto Digital",
    text: "Responsável pela criação dos sites, estrutura técnica, publicação, manutenção e melhoria dos modelos por nicho.",
    icon: "Code2",
  },
  {
    name: "Wiliam",
    role: "Comercial e Relacionamento",
    text: "Responsável pela prospecção de clientes, parcerias, reuniões comerciais e identificação de novas oportunidades.",
    icon: "Briefcase",
  },
  {
    name: "André",
    role: "Operação e Atendimento",
    text: "Responsável por organizar informações dos clientes, acompanhar demandas e prazos e manter o fluxo dos projetos mais profissional.",
    icon: "Headphones",
  },
  {
    name: "César",
    role: "Design e Marketing",
    text: "Responsável pelo apoio visual, conteúdo, materiais comerciais, identidade e fortalecimento da comunicação da Elevon Studio.",
    icon: "Palette",
  },
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
    title: "Você chama no WhatsApp",
    text: "Você nos conta qual é o seu negócio e que tipo de site precisa.",
  },
  {
    icon: "LayoutGrid",
    title: "Escolhemos o melhor modelo",
    text: "Você pode usar um modelo pronto como base ou pedir algo personalizado.",
  },
  {
    icon: "PenTool",
    title: "Personalizamos o seu site",
    text: "Adaptamos cores, textos, fotos, serviços, WhatsApp, localização e redes sociais.",
  },
  {
    icon: "Rocket",
    title: "Você aprova e o site vai ao ar",
    text: "Depois da aprovação, publicamos o site e seguimos com suporte e manutenção.",
  },
];

/* --------------------------------------------------------------------------
   10) PLANOS E PREÇOS  ->  TROQUE OS VALORES AQUI
   --------------------------------------------------------------------------
   3 planos exibidos lado a lado. Campos de cada plano:
   - name:        nome do plano
   - setup:       valor da criação do site (mostrado com "A partir de")
   - monthly:     valor da mensalidade (manutenção)
   - description: frase curta explicando para quem é o plano
   - features:    itens inclusos
   - highlighted: true marca o plano como "Mais escolhido" (destaque visual)
   - badge:       texto do selo de destaque (só usado quando highlighted: true)
   -------------------------------------------------------------------------- */
export const plans = [
  {
    name: "Básico",
    setup: "R$ 400",
    monthly: "R$ 100/mês",
    description:
      "Para negócios que querem começar com uma presença digital simples, bonita e funcional.",
    features: [
      "Landing page ou site simples",
      "Layout moderno e responsivo",
      "Botão direto para WhatsApp",
      "Integração com redes sociais",
      "Informações principais do negócio",
      "Publicação na web",
      "Suporte básico",
      "Pequenas alterações mensais combinadas",
    ],
    highlighted: false,
  },
  {
    name: "Médio",
    setup: "R$ 600",
    monthly: "R$ 150/mês",
    description:
      "Para negócios que querem uma apresentação mais completa, profissional e preparada para converter visitantes em contatos.",
    features: [
      "Site com mais seções",
      "Layout mais personalizado",
      "Organização dos serviços",
      "Galeria de imagens",
      "Integração com WhatsApp",
      "Integração com Instagram",
      "Localização com Google Maps",
      "Publicação na web",
      "Suporte mensal",
      "Alterações mensais com maior flexibilidade",
    ],
    highlighted: true,
    badge: "Mais escolhido",
  },
  {
    name: "Premium",
    setup: "R$ 950",
    monthly: "R$ 250/mês",
    description:
      "Para negócios que querem uma presença digital mais forte, estratégica e com acabamento premium.",
    features: [
      "Site completo e mais personalizado",
      "Mais páginas ou seções",
      "Copy mais estratégica",
      "Estrutura visual premium",
      "Formulário de contato ou captação de leads",
      "Galeria avançada ou vitrine de serviços/produtos",
      "Integração com WhatsApp, redes sociais e localização",
      "Suporte prioritário",
      "Melhorias contínuas combinadas",
      "Mais alterações mensais",
    ],
    highlighted: false,
  },
];

// Observação exibida abaixo dos planos.
export const pricingDisclaimer =
  "Os valores podem variar conforme o tipo de site, quantidade de páginas, nível de personalização e funcionalidades desejadas.";

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
      "Não obrigatoriamente. Podemos te orientar sobre domínio, publicação e hospedagem.",
  },
  {
    question: "Vocês fazem site para qualquer nicho?",
    answer:
      "Sim. Temos modelos para vários nichos e também criamos algo personalizado para o seu tipo de negócio.",
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
