import Icon from "../../Icon";
import Reveal from "../../Reveal";
import DemoImage from "../DemoImage";
import { WhatsAppIcon } from "../../ui";
import { DepoGrid, FaqList, StatsBand } from "../parts";
import { waLink } from "@/lib/site";
import type { LojaDemo } from "@/lib/previaDemos";
import type { HasFn, PhotoFn } from "../types";

/* ==========================================================================
   LAYOUT: LOJA DE ROUPAS  — editorial de moda
   Hero assimétrico com imagem sangrada (lookbook), tipografia serifada de
   alto contraste (DM Serif Display), linhas finas e vitrine tipo revista.
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
          <span className="font-loja text-2xl tracking-tight text-zinc-900">{demo.business}</span>
          <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.15em] text-zinc-500 md:flex">
            <span className="cursor-default transition hover:text-zinc-900">Loja</span>
            {has("profissional") && <span className="cursor-default transition hover:text-zinc-900">Categorias</span>}
            {has("premium") && <span className="cursor-default transition hover:text-zinc-900">Mais vendidos</span>}
            <span className="cursor-default transition hover:text-zinc-900">Contato</span>
          </nav>
          <a
            href={waShop}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-none px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition hover:-translate-y-0.5"
            style={{ backgroundColor: a }}
          >
            <Icon name="ShoppingBag" className="h-3.5 w-3.5" />
            {demo.ctaShort}
          </a>
        </div>
      </header>

      {/* HERO — editorial assimétrico -------------------------------------- */}
      <section className="grid items-stretch md:grid-cols-[1fr_1.1fr]">
        {/* Texto */}
        <div className="flex flex-col justify-center px-6 py-16 sm:px-10 md:py-24 lg:px-16">
          <Reveal>
            <div className="max-w-md">
              <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: a }}>
                <span className="h-px w-8" style={{ backgroundColor: a }} />
                {demo.hero.eyebrow}
              </span>
              <h1 className="mt-6 font-loja text-5xl leading-[1.02] text-zinc-900 sm:text-6xl lg:text-7xl">
                {demo.hero.title}
              </h1>
              <p className="mt-6 text-base leading-relaxed text-zinc-500">{demo.hero.subtitle}</p>
              <div className="mt-9 flex flex-wrap items-center gap-6">
                <a
                  href={waShop}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-none px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white transition hover:-translate-y-0.5"
                  style={{ backgroundColor: a }}
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {demo.ctaHero}
                </a>
                <a href="#produtos" className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-900">
                  Ver coleção
                  <span className="block h-px w-6 transition-all group-hover:w-10" style={{ backgroundColor: a }} />
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[11px] uppercase tracking-widest text-zinc-400">
                <span>+2.000 clientes</span>
                <span>·</span>
                <span>Envio p/ todo o Brasil</span>
                <span>·</span>
                <span>Troca fácil</span>
              </div>
            </div>
          </Reveal>
        </div>
        {/* Imagem sangrada com etiqueta vertical */}
        <div className="relative min-h-[360px]">
          <DemoImage
            src={photo(1, 1000, 1200)}
            alt={`Demonstração de site para ${demo.nicho}`}
            icon={demo.icon}
            accent={a}
            className="absolute inset-0 h-full w-full"
          />
          <span
            className="absolute right-5 top-6 z-10 rounded-none px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white"
            style={{ backgroundColor: a }}
          >
            Lookbook
          </span>
        </div>
      </section>

      {/* TRUST STRIP (Básico+) — faixa fina editorial ---------------------- */}
      <section className="border-y border-zinc-900/10 bg-zinc-950 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-white/10 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {demo.diferenciais.map((d) => (
            <div key={d.title} className="flex items-center justify-center gap-3 px-4 py-5 text-center text-sm">
              <Icon name={d.icon} className="h-5 w-5 shrink-0" style={{ color: a }} />
              <span>
                <strong className="block text-white">{d.title}</strong>
                <span className="text-white/50">{d.text}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIAS (Profissional+) */}
      {has("profissional") && (
        <section className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <div className="flex items-end justify-between">
              <h2 className="font-loja text-3xl text-zinc-900 sm:text-4xl">Compre por categoria</h2>
              <span className="hidden text-xs uppercase tracking-widest text-zinc-400 sm:block">{demo.categories.length} seções</span>
            </div>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {demo.categories.map((c, i) => (
              <Reveal key={c} delay={i * 70}>
                <a
                  href="#produtos"
                  className="group relative flex aspect-[3/4] items-end overflow-hidden p-4 text-white"
                >
                  <DemoImage src={photo(40 + i, 500, 640)} alt={c} icon={demo.icon} accent={a} className="absolute inset-0 h-full w-full" />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="relative font-loja text-lg drop-shadow">{c}</span>
                </a>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* PRODUTOS (Básico+) — vitrine editorial ---------------------------- */}
      <section id="produtos" className="border-t border-zinc-100 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: a }}>
                A coleção
              </span>
              <h2 className="mt-3 font-loja text-4xl text-zinc-900 sm:text-5xl">Nossa coleção</h2>
              <p className="mt-3 text-zinc-500">Escolha o seu e finalize pelo WhatsApp.</p>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {demo.products.map((p, i) => (
              <Reveal key={p.name} delay={(i % 4) * 70}>
                <div className="group">
                  <div className="relative overflow-hidden">
                    <DemoImage src={photo(10 + i, 640, 800)} alt={p.name} icon={demo.icon} accent={a} className="aspect-[4/5]" />
                    {p.tag && (
                      <span className="absolute left-3 top-3 z-10 rounded-none px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white" style={{ backgroundColor: a }}>
                        {p.tag}
                      </span>
                    )}
                    {/* CTA que aparece no hover */}
                    <a
                      href={wa(`Olá! Tenho interesse na peça "${p.name}" (${p.price}) da ${demo.business}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-x-0 bottom-0 z-10 flex translate-y-full items-center justify-center gap-1.5 py-3 text-xs font-semibold uppercase tracking-widest text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                      style={{ backgroundColor: a }}
                    >
                      <WhatsAppIcon className="h-3.5 w-3.5" />
                      {demo.ctaShort}
                    </a>
                  </div>
                  <div className="mt-3">
                    <p className="truncate text-sm font-medium text-zinc-900">{p.name}</p>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="font-loja text-lg" style={{ color: a }}>{p.price}</span>
                      {p.oldPrice && <span className="text-xs text-zinc-400 line-through">{p.oldPrice}</span>}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE (Básico+) */}
      <section className="border-y border-zinc-100 bg-zinc-50 py-20">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <Reveal>
            <span className="font-loja text-5xl" style={{ color: a }}>&ldquo;</span>
            <h2 className="mt-2 font-loja text-3xl text-zinc-900 sm:text-4xl">Sobre a {demo.business}</h2>
            <p className="mt-4 text-lg leading-relaxed text-zinc-600">{demo.sobre}</p>
          </Reveal>
        </div>
      </section>

      {/* MAIS VENDIDOS (Premium) */}
      {has("premium") && (
        <section className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: a }}>
                Favoritos
              </span>
              <h2 className="mt-3 font-loja text-4xl text-zinc-900 sm:text-5xl">Mais vendidos</h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {demo.bestSellers.map((v, i) => (
              <Reveal key={v.name} delay={i * 90}>
                <div className="group">
                  <div className="relative overflow-hidden">
                    <DemoImage src={photo(20 + i, 760, 620)} alt={v.name} icon={demo.icon} accent={a} className="aspect-[5/6]" />
                    <span className="absolute left-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white font-loja text-lg text-zinc-900 shadow">
                      {i + 1}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-zinc-900">{v.name}</p>
                      <p className="font-loja text-lg" style={{ color: a }}>{v.price}</p>
                    </div>
                    <a
                      href={wa(`Olá! Quero o mais vendido "${v.name}" (${v.price}) da ${demo.business}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-none px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition hover:opacity-90"
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
        </section>
      )}

      {/* CUPOM (Premium) */}
      {has("premium") && (
        <section className="mx-auto max-w-5xl px-5 pb-20">
          <Reveal>
            <div className="flex flex-col items-center gap-8 overflow-hidden bg-zinc-950 p-10 text-center text-white sm:flex-row sm:text-left">
              <div className="flex-1">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: a }}>
                  <Icon name="Gift" className="h-3.5 w-3.5" />
                  Cupom de boas-vindas
                </span>
                <h2 className="mt-3 font-loja text-3xl sm:text-4xl">{demo.coupon.title}</h2>
                <p className="mt-2 text-white/60">{demo.coupon.subtitle}</p>
              </div>
              <div className="flex w-full max-w-xs flex-col gap-3 sm:w-auto">
                <span className="border border-dashed border-white/40 px-6 py-3 text-center font-mono text-lg font-bold tracking-[0.3em] text-white">
                  {demo.coupon.code}
                </span>
                <a
                  href={wa(`Olá! Quero usar o cupom ${demo.coupon.code} na ${demo.business}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-none px-6 py-3 text-center text-xs font-semibold uppercase tracking-widest text-white transition hover:opacity-90"
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
        <section className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <h2 className="text-center font-loja text-3xl text-zinc-900 sm:text-4xl">Quem compra, recomenda</h2>
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
        <section className="mx-auto max-w-3xl px-5 py-20">
          <Reveal>
            <h2 className="text-center font-loja text-3xl text-zinc-900 sm:text-4xl">Perguntas frequentes</h2>
          </Reveal>
          <div className="mt-8">
            <FaqList items={demo.faq} />
          </div>
        </section>
      )}

      {/* CONTATO (Básico+) */}
      <section className="border-t border-zinc-100 bg-zinc-50 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 md:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="font-loja text-3xl text-zinc-900">Onde nos encontrar</h2>
              <ul className="mt-6 space-y-4 text-sm text-zinc-700">
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
                href={waShop}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-none px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition hover:-translate-y-0.5"
                style={{ backgroundColor: a }}
              >
                <WhatsAppIcon className="h-4 w-4" />
                {demo.ctaHero}
              </a>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative aspect-[16/10] w-full overflow-hidden" style={{ background: `linear-gradient(150deg, ${a}1f, #fafafa)` }}>
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
