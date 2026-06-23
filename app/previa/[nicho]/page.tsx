import { notFound } from "next/navigation";
import TierBar from "@/components/previa/TierBar";
import Icon from "@/components/Icon";
import { WhatsAppIcon } from "@/components/ui";
import { waLink } from "@/lib/site";
import { previaDemos } from "@/lib/previaDemos";

const PLANS = { basico: 1, profissional: 2, premium: 3 } as const;
type Plan = keyof typeof PLANS;

export default function PreviaNicho({
  params,
  searchParams,
}: {
  params: { nicho: string };
  searchParams: { plano?: string };
}) {
  const demo = previaDemos[params.nicho];
  if (!demo) notFound();

  const raw = (searchParams.plano || "profissional").toLowerCase();
  const plan: Plan = (["basico", "profissional", "premium"].includes(raw)
    ? raw
    : "profissional") as Plan;
  const rank = PLANS[plan];
  const has = (min: Plan) => rank >= PLANS[min];
  const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1);
  const a = demo.accent;

  // Todo botão de WhatsApp da demo leva à Elevon (é uma demonstração).
  const wa = waLink(
    `Olá! Vi a prévia do site para ${demo.nicho} (plano ${planLabel}) e quero um site assim.`
  );

  const softBg = (hex: string) => `${hex}1a`; // ~10% alpha

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-800">
      <TierBar current={plan} basePath={`/previa/${params.nicho}`} nicho={demo.nicho} />

      {/* Barra de frete/promo — Premium */}
      {has("premium") && (
        <div
          className="px-4 py-2 text-center text-xs font-medium text-white"
          style={{ backgroundColor: a }}
        >
          {demo.freteBar}
        </div>
      )}

      {/* HEADER */}
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <span className="font-serif text-2xl font-bold tracking-tight text-zinc-900">
            {demo.business}
          </span>
          <nav className="hidden items-center gap-6 text-sm text-zinc-600 md:flex">
            <span>Início</span>
            {has("profissional") && <span>{demo.itemsLabel}</span>}
            {has("profissional") && <span>Contato</span>}
          </nav>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-zinc-700"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            {demo.ctaShort}
          </a>
        </div>
      </header>

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${softBg(a)}, #ffffff 60%)` }}
      >
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: a }}
            >
              {demo.hero.eyebrow}
            </p>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-zinc-900 sm:text-5xl">
              {demo.hero.title}
            </h1>
            <p className="mt-4 max-w-md text-zinc-600">{demo.hero.subtitle}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {demo.ctaHero}
              </a>
              {has("profissional") && (
                <a
                  href="#itens"
                  className="inline-flex items-center rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50"
                >
                  Ver mais
                </a>
              )}
            </div>
          </div>
          <div className="relative">
            <div
              className="aspect-[4/5] w-full rounded-3xl shadow-xl"
              style={{ background: `linear-gradient(135deg, ${a}, ${a}55)` }}
            />
            <div className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-2xl border border-zinc-100 bg-white px-4 py-3 shadow-lg">
              <Icon name="Star" className="h-5 w-5 fill-amber-400 text-amber-400" strokeWidth={0} />
              <div>
                <p className="text-sm font-bold text-zinc-900">4.9 / 5</p>
                <p className="text-[11px] text-zinc-500">avaliação dos clientes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS — todos os planos (deixa o Básico completo) */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-5 sm:grid-cols-3">
          {demo.diferenciais.map((d) => (
            <div key={d.title} className="rounded-2xl border border-zinc-200 p-6">
              <span
                className="grid h-11 w-11 place-items-center rounded-xl"
                style={{ backgroundColor: softBg(a), color: a }}
              >
                <Icon name={d.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold text-zinc-900">{d.title}</h3>
              <p className="mt-1 text-sm text-zinc-600">{d.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SOBRE — todos os planos */}
      <section className="border-y border-zinc-100 bg-stone-50 py-14">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="font-serif text-3xl font-bold text-zinc-900">
            Sobre a {demo.business}
          </h2>
          <p className="mt-4 leading-relaxed text-zinc-600">{demo.sobre}</p>
        </div>
      </section>

      {/* CATEGORIAS — Profissional+ */}
      {has("profissional") && (
        <section className="mx-auto max-w-6xl px-5 py-14">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {demo.categories.map((c, i) => (
              <a
                key={c}
                href="#itens"
                className="group relative flex aspect-square items-end overflow-hidden rounded-2xl p-4 text-white"
              >
                <span
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${a}, ${a}99)`,
                    opacity: 1 - i * 0.12,
                  }}
                />
                <span className="relative font-serif text-lg font-bold drop-shadow">{c}</span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* DESTAQUE — Premium */}
      {has("premium") && (
        <section className="bg-zinc-900 text-white">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-14 md:grid-cols-[1.2fr_1fr]">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: a }}
              >
                {demo.destaque.eyebrow}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold">{demo.destaque.title}</h2>
              <p className="mt-3 max-w-md text-white/70">{demo.destaque.text}</p>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {demo.ctaShort}
              </a>
            </div>
            <div
              className="aspect-[4/3] w-full rounded-3xl"
              style={{ background: `linear-gradient(135deg, ${a}, ${a}40)` }}
            />
          </div>
        </section>
      )}

      {/* ITENS (produtos/serviços/cardápio…) — Profissional+ */}
      {has("profissional") && (
        <section id="itens" className="mx-auto max-w-6xl px-5 py-16">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-zinc-900">{demo.itemsLabel}</h2>
            <p className="mt-2 text-zinc-600">{demo.itemsSubtitle}</p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3">
            {demo.items.map((p) => (
              <div key={p.name} className="group">
                <div
                  className="relative aspect-[3/4] overflow-hidden rounded-2xl"
                  style={{ background: `linear-gradient(135deg, ${softBg(a)}, ${a}33)` }}
                >
                  {p.tag && (
                    <span
                      className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white"
                      style={{ backgroundColor: a }}
                    >
                      {p.tag}
                    </span>
                  )}
                  <span className="absolute inset-0 grid place-items-center text-zinc-400/50">
                    <Icon name={demo.icon} className="h-10 w-10" strokeWidth={1.5} />
                  </span>
                </div>
                <div className="mt-3 flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-zinc-900">{p.name}</p>
                    <p className="text-sm font-bold text-zinc-900">{p.value}</p>
                  </div>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${demo.ctaShort} — ${p.name}`}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-zinc-900 text-white transition hover:bg-zinc-700"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* VITRINE / DESTAQUES — Premium */}
      {has("premium") && (
        <section className="border-y border-zinc-100 bg-stone-50 py-16">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="text-center font-serif text-3xl font-bold text-zinc-900">
              {demo.vitrineLabel}
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {demo.vitrine.map((v, i) => (
                <div
                  key={v.name}
                  className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm"
                >
                  <div
                    className="relative aspect-[16/10]"
                    style={{ background: `linear-gradient(135deg, ${a}, ${a}40)` }}
                  >
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-zinc-900">
                      #{i + 1} mais procurado
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 p-5">
                    <div>
                      <p className="font-semibold text-zinc-900">{v.name}</p>
                      <p className="text-sm font-bold" style={{ color: a }}>{v.value}</p>
                    </div>
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-zinc-700"
                    >
                      <WhatsAppIcon className="h-3.5 w-3.5" />
                      {demo.ctaShort}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DEPOIMENTOS — Profissional+ */}
      {has("profissional") && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-center font-serif text-3xl font-bold text-zinc-900">
            Quem é cliente, recomenda
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {demo.depoimentos.map((d) => (
              <figure key={d.nome} className="rounded-2xl border border-zinc-200 p-6">
                <div className="flex gap-0.5 text-amber-400">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Icon key={s} name="Star" className="h-4 w-4 fill-current" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="mt-3 text-sm leading-relaxed text-zinc-700">
                  &ldquo;{d.texto}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-zinc-900">
                  {d.nome}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* NÚMEROS / PROVA SOCIAL — Premium */}
      {has("premium") && (
        <section style={{ backgroundColor: softBg(a) }}>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-5 py-12 text-center sm:grid-cols-3">
            {demo.stats.map((s) => (
              <div key={s.label}>
                <p className="font-serif text-4xl font-bold" style={{ color: a }}>
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-zinc-600">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ — Premium */}
      {has("premium") && (
        <section className="mx-auto max-w-3xl px-5 py-16">
          <h2 className="text-center font-serif text-3xl font-bold text-zinc-900">
            Perguntas frequentes
          </h2>
          <div className="mt-8 divide-y divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200">
            {demo.faq.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50">
                  {f.q}
                  <span className="text-zinc-400 transition group-open:rotate-45">
                    <Icon name="Plus" className="h-4 w-4" />
                  </span>
                </summary>
                <p className="px-6 pb-5 text-sm leading-relaxed text-zinc-600">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* CAPTAÇÃO DE LEADS — Premium */}
      {has("premium") && (
        <section className="border-y border-zinc-100 bg-stone-50 py-16">
          <div className="mx-auto max-w-3xl px-5 text-center">
            <h2 className="font-serif text-3xl font-bold text-zinc-900">
              {demo.leadOffer.title}
            </h2>
            <p className="mt-2 text-zinc-600">{demo.leadOffer.subtitle}</p>
            <div className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 rounded-full border border-zinc-300 px-5 py-3 text-sm text-zinc-800 outline-none focus:border-zinc-900"
              />
              <button
                type="button"
                className="rounded-full px-6 py-3 text-sm font-semibold text-white transition"
                style={{ backgroundColor: a }}
              >
                {demo.leadOffer.button}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* LOCALIZAÇÃO — Profissional+ */}
      {has("profissional") && (
        <section className="mx-auto max-w-6xl px-5 py-14">
          <div className="grid items-center gap-8 overflow-hidden rounded-3xl border border-zinc-200 md:grid-cols-2">
            <div className="p-8">
              <h2 className="font-serif text-2xl font-bold text-zinc-900">Onde nos encontrar</h2>
              <ul className="mt-5 space-y-3 text-sm text-zinc-700">
                {demo.location.lines.map((line, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <Icon
                      name={i === 0 ? "MapPin" : "MessageCircle"}
                      className="h-4 w-4"
                      style={{ color: a }}
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="relative aspect-[16/10] w-full md:h-full"
              style={{ background: `linear-gradient(135deg, ${softBg(a)}, #f5f5f4)` }}
            >
              <span className="absolute inset-0 grid place-items-center" style={{ color: a }}>
                <Icon name="MapPin" className="h-10 w-10" />
              </span>
            </div>
          </div>
        </section>
      )}

      {/* CTA FINAL / CONTATO — todos os planos */}
      <section className="border-t border-zinc-100 bg-stone-50 py-14">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="font-serif text-2xl font-bold text-zinc-900">{demo.business}</h2>
          <p className="mt-3 text-zinc-600">
            Fale com a gente e receba um atendimento personalizado pelo WhatsApp.
          </p>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-700"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Falar no WhatsApp
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-zinc-900 py-8 text-center text-xs text-white/50">
        <p>
          © {new Date().getFullYear()} {demo.business} — site de demonstração.
        </p>
      </footer>

      {/* WhatsApp flutuante */}
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] py-3.5 pl-4 pr-5 font-semibold text-white shadow-lg transition hover:scale-105"
      >
        <WhatsAppIcon className="h-6 w-6" />
        <span className="hidden text-sm sm:inline">Fale conosco</span>
      </a>
    </div>
  );
}
