import Icon from "../../Icon";
import Reveal from "../../Reveal";
import DemoImage from "../DemoImage";
import AgendaWidget from "../AgendaWidget";
import { WhatsAppIcon } from "../../ui";
import { Stars, DepoGrid, FaqList, StatsBand } from "../parts";
import { waLink } from "@/lib/site";
import type { EsteticaDemo } from "@/lib/previaDemos";
import type { HasFn, PhotoFn } from "../types";

/* ==========================================================================
   LAYOUT: CLÍNICA DE ESTÉTICA  (suave, elegante, rosé)
   Núcleo: tratamentos por categoria, agendamento, antes/depois, pacotes.
   ========================================================================== */
export default function Estetica({
  demo,
  has,
  photo,
}: {
  demo: EsteticaDemo;
  has: HasFn;
  photo: PhotoFn;
}) {
  const a = demo.accent;
  const wa = (m: string) => waLink(m);
  const waBook = wa(`Olá! Quero agendar uma avaliação na ${demo.business}.`);
  const allTreatments = demo.treatments.flatMap((t) => t.items.map((i) => i.name));

  return (
    <div className="bg-[#fffafc] font-sans text-zinc-700">
      {/* HEADER */}
      <header className="border-b border-pink-100 bg-[#fffafc]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <span className="flex items-center gap-2 font-serif text-2xl font-bold tracking-tight text-zinc-900">
            <Icon name="Flower2" className="h-5 w-5" style={{ color: a }} />
            {demo.business}
          </span>
          <nav className="hidden items-center gap-7 text-sm text-zinc-500 md:flex">
            <span className="cursor-default transition hover:text-zinc-900">Tratamentos</span>
            {has("profissional") && <span className="cursor-default transition hover:text-zinc-900">Agendar</span>}
            {has("premium") && <span className="cursor-default transition hover:text-zinc-900">Pacotes</span>}
            <span className="cursor-default transition hover:text-zinc-900">Contato</span>
          </nav>
          <a
            href={waBook}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-white transition hover:-translate-y-0.5"
            style={{ backgroundColor: a }}
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            {demo.ctaShort}
          </a>
        </div>
      </header>

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{ background: `radial-gradient(65% 80% at 85% 5%, ${a}14, transparent 60%), linear-gradient(180deg, #fffafc, #fdf2f8)` }}
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <Reveal>
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: `${a}1a`, color: a }}>
                <Icon name="Sparkles" className="h-3.5 w-3.5" />
                {demo.hero.eyebrow}
              </span>
              <h1 className="mt-5 font-serif text-4xl font-bold leading-[1.08] text-zinc-900 sm:text-5xl lg:text-6xl">
                {demo.hero.title}
              </h1>
              <p className="mt-5 max-w-md text-lg text-zinc-600">{demo.hero.subtitle}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={waBook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5"
                  style={{ backgroundColor: a }}
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {demo.ctaHero}
                </a>
                <a href="#tratamentos" className="inline-flex items-center rounded-full border border-pink-200 px-6 py-3.5 text-sm font-semibold text-zinc-700 transition hover:bg-white">
                  Ver tratamentos
                </a>
              </div>
              <div className="mt-8 flex items-center gap-3 text-sm text-zinc-500">
                <Stars />
                <span>
                  <strong className="text-zinc-700">4.9</strong> · +3.000 clientes atendidas
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="group relative">
              <DemoImage
                src={photo(1, 820, 1040)}
                alt={`Demonstração de site para ${demo.nicho}`}
                icon={demo.icon}
                accent={a}
                label="imagem ilustrativa"
                className="aspect-[4/5] w-full rounded-[2.5rem] shadow-2xl"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* DIFERENCIAIS (Básico+) */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-5 sm:grid-cols-3">
          {demo.diferenciais.map((d, i) => (
            <Reveal key={d.title} delay={i * 90}>
              <div className="h-full rounded-3xl border border-pink-100 bg-white p-6 text-center shadow-sm">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full" style={{ backgroundColor: `${a}1a`, color: a }}>
                  <Icon name={d.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-serif text-lg font-bold text-zinc-900">{d.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{d.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TRATAMENTOS (Básico+) */}
      <section id="tratamentos" className="border-y border-pink-100 bg-white py-16">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="text-center">
              <h2 className="font-serif text-4xl font-bold text-zinc-900">Nossos tratamentos</h2>
              <p className="mt-2 text-zinc-600">Escolha o seu e agende a avaliação pelo WhatsApp.</p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-2">
            {demo.treatments.map((cat, ci) => (
              <Reveal key={cat.category} delay={(ci % 2) * 80}>
                <div className="rounded-3xl border border-pink-100 bg-[#fffafc] p-6">
                  <h3 className="flex items-center gap-2 font-serif text-xl font-bold text-zinc-900">
                    <span className="grid h-9 w-9 place-items-center rounded-full" style={{ backgroundColor: `${a}1a`, color: a }}>
                      <Icon name={cat.icon} className="h-4 w-4" />
                    </span>
                    {cat.category}
                  </h3>
                  <ul className="mt-4 divide-y divide-pink-100">
                    {cat.items.map((it) => (
                      <li key={it.name}>
                        <a
                          href={wa(`Olá! Quero agendar: ${it.name} (${it.price}) na ${demo.business}.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between gap-3 py-3"
                        >
                          <span className="min-w-0">
                            <span className="flex items-center gap-2 font-semibold text-zinc-900">
                              {it.name}
                              {it.tag && (
                                <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase text-white" style={{ backgroundColor: a }}>
                                  {it.tag}
                                </span>
                              )}
                            </span>
                            {it.duration && <span className="text-xs text-zinc-400">{it.duration}</span>}
                          </span>
                          <span className="shrink-0 font-bold" style={{ color: a }}>
                            {it.price}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE (Básico+) */}
      <section className="mx-auto max-w-3xl px-5 py-16 text-center">
        <Reveal>
          <h2 className="font-serif text-3xl font-bold text-zinc-900">Sobre a {demo.business}</h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-600">{demo.sobre}</p>
        </Reveal>
      </section>

      {/* AGENDAMENTO (Profissional+) */}
      {has("profissional") && (
        <section className="border-y border-pink-100 bg-gradient-to-b from-white to-pink-50/50 py-16">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2">
            <Reveal>
              <div>
                <h2 className="font-serif text-3xl font-bold text-zinc-900">Agende sua avaliação</h2>
                <p className="mt-4 max-w-md text-zinc-600">
                  A primeira avaliação é gratuita. Escolha o tratamento, o dia e o horário — confirmamos pelo WhatsApp.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-zinc-700">
                  {["Avaliação inicial gratuita", "Atendimento individual e acolhedor", "Produtos certificados"].map((li) => (
                    <li key={li} className="flex items-center gap-2.5">
                      <Icon name="Check" className="h-4 w-4" style={{ color: a }} />
                      {li}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <AgendaWidget services={allTreatments} accent={a} verb="agendar" title="Agende sua sessão" />
            </Reveal>
          </div>
        </section>
      )}

      {/* ANTES / DEPOIS (Premium) */}
      {has("premium") && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          <Reveal>
            <h2 className="text-center font-serif text-3xl font-bold text-zinc-900">Resultados reais</h2>
            <p className="mt-2 text-center text-zinc-600">No seu site, este espaço fica com as fotos das suas clientes.</p>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {demo.beforeAfter.map((b, i) => (
              <Reveal key={b.label} delay={i * 90}>
                <div className="overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-sm">
                  <div className="grid grid-cols-2">
                    <div className="relative">
                      <DemoImage src={photo(50 + i * 2, 420, 420)} alt={`${b.label} antes`} icon={demo.icon} accent={a} className="group aspect-square" />
                      <span className="absolute left-2 top-2 rounded bg-black/40 px-2 py-0.5 text-[10px] font-semibold text-white">antes</span>
                    </div>
                    <div className="relative">
                      <DemoImage src={photo(51 + i * 2, 420, 420)} alt={`${b.label} depois`} icon={demo.icon} accent={a} className="group aspect-square" />
                      <span className="absolute right-2 top-2 rounded px-2 py-0.5 text-[10px] font-semibold text-white" style={{ backgroundColor: a }}>
                        depois
                      </span>
                    </div>
                  </div>
                  <p className="px-5 py-4 text-center font-semibold text-zinc-900">{b.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* PACOTES (Premium) */}
      {has("premium") && (
        <section className="border-y border-pink-100 bg-white py-16">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal>
              <h2 className="text-center font-serif text-3xl font-bold text-zinc-900">Pacotes especiais</h2>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {demo.pacotes.map((p, i) => (
                <Reveal key={p.name} delay={i * 90}>
                  <div
                    className="flex h-full flex-col rounded-3xl border p-7 text-center shadow-sm"
                    style={p.highlight ? { borderColor: a, boxShadow: `0 20px 40px -20px ${a}80` } : { borderColor: "#fbcfe8" }}
                  >
                    {p.highlight && (
                      <span className="mx-auto mb-3 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white" style={{ backgroundColor: a }}>
                        Mais procurado
                      </span>
                    )}
                    <h3 className="font-serif text-xl font-bold text-zinc-900">{p.name}</h3>
                    <p className="mt-2 flex-1 text-sm text-zinc-600">{p.text}</p>
                    <p className="mt-4 font-serif text-3xl font-bold" style={{ color: a }}>{p.price}</p>
                    <a
                      href={wa(`Olá! Quero o pacote ${p.name} (${p.price}) da ${demo.business}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white transition hover:opacity-90"
                      style={{ backgroundColor: a }}
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      Quero este pacote
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROFISSIONAIS (Profissional+) */}
      {has("profissional") && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          <Reveal>
            <h2 className="text-center font-serif text-3xl font-bold text-zinc-900">Nossa equipe</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {demo.profissionais.map((pr, i) => (
              <Reveal key={pr.name} delay={i * 90}>
                <div className="group overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-sm">
                  <DemoImage src={photo(60 + i, 600, 640)} alt={pr.name} icon="Flower2" accent={a} className="aspect-[4/3]" />
                  <div className="p-5 text-center">
                    <p className="font-serif text-lg font-bold text-zinc-900">{pr.name}</p>
                    <p className="text-sm" style={{ color: a }}>{pr.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* DEPOIMENTOS (Profissional+) */}
      {has("profissional") && (
        <section className="border-y border-pink-100 bg-pink-50/40 py-16">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal>
              <h2 className="text-center font-serif text-3xl font-bold text-zinc-900">Quem se cuida aqui, ama</h2>
            </Reveal>
            <div className="mt-10">
              <DepoGrid items={demo.depoimentos} accent={a} />
            </div>
          </div>
        </section>
      )}

      {/* NÚMEROS (Premium) */}
      {has("premium") && <StatsBand items={demo.stats} accent={a} />}

      {/* FAQ (Premium) */}
      {has("premium") && (
        <section className="mx-auto max-w-3xl px-5 py-16">
          <Reveal>
            <h2 className="text-center font-serif text-3xl font-bold text-zinc-900">Perguntas frequentes</h2>
          </Reveal>
          <div className="mt-8">
            <FaqList items={demo.faq} />
          </div>
        </section>
      )}

      {/* CONTATO (Básico+) */}
      <section className="border-t border-pink-100 bg-white py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 md:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="font-serif text-2xl font-bold text-zinc-900">Onde nos encontrar</h2>
              <ul className="mt-5 space-y-3 text-sm text-zinc-700">
                <li className="flex items-center gap-2.5">
                  <Icon name="MapPin" className="h-4 w-4" style={{ color: a }} />
                  {demo.contact.address}
                </li>
                <li className="flex items-center gap-2.5">
                  <Icon name="Clock" className="h-4 w-4" style={{ color: a }} />
                  {demo.contact.hours}
                </li>
              </ul>
              <a
                href={waBook}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
                style={{ backgroundColor: a }}
              >
                <WhatsAppIcon className="h-4 w-4" />
                {demo.ctaHero}
              </a>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl" style={{ background: `linear-gradient(150deg, ${a}1f, #fdf2f8)` }}>
              <span className="absolute inset-0 grid place-items-center" style={{ color: a }}>
                <Icon name="MapPin" className="h-10 w-10" />
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
