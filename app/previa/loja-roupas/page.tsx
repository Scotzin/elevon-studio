import TierBar from "@/components/previa/TierBar";
import Icon from "@/components/Icon";
import { WhatsAppIcon } from "@/components/ui";
import { waLink } from "@/lib/site";

/* ==========================================================================
   PRÉVIA — LOJA DE ROUPAS (loja fictícia "Bella Moda")
   --------------------------------------------------------------------------
   Demonstração de como fica o site em cada plano. As seções aparecem conforme
   o plano selecionado na TierBar (?plano=basico|profissional|premium).
   ========================================================================== */

const PLANS = { basico: 1, profissional: 2, premium: 3 } as const;
type Plan = keyof typeof PLANS;

const STORE = "Bella Moda";
const BASE = "/previa/loja-roupas";

// Botão de WhatsApp do "lojista" → na verdade leva à Elevon (é uma demo).
const demoWa = (plan: string) =>
  waLink(`Olá! Vi a prévia da loja de roupas (plano ${plan}) e quero um site assim.`);

const produtos = [
  { nome: "Vestido Midi Floral", preco: "R$ 189,90", tag: "Novo", tone: "from-rose-200 to-rose-100" },
  { nome: "Camisa de Linho", preco: "R$ 139,90", tag: "", tone: "from-amber-100 to-stone-100" },
  { nome: "Calça Alfaiataria", preco: "R$ 199,90", tag: "", tone: "from-stone-200 to-stone-100" },
  { nome: "Blazer Premium", preco: "R$ 259,90", tag: "−15%", tone: "from-zinc-200 to-zinc-100" },
  { nome: "Saia Plissada", preco: "R$ 119,90", tag: "Novo", tone: "from-rose-100 to-amber-100" },
  { nome: "Tricô Oversized", preco: "R$ 149,90", tag: "", tone: "from-sky-100 to-stone-100" },
];

const categorias = ["Feminino", "Masculino", "Acessórios", "Novidades"];

const depoimentos = [
  { nome: "Marina S.", texto: "Roupas lindas e atendimento rápido pelo WhatsApp. Virei cliente fiel!" },
  { nome: "Rafael T.", texto: "Peças de qualidade e entrega na cidade toda. Recomendo demais." },
  { nome: "Júlia P.", texto: "Adoro as novidades toda semana. O site facilita ver tudo." },
];

export default function PreviaLojaRoupas({
  searchParams,
}: {
  searchParams: { plano?: string };
}) {
  const raw = (searchParams.plano || "profissional").toLowerCase();
  const plan: Plan = (["basico", "profissional", "premium"].includes(raw)
    ? raw
    : "profissional") as Plan;
  const rank = PLANS[plan];
  const has = (min: Plan) => rank >= PLANS[min];
  const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1);

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-800">
      <TierBar current={plan} basePath={BASE} nicho="loja de roupas" />

      {/* HEADER DA LOJA */}
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <span className="font-serif text-2xl font-bold tracking-tight text-zinc-900">
            {STORE}
          </span>
          <nav className="hidden items-center gap-6 text-sm text-zinc-600 md:flex">
            <span>Início</span>
            {has("profissional") && <span>Coleções</span>}
            {has("profissional") && <span>Novidades</span>}
            <span>Contato</span>
          </nav>
          <a
            href={demoWa(planLabel)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-zinc-700"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            Comprar
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-stone-100 via-white to-rose-50">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">
              Nova coleção
            </p>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-zinc-900 sm:text-5xl">
              Seu estilo, do seu jeito.
            </h1>
            <p className="mt-4 max-w-md text-zinc-600">
              Peças selecionadas para você se vestir bem todos os dias. Atendimento
              rápido e fácil pelo WhatsApp.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={demoWa(planLabel)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Comprar pelo WhatsApp
              </a>
              {has("profissional") && (
                <a
                  href="#produtos"
                  className="inline-flex items-center rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50"
                >
                  Ver coleção
                </a>
              )}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] w-full rounded-3xl bg-gradient-to-br from-rose-200 via-stone-200 to-amber-100 shadow-xl" />
            <div className="absolute -bottom-4 -left-4 rounded-2xl border border-zinc-100 bg-white px-5 py-3 shadow-lg">
              <p className="text-xs text-zinc-500">a partir de</p>
              <p className="font-serif text-xl font-bold text-zinc-900">R$ 119,90</p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIAS — Profissional+ */}
      {has("profissional") && (
        <section className="mx-auto max-w-6xl px-5 py-14">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {categorias.map((c, i) => (
              <a
                key={c}
                href="#produtos"
                className="group relative flex aspect-square items-end overflow-hidden rounded-2xl bg-gradient-to-br p-4 text-white transition"
                style={{}}
              >
                <span
                  className={`absolute inset-0 bg-gradient-to-br ${
                    ["from-rose-400 to-rose-600", "from-zinc-600 to-zinc-800", "from-amber-400 to-amber-600", "from-sky-400 to-sky-600"][i]
                  } transition-transform duration-500 group-hover:scale-105`}
                />
                <span className="relative font-serif text-lg font-bold drop-shadow">{c}</span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* DESTAQUE PREMIUM — só Premium */}
      {has("premium") && (
        <section className="bg-zinc-900 text-white">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-14 md:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-400">
                Destaque da semana
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold">
                Coleção Cápsula — Edição Limitada
              </h2>
              <p className="mt-3 max-w-md text-white/70">
                Peças exclusivas, em quantidade limitada. Garanta a sua antes que
                esgote.
              </p>
              <a
                href={demoWa(planLabel)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Quero garantir
              </a>
            </div>
            <div className="aspect-[4/3] w-full rounded-3xl bg-gradient-to-br from-rose-300 via-amber-200 to-stone-300" />
          </div>
        </section>
      )}

      {/* PRODUTOS — Profissional+ */}
      {has("profissional") && (
        <section id="produtos" className="mx-auto max-w-6xl px-5 py-16">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-zinc-900">
              Nossos produtos
            </h2>
            <p className="mt-2 text-zinc-600">Escolha o seu e finalize pelo WhatsApp.</p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3">
            {produtos.map((p) => (
              <div key={p.nome} className="group">
                <div className={`relative aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br ${p.tone}`}>
                  {p.tag && (
                    <span className="absolute left-3 top-3 rounded-full bg-zinc-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                      {p.tag}
                    </span>
                  )}
                  <span className="absolute inset-0 grid place-items-center text-zinc-400/60">
                    <Icon name="ShoppingBag" className="h-10 w-10" strokeWidth={1.5} />
                  </span>
                </div>
                <div className="mt-3 flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-zinc-900">{p.nome}</p>
                    <p className="text-sm font-bold text-zinc-900">{p.preco}</p>
                  </div>
                  <a
                    href={demoWa(planLabel)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Comprar ${p.nome}`}
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

      {/* DEPOIMENTOS — Profissional+ */}
      {has("profissional") && (
        <section className="border-y border-zinc-100 bg-stone-50 py-16">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="text-center font-serif text-3xl font-bold text-zinc-900">
              Quem compra, ama
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {depoimentos.map((d) => (
                <figure key={d.nome} className="rounded-2xl border border-zinc-200 bg-white p-6">
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
          </div>
        </section>
      )}

      {/* CAPTAÇÃO DE LEADS — só Premium */}
      {has("premium") && (
        <section className="mx-auto max-w-3xl px-5 py-16 text-center">
          <h2 className="font-serif text-3xl font-bold text-zinc-900">
            Ganhe 10% na primeira compra
          </h2>
          <p className="mt-2 text-zinc-600">
            Cadastre-se e receba as novidades e promoções em primeira mão.
          </p>
          <div className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 rounded-full border border-zinc-300 px-5 py-3 text-sm text-zinc-800 outline-none focus:border-zinc-900"
            />
            <button
              type="button"
              className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
            >
              Quero meu cupom
            </button>
          </div>
        </section>
      )}

      {/* LOCALIZAÇÃO — Profissional+ */}
      {has("profissional") && (
        <section className="mx-auto max-w-6xl px-5 py-14">
          <div className="grid items-center gap-8 overflow-hidden rounded-3xl border border-zinc-200 md:grid-cols-2">
            <div className="p-8">
              <h2 className="font-serif text-2xl font-bold text-zinc-900">Venha nos visitar</h2>
              <ul className="mt-5 space-y-3 text-sm text-zinc-700">
                <li className="flex items-center gap-2.5">
                  <Icon name="MapPin" className="h-4 w-4 text-rose-500" />
                  Rua das Flores, 123 — Centro
                </li>
                <li className="flex items-center gap-2.5">
                  <Icon name="MessageCircle" className="h-4 w-4 text-rose-500" />
                  Seg a Sáb, 9h às 19h
                </li>
              </ul>
            </div>
            <div className="relative aspect-[16/10] w-full bg-gradient-to-br from-stone-200 to-stone-100 md:h-full">
              <span className="absolute inset-0 grid place-items-center text-zinc-400">
                <Icon name="MapPin" className="h-10 w-10" />
              </span>
            </div>
          </div>
        </section>
      )}

      {/* INFO / CONTATO (todos os planos) */}
      <section className="border-t border-zinc-100 bg-stone-50 py-14">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="font-serif text-2xl font-bold text-zinc-900">{STORE}</h2>
          <p className="mt-3 text-zinc-600">
            Moda para todos os momentos. Fale com a gente e receba um atendimento
            personalizado pelo WhatsApp.
          </p>
          <a
            href={demoWa(planLabel)}
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
        <p>© {new Date().getFullYear()} {STORE} — site de demonstração.</p>
      </footer>
    </div>
  );
}
