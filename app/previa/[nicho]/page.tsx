import { notFound } from "next/navigation";
import TierBar from "@/components/previa/TierBar";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import DemoImage from "@/components/previa/DemoImage";
import { WhatsAppIcon } from "@/components/ui";
import { waLink } from "@/lib/site";
import { previaDemos, PHOTOS } from "@/lib/previaDemos";

const PLANS = { basico: 1, profissional: 2, premium: 3 } as const;
type Plan = keyof typeof PLANS;

const PROCESSO = [
  { icon: "MessageCircle", title: "Você chama no WhatsApp", text: "Conta o que precisa, sem compromisso nenhum." },
  { icon: "PenTool", title: "Combinamos tudo", text: "Alinhamos detalhes, opções e o melhor caminho pra você." },
  { icon: "BadgeCheck", title: "Pronto pra aproveitar", text: "Atendimento rápido e acompanhamento de perto." },
];

const TRUST = [
  { icon: "ShieldCheck", text: "Atendimento de confiança" },
  { icon: "Rocket", text: "Resposta rápida" },
  { icon: "Star", text: "Clientes satisfeitos" },
];

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

  const wa = waLink(
    `Olá! Vi a prévia do site para ${demo.nicho} (plano ${planLabel}) e quero um site assim.`
  );

  // Fotos ilustrativas do Unsplash (com fallback em gradiente no DemoImage).
  const ids = PHOTOS[params.nicho] || [];
  const photo = (slot: number, w: number, h: number) =>
    ids.length === 0
      ? ""
      : `https://images.unsplash.com/${ids[slot % ids.length]}?auto=format&fit=crop&w=${w}&h=${h}&q=70`;

  const heroMesh = {
    background: `radial-gradient(60% 80% at 12% 8%, ${a}26, transparent 60%), radial-gradient(55% 65% at 96% 28%, ${a}1f, transparent 55%), linear-gradient(180deg, #ffffff, #faf8f7)`,
  };

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-800">
      <TierBar current={plan} basePath={`/previa/${params.nicho}`} nicho={demo.nicho} />

      {/* Aviso claro de demonstração */}
      <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs text-amber-900">
        <Icon name="Eye" className="mr-1 inline h-3.5 w-3.5 -translate-y-px" strokeWidth={2} />
        Demonstração — no site final entram <strong>as suas fotos, textos e a sua marca</strong>, e ele
        pode ter ainda mais recursos do que esta amostra.
      </div>

      {/* Barra de promoção (Premium) */}
      {has("premium") && (
        <div className="px-4 py-2 text-center text-xs font-medium text-white" style={{ backgroundColor: a }}>
          {demo.freteBar}
        </div>
      )}

      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <span className="font-serif text-2xl font-bold tracking-tight text-zinc-900">
            {demo.business}
          </span>
          <nav className="hidden items-center gap-7 text-sm text-zinc-600 md:flex">
            <span className="cursor-default transition hover:text-zinc-900">Início</span>
            {has("profissional") && <span className="cursor-default transition hover:text-zinc-900">{demo.itemsLabel}</span>}
            {has("premium") && <span className="cursor-default transition hover:text-zinc-900">Sobre</span>}
            <span className="cursor-default transition hover:text-zinc-900">Contato</span>
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
      <section className="relative overflow-hidden" style={heroMesh}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <Reveal>
            <div>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                style={{ backgroundColor: `${a}1a`, color: a }}
              >
                <Icon name="Sparkles" className="h-3.5 w-3.5" />
                {demo.hero.eyebrow}
              </span>
              <h1 className="mt-5 font-serif text-4xl font-bold leading-[1.05] text-zinc-900 sm:text-5xl lg:text-6xl">
                {demo.hero.title}
              </h1>
              <p className="mt-5 max-w-md text-lg text-zinc-600">{demo.hero.subtitle}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-zinc-700"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {demo.ctaHero}
                </a>
                {has("profissional") && (
                  <a
                    href="#itens"
                    className="inline-flex items-center rounded-full border border-zinc-300 px-6 py-3.5 text-sm font-semibold text-zinc-800 transition hover:bg-white"
                  >
                    Ver mais
                  </a>
                )}
              </div>

              <div className="mt-8 flex items-center gap-4 text-sm text-zinc-500">
                <span className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Icon key={s} name="Star" className="h-4 w-4 fill-amber-400 text-amber-400" strokeWidth={0} />
                  ))}
                </span>
                <span>
                  <strong className="text-zinc-800">4.9</strong> · clientes satisfeitos
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative">
              <DemoImage
                src={photo(1, 820, 1040)}
                alt={`Demonstração de site para ${demo.nicho}`}
                icon={demo.icon}
                accent={a}
                label="imagem ilustrativa"
                className="aspect-[4/5] w-full rounded-[2rem] shadow-2xl"
              />
              <div className="absolute -bottom-5 -left-5 flex items-center gap-2.5 rounded-2xl border border-zinc-100 bg-white px-5 py-3.5 shadow-xl">
                <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ backgroundColor: `${a}1a`, color: a }}>
                  <WhatsAppIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-zinc-900">Atendimento</p>
                  <p className="text-xs text-zinc-500">rápido pelo WhatsApp</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TRUST ROW */}
      <section className="border-b border-zinc-100">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-5 py-6 sm:grid-cols-3">
          {TRUST.map((t) => (
            <div key={t.text} className="flex items-center justify-center gap-2.5 text-sm text-zinc-600">
              <Icon name={t.icon} className="h-5 w-5" style={{ color: a }} />
              {t.text}
            </div>
          ))}
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-5 sm:grid-cols-3">
          {demo.diferenciais.map((d, i) => (
            <Reveal key={d.title} delay={i * 90}>
              <div className="h-full rounded-2xl border border-zinc-200 p-6 transition hover:-translate-y-1 hover:shadow-lg">
                <span
                  className="grid h-12 w-12 place-items-center rounded-xl"
                  style={{ backgroundColor: `${a}1a`, color: a }}
                >
                  <Icon name={d.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-serif text-lg font-bold text-zinc-900">{d.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{d.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SOBRE */}
      <section className="border-y border-zinc-100 bg-stone-50 py-16">
        <Reveal>
          <div className="mx-auto max-w-3xl px-5 text-center">
            <h2 className="font-serif text-3xl font-bold text-zinc-900">Sobre a {demo.business}</h2>
            <p className="mt-4 text-lg leading-relaxed text-zinc-600">{demo.sobre}</p>
          </div>
        </Reveal>
      </section>

      {/* CATEGORIAS — Profissional+ */}
      {has("profissional") && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {demo.categories.map((c, i) => (
              <Reveal key={c} delay={i * 70}>
                <a
                  href="#itens"
                  className="group relative flex aspect-square items-end overflow-hidden rounded-2xl p-4 text-white shadow-md"
                >
                  <span
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                    style={{ background: `linear-gradient(150deg, ${a}, ${a}99)`, opacity: 1 - i * 0.1 }}
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className="relative font-serif text-lg font-bold drop-shadow">{c}</span>
                </a>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* DESTAQUE — Premium */}
      {has("premium") && (
        <section className="bg-zinc-900 text-white">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-[1.2fr_1fr]">
            <Reveal>
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: a }}>
                  {demo.destaque.eyebrow}
                </span>
                <h2 className="mt-3 font-serif text-4xl font-bold leading-tight">{demo.destaque.title}</h2>
                <p className="mt-4 max-w-md text-white/70">{demo.destaque.text}</p>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-zinc-900 transition hover:-translate-y-0.5 hover:bg-zinc-100"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {demo.ctaShort}
                </a>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <DemoImage
                src={photo(2, 820, 620)}
                alt={`${demo.business} — destaque`}
                icon={demo.icon}
                accent={a}
                className="aspect-[4/3] w-full rounded-[1.75rem]"
              />
            </Reveal>
          </div>
        </section>
      )}

      {/* ITENS — Profissional+ */}
      {has("profissional") && (
        <section id="itens" className="mx-auto max-w-6xl px-5 py-16">
          <Reveal>
            <div className="text-center">
              <h2 className="font-serif text-3xl font-bold text-zinc-900">{demo.itemsLabel}</h2>
              <p className="mt-2 text-zinc-600">{demo.itemsSubtitle}</p>
            </div>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3">
            {demo.items.map((p, i) => (
              <Reveal key={p.name} delay={(i % 3) * 80}>
                <div className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative">
                    <DemoImage
                      src={photo(10 + i, 700, 540)}
                      alt={p.name}
                      icon={demo.icon}
                      accent={a}
                      className="aspect-[4/3]"
                    />
                    {p.tag && (
                      <span
                        className="absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white"
                        style={{ backgroundColor: a }}
                      >
                        {p.tag}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-2 p-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-zinc-900">{p.name}</p>
                      <p className="text-sm font-bold" style={{ color: a }}>{p.value}</p>
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
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* PROCESSO — Premium */}
      {has("premium") && (
        <section className="border-y border-zinc-100 bg-stone-50 py-16">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal>
              <h2 className="text-center font-serif text-3xl font-bold text-zinc-900">Como funciona</h2>
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {PROCESSO.map((p, i) => (
                <Reveal key={p.title} delay={i * 90}>
                  <div className="relative rounded-2xl border border-zinc-200 bg-white p-6">
                    <span className="font-serif text-5xl font-bold" style={{ color: `${a}33` }}>
                      0{i + 1}
                    </span>
                    <span
                      className="mt-2 grid h-11 w-11 place-items-center rounded-xl"
                      style={{ backgroundColor: `${a}1a`, color: a }}
                    >
                      <Icon name={p.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-bold text-zinc-900">{p.title}</h3>
                    <p className="mt-1.5 text-sm text-zinc-600">{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* VITRINE / DESTAQUES — Premium */}
      {has("premium") && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          <Reveal>
            <h2 className="text-center font-serif text-3xl font-bold text-zinc-900">{demo.vitrineLabel}</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {demo.vitrine.map((v, i) => (
              <Reveal key={v.name} delay={i * 90}>
                <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative">
                    <DemoImage
                      src={photo(20 + i, 760, 470)}
                      alt={v.name}
                      icon={demo.icon}
                      accent={a}
                      className="aspect-[16/10]"
                    />
                    <span className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-zinc-900">
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
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* GALERIA — Premium */}
      {has("premium") && (
        <section className="border-y border-zinc-100 bg-stone-50 py-16">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal>
              <h2 className="text-center font-serif text-3xl font-bold text-zinc-900">Um pouco do nosso trabalho</h2>
              <p className="mt-2 text-center text-zinc-600">No seu site, este espaço fica com as suas fotos reais.</p>
            </Reveal>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Reveal key={i} delay={(i % 6) * 50}>
                  <DemoImage
                    src={photo(30 + i, 520, 520)}
                    alt={`${demo.business} — trabalho ${i + 1}`}
                    icon={demo.icon}
                    accent={a}
                    label={i === 0 ? "sua foto aqui" : undefined}
                    className="aspect-square rounded-xl"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DEPOIMENTOS — Profissional+ */}
      {has("profissional") && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          <Reveal>
            <h2 className="text-center font-serif text-3xl font-bold text-zinc-900">Quem é cliente, recomenda</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {demo.depoimentos.map((d, i) => (
              <Reveal key={d.nome} delay={i * 90}>
                <figure className="h-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                  <div className="flex gap-0.5 text-amber-400">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <Icon key={s} name="Star" className="h-4 w-4 fill-current" strokeWidth={0} />
                    ))}
                  </div>
                  <blockquote className="mt-3 text-sm leading-relaxed text-zinc-700">&ldquo;{d.texto}&rdquo;</blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <span
                      className="grid h-10 w-10 place-items-center rounded-full font-bold text-white"
                      style={{ backgroundColor: a }}
                    >
                      {d.nome.charAt(0)}
                    </span>
                    <span className="text-sm font-semibold text-zinc-900">{d.nome}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* NÚMEROS — Premium */}
      {has("premium") && (
        <section style={{ background: `linear-gradient(135deg, ${a}, ${a}cc)` }} className="text-white">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-5 py-14 text-center sm:grid-cols-3">
            {demo.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 90}>
                <div>
                  <p className="font-serif text-4xl font-bold sm:text-5xl">{s.value}</p>
                  <p className="mt-1 text-sm text-white/80">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* FAQ — Premium */}
      {has("premium") && (
        <section className="mx-auto max-w-3xl px-5 py-16">
          <Reveal>
            <h2 className="text-center font-serif text-3xl font-bold text-zinc-900">Perguntas frequentes</h2>
          </Reveal>
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

      {/* CAPTAÇÃO — Premium */}
      {has("premium") && (
        <section className="border-y border-zinc-100 bg-stone-50 py-16">
          <Reveal>
            <div className="mx-auto max-w-3xl px-5 text-center">
              <h2 className="font-serif text-3xl font-bold text-zinc-900">{demo.leadOffer.title}</h2>
              <p className="mt-2 text-zinc-600">{demo.leadOffer.subtitle}</p>
              <div className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="flex-1 rounded-full border border-zinc-300 px-5 py-3 text-sm text-zinc-800 outline-none focus:border-zinc-900"
                />
                <button
                  type="button"
                  className="rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  style={{ backgroundColor: a }}
                >
                  {demo.leadOffer.button}
                </button>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* LOCALIZAÇÃO — Profissional+ */}
      {has("profissional") && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid items-center gap-8 overflow-hidden rounded-3xl border border-zinc-200 md:grid-cols-2">
            <div className="p-8">
              <h2 className="font-serif text-2xl font-bold text-zinc-900">Onde nos encontrar</h2>
              <ul className="mt-5 space-y-3 text-sm text-zinc-700">
                {demo.location.lines.map((line, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <span style={{ color: a }}>
                      <Icon name={i === 0 ? "MapPin" : "Clock"} className="h-4 w-4" />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[16/10] w-full md:h-full" style={{ background: `linear-gradient(150deg, ${a}1f, #f5f5f4)` }}>
              <span className="absolute inset-0 grid place-items-center" style={{ color: a }}>
                <Icon name="MapPin" className="h-10 w-10" />
              </span>
            </div>
          </div>
        </section>
      )}

      {/* CTA FINAL — É DEMONSTRAÇÃO */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, #0a2540, #06182b)` }}>
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl"
          style={{ backgroundColor: `${a}55` }}
        />
        <Reveal>
          <div className="relative mx-auto max-w-3xl px-5 py-20 text-center text-white">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider ring-1 ring-white/20">
              <Icon name="Eye" className="h-3.5 w-3.5" />
              Isto é uma demonstração
            </span>
            <h2 className="mt-5 font-serif text-3xl font-bold sm:text-4xl">Gostou? Isto é só uma amostra.</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/70">
              O seu site é feito sob medida — com a sua marca, suas fotos e seus textos — e pode ter ainda
              mais seções e recursos do que você viu aqui. Vamos criar o seu?
            </p>
            <a
              href={wa}
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
      <footer className="bg-zinc-900 py-8 text-center text-xs text-white/50">
        <p>
          © {new Date().getFullYear()} {demo.business} — site de demonstração criado pela Elevon Studio.
        </p>
      </footer>

      {/* WhatsApp flutuante */}
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] py-3.5 pl-4 pr-5 font-semibold text-white shadow-lg transition hover:scale-105"
      >
        <WhatsAppIcon className="h-6 w-6" />
        <span className="hidden text-sm sm:inline">Fale conosco</span>
      </a>
    </div>
  );
}
