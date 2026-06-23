/* ==========================================================================
   DADOS DAS PRÉVIAS (demos) POR NICHO
   --------------------------------------------------------------------------
   Um único template (app/previa/[nicho]/page.tsx) renderiza qualquer nicho a
   partir destes dados. Para adicionar/editar um nicho, mexa só aqui.
   As seções aparecem conforme o plano (Básico / Profissional / Premium).
   ========================================================================== */

export type DemoItem = { name: string; value: string; tag?: string };

export type PreviaDemo = {
  business: string; // nome fictício do negócio
  nicho: string; // rótulo usado na mensagem do WhatsApp
  icon: string; // ícone do nicho (placeholder nos cards)
  accent: string; // cor de destaque (hex)
  ctaShort: string; // texto curto do botão (header/cards)
  ctaHero: string; // texto do botão principal do hero
  hero: { eyebrow: string; title: string; subtitle: string };
  diferenciais: { icon: string; title: string; text: string }[]; // Básico+
  sobre: string; // Básico+
  itemsLabel: string; // ex.: "Nossos produtos"
  itemsSubtitle: string;
  items: DemoItem[]; // Profissional+
  categories: string[]; // Profissional+
  depoimentos: { nome: string; texto: string }[]; // Profissional+
  location: { lines: string[] }; // Profissional+
  destaque: { eyebrow: string; title: string; text: string }; // Premium
  vitrineLabel: string; // Premium
  vitrine: DemoItem[]; // Premium (destaques)
  stats: { value: string; label: string }[]; // Premium
  faq: { q: string; a: string }[]; // Premium
  leadOffer: { title: string; subtitle: string; button: string }; // Premium
  freteBar: string; // Premium (barra superior)
};

export const previaDemos: Record<string, PreviaDemo> = {
  "loja-roupas": {
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
        "Peças selecionadas para você se vestir bem todos os dias, com atendimento rápido pelo WhatsApp.",
    },
    diferenciais: [
      { icon: "MessageCircle", title: "Compra pelo WhatsApp", text: "Tire dúvidas e finalize sua compra em segundos." },
      { icon: "Rocket", title: "Entrega rápida", text: "Receba suas peças com agilidade na sua região." },
      { icon: "ShieldCheck", title: "Troca fácil", text: "Não serviu? A gente resolve sem complicação." },
    ],
    sobre:
      "A Bella Moda seleciona peças modernas e versáteis para todos os momentos do seu dia. Qualidade, bom preço e um atendimento que entende o seu estilo.",
    itemsLabel: "Nossos produtos",
    itemsSubtitle: "Escolha o seu e finalize pelo WhatsApp.",
    items: [
      { name: "Vestido Midi Floral", value: "R$ 189,90", tag: "Novo" },
      { name: "Camisa de Linho", value: "R$ 139,90" },
      { name: "Calça Alfaiataria", value: "R$ 199,90" },
      { name: "Blazer Premium", value: "R$ 259,90", tag: "−15%" },
      { name: "Saia Plissada", value: "R$ 119,90", tag: "Novo" },
      { name: "Tricô Oversized", value: "R$ 149,90" },
    ],
    categories: ["Feminino", "Masculino", "Acessórios", "Novidades"],
    depoimentos: [
      { nome: "Marina S.", texto: "Roupas lindas e atendimento rápido pelo WhatsApp. Virei cliente fiel!" },
      { nome: "Rafael T.", texto: "Peças de qualidade e entrega na cidade toda. Recomendo demais." },
      { nome: "Júlia P.", texto: "Adoro as novidades toda semana. O site facilita ver tudo." },
    ],
    location: { lines: ["Rua das Flores, 123 — Centro", "Seg a Sáb, 9h às 19h"] },
    destaque: {
      eyebrow: "Destaque da semana",
      title: "Coleção Cápsula — Edição Limitada",
      text: "Peças exclusivas, em quantidade limitada. Garanta a sua antes que esgote.",
    },
    vitrineLabel: "Mais vendidos",
    vitrine: [
      { name: "Vestido Midi Floral", value: "R$ 189,90" },
      { name: "Blazer Premium", value: "R$ 259,90" },
      { name: "Calça Alfaiataria", value: "R$ 199,90" },
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
    leadOffer: {
      title: "Ganhe 10% na primeira compra",
      subtitle: "Cadastre-se e receba novidades e promoções em primeira mão.",
      button: "Quero meu cupom",
    },
    freteBar: "✦ Frete grátis acima de R$ 199 • Parcele em até 6x sem juros",
  },

  barbearia: {
    business: "Navalha Barbearia",
    nicho: "barbearia",
    icon: "Scissors",
    accent: "#c79a3a",
    ctaShort: "Agendar",
    ctaHero: "Agendar pelo WhatsApp",
    hero: {
      eyebrow: "Tradição & estilo",
      title: "O estilo está no detalhe.",
      subtitle:
        "Corte, barba e cuidado masculino com profissionais experientes. Agende seu horário pelo WhatsApp.",
    },
    diferenciais: [
      { icon: "MessageCircle", title: "Agende pelo WhatsApp", text: "Escolha o horário e pronto, sem fila e sem espera." },
      { icon: "Star", title: "Barbeiros experientes", text: "Profissionais que entendem do seu corte." },
      { icon: "Sparkles", title: "Ambiente premium", text: "Um espaço pensado para o seu momento." },
    ],
    sobre:
      "Na Navalha, cada corte é feito com capricho. Um ambiente acolhedor, profissionais de confiança e aquele acabamento que faz a diferença.",
    itemsLabel: "Nossos serviços",
    itemsSubtitle: "Escolha o serviço e agende pelo WhatsApp.",
    items: [
      { name: "Corte masculino", value: "R$ 45" },
      { name: "Barba completa", value: "R$ 35" },
      { name: "Combo corte + barba", value: "R$ 70", tag: "Popular" },
      { name: "Pézinho / acabamento", value: "R$ 20" },
      { name: "Sobrancelha", value: "R$ 15" },
      { name: "Pigmentação", value: "R$ 55" },
    ],
    categories: ["Cortes", "Barba", "Combos", "Cuidados"],
    depoimentos: [
      { nome: "Lucas M.", texto: "Melhor barbearia da região. Atendimento e corte nota 10." },
      { nome: "Diego R.", texto: "Agendo tudo pelo WhatsApp, super prático. Recomendo!" },
      { nome: "Paulo H.", texto: "Ambiente top e profissionais que sabem o que fazem." },
    ],
    location: { lines: ["Av. Principal, 456 — Centro", "Ter a Sáb, 9h às 20h"] },
    destaque: {
      eyebrow: "Clube do cavalheiro",
      title: "Assinatura mensal — cortes ilimitados",
      text: "Plano mensal com horários exclusivos e preço fixo. Cuide do visual o mês todo.",
    },
    vitrineLabel: "Mais procurados",
    vitrine: [
      { name: "Combo corte + barba", value: "R$ 70" },
      { name: "Corte masculino", value: "R$ 45" },
      { name: "Pigmentação", value: "R$ 55" },
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
    leadOffer: {
      title: "Primeiro corte com 20% off",
      subtitle: "Cadastre-se e receba o cupom de boas-vindas no WhatsApp.",
      button: "Quero meu cupom",
    },
    freteBar: "✦ Clube do Cavalheiro: assine e tenha horários exclusivos",
  },

  restaurante: {
    business: "Cantina Bella",
    nicho: "restaurante",
    icon: "UtensilsCrossed",
    accent: "#dc2626",
    ctaShort: "Pedir",
    ctaHero: "Fazer pedido pelo WhatsApp",
    hero: {
      eyebrow: "Comida de verdade",
      title: "Sabor que abraça.",
      subtitle:
        "Pratos caseiros, ingredientes frescos e aquele tempero especial. Peça pelo WhatsApp e receba quentinho.",
    },
    diferenciais: [
      { icon: "MessageCircle", title: "Peça pelo WhatsApp", text: "Faça seu pedido em segundos, sem complicação." },
      { icon: "Rocket", title: "Entrega quentinha", text: "Seu pedido chega rápido e na temperatura certa." },
      { icon: "Sparkles", title: "Ingredientes frescos", text: "Tudo preparado na hora, com qualidade." },
    ],
    sobre:
      "A Cantina Bella serve o melhor da comida caseira com um toque especial. Ambiente aconchegante e pratos que viram saudade.",
    itemsLabel: "Nosso cardápio",
    itemsSubtitle: "Escolha seu prato e peça pelo WhatsApp.",
    items: [
      { name: "Lasanha à Bolonhesa", value: "R$ 45" },
      { name: "Pizza Margherita", value: "R$ 52", tag: "Popular" },
      { name: "Risoto de Camarão", value: "R$ 58" },
      { name: "Filé com Fritas", value: "R$ 49" },
      { name: "Salada Caesar", value: "R$ 32" },
      { name: "Petit Gateau", value: "R$ 24" },
    ],
    categories: ["Entradas", "Pratos principais", "Pizzas", "Sobremesas"],
    depoimentos: [
      { nome: "Carla F.", texto: "Comida maravilhosa e entrega rápida. Virou nosso restaurante favorito." },
      { nome: "André L.", texto: "Peço pelo WhatsApp toda semana. Atendimento impecável." },
      { nome: "Bia S.", texto: "Os pratos são caprichados e chegam quentinhos. Recomendo!" },
    ],
    location: { lines: ["Rua das Palmeiras, 789 — Centro", "Todos os dias, 11h às 23h"] },
    destaque: {
      eyebrow: "Promoção do dia",
      title: "Combo família — pizza + sobremesa",
      text: "Pizza grande + sobremesa por um preço especial. Válido nesta semana!",
    },
    vitrineLabel: "Mais pedidos",
    vitrine: [
      { name: "Pizza Margherita", value: "R$ 52" },
      { name: "Lasanha à Bolonhesa", value: "R$ 45" },
      { name: "Risoto de Camarão", value: "R$ 58" },
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
    leadOffer: {
      title: "Ganhe uma sobremesa no 1º pedido",
      subtitle: "Cadastre-se e receba o cupom de boas-vindas.",
      button: "Quero meu cupom",
    },
    freteBar: "✦ Entrega grátis acima de R$ 60 • Peça pelo WhatsApp",
  },

  estetica: {
    business: "Lumière Estética",
    nicho: "clínica de estética",
    icon: "Sparkles",
    accent: "#db2777",
    ctaShort: "Agendar",
    ctaHero: "Agendar pelo WhatsApp",
    hero: {
      eyebrow: "Autoestima & beleza",
      title: "Realce a sua beleza natural.",
      subtitle:
        "Tratamentos faciais, corporais e de beleza com profissionais qualificados. Agende sua avaliação pelo WhatsApp.",
    },
    diferenciais: [
      { icon: "MessageCircle", title: "Agende pelo WhatsApp", text: "Marque sua sessão de forma rápida e fácil." },
      { icon: "BadgeCheck", title: "Profissionais qualificados", text: "Equipe especializada e produtos de qualidade." },
      { icon: "Sparkles", title: "Ambiente acolhedor", text: "Um espaço pensado para o seu bem-estar." },
    ],
    sobre:
      "Na Lumière, cuidamos de você com tratamentos personalizados e muito carinho. Resultados reais com segurança e conforto.",
    itemsLabel: "Nossos serviços",
    itemsSubtitle: "Escolha o tratamento e agende pelo WhatsApp.",
    items: [
      { name: "Limpeza de pele", value: "R$ 120" },
      { name: "Design de sobrancelha", value: "R$ 45", tag: "Popular" },
      { name: "Extensão de cílios", value: "R$ 150" },
      { name: "Massagem relaxante", value: "R$ 130" },
      { name: "Drenagem linfática", value: "R$ 110" },
      { name: "Manicure & pedicure", value: "R$ 70" },
    ],
    categories: ["Facial", "Corporal", "Sobrancelha & Cílios", "Unhas"],
    depoimentos: [
      { nome: "Fernanda R.", texto: "Saio renovada toda vez. Atendimento maravilhoso e resultado incrível." },
      { nome: "Patrícia M.", texto: "Ambiente lindo e profissionais super atenciosas. Amo!" },
      { nome: "Letícia A.", texto: "Agendo tudo pelo WhatsApp, super prático. Recomendo de olhos fechados." },
    ],
    location: { lines: ["Rua Bela Vista, 321 — Jardins", "Seg a Sáb, 9h às 19h"] },
    destaque: {
      eyebrow: "Pacote do mês",
      title: "Day Spa — 3 tratamentos com desconto",
      text: "Um dia inteiro de cuidado com você. Pacote especial por tempo limitado.",
    },
    vitrineLabel: "Mais procurados",
    vitrine: [
      { name: "Limpeza de pele", value: "R$ 120" },
      { name: "Extensão de cílios", value: "R$ 150" },
      { name: "Drenagem linfática", value: "R$ 110" },
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
    leadOffer: {
      title: "Avaliação gratuita + 15% no 1º tratamento",
      subtitle: "Cadastre-se e receba o cupom de boas-vindas.",
      button: "Quero minha avaliação",
    },
    freteBar: "✦ Avaliação gratuita • Pacotes mensais com desconto",
  },

  imobiliaria: {
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
        "Imóveis selecionados para comprar ou alugar, com atendimento próximo e seguro. Fale com um corretor pelo WhatsApp.",
    },
    diferenciais: [
      { icon: "MessageCircle", title: "Fale com um corretor", text: "Tire dúvidas e agende visitas pelo WhatsApp." },
      { icon: "ShieldCheck", title: "Negociação segura", text: "Acompanhamento em toda a documentação." },
      { icon: "MapPin", title: "Imóveis na sua região", text: "As melhores opções pertinho de você." },
    ],
    sobre:
      "A Prime Imóveis conecta você ao imóvel ideal. Atendimento personalizado, transparência e suporte do primeiro contato à entrega das chaves.",
    itemsLabel: "Imóveis em destaque",
    itemsSubtitle: "Veja as opções e agende uma visita pelo WhatsApp.",
    items: [
      { name: "Apartamento 2 quartos — Centro", value: "R$ 320.000" },
      { name: "Casa 3 quartos — Jardim", value: "R$ 540.000", tag: "Novo" },
      { name: "Studio mobiliado", value: "R$ 1.800/mês", tag: "Aluguel" },
      { name: "Cobertura 3 suítes", value: "R$ 890.000" },
      { name: "Sala comercial", value: "R$ 2.500/mês", tag: "Aluguel" },
      { name: "Terreno 300m²", value: "R$ 180.000" },
    ],
    categories: ["Comprar", "Alugar", "Lançamentos", "Comercial"],
    depoimentos: [
      { nome: "Roberto C.", texto: "Compramos nosso apartamento com tranquilidade. Atendimento excelente." },
      { nome: "Sandra M.", texto: "Acharam o imóvel ideal pra gente em poucos dias. Recomendo!" },
      { nome: "Marcos V.", texto: "Processo seguro e transparente do início ao fim." },
    ],
    location: { lines: ["Av. Central, 1000 — Sala 5", "Seg a Sex, 9h às 18h • Sáb, 9h às 13h"] },
    destaque: {
      eyebrow: "Oportunidade da semana",
      title: "Apartamento novo com condições especiais",
      text: "Entrada facilitada e financiamento direto. Agende sua visita antes que saia.",
    },
    vitrineLabel: "Destaques",
    vitrine: [
      { name: "Casa 3 quartos — Jardim", value: "R$ 540.000" },
      { name: "Cobertura 3 suítes", value: "R$ 890.000" },
      { name: "Apartamento 2 quartos", value: "R$ 320.000" },
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
    leadOffer: {
      title: "Receba imóveis no seu perfil",
      subtitle: "Cadastre-se e avisamos quando surgir o imóvel ideal pra você.",
      button: "Quero ser avisado",
    },
    freteBar: "✦ Atendimento de corretor • Visitas agendadas pelo WhatsApp",
  },

  servicos: {
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
        "Profissionais de confiança para o seu serviço, com orçamento rápido e atendimento direto pelo WhatsApp.",
    },
    diferenciais: [
      { icon: "MessageCircle", title: "Orçamento pelo WhatsApp", text: "Conte o que precisa e receba um orçamento rápido." },
      { icon: "ShieldCheck", title: "Profissionais de confiança", text: "Equipe qualificada e serviço com garantia." },
      { icon: "Rocket", title: "Atendimento ágil", text: "Resposta rápida e horários que cabem na sua rotina." },
    ],
    sobre:
      "A Soluções Pro reúne profissionais qualificados para resolver o que você precisa, com agilidade, preço justo e garantia no serviço.",
    itemsLabel: "Nossos serviços",
    itemsSubtitle: "Veja o que fazemos e peça seu orçamento pelo WhatsApp.",
    items: [
      { name: "Instalações elétricas", value: "a partir de R$ 120" },
      { name: "Reparos hidráulicos", value: "a partir de R$ 100", tag: "Popular" },
      { name: "Montagem de móveis", value: "a partir de R$ 80" },
      { name: "Pintura residencial", value: "Sob orçamento" },
      { name: "Pequenos reparos", value: "a partir de R$ 70" },
      { name: "Manutenção geral", value: "Sob orçamento" },
    ],
    categories: ["Elétrica", "Hidráulica", "Montagem", "Reformas"],
    depoimentos: [
      { nome: "José A.", texto: "Resolveram tudo no mesmo dia. Profissionais educados e caprichosos." },
      { nome: "Tânia R.", texto: "Orçamento justo e serviço impecável. Já chamei várias vezes." },
      { nome: "Cláudio P.", texto: "Atendimento rápido pelo WhatsApp e trabalho bem feito." },
    ],
    location: { lines: ["Atendemos toda a cidade e região", "Seg a Sáb, 8h às 18h"] },
    destaque: {
      eyebrow: "Plano de manutenção",
      title: "Cuide da sua casa o ano todo",
      text: "Visitas periódicas e prioridade no atendimento por uma mensalidade que cabe no bolso.",
    },
    vitrineLabel: "Mais solicitados",
    vitrine: [
      { name: "Reparos hidráulicos", value: "a partir de R$ 100" },
      { name: "Instalações elétricas", value: "a partir de R$ 120" },
      { name: "Montagem de móveis", value: "a partir de R$ 80" },
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
    leadOffer: {
      title: "Primeiro orçamento com condição especial",
      subtitle: "Cadastre-se e fale com a gente para garantir o desconto.",
      button: "Quero meu orçamento",
    },
    freteBar: "✦ Orçamento gratuito • Atendimento em toda a região",
  },
};

export const previaSlugs = Object.keys(previaDemos);
