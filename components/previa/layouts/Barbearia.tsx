import Icon from "../../Icon";
import Reveal from "../../Reveal";
import DemoImage from "../DemoImage";
import AgendaWidget from "../AgendaWidget";
import { WhatsAppIcon } from "../../ui";
import { Stars, DepoGrid, FaqList, StatsBand } from "../parts";
import { waLink } from "@/lib/site";
import type { BarbeariaDemo } from "@/lib/previaDemos";
import type { HasFn, PhotoFn } from "../types";

/* ==========================================================================
   LAYOUT: BARBEARIA  (escuro, masculino, dourado)
   Núcleo: lista de serviços (menu), barbeiros, agendamento, galeria, clube.
   ========================================================================== */
export default function Barbearia({
  demo,
  has,
  photo,
}: {
  demo: BarbeariaDemo;
  has: HasFn;
  photo: PhotoFn;
}) {
  const a = demo.accent;
  const wa = (m: string) => waLink(m);
  const waBook = wa(`Olá! Quero agendar um horário na ${demo.business}.`);

  return (
    <div className="bg-zinc-950 font-sans text-zinc-300">
      {/* HEADER */}
      <header className="border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <span className="flex items-center gap-2 font-serif text-2xl font-bold tracking-[0.15em] text-white">
            <Icon name="Scissors" className="h-5 w-5" style={{ color: a }} />
            NAVALHA
          </span>
          <nav className="hidden items-center gap-7 text-sm text-zinc-400 md:flex">
            <span className="cursor-default transition hover:text-white">Serviços</span>
            {has("profissional") && <span className="cursor-default transition hover:text-white">Barbeiros</span>}
            {has("profissional") && <span className="cursor-default transition hover:text-white">Agendar</span>}
            <span className="cursor-default transition hover:text-white">Contato</span>
          </nav>
          <a
            href={waBook}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-zinc-950 transition hover:-translate-y-0.5"
            style={{ backgroundColor: a }}
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            Agendar
          </a>
        </div>
      </header>

      {/* HERO */}
      <section
        className="relative overflow-hidden border-b border-zinc-800"
        style={{
          background: `radial-gradient(60% 80% at 80% 10%, ${a}22, transparent 60%), #09090b`,
        }}
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <Reveal>
            <div>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                style={{ backgroundColor: `${a}1f`, color: a }}
              >
                {demo.hero.eyebrow}
              </span>
              <h1 className="mt-5 font-serif text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
                {demo.hero.title}
              </h1>
              <p className="mt-5 max-w-md text-lg text-zinc-400">{demo.hero.subtitle}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={waBook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-zinc-950 shadow-lg transition hover:-translate-y-0.5"
                  style={{ backgroundColor: a }}
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {demo.ctaHero}
                </a>
                <a
                  href="#servicos"
                  className="inline-flex items-center rounded-full border border-zinc-700 px-6 py-3.5 text-sm font-semibold text-zinc-200 transition hover:border-zinc-500"
                >
                  Ver serviços
                </a>
              </div>
              <div className="mt-8 flex items-center gap-3 text-sm text-zinc-500">
                <Stars />
                <span>
                  <strong className="text-zinc-200">4.9</strong> · +5.000 clientes satisfeitos
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
                className="aspect-[4/5] w-full rounded-[2rem] shadow-2xl ring-1 ring-zinc-800"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* DIFERENCIAIS (Básico+) */}
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 py-14 sm:grid-cols-3">
          {demo.diferenciais.map((d, i) => (
            <Reveal key={d.title} delay={i * 90}>
              <div className="h-full rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
                <span className="grid h-12 w-12 place-items-center rounded-xl" style={{ backgroundColor: `${a}1f`, color: a }}>
                  <Icon name={d.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-serif text-lg font-bold text-white">{d.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{d.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVIÇOS — menu de preços (Básico+) */}
      <section id="servicos" className="mx-auto max-w-5xl px-5 py-16">
        <Reveal>
          <div className="text-center">
            <p className="font-serif text-3xl font-bold text-white">Nossos serviços</p>
            <p className="mt-2 text-zinc-400">Tudo com hora marcada — escolha e agende pelo WhatsApp.</p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-x-12 gap-y-1 md:grid-cols-2">
          {demo.services.map((s, i) => (
            <Reveal key={s.name} delay={(i % 2) * 60}>
              <a
                href={wa(`Olá! Quero agendar: ${s.name} (${s.price}) na ${demo.business}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 border-b border-dashed border-zinc-800 py-4 transition hover:border-zinc-600"
              >
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 font-semibold text-white">
                    {s.name}
                    {s.tag && (
                      <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase text-zinc-950" style={{ backgroundColor: a }}>
                        {s.tag}
                      </span>
                    )}
                  </p>
                  {s.desc && <p className="mt-0.5 text-sm text-zinc-500">{s.desc}</p>}
                </div>
                <span className="shrink-0 font-serif text-lg font-bold" style={{ color: a }}>
                  {s.price}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SOBRE (Básico+) */}
      <section className="border-y border-zinc-800 bg-zinc-900/40 py-16">
        <Reveal>
          <div className="mx-auto max-w-3xl px-5 text-center">
            <h2 className="font-serif text-3xl font-bold text-white">Sobre a {demo.business}</h2>
            <p className="mt-4 text-lg leading-relaxed text-zinc-400">{demo.sobre}</p>
          </div>
        </Reveal>
      </section>

      {/* BARBEIROS (Profissional+) */}
      {has("profissional") && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          <Reveal>
            <h2 className="text-center font-serif text-3xl font-bold text-white">Nossos barbeiros</h2>
            <p className="mt-2 text-center text-zinc-400">Profissionais de confiança pra cuidar do seu visual.</p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {demo.barbers.map((b, i) => (
              <Reveal key={b.name} delay={i * 90}>
                <div className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60">
                  <DemoImage
                    src={photo(20 + i, 600, 640)}
                    alt={b.name}
                    icon="Scissors"
                    accent={a}
                    className="aspect-[4/3]"
                  />
                  <div className="p-5">
                    <p className="font-serif text-lg font-bold text-white">{b.name}</p>
                    <p className="text-sm" style={{ color: a }}>
                      {b.role}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* AGENDAMENTO (Profissional+) */}
      {has("profissional") && (
        <section className="border-y border-zinc-800 bg-zinc-900/40 py-16">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2">
            <Reveal>
              <div>
                <h2 className="font-serif text-3xl font-bold text-white">Agende em 30 segundos</h2>
                <p className="mt-4 max-w-md text-zinc-400">
                  Sem ligação, sem espera. Escolha o serviço, o dia e o horário — a confirmação chega pelo WhatsApp.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-zinc-300">
                  {["Escolha online, confirme na hora", "Lembrete automático no WhatsApp", "Remarque quando precisar"].map(
                    (li) => (
                      <li key={li} className="flex items-center gap-2.5">
                        <Icon name="Check" className="h-4 w-4" style={{ color: a }} />
                        {li}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <AgendaWidget services={demo.services.map((s) => s.name)} accent={a} verb="agendar" />
            </Reveal>
          </div>
        </section>
      )}

      {/* GALERIA (Profissional+) */}
      {has("profissional") && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          <Reveal>
            <h2 className="text-center font-serif text-3xl font-bold text-white">Nosso trabalho</h2>
            <p className="mt-2 text-center text-zinc-400">No seu site, este espaço fica com as suas fotos reais.</p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Reveal key={i} delay={(i % 4) * 60}>
                <DemoImage
                  src={photo(30 + i, 520, 520)}
                  alt={`${demo.business} — trabalho ${i + 1}`}
                  icon={demo.icon}
                  accent={a}
                  label={i === 0 ? "sua foto aqui" : undefined}
                  className="group aspect-square rounded-xl ring-1 ring-zinc-800"
                />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* CLUBE / ASSINATURA (Premium) */}
      {has("premium") && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          <Reveal>
            <div
              className="overflow-hidden rounded-3xl border p-8 sm:p-10"
              style={{ borderColor: `${a}55`, background: `linear-gradient(135deg, ${a}1f, transparent 70%), #18181b` }}
            >
              <div className="grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: a }}>
                    Assinatura
                  </span>
                  <h2 className="mt-3 font-serif text-3xl font-bold text-white">{demo.clube.title}</h2>
                  <p className="mt-3 max-w-md text-zinc-400">{demo.clube.text}</p>
                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {demo.clube.perks.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm text-zinc-200">
                        <Icon name="Check" className="h-4 w-4" style={{ color: a }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-zinc-700 bg-zinc-950/60 p-6 text-center">
                  <p className="text-sm text-zinc-400">a partir de</p>
                  <p className="font-serif text-4xl font-bold text-white">{demo.clube.price}</p>
                  <a
                    href={wa(`Olá! Quero assinar o ${demo.clube.title} da ${demo.business}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-bold text-zinc-950 transition hover:-translate-y-0.5"
                    style={{ backgroundColor: a }}
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Quero assinar
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* DEPOIMENTOS (Profissional+) */}
      {has("profissional") && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          <Reveal>
            <h2 className="text-center font-serif text-3xl font-bold text-white">Quem é cliente, recomenda</h2>
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
            <h2 className="text-center font-serif text-3xl font-bold text-white">Perguntas frequentes</h2>
          </Reveal>
          <div className="mt-8">
            <FaqList items={demo.faq} />
          </div>
        </section>
      )}

      {/* CONTATO (Básico+) */}
      <section className="border-t border-zinc-800 bg-zinc-900/40 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 md:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="font-serif text-2xl font-bold text-white">Onde nos encontrar</h2>
              <ul className="mt-5 space-y-3 text-sm text-zinc-300">
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
                className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-zinc-950 transition hover:-translate-y-0.5"
                style={{ backgroundColor: a }}
              >
                <WhatsAppIcon className="h-4 w-4" />
                {demo.ctaHero}
              </a>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl ring-1 ring-zinc-800" style={{ background: `linear-gradient(150deg, ${a}33, #18181b)` }}>
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
