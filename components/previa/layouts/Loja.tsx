import Icon from "../../Icon";
import Reveal from "../../Reveal";
import DemoImage from "../DemoImage";
import { WhatsAppIcon } from "../../ui";
import { Stars, DepoGrid, FaqList, StatsBand } from "../parts";
import { waLink } from "@/lib/site";
import type { LojaDemo } from "@/lib/previaDemos";
import type { HasFn, PhotoFn } from "../types";

/* ==========================================================================
   LAYOUT: LOJA DE ROUPAS  (e-commerce limpo e moderno)
   Núcleo: vitrine de produtos, categorias, mais vendidos, cupom, frete.
   ========================================================================== */
export default function Loja({
  demo,
  has,
  photo,
}: {
  demo: LojaDemo;
  has: HasFn;
  photo: PhotoFn;
}) {
  const a = demo.accent;
  const wa = (m: string) => waLink(m);
  const waShop = wa(`Olá! Quero comprar na ${demo.business}.`);

  return (
    <div className="bg-white font-sans text-zinc-800">
      {/* HEADER */}
      <header className="border-b border-zinc-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <span className="font-serif text-2xl font-bold tracking-tight text-zinc-900">{demo.business}</span>
          <nav className="hidden items-center gap-7 text-sm text-zinc-600 md:flex">
            <span className="cursor-default transition hover:text-zinc-900">Loja</span>
            {has("profissional") && <span className="cursor-default transition hover:text-zinc-900">Categorias</span>}
            {has("premium") && <span className="cursor-default transition hover:text-zinc-900">Mais vendidos</span>}
            <span className="cursor-default transition hover:text-zinc-900">Contato</span>
          </nav>
          <a
            href={waShop}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-white transition hover:-translate-y-0.5"
            style={{ backgroundColor: a }}
          >
            <Icon name="ShoppingBag" className="h-3.5 w-3.5" />
            {demo.ctaShort}
          </a>
        </div>
      </header>

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{ background: `radial-gradient(60% 80% at 90% 10%, ${a}14, transparent 60%), #ffffff` }}
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <Reveal>
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: `${a}1a`, color: a }}>
                <Icon name="Sparkles" className="h-3.5 w-3.5" />
                {demo.hero.eyebrow}
              </span>
              <h1 className="mt-5 font-serif text-4xl font-bold leading-[1.05] text-zinc-900 sm:text-5xl lg:text-6xl">
                {demo.hero.title}
              </h1>
              <p className="mt-5 max-w-md text-lg text-zinc-600">{demo.hero.subtitle}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={waShop}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5"
                  style={{ backgroundColor: a }}
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {demo.ctaHero}
                </a>
                <a href="#produtos" className="inline-flex items-center rounded-full border border-zinc-300 px-6 py-3.5 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50">
                  Ver coleção
                </a>
              </div>
              <div className="mt-8 flex items-center gap-3 text-sm text-zinc-500">
                <Stars />
                <span>
                  <strong className="text-zinc-700">4.9</strong> · +2.000 clientes
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
                className="aspect-[4/5] w-full rounded-[2rem] shadow-2xl"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* TRUST STRIP (Básico+) */}
      <section className="border-y border-zinc-100 bg-zinc-50">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-5 py-5 sm:grid-cols-3">
          {demo.diferenciais.map((d) => (
            <div key={d.title} className="flex items-center justify-center gap-3 text-sm">
              <span className="grid h-10 w-10 place-items-center rounded-full" style={{ backgroundColor: `${a}1a`, color: a }}>
                <Icon name={d.icon} className="h-5 w-5" />
              </span>
              <span>
                <strong className="block text-zinc-900">{d.title}</strong>
                <span className="text-zinc-500">{d.text}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIAS (Profissional+) */}
      {has("profissional") && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          <Reveal>
            <h2 className="text-center font-serif text-3xl font-bold text-zinc-900">Compre por categoria</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {demo.categories.map((c, i) => (
              <Reveal key={c} delay={i * 70}>
                <a
                  href="#produtos"
                  className="group relative flex aspect-square items-end overflow-hidden rounded-2xl p-4 text-white shadow-md"
                >
                  <DemoImage src={photo(40 + i, 500, 500)} alt={c} icon={demo.icon} accent={a} className="absolute inset-0 h-full w-full" />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  <span className="relative font-serif text-lg font-bold drop-shadow">{c}</span>
                </a>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* PRODUTOS (Básico+) */}
      <section id="produtos" className="border-y border-zinc-100 bg-zinc-50/60 py-16">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="text-center">
              <h2 className="font-serif text-3xl font-bold text-zinc-900">Nossa coleção</h2>
              <p className="mt-2 text-zinc-600">Escolha o seu e finalize pelo WhatsApp.</p>
            </div>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {demo.products.map((p, i) => (
              <Reveal key={p.name} delay={(i % 4) * 70}>
                <div className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative">
                    <DemoImage src={photo(10 + i, 640, 800)} alt={p.name} icon={demo.icon} accent={a} className="aspect-[4/5]" />
                    {p.tag && (
                      <span className="absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white" style={{ backgroundColor: a }}>
                        {p.tag}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="truncate text-sm font-semibold text-zinc-900">{p.name}</p>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-base font-bold" style={{ color: a }}>{p.price}</span>
                      {p.oldPrice && <span className="text-xs text-zinc-400 line-through">{p.oldPrice}</span>}
                    </div>
                    <a
                      href={wa(`Olá! Tenho interesse na peça "${p.name}" (${p.price}) da ${demo.business}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full py-2 text-xs font-semibold text-white transition hover:opacity-90"
                      style={{ backgroundColor: a }}
                    >
                      <Icon name="ShoppingBag" className="h-3.5 w-3.5" />
                      {demo.ctaShort}
                    </a>
                  </div>
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

      {/* MAIS VENDIDOS (Premium) */}
      {has("premium") && (
        <section className="border-y border-zinc-100 bg-zinc-50/60 py-16">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal>
              <h2 className="text-center font-serif text-3xl font-bold text-zinc-900">Mais vendidos</h2>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {demo.bestSellers.map((v, i) => (
                <Reveal key={v.name} delay={i * 90}>
                  <div className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative">
                      <DemoImage src={photo(20 + i, 760, 560)} alt={v.name} icon={demo.icon} accent={a} className="aspect-[4/3]" />
                      <span className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-zinc-900">
                        #{i + 1} mais vendido
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3 p-5">
                      <div>
                        <p className="font-semibold text-zinc-900">{v.name}</p>
                        <p className="text-sm font-bold" style={{ color: a }}>{v.price}</p>
                      </div>
                      <a
                        href={wa(`Olá! Quero o mais vendido "${v.name}" (${v.price}) da ${demo.business}.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90"
                        style={{ backgroundColor: a }}
                      >
                        <WhatsAppIcon className="h-3.5 w-3.5" />
                        {demo.ctaShort}
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CUPOM (Premium) */}
      {has("premium") && (
        <section className="mx-auto max-w-4xl px-5 py-16">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border-2 border-dashed p-8 text-center sm:p-10" style={{ borderColor: `${a}66`, background: `${a}0d` }}>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: `${a}1a`, color: a }}>
                <Icon name="Gift" className="h-3.5 w-3.5" />
                Cupom de boas-vindas
              </span>
              <h2 className="mt-4 font-serif text-3xl font-bold text-zinc-900">{demo.coupon.title}</h2>
              <p className="mt-2 text-zinc-600">{demo.coupon.subtitle}</p>
              <div className="mx-auto mt-6 flex max-w-md flex-col items-center gap-3 sm:flex-row">
                <span className="flex-1 rounded-xl border border-zinc-300 bg-white px-5 py-3 text-center font-mono text-lg font-bold tracking-widest text-zinc-900">
                  {demo.coupon.code}
                </span>
                <a
                  href={wa(`Olá! Quero usar o cupom ${demo.coupon.code} na ${demo.business}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  style={{ backgroundColor: a }}
                >
                  {demo.coupon.button}
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* DEPOIMENTOS (Profissional+) */}
      {has("profissional") && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          <Reveal>
            <h2 className="text-center font-serif text-3xl font-bold text-zinc-900">Quem compra, recomenda</h2>
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
            <h2 className="text-center font-serif text-3xl font-bold text-zinc-900">Perguntas frequentes</h2>
          </Reveal>
          <div className="mt-8">
            <FaqList items={demo.faq} />
          </div>
        </section>
      )}

      {/* CONTATO (Básico+) */}
      <section className="border-t border-zinc-100 bg-zinc-50/60 py-16">
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
                href={waShop}
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
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl" style={{ background: `linear-gradient(150deg, ${a}1f, #fafafa)` }}>
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
