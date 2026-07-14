/* ==========================================================================
   TIERS DAS PRÉVIAS (Básico / Profissional / Premium)
   --------------------------------------------------------------------------
   Centraliza a DIFERENÇA entre os planos: além de quantas seções aparecem,
   cada plano tem uma "intensidade de design" própria que os layouts consomem
   para que a evolução Básico → Profissional → Premium seja visível em segundos.

   - hero:      qual versão do hero o nicho renderiza (simples/completo/premium)
   - elevation: acabamento dos cards (flat / soft / rich)
   - spacious:  respiro entre seções (Premium respira mais)
   - premiumTag: selo de exclusividade (só no Premium)
   - pitch/perks: usados na barra de planos (vitrine do valor de cada nível)
   Os preços espelham lib/site.ts (fonte da verdade comercial).
   ========================================================================== */
import type { Plan } from "@/components/previa/types";

export type Elevation = "flat" | "soft" | "rich";

export type TierTokens = {
  key: Plan;
  label: string;
  setup: string;
  monthly: string;
  pitch: string;
  perks: string[];
  hero: "simples" | "completo" | "premium";
  elevation: Elevation;
  spacious: boolean;
  animate: boolean;
  premiumTag?: string;
};

export const TIERS: Record<Plan, TierTokens> = {
  basico: {
    key: "basico",
    label: "Básico",
    setup: "R$ 400",
    monthly: "R$ 100/mês",
    pitch: "Presença profissional para começar.",
    perks: ["Uma página objetiva", "Conteúdo essencial", "Botão direto de WhatsApp"],
    hero: "simples",
    elevation: "flat",
    spacious: false,
    animate: false,
    premiumTag: undefined,
  },
  profissional: {
    key: "profissional",
    label: "Profissional",
    setup: "R$ 600",
    monthly: "R$ 150/mês",
    pitch: "Site personalizado, feito para converter.",
    perks: ["Mais seções e provas sociais", "Galeria e depoimentos", "Botões estratégicos de conversão"],
    hero: "completo",
    elevation: "soft",
    spacious: false,
    animate: true,
    premiumTag: undefined,
  },
  premium: {
    key: "premium",
    label: "Premium",
    setup: "R$ 950",
    monthly: "R$ 250/mês",
    pitch: "Presença de alto padrão, sob medida.",
    perks: ["Direção de arte exclusiva", "Seções imersivas e animadas", "Funil + acompanhamento (Analytics)"],
    hero: "premium",
    elevation: "rich",
    spacious: true,
    animate: true,
    premiumTag: "Experiência premium",
  },
};

export const tierOf = (plan: Plan): TierTokens => TIERS[plan];

/* Classes utilitárias de acabamento por elevação — pensadas para cards em
   SUPERFÍCIE CLARA (a maioria dos nichos). Nichos escuros tratam à parte. */
export const cardClass: Record<Elevation, string> = {
  flat: "rounded-2xl border border-slate-200",
  soft: "rounded-2xl border border-slate-200 shadow-sm transition hover:-translate-y-1 hover:shadow-lg",
  rich: "rounded-3xl border border-slate-200/70 shadow-xl ring-1 ring-black/[0.03] transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl",
};

/* Padding vertical de seção conforme o respiro do plano. */
export const sectionY = (spacious: boolean) => (spacious ? "py-20 sm:py-28" : "py-16");
