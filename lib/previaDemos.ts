/* ==========================================================================
   DADOS DAS PRÉVIAS (demos) POR NICHO
   --------------------------------------------------------------------------
   Cada nicho tem o SEU PRÓPRIO layout (components/previa/layouts/*) — uma
   barbearia não se parece com uma loja de roupa, um restaurante tem cardápio,
   uma imobiliária tem ficha de imóvel, e assim por diante.

   O campo `layout` decide qual componente renderiza. Para editar o conteúdo
   de um nicho, mexa só aqui. Os campos comuns (hero, sobre, depoimentos,
   stats, faq, promo, contact) existem em todos; o resto é específico do nicho.
   As seções aparecem conforme o plano (Básico / Profissional / Premium) —
   isso é decidido dentro de cada layout.
   ========================================================================== */

export type Diferencial = { icon: string; title: string; text: string };
export type Depoimento = { nome: string; texto: string };
export type Faq = { q: string; a: string };
export type Stat = { value: string; label: string };
export type Contact = { address: string; hours: string; phone?: string };

/* Campos comuns a TODOS os nichos. */
type BaseDemo = {
  business: string; // nome fictício do negócio
  nicho: string; // rótulo usado na mensagem do WhatsApp
  icon: string; // ícone do nicho (placeholder nas fotos)
  accent: string; // cor de destaque (hex)
  ctaShort: string; // texto curto do botão (header/cards)
  ctaHero: string; // texto do botão principal do hero
  hero: { eyebrow: string; title: string; subtitle: string };
  diferenciais: Diferencial[]; // Básico+
  sobre: string; // Básico+
  depoimentos: Depoimento[]; // Profissional+
  stats: Stat[]; // Premium
  faq: Faq[]; // Premium
  promo: string; // Premium (faixa superior)
  contact: Contact; // endereço/horário (rodapé de contato)
};

/* ---- BARBEARIA: serviços (lista de preço) + barbeiros + agendamento ----- */
export type BarbeariaDemo = BaseDemo & {
  layout: "barbearia";
  services: { name: string; price: string; desc?: string; tag?: string }[];
  barbers: { name: string; role: string }[];
  clube: { title: string; text: string; price: string; perks: string[] }; // Premium
};

/* ---- RESTAURANTE: cardápio por seções + delivery + combo destaque ------- */
export type RestauranteDemo = BaseDemo & {
  layout: "restaurante";
  delivery: { time: string; fee: string; min: string };
  menu: {
    category: string;
    icon: string;
    items: { name: string; desc: string; price: string; tag?: string }[];
  }[];
  destaque: { name: string; desc: string; price: string }; // combo do dia
};

/* ---- LOJA DE ROUPAS: vitrine de produtos + cupom + frete (e-commerce) --- */
export type LojaDemo = BaseDemo & {
  layout: "loja";
  categories: string[];
  products: { name: string; price: string; oldPrice?: string; tag?: string }[];
  bestSellers: { name: string; price: string }[]; // Premium
  coupon: { code: string; title: string; subtitle: string; button: string }; // Premium
};

/* ---- ESTÉTICA: tratamentos + antes/depois + pacotes + profissionais ----- */
export type EsteticaDemo = BaseDemo & {
  layout: "estetica";
  treatments: {
    category: string;
    icon: string;
    items: { name: string; price: string; duration?: string; tag?: string }[];
  }[];
  beforeAfter: { label: string }[]; // Premium
  pacotes: { name: string; text: string; price: string; highlight?: boolean }[]; // Premium
  profissionais: { name: string; role: string }[];
};

/* ---- IMOBILIÁRIA: ficha de imóvel (quartos/banh/m²/vaga) + filtros ------ */
export type ImobiliariaDemo = BaseDemo & {
  layout: "imobiliaria";
  filters: string[];
  properties: {
    title: string;
    price: string;
    deal: string; // "Venda" | "Aluguel"
    beds: number;
    baths: number;
    area: string;
    parking: number;
    neighborhood: string;
    tag?: string;
  }[];
  corretores: { name: string; role: string }[]; // Premium
};

/* ---- PRESTADOR DE SERVIÇOS: serviços + orçamento + cobertura + garantia - */
export type ServicosDemo = BaseDemo & {
  layout: "servicos";
  services: { icon: string; name: string; price: string; text: string; tag?: string }[];
  comoFunciona: { icon: string; title: string; text: string }[];
  coverage: string;
  garantia: string;
};

export type PreviaDemo =
  | BarbeariaDemo
  | RestauranteDemo
  | LojaDemo
  | EsteticaDemo
  | ImobiliariaDemo
  | ServicosDemo;

export const previaDemos: Record<string, PreviaDemo> = {
  /* ===================================================================== */
  barbearia: {
    layout: "barbearia",
    business: "Navalha Barbearia",
    nicho: "barbearia",
    icon: "Scissors",
    accent: "#c79a3a",
    ctaShort: "Agendar",
    ctaHero: "Agendar horário",
    hero: {
      eyebrow: "Desde 2018 · Tradição & estilo",
      title: "Corte afiado, visual no ponto.",
      subtitle:
        "Corte, barba e cuidado masculino com barbeiros que entendem do seu estilo. Escolha o horário e agende em segundos pelo WhatsApp.",
    },
    diferenciais: [
      { icon: "Calendar", title: "Agende pelo WhatsApp", text: "Escolha o horário e pronto — sem fila e sem espera." },
      { icon: "Star", title: "Barbeiros experientes", text: "Profissionais que entendem do seu corte." },
      { icon: "Sparkles", title: "Ambiente premium", text: "Um espaço pensado para o seu momento." },
    ],
    sobre:
      "Na Navalha, cada corte é feito com capricho. Ambiente acolhedor, profissionais de confiança e aquele acabamento que faz a diferença no seu visual.",
    services: [
      { name: "Corte masculino", price: "R$ 45", desc: "Tesoura ou máquina, lavagem e finalização." },
      { name: "Barba completa", price: "R$ 35", desc: "Toalha quente, navalha e hidratação." },
      { name: "Combo corte + barba", price: "R$ 70", desc: "O pacote completo, do corte ao acabamento.", tag: "Mais pedido" },
      { name: "Pézinho / acabamento", price: "R$ 20", desc: "Aquele retoque entre um corte e outro." },
      { name: "Sobrancelha na navalha", price: "R$ 15", desc: "Alinhamento certeiro do olhar." },
      { name: "Pigmentação / disfarçado", price: "R$ 55", desc: "Realce e cobertura com naturalidade." },
    ],
    barbers: [
      { name: "Rafael", role: "Barbeiro master" },
      { name: "Diego", role: "Especialista em barba" },
      { name: "Léo", role: "Cortes clássicos & fade" },
    ],
    clube: {
      title: "Clube do Cavalheiro",
      text: "Assinatura mensal com cortes ilimitados, horário exclusivo e preço fixo. Cuide do visual o mês todo.",
      price: "R$ 119/mês",
      perks: ["Cortes ilimitados", "Agendamento prioritário", "10% off em produtos", "Barba com desconto"],
    },
    depoimentos: [
      { nome: "Lucas M.", texto: "Melhor barbearia da região. Atendimento e corte nota 10." },
      { nome: "Diego R.", texto: "Agendo tudo pelo WhatsApp, super prático. Recomendo!" },
      { nome: "Paulo H.", texto: "Ambiente top e profissionais que sabem o que fazem." },
    ],
    stats: [
      { value: "+5.000", label: "cortes realizados" },
      { value: "4.9 ★", label: "avaliação média" },
      { value: "6 anos", label: "de experiência" },
    ],
    faq: [
      { q: "Preciso agendar?", a: "Recomendamos agendar pelo WhatsApp para garantir seu horário." },
      { q: "Quais as formas de pagamento?", a: "Dinheiro, Pix e cartão em todas as bandeiras." },
      { q: "Tem estacionamento?", a: "Sim, temos vagas na frente e ao redor da barbearia." },
    ],
    promo: "Clube do Cavalheiro: assine e tenha cortes ilimitados com horário exclusivo",
    contact: { address: "Av. Principal, 456 — Centro", hours: "Ter a Sáb, 9h às 20h" },
  },

  /* ===================================================================== */
  restaurante: {
    layout: "restaurante",
    business: "Cantina Bella",
    nicho: "restaurante",
    icon: "UtensilsCrossed",
    accent: "#c2410c",
    ctaShort: "Pedir",
    ctaHero: "Fazer pedido pelo WhatsApp",
    hero: {
      eyebrow: "Comida caseira de verdade",
      title: "Sabor que abraça.",
      subtitle:
        "Pratos caseiros, ingredientes frescos e aquele tempero especial. Peça pelo WhatsApp e receba quentinho na sua casa.",
    },
    diferenciais: [
      { icon: "MessageCircle", title: "Peça pelo WhatsApp", text: "Faça seu pedido em segundos, sem complicação." },
      { icon: "Truck", title: "Entrega quentinha", text: "Seu pedido chega rápido e na temperatura certa." },
      { icon: "Sparkles", title: "Ingredientes frescos", text: "Tudo preparado na hora, com qualidade." },
    ],
    sobre:
      "A Cantina Bella serve o melhor da comida caseira com um toque especial. Ambiente aconchegante e pratos que viram saudade.",
    delivery: { time: "30–45 min", fee: "Entrega grátis acima de R$ 60", min: "Pedido mínimo R$ 25" },
    menu: [
      {
        category: "Entradas",
        icon: "UtensilsCrossed",
        items: [
          { name: "Bruschetta da casa", desc: "Pão italiano, tomate, alho e manjericão.", price: "R$ 28" },
          { name: "Bolinho de bacalhau", desc: "6 unidades douradas, crocantes por fora.", price: "R$ 34" },
        ],
      },
      {
        category: "Pratos principais",
        icon: "ChefHat",
        items: [
          { name: "Lasanha à Bolonhesa", desc: "Massa fresca e molho da casa, gratinada.", price: "R$ 45", tag: "Mais pedido" },
          { name: "Filé com fritas", desc: "Filé mignon grelhado e batata rústica.", price: "R$ 49" },
          { name: "Risoto de camarão", desc: "Camarões salteados no alho e vinho branco.", price: "R$ 58" },
        ],
      },
      {
        category: "Pizzas",
        icon: "Flame",
        items: [
          { name: "Margherita", desc: "Muçarela de búfala, tomate e manjericão.", price: "R$ 52" },
          { name: "Calabresa especial", desc: "Calabresa artesanal, cebola e azeitona.", price: "R$ 48" },
        ],
      },
      {
        category: "Sobremesas",
        icon: "Gift",
        items: [
          { name: "Petit Gateau", desc: "Quentinho, com sorvete de creme.", price: "R$ 24" },
          { name: "Tiramisù", desc: "Receita italiana clássica da casa.", price: "R$ 22" },
        ],
      },
    ],
    destaque: {
      name: "Combo Família",
      desc: "Pizza grande + lasanha + sobremesa + refrigerante 2L. Perfeito para a noite em família.",
      price: "R$ 119",
    },
    depoimentos: [
      { nome: "Carla F.", texto: "Comida maravilhosa e entrega rápida. Virou nosso restaurante favorito." },
      { nome: "André L.", texto: "Peço pelo WhatsApp toda semana. Atendimento impecável." },
      { nome: "Bia S.", texto: "Os pratos são caprichados e chegam quentinhos. Recomendo!" },
    ],
    stats: [
      { value: "+10 mil", label: "pedidos entregues" },
      { value: "4.8 ★", label: "avaliação média" },
      { value: "30 min", label: "entrega média" },
    ],
    faq: [
      { q: "Qual o tempo de entrega?", a: "Em média 30 a 45 minutos, dependendo da sua região." },
      { q: "Aceita reservas?", a: "Sim! Reserve sua mesa pelo WhatsApp." },
      { q: "Formas de pagamento?", a: "Pix, dinheiro e cartão na entrega ou pelo link." },
    ],
    promo: "Entrega grátis acima de R$ 60 · Peça pelo WhatsApp e receba quentinho",
    contact: { address: "Rua das Palmeiras, 789 — Centro", hours: "Todos os dias, 11h às 23h" },
  },

  /* ===================================================================== */
  "loja-roupas": {
    layout: "loja",
    business: "Bella Moda",
    nicho: "loja de roupas",
    icon: "ShoppingBag",
    accent: "#e11d48",
    ctaShort: "Comprar",
    ctaHero: "Comprar pelo WhatsApp",
    hero: {
      eyebrow: "Nova coleção",
      title: "Seu estilo, do seu jeito.",
      subtitle:
        "Peças selecionadas para você se vestir bem todos os dias, com atendimento rápido e compra direta pelo WhatsApp.",
    },
    diferenciais: [
      { icon: "MessageCircle", title: "Compra pelo WhatsApp", text: "Tire dúvidas e finalize sua compra em segundos." },
      { icon: "Truck", title: "Entrega rápida", text: "Receba suas peças com agilidade na sua região." },
      { icon: "ShieldCheck", title: "Troca fácil", text: "Não serviu? A gente resolve sem complicação." },
    ],
    sobre:
      "A Bella Moda seleciona peças modernas e versáteis para todos os momentos do seu dia. Qualidade, bom preço e um atendimento que entende o seu estilo.",
    categories: ["Feminino", "Masculino", "Acessórios", "Novidades"],
    products: [
      { name: "Vestido Midi Floral", price: "R$ 189,90", tag: "Novo" },
      { name: "Camisa de Linho", price: "R$ 139,90" },
      { name: "Calça Alfaiataria", price: "R$ 199,90" },
      { name: "Blazer Premium", price: "R$ 259,90", oldPrice: "R$ 299,90", tag: "−15%" },
      { name: "Saia Plissada", price: "R$ 119,90", tag: "Novo" },
      { name: "Tricô Oversized", price: "R$ 149,90" },
      { name: "Jaqueta Jeans", price: "R$ 219,90" },
      { name: "Conjunto Moletom", price: "R$ 179,90", tag: "Queridinho" },
    ],
    bestSellers: [
      { name: "Vestido Midi Floral", price: "R$ 189,90" },
      { name: "Blazer Premium", price: "R$ 259,90" },
      { name: "Calça Alfaiataria", price: "R$ 199,90" },
    ],
    coupon: {
      code: "BELLA10",
      title: "Ganhe 10% na primeira compra",
      subtitle: "Use o cupom BELLA10 e receba novidades e promoções em primeira mão.",
      button: "Quero meu cupom",
    },
    depoimentos: [
      { nome: "Marina S.", texto: "Roupas lindas e atendimento rápido pelo WhatsApp. Virei cliente fiel!" },
      { nome: "Rafael T.", texto: "Peças de qualidade e entrega na cidade toda. Recomendo demais." },
      { nome: "Júlia P.", texto: "Adoro as novidades toda semana. O site facilita ver tudo." },
    ],
    stats: [
      { value: "+2.000", label: "clientes atendidos" },
      { value: "4.9 ★", label: "avaliação média" },
      { value: "Brasil", label: "envio para todo o país" },
    ],
    faq: [
      { q: "Como funciona a troca?", a: "Você tem 7 dias para trocar. É só chamar no WhatsApp que a gente resolve." },
      { q: "Quais as formas de pagamento?", a: "Pix, cartão em até 6x e link de pagamento pelo WhatsApp." },
      { q: "Vocês entregam em todo o Brasil?", a: "Sim! Calculamos o frete na hora pela sua região." },
    ],
    promo: "✦ Frete grátis acima de R$ 199 · Parcele em até 6x sem juros",
    contact: { address: "Rua das Flores, 123 — Centro", hours: "Seg a Sáb, 9h às 19h" },
  },

  /* ===================================================================== */
  estetica: {
    layout: "estetica",
    business: "Lumière Estética",
    nicho: "clínica de estética",
    icon: "Sparkles",
    accent: "#db2777",
    ctaShort: "Agendar",
    ctaHero: "Agendar avaliação",
    hero: {
      eyebrow: "Autoestima & beleza",
      title: "Realce a sua beleza natural.",
      subtitle:
        "Tratamentos faciais, corporais e de beleza com profissionais qualificados. Agende sua avaliação gratuita pelo WhatsApp.",
    },
    diferenciais: [
      { icon: "Calendar", title: "Agende pelo WhatsApp", text: "Marque sua sessão de forma rápida e fácil." },
      { icon: "BadgeCheck", title: "Profissionais qualificadas", text: "Equipe especializada e produtos de qualidade." },
      { icon: "Heart", title: "Ambiente acolhedor", text: "Um espaço pensado para o seu bem-estar." },
    ],
    sobre:
      "Na Lumière, cuidamos de você com tratamentos personalizados e muito carinho. Resultados reais, com segurança e conforto.",
    treatments: [
      {
        category: "Facial",
        icon: "Sparkles",
        items: [
          { name: "Limpeza de pele profunda", price: "R$ 120", duration: "60 min" },
          { name: "Peeling de diamante", price: "R$ 140", duration: "50 min" },
          { name: "Hidratação facial", price: "R$ 110", duration: "45 min" },
        ],
      },
      {
        category: "Corporal",
        icon: "Flower2",
        items: [
          { name: "Massagem relaxante", price: "R$ 130", duration: "60 min" },
          { name: "Drenagem linfática", price: "R$ 110", duration: "50 min" },
        ],
      },
      {
        category: "Sobrancelha & Cílios",
        icon: "Eye",
        items: [
          { name: "Design de sobrancelha", price: "R$ 45", duration: "30 min", tag: "Popular" },
          { name: "Extensão de cílios", price: "R$ 150", duration: "90 min" },
        ],
      },
      {
        category: "Unhas",
        icon: "Heart",
        items: [{ name: "Manicure & pedicure", price: "R$ 70", duration: "60 min" }],
      },
    ],
    beforeAfter: [{ label: "Limpeza de pele" }, { label: "Design de sobrancelha" }, { label: "Extensão de cílios" }],
    pacotes: [
      { name: "Day Spa", text: "3 tratamentos em um dia inteiro de cuidado com você.", price: "R$ 290", highlight: true },
      { name: "Pacote Noiva", text: "Preparação completa para o seu grande dia.", price: "R$ 690" },
      { name: "Mensal Skincare", text: "4 sessões faciais por mês, pele renovada.", price: "R$ 380" },
    ],
    profissionais: [
      { name: "Dra. Camila", role: "Esteticista facial" },
      { name: "Renata", role: "Massoterapeuta" },
      { name: "Bianca", role: "Designer de sobrancelhas" },
    ],
    depoimentos: [
      { nome: "Fernanda R.", texto: "Saio renovada toda vez. Atendimento maravilhoso e resultado incrível." },
      { nome: "Patrícia M.", texto: "Ambiente lindo e profissionais super atenciosas. Amo!" },
      { nome: "Letícia A.", texto: "Agendo tudo pelo WhatsApp, super prático. Recomendo de olhos fechados." },
    ],
    stats: [
      { value: "+3.000", label: "clientes atendidas" },
      { value: "4.9 ★", label: "avaliação média" },
      { value: "8 anos", label: "de mercado" },
    ],
    faq: [
      { q: "Preciso agendar avaliação?", a: "Sim, a primeira avaliação é gratuita e agendada pelo WhatsApp." },
      { q: "Quais formas de pagamento?", a: "Pix, cartão em até 4x e pacotes com desconto." },
      { q: "Os produtos são seguros?", a: "Sim, trabalhamos com produtos certificados e de alta qualidade." },
    ],
    promo: "Avaliação gratuita · Pacotes mensais com até 20% de desconto",
    contact: { address: "Rua Bela Vista, 321 — Jardins", hours: "Seg a Sáb, 9h às 19h" },
  },

  /* ===================================================================== */
  imobiliaria: {
    layout: "imobiliaria",
    business: "Prime Imóveis",
    nicho: "imobiliária",
    icon: "Building2",
    accent: "#2563eb",
    ctaShort: "Falar",
    ctaHero: "Falar com um corretor",
    hero: {
      eyebrow: "O imóvel certo pra você",
      title: "Encontre o seu novo lar.",
      subtitle:
        "Imóveis selecionados para comprar ou alugar, com atendimento próximo e seguro. Agende uma visita pelo WhatsApp.",
    },
    diferenciais: [
      { icon: "MessageCircle", title: "Fale com um corretor", text: "Tire dúvidas e agende visitas pelo WhatsApp." },
      { icon: "ShieldCheck", title: "Negociação segura", text: "Acompanhamento em toda a documentação." },
      { icon: "MapPin", title: "Imóveis na sua região", text: "As melhores opções pertinho de você." },
    ],
    sobre:
      "A Prime Imóveis conecta você ao imóvel ideal. Atendimento personalizado, transparência e suporte do primeiro contato à entrega das chaves.",
    filters: ["Comprar", "Alugar", "Lançamentos", "Comercial"],
    properties: [
      { title: "Apartamento 2 quartos", price: "R$ 320.000", deal: "Venda", beds: 2, baths: 1, area: "62 m²", parking: 1, neighborhood: "Centro" },
      { title: "Casa 3 quartos com quintal", price: "R$ 540.000", deal: "Venda", beds: 3, baths: 2, area: "140 m²", parking: 2, neighborhood: "Jardim", tag: "Novo" },
      { title: "Studio mobiliado", price: "R$ 1.800/mês", deal: "Aluguel", beds: 1, baths: 1, area: "38 m²", parking: 1, neighborhood: "Centro", tag: "Aluguel" },
      { title: "Cobertura 3 suítes", price: "R$ 890.000", deal: "Venda", beds: 3, baths: 4, area: "210 m²", parking: 3, neighborhood: "Beira-mar", tag: "Destaque" },
      { title: "Sala comercial", price: "R$ 2.500/mês", deal: "Aluguel", beds: 0, baths: 1, area: "45 m²", parking: 1, neighborhood: "Centro", tag: "Comercial" },
      { title: "Terreno 300 m²", price: "R$ 180.000", deal: "Venda", beds: 0, baths: 0, area: "300 m²", parking: 0, neighborhood: "Loteamento Verde" },
    ],
    corretores: [
      { name: "Roberto", role: "Corretor · CRECI 12.345" },
      { name: "Sandra", role: "Especialista em locação" },
    ],
    depoimentos: [
      { nome: "Roberto C.", texto: "Compramos nosso apartamento com tranquilidade. Atendimento excelente." },
      { nome: "Sandra M.", texto: "Acharam o imóvel ideal pra gente em poucos dias. Recomendo!" },
      { nome: "Marcos V.", texto: "Processo seguro e transparente do início ao fim." },
    ],
    stats: [
      { value: "+300", label: "imóveis disponíveis" },
      { value: "+1.000", label: "famílias atendidas" },
      { value: "15 anos", label: "no mercado" },
    ],
    faq: [
      { q: "Vocês ajudam no financiamento?", a: "Sim, acompanhamos todo o processo junto aos bancos." },
      { q: "Como agendar uma visita?", a: "É só chamar no WhatsApp e marcamos no melhor horário pra você." },
      { q: "Trabalham com aluguel?", a: "Sim, temos opções para comprar e alugar, residencial e comercial." },
    ],
    promo: "Atendimento de corretor · Agende sua visita pelo WhatsApp",
    contact: { address: "Av. Central, 1000 — Sala 5", hours: "Seg a Sex, 9h–18h · Sáb, 9h–13h" },
  },

  /* ===================================================================== */
  servicos: {
    layout: "servicos",
    business: "Soluções Pro",
    nicho: "prestador de serviços",
    icon: "Wrench",
    accent: "#0d9488",
    ctaShort: "Orçamento",
    ctaHero: "Pedir orçamento pelo WhatsApp",
    hero: {
      eyebrow: "Serviço bem feito",
      title: "Resolva sem dor de cabeça.",
      subtitle:
        "Profissionais de confiança para o seu serviço, com orçamento rápido e gratuito. Conte o que precisa pelo WhatsApp.",
    },
    diferenciais: [
      { icon: "MessageCircle", title: "Orçamento pelo WhatsApp", text: "Conte o que precisa e receba um orçamento rápido." },
      { icon: "ShieldCheck", title: "Profissionais de confiança", text: "Equipe qualificada e serviço com garantia." },
      { icon: "Rocket", title: "Atendimento ágil", text: "Resposta rápida e horários que cabem na sua rotina." },
    ],
    sobre:
      "A Soluções Pro reúne profissionais qualificados para resolver o que você precisa, com agilidade, preço justo e garantia no serviço.",
    services: [
      { icon: "Zap", name: "Instalações elétricas", price: "a partir de R$ 120", text: "Tomadas, chuveiros, disjuntores e mais." },
      { icon: "Droplets", name: "Reparos hidráulicos", price: "a partir de R$ 100", text: "Vazamentos, torneiras, caixa d'água.", tag: "Popular" },
      { icon: "Wrench", name: "Montagem de móveis", price: "a partir de R$ 80", text: "Guarda-roupas, estantes, camas." },
      { icon: "Paintbrush", name: "Pintura residencial", price: "Sob orçamento", text: "Interna e externa, com acabamento." },
      { icon: "Hammer", name: "Pequenos reparos", price: "a partir de R$ 70", text: "Aquele conserto que ninguém resolve." },
      { icon: "ShieldCheck", name: "Manutenção geral", price: "Sob orçamento", text: "Cuidado contínuo para a sua casa." },
    ],
    comoFunciona: [
      { icon: "MessageCircle", title: "Conte o que precisa", text: "Mande uma mensagem no WhatsApp, sem compromisso." },
      { icon: "FileText", title: "Receba o orçamento", text: "Resposta rápida com preço justo e transparente." },
      { icon: "BadgeCheck", title: "Serviço feito e garantido", text: "Profissional na sua casa, no horário combinado." },
    ],
    coverage: "Atendemos a cidade toda e regiões próximas.",
    garantia: "Todos os serviços têm garantia. Não ficou bom? A gente refaz, sem custo.",
    depoimentos: [
      { nome: "José A.", texto: "Resolveram tudo no mesmo dia. Profissionais educados e caprichosos." },
      { nome: "Tânia R.", texto: "Orçamento justo e serviço impecável. Já chamei várias vezes." },
      { nome: "Cláudio P.", texto: "Atendimento rápido pelo WhatsApp e trabalho bem feito." },
    ],
    stats: [
      { value: "+1.500", label: "serviços realizados" },
      { value: "4.9 ★", label: "avaliação média" },
      { value: "24h", label: "resposta ao orçamento" },
    ],
    faq: [
      { q: "Como funciona o orçamento?", a: "É gratuito! Conte o que precisa pelo WhatsApp e respondemos rápido." },
      { q: "O serviço tem garantia?", a: "Sim, todos os serviços têm garantia. Sua satisfação é prioridade." },
      { q: "Atendem minha região?", a: "Atendemos a cidade toda e regiões próximas. Confirme pelo WhatsApp." },
    ],
    promo: "Orçamento gratuito · Atendemos toda a região",
    contact: { address: "Atendimento em domicílio — toda a cidade", hours: "Seg a Sáb, 8h às 18h" },
  },
};

export const previaSlugs = Object.keys(previaDemos);

/* Fotos ilustrativas por nicho (IDs de fotos do Unsplash, profissionais e
   relevantes). São apenas ilustrativas — no site final entram as fotos do
   cliente. O DemoImage cai num gradiente caso alguma não carregue. */
export const PHOTOS: Record<string, string[]> = {
  "loja-roupas": [
    "photo-1490481651871-ab68de25d43d",
    "photo-1441984904996-e0b6ba687e04",
    "photo-1483985988355-763728e1935b",
    "photo-1445205170230-053b83016050",
  ],
  barbearia: [
    "photo-1503951914875-452162b0f3f1",
    "photo-1599351431202-1e0f0137899a",
    "photo-1585747860715-2ba37e788b70",
    "photo-1521590832167-7bcbfaa6381f",
  ],
  restaurante: [
    "photo-1517248135467-4c7edcad34c4",
    "photo-1414235077428-338989a2e8c0",
    "photo-1513104890138-7c749659a591",
    "photo-1565299624946-b28f40a0ae38",
  ],
  estetica: [
    "photo-1540555700478-4be289fbecef",
    "photo-1596178065887-1198b6148b2b",
    "photo-1487412947147-5cebf100ffc2",
    "photo-1570172619644-dfd03ed5d881",
  ],
  imobiliaria: [
    "photo-1568605114967-8130f3a36994",
    "photo-1570129477492-45c003edd2be",
    "photo-1493809842364-78817add7ffb",
    "photo-1512917774080-9991f1c4c750",
  ],
  servicos: [
    "photo-1504148455328-c376907d081c",
    "photo-1581244277943-fe4a9c777189",
    "photo-1572981779307-38b8cabb2407",
    "photo-1530124566582-a618bc2615dc",
  ],
};
