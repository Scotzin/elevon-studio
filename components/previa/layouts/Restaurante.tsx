import Icon from "../../Icon";
import Reveal from "../../Reveal";
import DemoImage from "../DemoImage";
import { WhatsAppIcon } from "../../ui";
import { BrandLogo, Stars, DepoGrid, FaqList, StatsBand } from "../parts";
import { waLink } from "@/lib/site";
import type { RestauranteDemo } from "@/lib/previaDemos";
import type { LayoutBaseProps } from "../types";

/* ==========================================================================
   LAYOUT: RESTAURANTE  — centrado, quente e apetitoso
   Cor terracota, tipografia Playfair Display.
   - Básico: hero + cardápio + contato (site enxuto para começar).
   - Profissional: + diferenciais, quem somos, galeria, reservas, depoimentos.
   - Premium: + combo do dia, salão de festas, números e FAQ.
   Cada seção pode falar com um WhatsApp diferente (pedidos / reservas / eventos).
   ========================================================================== */
export default function Restaurante({
  demo,
  has,
  photo,
  tier,
}: { demo: RestauranteDemo } & LayoutBaseProps) {
  const a = demo.accent;
  const c = demo.contacts || {};

  // WhatsApp por finalidade — cada seção fala com o número certo (ou o da marca).
  const waOrder = waLink(`Olá! Quero fazer um pedido na ${demo.business}.`, c.pedidos);
  const waReserva = waLink(`Olá! Quero reservar uma mesa na ${demo.business}.`, c.reservas);
  const waEvento = waLink(`Olá! Quero informações sobre o salão de festas da ${demo.business}.`, c.eventos);

  const deliveryInfo = [
    { icon: "Clock", label: "Entrega em", value: demo.delivery.time },
    { icon: "Truck", label: "Frete", value: demo.delivery.fee },
    { icon: "ShoppingBag", label: "Pedido mínimo", value: demo.delivery.min },
  ];

  return (
    <div className="bg-[#fdf6ec] font-sans text-stone-800">
      {/* HEADER */}
      <header className="border-b border-stone-200/70 bg-[#fdf6ec]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <BrandLogo logoUrl={demo.logoUrl} business={demo.business}>
            <span className="flex items-center gap-2 font-restaurante text-2xl font-bold text-stone-900">
              <Icon name="UtensilsCrossed" className="h-5 w-5" style={{ color: a }} />
              {demo.business}
            </span>
          </BrandLogo>
          <nav className="hidden items-center gap-7 text-sm text-stone-600 md:flex">
            <span className="cursor-default transition hover:text-stone-900">Cardápio</span>
            {has("profissional") && <span className="cursor-default transition hover:text-stone-900">Reservas</span>}
            {has("premium") && <span className="cursor-default transition hover:text-stone-900">Eventos</span>}
            <span className="cursor-default transition hover:text-stone-900">Contato</span>
          </nav>
          <a
            href={waOrder}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-white transition hover:-translate-y-0.5"
            style={{ backgroundColor: a }}
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            Pedir
          </a>
        </div>
      </header>

      {/* HERO — central com foto larga + selos de delivery flutuando -------- */}
      <section
        className="relative overflow-hidden"
        style={{ background: `radial-gradient(90% 60% at 50% 0%, ${a}14, transparent 70%), #fdf6ec` }}
      >
        <div className="mx-auto max-w-4xl px-5 pt-16 text-center sm:pt-20">
          <Reveal>
            {tier.premiumTag && (
              <div className="mb-4">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-white"
                  style={{ backgroundColor: a }}
                >
                  <Icon name="Sparkles" className="h-3.5 w-3.5" />
                  {tier.premiumTag}
                </span>
              </div>
            )}
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
              style={{ borderColor: `${a}44`, color: a }}
            >
              <Icon name="Flame" className="h-3.5 w-3.5" />
              {demo.hero.eyebrow}
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl font-restaurante text-5xl font-bold leading-[1.02] text-stone-900 sm:text-6xl lg:text-7xl">
              {demo.hero.title}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-stone-600">{demo.hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={waOrder}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5"
                style={{ backgroundColor: a }}
              >
                <WhatsAppIcon className="h-4 w-4" />
                {demo.ctaHero}
              </a>
              {has("profissional") && (
                <a
                  href="#cardapio"
                  className="inline-flex items-center rounded-full border border-stone-300 bg-white/70 px-7 py-3.5 text-sm font-semibold text-stone-700 transition hover:bg-white"
                >
                  Ver cardápio
                </a>
              )}
            </div>
            {has("profissional") && (
              <div className="mt-6 flex items-center justify-center gap-3 text-sm text-stone-500">
                <Stars />
                <span>
                  <strong className="text-stone-700">4.8</strong> · +10 mil pedidos entregues
                </span>
              </div>
            )}
          </Reveal>
        </div>

        {/* Foto larga com selos de delivery sobrepostos */}
        <div className="mx-auto mt-12 max-w-5xl px-5 pb-24">
          <Reveal delay={120}>
            <div className="group relative">
              <DemoImage
                src={photo(1, 1400, 720)}
                alt={`Demonstração de site para ${demo.nicho}`}
                icon={demo.icon}
                accent={a}
                label="imagem ilustrativa"
                className="aspect-[16/8] w-full rounded-[2rem] shadow-2xl ring-1 ring-black/5"
              />
              <div className="absolute inset-x-4 -bottom-10 grid grid-cols-1 gap-3 sm:inset-x-10 sm:grid-cols-3">
                {deliveryInfo.map((d, i) => (
                  <div
                    key={d.label}
                    className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-black/5"
                    style={{ transform: i === 1 ? "translateY(-6px)" : undefined }}
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full" style={{ backgroundColor: `${a}1a`, color: a }}>
                      <Icon name={d.icon} className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] uppercase tracking-wide text-stone-400">{d.label}</span>
                      <strong className="block text-sm leading-tight text-stone-900">{d.value}</strong>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DIFERENCIAIS (Profissional+) --------------------------------------- */}
      {has("profissional") && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid gap-6 sm:grid-cols-3">
            {demo.diferenciais.map((d, i) => (
              <Reveal key={d.title} delay={i * 90}>
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl" style={{ backgroundColor: `${a}14`, color: a }}>
                    <Icon name={d.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-restaurante text-lg font-bold text-stone-900">{d.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-stone-600">{d.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* CARDÁPIO (Básico+) — carta impressa. Pedidos → WhatsApp de pedidos -- */}
      <section id="cardapio" className="relative border-y border-stone-200 py-20" style={{ background: `radial-gradient(80% 60% at 50% 0%, ${a}0d, transparent 70%), #fffdf9` }}>
        <div className="mx-auto max-w-5xl px-5">
          <Reveal>
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: a }}>
                À la carte
              </span>
              <h2 className="mt-3 font-restaurante text-4xl font-bold text-stone-900 sm:text-5xl">Nosso cardápio</h2>
              <p className="mt-3 text-stone-600">Escolha seu prato e peça pelo WhatsApp — chega quentinho.</p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-x-14 gap-y-12 md:grid-cols-2">
            {demo.menu.map((cat, ci) => (
              <Reveal key={cat.category} delay={(ci % 2) * 80}>
                <div>
                  <h3 className="flex items-center gap-2.5 font-restaurante text-2xl font-bold italic text-stone-900">
                    <Icon name={cat.icon} className="h-5 w-5 not-italic" style={{ color: a }} />
                    {cat.category}
                  </h3>
                  <span className="mt-2 block h-px w-full" style={{ background: `linear-gradient(90deg, ${a}66, transparent)` }} />
                  <ul className="mt-5 space-y-5">
                    {cat.items.map((it) => (
                      <li key={it.name}>
                        <a
                          href={waLink(`Olá! Quero pedir: ${it.name} (${it.price}) na ${demo.business}.`, c.pedidos)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-baseline gap-3"
                        >
                          <span className="flex items-center gap-2 font-semibold text-stone-900 transition group-hover:opacity-80">
                            {it.name}
                            {it.tag && (
                              <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase text-white" style={{ backgroundColor: a }}>
                                {it.tag}
                              </span>
                            )}
                          </span>
                          <span className="mx-1 flex-1 border-b border-dotted border-stone-300" />
                          <span className="shrink-0 font-restaurante text-lg font-bold" style={{ color: a }}>
                            {it.price}
                          </span>
                        </a>
                        <p className="mt-1 text-sm text-stone-500">{it.desc}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUEM SOMOS (Profissional+) — história + números da casa ------------- */}
      {has("profissional") ? (
        <section className="border-b border-stone-200 bg-white py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2">
            <Reveal>
              <div className="relative">
                <DemoImage
                  src={photo(2, 900, 1000)}
                  alt={`Ambiente da ${demo.business}`}
                  icon={demo.icon}
                  accent={a}
                  className="aspect-[4/5] w-full rounded-[2rem] shadow-xl ring-1 ring-black/5"
                />
                <span className="absolute -bottom-4 -right-4 hidden rounded-2xl px-5 py-3 font-restaurante text-lg font-bold text-white shadow-lg sm:block" style={{ backgroundColor: a }}>
                  Feito com amor
                </span>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: a }}>
                  Nossa história
                </span>
                <h2 className="mt-3 font-restaurante text-4xl font-bold leading-tight text-stone-900 sm:text-5xl">
                  {demo.quemSomos.title}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-stone-600">{demo.quemSomos.text}</p>
                <div className="mt-8 grid grid-cols-3 gap-4">
                  {demo.quemSomos.numeros.map((n) => (
                    <div key={n.label} className="rounded-2xl border border-stone-200 bg-[#fffdf9] p-4 text-center">
                      <p className="font-restaurante text-2xl font-bold" style={{ color: a }}>{n.value}</p>
                      <p className="mt-0.5 text-xs text-stone-500">{n.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      ) : (
        /* Básico — "sobre" curto */
        <section className="mx-auto max-w-3xl px-5 py-20 text-center">
          <Reveal>
            <Icon name="UtensilsCrossed" className="mx-auto h-8 w-8" style={{ color: a }} strokeWidth={1.5} />
            <h2 className="mt-4 font-restaurante text-3xl font-bold text-stone-900 sm:text-4xl">Sobre a {demo.business}</h2>
            <p className="mt-4 text-lg leading-relaxed text-stone-600">{demo.sobre}</p>
          </Reveal>
        </section>
      )}

      {/* GALERIA DE PRATOS (Profissional+) ---------------------------------- */}
      {has("profissional") && (
        <section className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <div className="text-center">
              <h2 className="font-restaurante text-3xl font-bold text-stone-900 sm:text-4xl">Direto da cozinha</h2>
              <p className="mt-3 text-stone-600">No seu site, este espaço fica com as fotos dos seus pratos.</p>
            </div>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Reveal key={i} delay={(i % 4) * 60}>
                <DemoImage
                  src={photo(10 + i, 520, 520)}
                  alt={`${demo.business} — prato ${i + 1}`}
                  icon={demo.icon}
                  accent={a}
                  label={i === 0 ? "sua foto aqui" : undefined}
                  className="group aspect-square rounded-2xl"
                />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* RESERVAS (Profissional+) — fala com o WhatsApp de reservas ---------- */}
      {has("profissional") && (
        <section className="border-y border-stone-200 py-20" style={{ background: `linear-gradient(180deg, #fffdf9, ${a}0a)` }}>
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-[1fr_1.1fr]">
            <Reveal>
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ backgroundColor: `${a}14`, color: a }}>
                  <Icon name="CalendarCheck" className="h-3.5 w-3.5" />
                  Reservas
                </span>
                <h2 className="mt-4 font-restaurante text-4xl font-bold text-stone-900 sm:text-5xl">{demo.reservas.title}</h2>
                <p className="mt-4 max-w-md text-lg text-stone-600">{demo.reservas.text}</p>
                <p className="mt-4 flex items-center gap-2 text-sm text-stone-500">
                  <Icon name="Clock" className="h-4 w-4" style={{ color: a }} />
                  {demo.reservas.horarios}
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-xl">
                <p className="font-restaurante text-2xl font-bold text-stone-900">Garanta sua mesa</p>
                <div className="mt-5 grid grid-cols-3 gap-2">
                  {["Hoje", "Amanhã", "Fim de semana"].map((d, i) => (
                    <span key={d} className="rounded-xl border px-2 py-2.5 text-center text-xs font-semibold" style={i === 0 ? { backgroundColor: a, borderColor: a, color: "#fff" } : { borderColor: "#e7e5e4", color: "#57534e" }}>
                      {d}
                    </span>
                  ))}
                </div>
                <a
                  href={waReserva}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
                  style={{ backgroundColor: a }}
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Reservar mesa
                </a>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-stone-400">
                  <Icon name="MessageCircle" className="h-3.5 w-3.5" style={{ color: a }} />
                  Vai direto para o WhatsApp de reservas
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* DEPOIMENTOS (Profissional+) ---------------------------------------- */}
      {has("profissional") && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal>
              <h2 className="text-center font-restaurante text-3xl font-bold text-stone-900 sm:text-4xl">Quem pede, volta</h2>
            </Reveal>
            <div className="mt-10">
              <DepoGrid items={demo.depoimentos} accent={a} />
            </div>
          </div>
        </section>
      )}

      {/* COMBO DESTAQUE (Premium) ------------------------------------------- */}
      {has("premium") && (
        <section className="mx-auto max-w-6xl px-5 pt-4">
          <Reveal>
            <div className="grid items-center gap-8 overflow-hidden rounded-[2rem] text-white shadow-xl md:grid-cols-2" style={{ backgroundColor: a }}>
              <div className="p-8 sm:p-12">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
                  <Icon name="Flame" className="h-3.5 w-3.5" />
                  Promoção do dia
                </span>
                <h2 className="mt-4 font-restaurante text-4xl font-bold">{demo.destaque.name}</h2>
                <p className="mt-3 max-w-md text-white/85">{demo.destaque.desc}</p>
                <p className="mt-5 font-restaurante text-5xl font-bold">{demo.destaque.price}</p>
                <a
                  href={waLink(`Olá! Quero o ${demo.destaque.name} (${demo.destaque.price}) da ${demo.business}.`, c.pedidos)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold transition hover:-translate-y-0.5"
                  style={{ color: a }}
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Pedir combo
                </a>
              </div>
              <div className="group relative h-full min-h-[240px]">
                <DemoImage src={photo(3, 760, 620)} alt={demo.destaque.name} icon={demo.icon} accent={a} className="absolute inset-0 h-full w-full" />
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* SALÃO DE FESTAS / EVENTOS (Premium) — WhatsApp de eventos ----------- */}
      {has("premium") && (
        <section className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] shadow-xl">
              <DemoImage src={photo(12, 1400, 800)} alt="Salão de festas" icon="Sparkles" accent={a} className="absolute inset-0 h-full w-full" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, rgba(0,0,0,0.82), rgba(0,0,0,0.45))` }} />
              <div className="relative max-w-xl p-8 text-white sm:p-12">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ring-1 ring-white/20">
                  <Icon name="Sparkles" className="h-3.5 w-3.5" />
                  Salão de festas
                </span>
                <h2 className="mt-4 font-restaurante text-4xl font-bold sm:text-5xl">{demo.eventos.title}</h2>
                <p className="mt-4 max-w-lg text-white/85">{demo.eventos.text}</p>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {demo.eventos.perks.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm">
                      <Icon name="Check" className="h-4 w-4" style={{ color: "#fff" }} />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <a
                    href={waEvento}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold transition hover:-translate-y-0.5"
                    style={{ color: a }}
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Falar sobre eventos
                  </a>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/80 ring-1 ring-white/20">
                    <Icon name="Users" className="h-3.5 w-3.5" />
                    {demo.eventos.capacidade}
                  </span>
                </div>
                <p className="mt-3 flex items-center gap-1.5 text-xs text-white/60">
                  <Icon name="MessageCircle" className="h-3.5 w-3.5" />
                  Vai direto para o WhatsApp de eventos
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* NÚMEROS (Premium) */}
      {has("premium") && <StatsBand items={demo.stats} accent={a} />}

      {/* FAQ (Premium) */}
      {has("premium") && (
        <section className="mx-auto max-w-3xl px-5 py-20">
          <Reveal>
            <h2 className="text-center font-restaurante text-3xl font-bold text-stone-900 sm:text-4xl">Perguntas frequentes</h2>
          </Reveal>
          <div className="mt-8">
            <FaqList items={demo.faq} />
          </div>
        </section>
      )}

      {/* CONTATO (Básico+) */}
      <section className="border-t border-stone-200 bg-white py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 md:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="font-restaurante text-3xl font-bold text-stone-900">Onde nos encontrar</h2>
              <ul className="mt-6 space-y-4 text-sm text-stone-700">
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
                href={waOrder}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
                style={{ backgroundColor: a }}
              >
                <WhatsAppIcon className="h-4 w-4" />
                {demo.ctaHero}
              </a>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2rem]" style={{ background: `linear-gradient(150deg, ${a}1f, #f5f5f4)` }}>
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
