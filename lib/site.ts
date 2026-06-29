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
  instagram: "https://www.instagram.com/elevonstudio.digital/",

  // E-mail de contato (opcional, aparece no rodapé). Deixe "" para esconder.
  email: "elevonstudio.digital@gmail.com",

  // Cidade/região de atendimento (opcional, aparece no rodapé).
  location: "Atendimento online para todo o Brasil",

  // Endereço final do site quando publicado (usado em SEO, OG, sitemap).
  // Quando tiver domínio próprio, defina NEXT_PUBLIC_SITE_URL nas env vars da
  // Vercel (ex.: https://elevonstudio.com.br) — não precisa mexer no código.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://elevon-studio.vercel.app",
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
              (ex.: "/images/nichos/barbearia.png"). Enquanto o arquivo não
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
    image: "/images/nichos/barbearia.png",
    preview: "/previa/barbearia",
    popular: true, // marca este card com um selo de destaque
  },
  {
    id: "restaurante",
    icon: "UtensilsCrossed",
    name: "Restaurantes",
    tagline:
      "Cardápio digital, fotos dos pratos, promoções e pedidos pelo WhatsApp.",
    image: "/images/nichos/restaurante.png",
    preview: "/previa/restaurante",
    popular: false,
  },
  {
    id: "loja-roupas",
    icon: "ShoppingBag",
    name: "Lojas de roupas",
    tagline:
      "Vitrine de produtos e coleções com atendimento direto pelo WhatsApp.",
    image: "/images/nichos/loja-roupas.png",
    preview: "/previa/loja-roupas",
    popular: false,
  },
  {
    id: "estetica",
    icon: "Sparkles",
    name: "Clínicas e Estéticas",
    tagline:
      "Serviços, antes e depois, depoimentos e agendamento em poucos cliques.",
    image: "/images/nichos/estetica.png",
    preview: "/previa/estetica",
    popular: false,
  },
  {
    id: "imobiliaria",
    icon: "Building2",
    name: "Imobiliárias",
    tagline:
      "Imóveis em destaque, fotos organizadas e contato rápido com o corretor.",
    image: "/images/nichos/imobiliaria.png",
    preview: "/previa/imobiliaria",
    popular: false,
  },
  {
    id: "servicos",
    icon: "Wrench",
    name: "Prestadores de serviço",
    tagline:
      "Serviços organizados, orçamentos e contato direto pelo WhatsApp.",
    image: "/images/nichos/servicos.png",
    preview: "/previa/servicos",
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
    role: "Design e Marketing",
    text: "Responsável pelo apoio visual, conteúdo, materiais comerciais, identidade e fortalecimento da comunicação da Elevon Studio.",
    icon: "Palette",
  },
  {
    name: "César",
    role: "Operação e Atendimento",
    text: "Responsável por organizar informações dos clientes, acompanhar demandas e prazos e manter o fluxo dos projetos mais profissional.",
    icon: "Headphones",
  },
];

/* --------------------------------------------------------------------------
   8) DEPOIMENTOS
   --------------------------------------------------------------------------
   Estrutura pronta para depoimentos REAIS. Enquanto não houver, ficam exemplos
   ILUSTRATIVOS (placeholder: true) — sem inventar clientes/nomes reais. O site
   mostra uma nota honesta quando só há exemplos.

   Quando tiver um depoimento de verdade: copie o MODELO comentado abaixo,
   preencha e remova o `placeholder`. Campos opcionais: business, nicho, city,
   rating (1–5, padrão 5), photo (foto em /public/images/depoimentos/),
   link (Instagram/site do cliente) e verified (mostra o selo "verificado").
   -------------------------------------------------------------------------- */
export type Testimonial = {
  quote: string;
  author: string;
  business?: string;
  nicho?: string;
  city?: string;
  rating?: number;
  photo?: string;
  link?: string;
  verified?: boolean;
  placeholder?: boolean;
};

export const testimonials: Testimonial[] = [
  // ▼ MODELO DE DEPOIMENTO REAL — copie, preencha e remova o "placeholder":
  // {
  //   quote: "O site ficou do jeitinho que eu queria e já chegaram clientes pelo WhatsApp.",
  //   author: "Nailson Jr.",
  //   business: "Nailson Store",
  //   nicho: "Loja de roupas",
  //   city: "Salvador, BA",
  //   rating: 5,
  //   photo: "/images/depoimentos/nailson.jpg", // opcional (veja o README da pasta)
  //   link: "https://www.instagram.com/...",     // opcional
  //   verified: true,
  // },

  // Exemplos ilustrativos (troque pelos reais assim que tiver):
  {
    quote:
      "O site deixou meus serviços muito mais organizados e fáceis de apresentar para os clientes.",
    author: "Cliente atendido",
    nicho: "Barbearia",
    placeholder: true,
  },
  {
    quote:
      "Agora envio um link profissional, com WhatsApp, localização e tudo sobre o meu negócio.",
    author: "Cliente atendido",
    nicho: "Loja",
    placeholder: true,
  },
  {
    quote: "A página ficou limpa, rápida e com uma cara muito mais profissional.",
    author: "Cliente atendido",
    nicho: "Restaurante",
    placeholder: true,
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
      "Site simples e responsivo",
      "Layout moderno",
      "Botão para WhatsApp",
      "Integração com redes sociais",
      "Informações principais do negócio",
      "Publicação na web",
      "Manutenção mensal",
      "Alterações simples inclusas",
    ],
    highlighted: false,
  },
  {
    name: "Profissional",
    setup: "R$ 600",
    monthly: "R$ 150/mês",
    description:
      "Para negócios que querem uma apresentação mais completa, organizada e preparada para converter visitantes em clientes.",
    features: [
      "Site com mais seções",
      "Layout mais personalizado",
      "Textos mais comerciais",
      "Galeria de imagens",
      "Depoimentos de clientes",
      "Localização com Google Maps",
      "Botões estratégicos para WhatsApp",
      "SEO básico",
      "Manutenção mensal",
      "Alterações simples inclusas",
    ],
    highlighted: true,
    badge: "Mais escolhido",
  },
  {
    name: "Premium",
    setup: "R$ 950",
    monthly: "R$ 250/mês",
    description:
      "Para empresas que querem um site mais forte, completo e com aparência de alto nível.",
    features: [
      "Site completo e mais personalizado",
      "Visual premium",
      "Copy estratégica",
      "Galeria ou vitrine premium",
      "Formulário de contato",
      "Funil para WhatsApp",
      "SEO mais completo",
      "Google Analytics",
      "Suporte prioritário",
      "Melhorias contínuas combinadas",
      "Alterações simples inclusas com prioridade",
    ],
    highlighted: false,
  },
];

// Observação exibida abaixo dos planos.
export const pricingDisclaimer =
  "Alterações simples estão inclusas na mensalidade. Novas páginas, novas funcionalidades ou mudanças grandes podem ser orçadas à parte.";

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
