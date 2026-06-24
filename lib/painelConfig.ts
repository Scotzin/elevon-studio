/* ==========================================================================
   CONFIGURAÇÃO E HELPERS DO PAINEL (CRM interno da Elevon Studio)
   Constantes de status/planos, saudação, frase do dia, formatação e a
   lógica de sugestão de plano + mensagem de WhatsApp dos orçamentos.
   ========================================================================== */

export const brl = (n: number) =>
  (Number.isFinite(n) ? n : 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

/* --- Saudação por horário ---------------------------------------------- */
export function greeting(date = new Date()): string {
  const h = date.getHours();
  if (h >= 5 && h < 12) return "Bom dia";
  if (h >= 12 && h < 18) return "Boa tarde";
  return "Boa noite";
}

export function firstName(user: { name?: string; email?: string } | null): string {
  if (!user) return "equipe";
  const n = (user.name || "").trim();
  if (n) return n.split(/\s+/)[0];
  if (user.email) return user.email.split("@")[0];
  return "equipe";
}

/* --- Frase do dia (motivacional) --------------------------------------- */
export const FRASES = [
  "Grandes resultados nascem de pequenos passos bem executados.",
  "A disciplina de hoje constrói a liberdade de amanhã.",
  "Quem trata cada detalhe com seriedade, transforma intenção em resultado.",
  "O impossível começa a mudar quando alguém decide tentar com consistência.",
  "Todo negócio grande já foi apenas uma ideia levada a sério.",
  "O progresso não pede pressa. Pede constância.",
  "A diferença entre sonhar e realizar está no que você faz depois de acordar.",
  "Seja excelente no que ainda é pequeno, porque é assim que o grande começa.",
  "Cada dia bem trabalhado é um tijolo na construção de algo maior.",
  "A ambição só vira conquista quando encontra execução.",
];

export function fraseDoDia(date = new Date()): string {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / 86400000);
  return FRASES[dayOfYear % FRASES.length];
}

/* --- Listas de status / opções ----------------------------------------- */
export const LEAD_STATUS = [
  "Novo",
  "Em conversa",
  "Orçamento enviado",
  "Indeciso",
  "Fechado",
  "Perdido",
  "Sem resposta",
];

export const CLIENT_PAYMENT_STATUS = [
  "Pendente",
  "Entrada paga",
  "Mensalidade paga",
  "Em atraso",
  "Cancelado",
];

export const CLIENT_SITE_STATUS = [
  "Aguardando informações",
  "Em produção",
  "Em revisão",
  "Publicado",
  "Ativo",
  "Em manutenção",
  "Fora do ar",
  "Cancelado",
];

export const PROJECT_STATUS = [
  "Aguardando informações",
  "Em desenvolvimento",
  "Em revisão",
  "Publicado",
  "Em manutenção",
  "Pausado",
  "Cancelado",
];

export const BUDGET_STATUS = [
  "Rascunho",
  "Enviado",
  "Em negociação",
  "Aprovado",
  "Recusado",
  "Expirado",
];

export const EXPENSE_CATEGORIES = [
  "Domínio",
  "Hospedagem",
  "Ferramentas",
  "Anúncios",
  "Design",
  "IA",
  "Contador",
  "Impostos",
  "Outros",
];

export const EXPENSE_RECURRENCE = ["mensal", "anual", "único"];
export const EXPENSE_STATUS = ["pago", "pendente"];

export const PLANS = ["Básico", "Profissional", "Premium", "Personalizado"];
export const ACCESS_LEVELS = [
  "CEO / Admin",
  "Sócio / Comercial",
  "Sócio / Design",
  "Sócio / Operação",
];
export const TEAM_STATUS = ["Ativo", "Inativo"];
export const NICHOS = [
  "Barbearia",
  "Restaurante",
  "Loja de roupas",
  "Clínica/Estética",
  "Imobiliária",
  "Prestador de serviço",
  "Outro",
];

/* --- Valores padrão dos planos ----------------------------------------- */
export const PLAN_VALUES: Record<string, { setup: number; monthly: number }> = {
  Básico: { setup: 400, monthly: 100 },
  Profissional: { setup: 600, monthly: 150 },
  Premium: { setup: 950, monthly: 250 },
  Personalizado: { setup: 0, monthly: 0 },
};

/* --- Sugestão de plano a partir do que o cliente quer ------------------ */
export function suggestPlan(wants = ""): string {
  const t = wants.toLowerCase();
  if (/(loja|catálogo|catalogo|produtos|e-?commerce|vitrine|várias páginas|varias paginas|premium|copy)/.test(t))
    return "Premium";
  if (/(galeria|seções|secoes|identidade|completo|comercial|depoimentos|profissional)/.test(t))
    return "Profissional";
  if (/(simples|básico|basico|whatsapp|localização|localizacao|apresentação|apresentacao|barato)/.test(t))
    return "Básico";
  return "Personalizado";
}

const PLAN_PITCH: Record<string, string> = {
  Básico:
    "Ele entrega uma presença digital simples, bonita e funcional, com botão direto para o WhatsApp.",
  Profissional:
    "Ele permite criar uma apresentação mais completa da sua empresa, com foco em passar confiança e gerar contatos pelo WhatsApp.",
  Premium:
    "Ele entrega um site mais forte e personalizado, com estrutura comercial completa e acabamento premium.",
  Personalizado:
    "Ele é montado sob medida para o que o seu negócio precisa.",
};

/* --- Mensagem sugerida de WhatsApp para o orçamento -------------------- */
export function budgetWaMessage(plan: string, initial: number, monthly: number): string {
  const pitch = PLAN_PITCH[plan] || PLAN_PITCH.Personalizado;
  const valor =
    initial > 0
      ? ` O investimento fica em ${brl(initial)} de criação${
          monthly > 0 ? ` + ${brl(monthly)}/mês de manutenção` : ""
        }.`
      : "";
  return `Pelo que você me passou, o plano que mais faz sentido para o seu negócio é o ${plan}. ${pitch}${valor}`;
}
