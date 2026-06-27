import Icon from "../../Icon";
import Reveal from "../../Reveal";
import DemoImage from "../DemoImage";
import { WhatsAppIcon } from "../../ui";
import { Stars, DepoGrid, FaqList, StatsBand } from "../parts";
import { waLink } from "@/lib/site";
import type { ImobiliariaDemo } from "@/lib/previaDemos";
import type { HasFn, PhotoFn } from "../types";

/* ==========================================================================
   LAYOUT: IMOBILIÁRIA  (profissional, azul, confiável)
   Núcleo: ficha de imóvel (quartos/banh/m²/vaga), filtros, corretores.
   ========================================================================== */
export default function Imobiliaria({
  demo,
  has,
  photo,
}: {
  demo: ImobiliariaDemo;
  has: HasFn;
  photo: PhotoFn;
}) {
  const a = demo.accent;
  const wa = (m: string) => waLink(m);
  const waTalk = wa(`Olá! Quero falar com um corretor da ${demo.business}.`);

  return (
    <div className="bg-white font-sans text-slate-700">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <span className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-slate-900">
            <Icon name="Building2" className="h-6 w-6" style={{ color: a }} />
            {demo.business}
          </span>
          <nav className="hidden items-center gap-7 text-sm text-slate-600 md:flex">
            <span className="cursor-default transition hover:text-slate-900">Imóveis</span>
            {has("profissional") && <span className="cursor-default transition hover:text-slate-900">Corretores</span>}
            <span className="cursor-default transition hover:text-slate-900">Contato</span>
          </nav>
          <a
            href={waTalk}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold text-white transition hover:-translate-y-0.5"
            style={{ backgroundColor: a }}
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            Falar
          </a>
        </div>
      </header>

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{ background: `radial-gradient(60% 80% at 12% 8%, ${a}14, transparent 60%), linear-gradient(180deg, #ffffff, #f8fafc)` }}
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <Reveal>
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: `${a}1a`, color: a }}>
                <Icon name="MapPin" className="h-3.5 w-3.5" />
                {demo.hero.eyebrow}
              </span>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                {demo.hero.title}
              </h1>
              <p className="mt-5 max-w-md text-lg text-slate-600">{demo.hero.subtitle}</p>

              {/* Barra de busca (mockup) */}
              <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg">
                <div className="flex flex-wrap gap-1.5">
                  {demo.filters.map((f, i) => (
                    <span
                      key={f}
                      className="rounded-full px-3 py-1 text-xs font-semibold"
                      style={i === 0 ? { backgroundColor: a, color: "#fff" } : { backgroundColor: "#f1f5f9", color: "#475569" }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <a
                  href={waTalk}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2.5 flex items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-400 transition hover:border-slate-300"
                >
                  Em qual bairro você procura?
                  <span className="grid h-8 w-8 place-items-center rounded-lg text-white" style={{ backgroundColor: a }}>
                    <Icon name="Search" className="h-4 w-4" />
                  </span>
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="group relative">
              <DemoImage
                src={photo(1, 900, 760)}
                alt={`Demonstração de site para ${demo.nicho}`}
                icon={demo.icon}
                accent={a}
                label="imagem ilustrativa"
                className="aspect-[6/5] w-full rounded-[2rem] shadow-2xl"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* DIFERENCIAIS (Básico+) */}
      <section className="border-y border-slate-100 bg-slate-50">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-5 py-6 sm:grid-cols-3">
          {demo.diferenciais.map((d) => (
            <div key={d.title} className="flex items-center gap-3 text-sm">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg" style={{ backgroundColor: `${a}1a`, color: a }}>
                <Icon name={d.icon} className="h-5 w-5" />
              </span>
              <span>
                <strong className="block text-slate-900">{d.title}</strong>
                <span className="text-slate-500">{d.text}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* IMÓVEIS (Básico+) */}
      <section id="imoveis" className="mx-auto max-w-6xl px-5 py-16">
        <Reveal>
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Imóveis em destaque</h2>
            <p className="mt-2 text-slate-600">Veja as opções e agende uma visita pelo WhatsApp.</p>
          </div>
        </Reveal>

        {/* filtros */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {demo.filters.map((f, i) => (
            <span
              key={f}
              className="rounded-full border px-4 py-1.5 text-sm font-medium"
              style={i === 0 ? { backgroundColor: a, borderColor: a, color: "#fff" } : { borderColor: "#e2e8f0", color: "#475569" }}
            >
              {f}
            </span>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {demo.properties.map((p, i) => {
            const specs = [
              p.beds > 0 ? { icon: "BedDouble", label: `${p.beds} ${p.beds > 1 ? "quartos" : "quarto"}` } : null,
              p.baths > 0 ? { icon: "Bath", label: `${p.baths} ${p.baths > 1 ? "banh." : "banh."}` } : null,
              { icon: "Maximize", label: p.area },
              p.parking > 0 ? { icon: "Car", label: `${p.parking} ${p.parking > 1 ? "vagas" : "vaga"}` } : null,
            ].filter(Boolean) as { icon: string; label: string }[];

            return (
              <Reveal key={p.title} delay={(i % 3) * 80}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative">
                    <DemoImage src={photo(10 + i, 720, 520)} alt={p.title} icon={demo.icon} accent={a} className="aspect-[4/3]" />
                    <span className="absolute left-3 top-3 z-10 rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white" style={{ backgroundColor: a }}>
                      {p.tag || p.deal}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-lg font-extrabold" style={{ color: a }}>{p.price}</p>
                    <p className="mt-0.5 font-semibold text-slate-900">{p.title}</p>
                    <p className="flex items-center gap-1 text-sm text-slate-500">
                      <Icon name="MapPin" className="h-3.5 w-3.5" />
                      {p.neighborhood}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-slate-100 pt-4 text-xs text-slate-600">
                      {specs.map((s) => (
                        <span key={s.label} className="flex items-center gap-1.5">
                          <Icon name={s.icon} className="h-4 w-4 text-slate-400" />
                          {s.label}
                        </span>
                      ))}
                    </div>
                    <a
                      href={wa(`Olá! Quero agendar uma visita ao imóvel "${p.title}" (${p.price}) da ${demo.business}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                      style={{ backgroundColor: a }}
                    >
                      <Icon name="Calendar" className="h-4 w-4" />
                      Agendar visita
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* SOBRE (Básico+) */}
      <section className="border-y border-slate-100 bg-slate-50 py-16">
        <Reveal>
          <div className="mx-auto max-w-3xl px-5 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Sobre a {demo.business}</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">{demo.sobre}</p>
            <div className="mt-6 flex items-center justify-center gap-3 text-sm text-slate-500">
              <Stars />
              <span>+1.000 famílias atendidas</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* OPORTUNIDADE DESTAQUE (Premium) */}
      {has("premium") && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          <Reveal>
            <div className="grid items-center gap-8 overflow-hidden rounded-3xl text-white md:grid-cols-[1.1fr_1fr]" style={{ background: `linear-gradient(135deg, ${a}, #0a2540)` }}>
              <div className="p-8 sm:p-10">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Oportunidade da semana</span>
                <h2 className="mt-3 text-3xl font-extrabold">{demo.properties[1]?.title || "Imóvel em destaque"}</h2>
                <p className="mt-3 max-w-md text-white/80">
                  Condições especiais de entrada e financiamento direto. Agende sua visita antes que saia.
                </p>
                <p className="mt-5 text-3xl font-extrabold">{demo.properties[1]?.price}</p>
                <a
                  href={wa(`Olá! Quero saber da oportunidade "${demo.properties[1]?.title}" da ${demo.business}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-bold transition hover:-translate-y-0.5"
                  style={{ color: a }}
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Agendar visita
                </a>
              </div>
              <div className="group relative h-full min-h-[220px]">
                <DemoImage src={photo(2, 760, 620)} alt="Oportunidade" icon={demo.icon} accent={a} className="absolute inset-0 h-full w-full" />
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* CORRETORES (Profissional+) */}
      {has("profissional") && (
        <section className="border-y border-slate-100 bg-slate-50 py-16">
          <div className="mx-auto max-w-5xl px-5">
            <Reveal>
              <h2 className="text-center text-3xl font-extrabold tracking-tight text-slate-900">Fale com um corretor</h2>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {demo.corretores.map((c, i) => (
                <Reveal key={c.name} delay={i * 90}>
                  <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <DemoImage src={photo(60 + i, 200, 200)} alt={c.name} icon="Building2" accent={a} className="h-16 w-16 shrink-0 rounded-full" />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-slate-900">{c.name}</p>
                      <p className="text-sm text-slate-500">{c.role}</p>
                    </div>
                    <a
                      href={wa(`Olá! Quero falar com ${c.name}, corretor(a) da ${demo.business}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Falar com ${c.name}`}
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white transition hover:opacity-90"
                      style={{ backgroundColor: a }}
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DEPOIMENTOS (Profissional+) */}
      {has("profissional") && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          <Reveal>
            <h2 className="text-center text-3xl font-extrabold tracking-tight text-slate-900">Quem comprou, recomenda</h2>
          </Reveal>
          <div className="mt-10">
            <DepoGrid items={demo.depoimentos} accent={a} />
          </div>
        </section>
      )}

      {/* NÚMEROS (Premium) */}
      {has("premium") && <StatsBand items={demo.stats} accent={a} />}

      {/* FAQ (Premium) */}
      {has("premium") && (
        <section className="mx-auto max-w-3xl px-5 py-16">
          <Reveal>
            <h2 className="text-center text-3xl font-extrabold tracking-tight text-slate-900">Perguntas frequentes</h2>
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
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Onde nos encontrar</h2>
              <ul className="mt-5 space-y-3 text-sm text-slate-700">
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
                href={waTalk}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
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
                <Icon name="MapPin" className="h-10 w-10" />
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
