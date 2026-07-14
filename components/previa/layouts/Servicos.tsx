import Icon from "../../Icon";
import Reveal from "../../Reveal";
import { WhatsAppIcon } from "../../ui";
import { BrandLogo, Stars, DepoGrid, FaqList, StatsBand } from "../parts";
import { waLink } from "@/lib/site";
import type { ServicosDemo } from "@/lib/previaDemos";
import type { LayoutBaseProps } from "../types";

/* ==========================================================================
   LAYOUT: PRESTADOR DE SERVIÇOS  — confiança e captação
   Hero split com card de "peça seu orçamento", passo a passo em timeline e
   selo de garantia. Cor teal, tipografia geométrica amigável (Poppins).
   ========================================================================== */
export default function Servicos({
  demo,
  has,
  photo,
  tier,
}: { demo: ServicosDemo } & LayoutBaseProps) {
  const a = demo.accent;
  const wa = (m: string) => waLink(m);
  const waQuote = wa(`Olá! Quero pedir um orçamento com a ${demo.business}.`);

  return (
    <div className="bg-white font-sans text-slate-700">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <BrandLogo logoUrl={demo.logoUrl} business={demo.business}>
            <span className="flex items-center gap-2 font-servicos text-xl font-extrabold tracking-tight text-slate-900">
              <span className="grid h-8 w-8 place-items-center rounded-lg text-white" style={{ backgroundColor: a }}>
                <Icon name="Wrench" className="h-4 w-4" />
              </span>
              {demo.business}
            </span>
          </BrandLogo>
          <nav className="hidden items-center gap-7 text-sm text-slate-600 md:flex">
            <span className="cursor-default transition hover:text-slate-900">Serviços</span>
            {has("profissional") && <span className="cursor-default transition hover:text-slate-900">Como funciona</span>}
            <span className="cursor-default transition hover:text-slate-900">Contato</span>
          </nav>
          <a
            href={waQuote}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold text-white transition hover:-translate-y-0.5"
            style={{ backgroundColor: a }}
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            {demo.ctaShort}
          </a>
        </div>
      </header>

      {/* HERO — texto + card de orçamento ---------------------------------- */}
      <section
        className="relative overflow-hidden"
        style={{ background: `radial-gradient(70% 90% at 85% 0%, ${a}16, transparent 60%), linear-gradient(180deg, #ffffff, #f6faf9)` }}
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-[1.1fr_1fr] md:py-24">
          <Reveal>
            <div>
              {tier.premiumTag && (
                <span className="mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-white" style={{ backgroundColor: a }}>
                  <Icon name="Sparkles" className="h-3.5 w-3.5" />
                  {tier.premiumTag}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: `${a}1a`, color: a }}>
                <Icon name="BadgeCheck" className="h-3.5 w-3.5" />
                {demo.hero.eyebrow}
              </span>
              <h1 className="mt-5 font-servicos text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                {demo.hero.title}
              </h1>
              <p className="mt-5 max-w-md text-lg text-slate-600">{demo.hero.subtitle}</p>
              <div className="mt-8 grid max-w-md grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { icon: "ShieldCheck", label: "Serviço com garantia" },
                  { icon: "Clock", label: "Orçamento em 24h" },
                  { icon: "MapPin", label: "Atende sua região" },
                ].map((t) => (
                  <div key={t.label} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-700 shadow-sm">
                    <Icon name={t.icon} className="h-4 w-4 shrink-0" style={{ color: a }} />
                    {t.label}
                  </div>
                ))}
              </div>
              {/* Básico — CTA simples (sem o form de orçamento) */}
              {!has("profissional") && (
                <a
                  href={waQuote}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
                  style={{ backgroundColor: a }}
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {demo.ctaHero}
                </a>
              )}
            </div>
          </Reveal>

          {has("profissional") ? (
          /* Card de orçamento (Profissional+) */
          <Reveal delay={120}>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
              <div className="px-6 py-5 text-white" style={{ background: `linear-gradient(135deg, ${a}, ${a}cc)` }}>
                <p className="flex items-center gap-2 font-servicos text-lg font-bold">
                  <Icon name="FileText" className="h-5 w-5" />
                  Peça seu orçamento grátis
                </p>
                <p className="mt-0.5 text-sm text-white/80">Resposta em até 24h, sem compromisso.</p>
              </div>
              <div className="space-y-3 p-6">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">Seu nome</label>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-400">Ex.: João Silva</div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">O que você precisa?</label>
                  <div className="flex flex-wrap gap-1.5">
                    {demo.services.slice(0, 4).map((s, i) => (
                      <span
                        key={s.name}
                        className="rounded-full px-3 py-1.5 text-xs font-medium"
                        style={i === 0 ? { backgroundColor: a, color: "#fff" } : { backgroundColor: "#f1f5f9", color: "#475569" }}
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href={waQuote}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5"
                  style={{ backgroundColor: a }}
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {demo.ctaHero}
                </a>
                <p className="text-center text-xs text-slate-400">Grátis e sem compromisso · resposta rápida</p>
              </div>
            </div>
          </Reveal>
          ) : (
            /* Básico — apoio visual simples (sem o form) */
            <div className="flex items-center justify-center">
              <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl text-white" style={{ backgroundColor: a }}>
                  <Icon name="Wrench" className="h-7 w-7" />
                </span>
                <p className="mt-4 font-servicos text-lg font-bold text-slate-900">Orçamento gratuito</p>
                <p className="mt-1 text-sm text-slate-500">
                  Conte o que precisa pelo WhatsApp e receba um preço justo, sem compromisso.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* GARANTIA + COBERTURA (Básico+) */}
      <section className="border-y border-slate-100 bg-slate-50">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-5 py-6 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg" style={{ backgroundColor: `${a}1a`, color: a }}>
              <Icon name="ShieldCheck" className="h-5 w-5" />
            </span>
            <span className="text-sm">
              <strong className="block text-slate-900">Garantia no serviço</strong>
              <span className="text-slate-500">{demo.garantia}</span>
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg" style={{ backgroundColor: `${a}1a`, color: a }}>
              <Icon name="MapPin" className="h-5 w-5" />
            </span>
            <span className="text-sm">
              <strong className="block text-slate-900">Área de cobertura</strong>
              <span className="text-slate-500">{demo.coverage}</span>
            </span>
          </div>
        </div>
      </section>

      {/* SERVIÇOS (Básico+) */}
      <section id="servicos" className="mx-auto max-w-6xl px-5 py-16">
        <Reveal>
          <div className="text-center">
            <h2 className="font-servicos text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">O que a gente resolve</h2>
            <p className="mt-2 text-slate-600">Veja os serviços e peça seu orçamento gratuito pelo WhatsApp.</p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {demo.services.map((s, i) => (
            <Reveal key={s.name} delay={(i % 3) * 80}>
              <div className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl" style={{ backgroundColor: `${a}1a`, color: a }}>
                    <Icon name={s.icon} className="h-6 w-6" />
                  </span>
                  {s.tag && (
                    <span className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white" style={{ backgroundColor: a }}>
                      {s.tag}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-servicos text-lg font-bold text-slate-900">{s.name}</h3>
                <p className="mt-1 flex-1 text-sm text-slate-600">{s.text}</p>
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="font-servicos text-base font-bold" style={{ color: a }}>{s.price}</span>
                  <a
                    href={wa(`Olá! Quero um orçamento de "${s.name}" com a ${demo.business}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold text-white transition hover:opacity-90"
                    style={{ backgroundColor: a }}
                  >
                    <WhatsAppIcon className="h-3.5 w-3.5" />
                    Orçamento
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* COMO FUNCIONA (Profissional+) — timeline conectada ----------------- */}
      {has("profissional") && (
        <section className="border-y border-slate-100 bg-slate-50 py-16">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal>
              <div className="text-center">
                <h2 className="font-servicos text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Como funciona</h2>
                <p className="mt-2 text-slate-600">Do primeiro contato ao serviço feito, sem complicação.</p>
              </div>
            </Reveal>
            <div className="relative mt-12 grid gap-8 md:grid-cols-3">
              {/* linha conectora */}
              <div className="absolute left-0 right-0 top-6 hidden h-px md:block" style={{ background: `linear-gradient(90deg, transparent, ${a}66, transparent)` }} />
              {demo.comoFunciona.map((p, i) => (
                <Reveal key={p.title} delay={i * 100}>
                  <div className="relative text-center">
                    <span className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white shadow-lg" style={{ backgroundColor: a }}>
                      {i + 1}
                    </span>
                    <span className="mx-auto mt-4 flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: `${a}14`, color: a }}>
                      <Icon name={p.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="mt-3 font-servicos font-bold text-slate-900">{p.title}</h3>
                    <p className="mx-auto mt-1.5 max-w-xs text-sm text-slate-600">{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SOBRE (Básico+) */}
      <section className="mx-auto max-w-3xl px-5 py-16 text-center">
        <Reveal>
          <h2 className="font-servicos text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Sobre a {demo.business}</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{demo.sobre}</p>
          <div className="mt-6 flex items-center justify-center gap-3 text-sm text-slate-500">
            <Stars />
            <span>+1.500 serviços realizados</span>
          </div>
        </Reveal>
      </section>

      {/* DEPOIMENTOS (Profissional+) */}
      {has("profissional") && (
        <section className="border-y border-slate-100 bg-slate-50 py-16">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal>
              <h2 className="text-center font-servicos text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Quem contratou, aprova</h2>
            </Reveal>
            <div className="mt-10">
              <DepoGrid items={demo.depoimentos} accent={a} />
            </div>
          </div>
        </section>
      )}

      {/* ORÇAMENTO EM DESTAQUE (Premium) */}
      {has("premium") && (
        <section className="mx-auto max-w-5xl px-5 py-16">
          <Reveal>
            <div className="overflow-hidden rounded-3xl text-white" style={{ background: `linear-gradient(135deg, ${a}, #0f3d3a)` }}>
              <div className="grid items-center gap-8 p-8 sm:p-12 md:grid-cols-[1.1fr_1fr]">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Orçamento gratuito</span>
                  <h2 className="mt-3 font-servicos text-3xl font-extrabold">Conte o que precisa e receba o preço hoje.</h2>
                  <p className="mt-3 text-white/80">Resposta em até 24h, sem compromisso. Preço justo e transparente.</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/20">
                  <div className="space-y-3">
                    <div className="rounded-lg bg-white/90 px-4 py-3 text-sm text-slate-400">Seu nome</div>
                    <div className="rounded-lg bg-white/90 px-4 py-3 text-sm text-slate-400">Qual serviço você precisa?</div>
                    <a
                      href={waQuote}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-lg bg-white py-3 text-sm font-bold transition hover:-translate-y-0.5"
                      style={{ color: a }}
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      Pedir orçamento
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* NÚMEROS (Premium) */}
      {has("premium") && <StatsBand items={demo.stats} accent={a} />}

      {/* FAQ (Premium) */}
      {has("premium") && (
        <section className="mx-auto max-w-3xl px-5 py-16">
          <Reveal>
            <h2 className="text-center font-servicos text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Perguntas frequentes</h2>
          </Reveal>
          <div className="mt-8">
            <FaqList items={demo.faq} />
          </div>
        </section>
      )}

      {/* CONTATO (Básico+) */}
      <section className="border-t border-slate-100 bg-slate-50 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 md:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="font-servicos text-2xl font-extrabold tracking-tight text-slate-900">Fale com a gente</h2>
              <ul className="mt-6 space-y-4 text-sm text-slate-700">
                <li className="flex items-center gap-2.5">
                  <Icon name="MapPin" className="h-5 w-5" style={{ color: a }} />
                  {demo.contact.address}
                </li>
                <li className="flex items-center gap-2.5">
                  <Icon name="Clock" className="h-5 w-5" style={{ color: a }} />
                  {demo.contact.hours}
                </li>
              </ul>
              <a
                href={waQuote}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
                style={{ backgroundColor: a }}
              >
                <WhatsAppIcon className="h-4 w-4" />
                {demo.ctaHero}
              </a>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl" style={{ background: `linear-gradient(150deg, ${a}1f, #f1f5f9)` }}>
              <span className="absolute inset-0 grid place-items-center" style={{ color: a }}>
                <Icon name="MapPin" className="h-10 w-10" strokeWidth={1.5} />
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
