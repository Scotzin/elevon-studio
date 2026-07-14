import { notFound } from "next/navigation";
import type { Metadata } from "next";
import TierBar from "@/components/previa/TierBar";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/ui";
import { waLink, siteConfig } from "@/lib/site";
import { previaDemos, PHOTOS, type PreviaDemo } from "@/lib/previaDemos";
import { fontByLayout } from "@/components/previa/fonts";
import PreviaCustomizer from "@/components/previa/PreviaCustomizer";
import { tierOf } from "@/lib/previaTiers";
import type { Plan } from "@/components/previa/types";

import Barbearia from "@/components/previa/layouts/Barbearia";
import Restaurante from "@/components/previa/layouts/Restaurante";
import Loja from "@/components/previa/layouts/Loja";
import Estetica from "@/components/previa/layouts/Estetica";
import Imobiliaria from "@/components/previa/layouts/Imobiliaria";
import Servicos from "@/components/previa/layouts/Servicos";

/* ==========================================================================
   PRÉVIA POR NICHO — DISPATCHER
   --------------------------------------------------------------------------
   Resolve o plano (?plano=basico|profissional|premium), monta os helpers
   (has/photo) e despacha para o LAYOUT específico do nicho. A "moldura" da
   Elevon (overlay de demo, faixa de demonstração, faixa promo do Premium,
   CTA final e botão flutuante) é igual para todos; o miolo é bem diferente
   de um nicho para o outro. Para editar conteúdo, mexa em lib/previaDemos.ts.
   ========================================================================== */

const PLANS = { basico: 1, profissional: 2, premium: 3 } as const;

const clean = (v?: string, max = 60) => (v || "").trim().replace(/\s+/g, " ").slice(0, max);

/* Só aceita cor hex válida (#rgb / #rrggbb / #rrggbbaa) — evita injeção de CSS. */
function cleanCor(v?: string): string {
  const s = (v || "").trim();
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(s) ? s : "";
}

/* Só aceita URL http(s) — evita javascript:/data: no src da logo. */
function cleanUrl(v?: string): string {
  const s = (v || "").trim().slice(0, 500);
  return /^https?:\/\/[^\s]+$/i.test(s) ? s : "";
}

type Persona = { nome: string; cidade: string; cor: string; logo: string; slogan: string };

/* Personaliza a demo com os dados do prospect (vindos da URL, gerados pelo
   personalizador), para a prévia mostrar o negócio DELE. Mantém o tipo
   discriminado (layout). */
function applyPersona(demo: PreviaDemo, p: Persona): PreviaDemo {
  if (!p.nome && !p.cidade && !p.cor && !p.logo && !p.slogan) return demo;
  return {
    ...demo,
    business: p.nome || demo.business,
    accent: p.cor || demo.accent,
    logoUrl: p.logo || demo.logoUrl,
    hero: { ...demo.hero, subtitle: p.slogan || demo.hero.subtitle },
    contact: { ...demo.contact, address: p.cidade || demo.contact.address },
  } as PreviaDemo;
}

/* As prévias são demonstrações (negócios fictícios) — não devem ser
   indexadas pelo Google, mas têm título/descrição próprios para quando o
   link é compartilhado. */
export function generateMetadata({
  params,
  searchParams,
}: {
  params: { nicho: string };
  searchParams: { nome?: string };
}): Metadata {
  const demo = previaDemos[params.nicho];
  if (!demo) {
    return { title: "Prévia não encontrada", robots: { index: false, follow: false } };
  }
  const nome = clean(searchParams.nome);
  const business = nome || demo.business;
  const title = nome
    ? `${business} — site profissional`
    : `Prévia — modelo de site para ${demo.nicho}`;
  const description = `Demonstração de um site profissional para ${demo.nicho}, criado pela Elevon Studio. Veja como o seu negócio pode ficar online e vender pelo WhatsApp.`;

  const meta: Metadata = {
    title,
    description,
    robots: { index: false, follow: false },
    openGraph: { title, description },
    twitter: { title, description, card: "summary_large_image" },
  };

  // Link personalizado (?nome=) → o card de preview (OG) também mostra o nome
  // do prospect, gerado pela rota /api/og.
  if (nome) {
    const img = `${siteConfig.url}/api/og?nicho=${encodeURIComponent(params.nicho)}&nome=${encodeURIComponent(nome)}`;
    meta.openGraph = { ...meta.openGraph, images: [{ url: img, width: 1200, height: 630 }] };
    meta.twitter = { ...meta.twitter, images: [img] };
  }

  return meta;
}

export default function PreviaNicho({
  params,
  searchParams,
}: {
  params: { nicho: string };
  searchParams: { plano?: string; nome?: string; cidade?: string; cor?: string; logo?: string; slogan?: string };
}) {
  const demoBase = previaDemos[params.nicho];
  if (!demoBase) notFound();

  const persona: Persona = {
    nome: clean(searchParams.nome),
    cidade: clean(searchParams.cidade),
    cor: cleanCor(searchParams.cor),
    logo: cleanUrl(searchParams.logo),
    slogan: clean(searchParams.slogan, 160),
  };
  const nome = persona.nome;
  const cidade = persona.cidade;
  const demo = applyPersona(demoBase, persona);

  const raw = (searchParams.plano || "profissional").toLowerCase();
  const plan: Plan = (["basico", "profissional", "premium"].includes(raw)
    ? raw
    : "profissional") as Plan;
  const rank = PLANS[plan];
  const has = (min: Plan) => rank >= PLANS[min];
  const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1);
  const a = demo.accent;

  // Fotos ilustrativas do Unsplash (com fallback em gradiente no DemoImage).
  const ids = PHOTOS[params.nicho] || [];
  const photo = (slot: number, w: number, h: number) =>
    ids.length === 0
      ? ""
      : `https://images.unsplash.com/${ids[slot % ids.length]}?auto=format&fit=crop&w=${w}&h=${h}&q=70`;

  const waElevon = waLink(
    `Olá! Vi a prévia do site para ${demo.nicho} (plano ${planLabel}) e quero um site assim.`
  );
  const waBusiness = waLink(`Olá! Vi o site da ${demo.business} e quero falar.`);

  // Preserva a personalização ao alternar o plano na barra da Elevon.
  const extra =
    (persona.nome ? `&nome=${encodeURIComponent(persona.nome)}` : "") +
    (persona.cidade ? `&cidade=${encodeURIComponent(persona.cidade)}` : "") +
    (persona.cor ? `&cor=${encodeURIComponent(persona.cor)}` : "") +
    (persona.logo ? `&logo=${encodeURIComponent(persona.logo)}` : "") +
    (persona.slogan ? `&slogan=${encodeURIComponent(persona.slogan)}` : "");

  const tier = tierOf(plan);
  const layoutProps = { has, photo, plan, tier };
  const nichoFont = fontByLayout[demo.layout] || "";

  return (
    <div className={`min-h-screen bg-white ${nichoFont}`}>
      <TierBar current={plan} basePath={`/previa/${params.nicho}`} nicho={demo.nicho} extra={extra} />

      {/* Aviso claro de demonstração */}
      <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs text-amber-900">
        <Icon name="Eye" className="mr-1 inline h-3.5 w-3.5 -translate-y-px" strokeWidth={2} />
        Demonstração — no site final entram <strong>as suas fotos, textos e a sua marca</strong>, e ele
        pode ter ainda mais recursos do que esta amostra.
      </div>

      {/* Faixa de promoção (Premium) */}
      {has("premium") && (
        <div className="px-4 py-2 text-center text-xs font-medium text-white" style={{ backgroundColor: a }}>
          {demo.promo}
        </div>
      )}

      {/* LAYOUT específico do nicho */}
      {demo.layout === "barbearia" && <Barbearia demo={demo} {...layoutProps} />}
      {demo.layout === "restaurante" && <Restaurante demo={demo} {...layoutProps} />}
      {demo.layout === "loja" && <Loja demo={demo} {...layoutProps} />}
      {demo.layout === "estetica" && <Estetica demo={demo} {...layoutProps} />}
      {demo.layout === "imobiliaria" && <Imobiliaria demo={demo} {...layoutProps} />}
      {demo.layout === "servicos" && <Servicos demo={demo} {...layoutProps} />}

      {/* CTA FINAL — reforça que é uma DEMONSTRAÇÃO da Elevon */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a2540, #06182b)" }}>
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl"
          style={{ backgroundColor: `${a}55` }}
        />
        <Reveal>
          <div className="relative mx-auto max-w-3xl px-5 py-20 text-center text-white">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider ring-1 ring-white/20">
              <Icon name="Eye" className="h-3.5 w-3.5" />
              Isto é uma demonstração da Elevon Studio
            </span>
            <h2 className="mt-5 font-serif text-3xl font-bold sm:text-4xl">Gostou? Isto é só uma amostra.</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/70">
              Cada negócio tem o seu site sob medida — com a sua marca, suas fotos e seus textos — e com as
              seções que fazem sentido pro seu tipo de negócio. Vamos criar o seu?
            </p>
            <a
              href={waElevon}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-accent-dark"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Quero um site assim
            </a>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="bg-zinc-950 py-8 text-center text-xs text-white/50">
        <p>
          © {new Date().getFullYear()} {demo.business} — site de demonstração criado pela Elevon Studio.
        </p>
      </footer>

      {/* WhatsApp flutuante (contato do negócio na demo) */}
      <a
        href={waBusiness}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] py-3.5 pl-4 pr-5 font-semibold text-white shadow-lg transition hover:scale-105"
      >
        <WhatsAppIcon className="h-6 w-6" />
        <span className="hidden text-sm sm:inline">Fale conosco</span>
      </a>

      {/* Personalizador da Elevon (gera a prévia com os dados do prospect) */}
      <PreviaCustomizer
        nicho={params.nicho}
        plano={plan}
        defaultAccent={demoBase.accent}
        current={persona}
      />
    </div>
  );
}
