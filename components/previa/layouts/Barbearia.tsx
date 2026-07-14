import Icon from "../../Icon";
import Reveal from "../../Reveal";
import DemoImage from "../DemoImage";
import AgendaWidget from "../AgendaWidget";
import { WhatsAppIcon } from "../../ui";
import { BrandLogo, DepoGrid, FaqList } from "../parts";
import { waLink } from "@/lib/site";
import type { BarbeariaDemo } from "@/lib/previaDemos";
import type { LayoutBaseProps } from "../types";

/* ==========================================================================
   LAYOUT: BARBEARIA  — editorial cinematográfico
   Preto absoluto, dourado, tipografia condensada em caixa-alta (Oswald).
   Hero full-bleed com foto ao fundo; menu de serviços estilo carta.
   ========================================================================== */
export default function Barbearia({
  demo,
  has,
  photo,
  tier,
}: { demo: BarbeariaDemo } & LayoutBaseProps) {
  const a = demo.accent;
  const wa = (m: string) => waLink(m);
  const waBook = wa(`Olá! Quero agendar um horário na ${demo.business}.`);

  return (
    <div className="bg-[#0a0a0a] font-sans text-zinc-400">
      {/* HERO — full-bleed cinematográfico ---------------------------------- */}
      <section className="relative flex min-h-[82vh] flex-col overflow-hidden">
        {/* Foto de fundo */}
        <DemoImage
          src={photo(1, 1600, 1200)}
          alt={`Demonstração de site para ${demo.nicho}`}
          icon={demo.icon}
          accent={a}
          className="absolute inset-0 h-full w-full"
        />
        {/* Escurecimento para leitura */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/50 to-transparent" />

        {/* Header transparente */}
        <header className="relative z-10">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6">
            <BrandLogo logoUrl={demo.logoUrl} business={demo.business}>
              <span className="flex items-center gap-2.5 font-barbearia text-xl font-bold uppercase tracking-[0.2em] text-white">
                <Icon name="Scissors" className="h-5 w-5" style={{ color: a }} />
                {demo.business}
              </span>
            </BrandLogo>
            <nav className="hidden items-center gap-9 text-xs font-medium uppercase tracking-[0.2em] text-zinc-300 md:flex">
              <span className="cursor-default transition hover:text-white">Serviços</span>
              {has("profissional") && <span className="cursor-default transition hover:text-white">Barbeiros</span>}
              {has("profissional") && <span className="cursor-default transition hover:text-white">Agendar</span>}
              <span className="cursor-default transition hover:text-white">Contato</span>
            </nav>
            <a
              href={waBook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-none border px-4 py-2 text-xs font-semibold uppercase tracking-widest transition hover:bg-white hover:text-[#0a0a0a]"
              style={{ borderColor: a, color: a }}
            >
              <WhatsAppIcon className="h-3.5 w-3.5" />
              Agendar
            </a>
          </div>
        </header>

        {/* Conteúdo do hero — ancorado embaixo */}
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-5 pb-20 pt-16">
          <Reveal>
            <div className="max-w-2xl">
              {tier.premiumTag && (
                <span
                  className="mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-950"
                  style={{ backgroundColor: a }}
                >
                  <Icon name="Sparkles" className="h-3.5 w-3.5" />
                  {tier.premiumTag}
                </span>
              )}
              <span
                className="block text-xs font-semibold uppercase tracking-[0.4em]"
                style={{ color: a }}
              >
                {demo.hero.eyebrow}
              </span>
              <span className="mt-4 block h-px w-16" style={{ backgroundColor: a }} />
              <h1 className="mt-6 font-barbearia text-6xl font-bold uppercase leading-[0.92] text-white sm:text-7xl lg:text-8xl">
                {demo.hero.title}
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-300">{demo.hero.subtitle}</p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href={waBook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-widest text-[#0a0a0a] transition hover:-translate-y-0.5"
                  style={{ backgroundColor: a }}
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {demo.ctaHero}
                </a>
                {has("profissional") && (
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <span className="font-barbearia text-2xl font-bold text-white">4.9</span>
                    <span className="inline-flex gap-0.5" style={{ color: a }}>
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Icon key={i} name="Star" className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
                      ))}
                    </span>
                    <span>· +5.000 clientes</span>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DIFERENCIAIS — faixa inline com réguas douradas (Básico+) ---------- */}
      <section className="border-y border-zinc-900 bg-[#0d0d0d]">
        <div className="mx-auto grid max-w-6xl gap-px sm:grid-cols-3">
          {demo.diferenciais.map((d, i) => (
            <Reveal key={d.title} delay={i * 90}>
              <div className="flex h-full items-start gap-4 px-6 py-10 sm:px-8">
                <Icon name={d.icon} className="mt-0.5 h-7 w-7 shrink-0" style={{ color: a }} strokeWidth={1.5} />
                <div>
                  <h3 className="font-barbearia text-lg font-semibold uppercase tracking-wide text-white">{d.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">{d.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVIÇOS — carta de preços (Básico+) ------------------------------- */}
      <section id="servicos" className="mx-auto max-w-4xl px-5 py-20">
        <Reveal>
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.4em]" style={{ color: a }}>
              A carta
            </span>
            <h2 className="mt-3 font-barbearia text-4xl font-bold uppercase text-white sm:text-5xl">Nossos serviços</h2>
            <p className="mt-3 text-zinc-500">Tudo com hora marcada — escolha e agende pelo WhatsApp.</p>
          </div>
        </Reveal>
        <div className="mt-12 space-y-1">
          {demo.services.map((s, i) => (
            <Reveal key={s.name} delay={(i % 2) * 60}>
              <a
                href={wa(`Olá! Quero agendar: ${s.name} (${s.price}) na ${demo.business}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline gap-4 py-4"
              >
                <span className="font-barbearia text-lg font-semibold uppercase tracking-wide text-white transition group-hover:opacity-70">
                  {s.name}
                  {s.tag && (
                    <span className="ml-2 align-middle text-[10px] font-bold uppercase tracking-widest" style={{ color: a }}>
                      · {s.tag}
                    </span>
                  )}
                  {s.desc && <span className="mt-0.5 block text-xs font-normal normal-case tracking-normal text-zinc-500 font-sans">{s.desc}</span>}
                </span>
                <span className="flex-1 translate-y-[-3px] border-b border-dashed border-zinc-800" />
                <span className="shrink-0 font-barbearia text-2xl font-bold" style={{ color: a }}>
                  {s.price}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SOBRE (Básico+) --------------------------------------------------- */}
      <section className="relative overflow-hidden border-y border-zinc-900 py-20" style={{ background: `radial-gradient(80% 120% at 50% 0%, ${a}12, transparent 60%), #0a0a0a` }}>
        <Reveal>
          <div className="mx-auto max-w-3xl px-5 text-center">
            <Icon name="Scissors" className="mx-auto h-8 w-8" style={{ color: a }} strokeWidth={1.5} />
            <h2 className="mt-5 font-barbearia text-3xl font-bold uppercase text-white sm:text-4xl">Sobre a {demo.business}</h2>
            <p className="mt-5 text-lg leading-relaxed text-zinc-400">{demo.sobre}</p>
          </div>
        </Reveal>
      </section>

      {/* BARBEIROS (Profissional+) ----------------------------------------- */}
      {has("profissional") && (
        <section className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.4em]" style={{ color: a }}>
                A equipe
              </span>
              <h2 className="mt-3 font-barbearia text-4xl font-bold uppercase text-white sm:text-5xl">Nossos barbeiros</h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {demo.barbers.map((b, i) => (
              <Reveal key={b.name} delay={i * 90}>
                <div className="group relative overflow-hidden">
                  <DemoImage
                    src={photo(20 + i, 600, 720)}
                    alt={b.name}
                    icon="Scissors"
                    accent={a}
                    className="aspect-[5/6]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent p-5 pt-16">
                    <p className="font-barbearia text-xl font-bold uppercase text-white">{b.name}</p>
                    <p className="text-xs uppercase tracking-widest" style={{ color: a }}>
                      {b.role}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* AGENDAMENTO (Profissional+) --------------------------------------- */}
      {has("profissional") && (
        <section className="border-y border-zinc-900 bg-[#0d0d0d] py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2">
            <Reveal>
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.4em]" style={{ color: a }}>
                  Sem espera
                </span>
                <h2 className="mt-3 font-barbearia text-4xl font-bold uppercase text-white sm:text-5xl">Agende em 30 segundos</h2>
                <p className="mt-5 max-w-md text-zinc-400">
                  Sem ligação, sem fila. Escolha o serviço, o dia e o horário — a confirmação chega pelo WhatsApp.
                </p>
                <ul className="mt-7 space-y-3.5 text-sm text-zinc-300">
                  {["Escolha online, confirme na hora", "Lembrete automático no WhatsApp", "Remarque quando precisar"].map(
                    (li) => (
                      <li key={li} className="flex items-center gap-3">
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

      {/* GALERIA (Profissional+) ------------------------------------------- */}
      {has("profissional") && (
        <section className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <div className="text-center">
              <h2 className="font-barbearia text-4xl font-bold uppercase text-white sm:text-5xl">Nosso trabalho</h2>
              <p className="mt-3 text-zinc-500">No seu site, este espaço fica com as suas fotos reais.</p>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Reveal key={i} delay={(i % 4) * 60}>
                <DemoImage
                  src={photo(30 + i, 520, 520)}
                  alt={`${demo.business} — trabalho ${i + 1}`}
                  icon={demo.icon}
                  accent={a}
                  label={i === 0 ? "sua foto aqui" : undefined}
                  className="group aspect-square"
                />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* CLUBE / ASSINATURA (Premium) -------------------------------------- */}
      {has("premium") && (
        <section className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <div
              className="relative overflow-hidden border p-8 sm:p-12"
              style={{ borderColor: `${a}55`, background: `linear-gradient(135deg, ${a}22, transparent 70%), #0d0d0d` }}
            >
              <div className="grid items-center gap-10 md:grid-cols-[1.3fr_1fr]">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.4em]" style={{ color: a }}>
                    Assinatura · Premium
                  </span>
                  <h2 className="mt-3 font-barbearia text-4xl font-bold uppercase text-white sm:text-5xl">{demo.clube.title}</h2>
                  <p className="mt-4 max-w-md text-zinc-400">{demo.clube.text}</p>
                  <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                    {demo.clube.perks.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-sm text-zinc-200">
                        <Icon name="Check" className="h-4 w-4" style={{ color: a }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border border-zinc-800 bg-[#0a0a0a] p-8 text-center">
                  <p className="text-xs uppercase tracking-widest text-zinc-500">a partir de</p>
                  <p className="mt-2 font-barbearia text-5xl font-bold text-white">{demo.clube.price}</p>
                  <a
                    href={wa(`Olá! Quero assinar o ${demo.clube.title} da ${demo.business}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 py-3.5 text-xs font-bold uppercase tracking-widest text-[#0a0a0a] transition hover:-translate-y-0.5"
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

      {/* DEPOIMENTOS (Profissional+) --------------------------------------- */}
      {has("profissional") && (
        <section className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <h2 className="text-center font-barbearia text-4xl font-bold uppercase text-white sm:text-5xl">
              Quem é cliente, recomenda
            </h2>
          </Reveal>
          <div className="mt-12">
            <DepoGrid items={demo.depoimentos} accent={a} />
          </div>
        </section>
      )}

      {/* NÚMEROS (Premium) — faixa dourada com números condensados --------- */}
      {has("premium") && (
        <section className="border-y border-zinc-900" style={{ background: `linear-gradient(135deg, ${a}, ${a}bb)` }}>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-5 py-16 text-center text-[#0a0a0a] sm:grid-cols-3">
            {demo.stats.map((s) => (
              <div key={s.label}>
                <p className="font-barbearia text-5xl font-bold sm:text-6xl">{s.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-[#0a0a0a]/70">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ (Premium) ----------------------------------------------------- */}
      {has("premium") && (
        <section className="mx-auto max-w-3xl px-5 py-20">
          <Reveal>
            <h2 className="text-center font-barbearia text-4xl font-bold uppercase text-white sm:text-5xl">
              Perguntas frequentes
            </h2>
          </Reveal>
          <div className="mt-10">
            <FaqList items={demo.faq} />
          </div>
        </section>
      )}

      {/* CONTATO (Básico+) ------------------------------------------------- */}
      <section className="border-t border-zinc-900 bg-[#0d0d0d] py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="font-barbearia text-3xl font-bold uppercase text-white sm:text-4xl">Onde nos encontrar</h2>
              <ul className="mt-6 space-y-4 text-sm text-zinc-300">
                <li className="flex items-center gap-3">
                  <Icon name="MapPin" className="h-5 w-5" style={{ color: a }} />
                  {demo.contact.address}
                </li>
                <li className="flex items-center gap-3">
                  <Icon name="Clock" className="h-5 w-5" style={{ color: a }} />
                  {demo.contact.hours}
                </li>
              </ul>
              <a
                href={waBook}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-[#0a0a0a] transition hover:-translate-y-0.5"
                style={{ backgroundColor: a }}
              >
                <WhatsAppIcon className="h-4 w-4" />
                {demo.ctaHero}
              </a>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative aspect-[16/10] w-full overflow-hidden ring-1 ring-zinc-800" style={{ background: `linear-gradient(150deg, ${a}33, #0a0a0a)` }}>
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
