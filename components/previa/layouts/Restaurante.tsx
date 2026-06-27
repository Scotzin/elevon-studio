import Icon from "../../Icon";
import Reveal from "../../Reveal";
import DemoImage from "../DemoImage";
import { WhatsAppIcon } from "../../ui";
import { Stars, DepoGrid, FaqList, StatsBand } from "../parts";
import { waLink } from "@/lib/site";
import type { RestauranteDemo } from "@/lib/previaDemos";
import type { HasFn, PhotoFn } from "../types";

/* ==========================================================================
   LAYOUT: RESTAURANTE  (quente, creme, apetitoso)
   Núcleo: cardápio por seções, faixa de delivery, combo destaque.
   ========================================================================== */
export default function Restaurante({
  demo,
  has,
  photo,
}: {
  demo: RestauranteDemo;
  has: HasFn;
  photo: PhotoFn;
}) {
  const a = demo.accent;
  const wa = (m: string) => waLink(m);
  const waOrder = wa(`Olá! Quero fazer um pedido na ${demo.business}.`);

  const deliveryInfo = [
    { icon: "Clock", label: "Entrega em", value: demo.delivery.time },
    { icon: "Truck", label: "Frete", value: demo.delivery.fee },
    { icon: "ShoppingBag", label: "Mínimo", value: demo.delivery.min },
  ];

  return (
    <div className="bg-[#fffaf5] font-sans text-stone-800">
      {/* HEADER */}
      <header className="border-b border-stone-200 bg-[#fffaf5]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <span className="flex items-center gap-2 font-serif text-2xl font-bold text-stone-900">
            <Icon name="UtensilsCrossed" className="h-5 w-5" style={{ color: a }} />
            {demo.business}
          </span>
          <nav className="hidden items-center gap-7 text-sm text-stone-600 md:flex">
            <span className="cursor-default transition hover:text-stone-900">Cardápio</span>
            {has("premium") && <span className="cursor-default transition hover:text-stone-900">Combos</span>}
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

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{ background: `radial-gradient(70% 80% at 15% 10%, ${a}1a, transparent 60%), #fffaf5` }}
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <Reveal>
            <div>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                style={{ backgroundColor: `${a}1a`, color: a }}
              >
                <Icon name="Flame" className="h-3.5 w-3.5" />
                {demo.hero.eyebrow}
              </span>
              <h1 className="mt-5 font-serif text-4xl font-bold leading-[1.05] text-stone-900 sm:text-5xl lg:text-6xl">
                {demo.hero.title}
              </h1>
              <p className="mt-5 max-w-md text-lg text-stone-600">{demo.hero.subtitle}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={waOrder}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5"
                  style={{ backgroundColor: a }}
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {demo.ctaHero}
                </a>
                <a
                  href="#cardapio"
                  className="inline-flex items-center rounded-full border border-stone-300 px-6 py-3.5 text-sm font-semibold text-stone-700 transition hover:bg-white"
                >
                  Ver cardápio
                </a>
              </div>
              <div className="mt-8 flex items-center gap-3 text-sm text-stone-500">
                <Stars />
                <span>
                  <strong className="text-stone-700">4.8</strong> · +10 mil pedidos entregues
                </span>
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

      {/* FAIXA DE DELIVERY (Básico+) */}
      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-5 py-5 sm:grid-cols-3">
          {deliveryInfo.map((d) => (
            <div key={d.label} className="flex items-center justify-center gap-3 text-sm">
              <span className="grid h-10 w-10 place-items-center rounded-full" style={{ backgroundColor: `${a}1a`, color: a }}>
                <Icon name={d.icon} className="h-5 w-5" />
              </span>
              <span>
                <span className="text-stone-500">{d.label} </span>
                <strong className="text-stone-900">{d.value}</strong>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* DIFERENCIAIS (Básico+) */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-5 sm:grid-cols-3">
          {demo.diferenciais.map((d, i) => (
            <Reveal key={d.title} delay={i * 90}>
              <div className="h-full rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <span className="grid h-12 w-12 place-items-center rounded-xl" style={{ backgroundColor: `${a}1a`, color: a }}>
                  <Icon name={d.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-serif text-lg font-bold text-stone-900">{d.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{d.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CARDÁPIO (Básico+) */}
      <section id="cardapio" className="border-y border-stone-200 bg-white py-16">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="text-center">
              <h2 className="font-serif text-4xl font-bold text-stone-900">Nosso cardápio</h2>
              <p className="mt-2 text-stone-600">Escolha seu prato e peça pelo WhatsApp — chega quentinho.</p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {demo.menu.map((cat, ci) => (
              <Reveal key={cat.category} delay={(ci % 2) * 80}>
                <div>
                  <h3 className="flex items-center gap-2 border-b-2 pb-2 font-serif text-xl font-bold text-stone-900" style={{ borderColor: `${a}55` }}>
                    <Icon name={cat.icon} className="h-5 w-5" style={{ color: a }} />
                    {cat.category}
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {cat.items.map((it) => (
                      <li key={it.name}>
                        <a
                          href={wa(`Olá! Quero pedir: ${it.name} (${it.price}) na ${demo.business}.`)}
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
                          <span className="shrink-0 font-bold" style={{ color: a }}>
                            {it.price}
                          </span>
                        </a>
                        <p className="mt-0.5 text-sm text-stone-500">{it.desc}</p>
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
          <h2 className="font-serif text-3xl font-bold text-stone-900">Sobre a {demo.business}</h2>
          <p className="mt-4 text-lg leading-relaxed text-stone-600">{demo.sobre}</p>
        </Reveal>
      </section>

      {/* COMBO DESTAQUE (Premium) */}
      {has("premium") && (
        <section className="mx-auto max-w-6xl px-5 pb-4">
          <Reveal>
            <div className="grid items-center gap-8 overflow-hidden rounded-3xl text-white md:grid-cols-2" style={{ backgroundColor: a }}>
              <div className="p-8 sm:p-10">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Promoção do dia</span>
                <h2 className="mt-3 font-serif text-3xl font-bold">{demo.destaque.name}</h2>
                <p className="mt-3 max-w-md text-white/85">{demo.destaque.desc}</p>
                <p className="mt-5 font-serif text-4xl font-bold">{demo.destaque.price}</p>
                <a
                  href={wa(`Olá! Quero o ${demo.destaque.name} (${demo.destaque.price}) da ${demo.business}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold transition hover:-translate-y-0.5"
                  style={{ color: a }}
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Pedir combo
                </a>
              </div>
              <div className="group relative h-full min-h-[220px]">
                <DemoImage src={photo(2, 760, 620)} alt={demo.destaque.name} icon={demo.icon} accent={a} className="absolute inset-0 h-full w-full" />
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* GALERIA DE PRATOS (Profissional+) */}
      {has("profissional") && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          <Reveal>
            <h2 className="text-center font-serif text-3xl font-bold text-stone-900">Direto da cozinha</h2>
            <p className="mt-2 text-center text-stone-600">No seu site, este espaço fica com as fotos dos seus pratos.</p>
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
                  className="group aspect-square rounded-xl"
                />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* DEPOIMENTOS (Profissional+) */}
      {has("profissional") && (
        <section className="border-y border-stone-200 bg-white py-16">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal>
              <h2 className="text-center font-serif text-3xl font-bold text-stone-900">Quem pede, volta</h2>
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
            <h2 className="text-center font-serif text-3xl font-bold text-stone-900">Perguntas frequentes</h2>
          </Reveal>
          <div className="mt-8">
            <FaqList items={demo.faq} />
          </div>
        </section>
      )}

      {/* CONTATO (Básico+) */}
      <section className="border-t border-stone-200 bg-white py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 md:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="font-serif text-2xl font-bold text-stone-900">Onde nos encontrar</h2>
              <ul className="mt-5 space-y-3 text-sm text-stone-700">
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
                href={waOrder}
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
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl" style={{ background: `linear-gradient(150deg, ${a}1f, #f5f5f4)` }}>
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
