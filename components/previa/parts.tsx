import type { CSSProperties, ReactNode } from "react";
import Icon from "../Icon";
import { WhatsAppIcon } from "../ui";
import type { Depoimento, Faq, Stat } from "@/lib/previaDemos";

/* ==========================================================================
   PEÇAS COMPARTILHADAS DAS PRÉVIAS
   --------------------------------------------------------------------------
   São blocos genéricos reaproveitados pelos layouts de cada nicho (estrelas,
   botão de WhatsApp, depoimentos, FAQ e a faixa de números). O que dá a CARA
   de cada nicho fica nos próprios layouts — aqui ficam só os pedaços neutros.
   ========================================================================== */

/* --- Marca no header: logo (URL do prospect) OU o nome estilizado -------- */
export function BrandLogo({
  logoUrl,
  business,
  children,
}: {
  logoUrl?: string;
  business: string;
  children: ReactNode;
}) {
  if (logoUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={logoUrl} alt={business} className="h-8 w-auto max-w-[170px] object-contain sm:h-9" />;
  }
  return <>{children}</>;
}

/* --- Estrelinhas de avaliação ------------------------------------------- */
export function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span className="inline-flex gap-0.5 text-amber-400">
      {[0, 1, 2, 3, 4].map((i) => (
        <Icon key={i} name="Star" className={`${className} fill-current`} strokeWidth={0} />
      ))}
    </span>
  );
}

/* --- Chip/eyebrow colorido com a cor do nicho --------------------------- */
export function Chip({
  children,
  accent,
  icon,
}: {
  children: ReactNode;
  accent: string;
  icon?: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
      style={{ backgroundColor: `${accent}1a`, color: accent }}
    >
      {icon ? <Icon name={icon} className="h-3.5 w-3.5" /> : null}
      {children}
    </span>
  );
}

/* --- Botão de WhatsApp (cor controlada pelo layout via className/style) -- */
export function WaButton({
  href,
  children,
  className = "",
  style,
  size = "md",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-7 py-3.5 text-sm",
  };
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold shadow-sm transition hover:-translate-y-0.5 ${sizes[size]} ${className}`}
      style={style}
    >
      <WhatsAppIcon className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
      {children}
    </a>
  );
}

/* --- Grade de depoimentos (3 cards) ------------------------------------- */
export function DepoGrid({ items, accent }: { items: Depoimento[]; accent: string }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {items.map((d) => (
        <figure key={d.nome} className="h-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <Stars />
          <blockquote className="mt-3 text-sm leading-relaxed text-zinc-700">&ldquo;{d.texto}&rdquo;</blockquote>
          <figcaption className="mt-5 flex items-center gap-3">
            <span
              className="grid h-10 w-10 place-items-center rounded-full font-bold text-white"
              style={{ backgroundColor: accent }}
            >
              {d.nome.charAt(0)}
            </span>
            <span className="text-sm font-semibold text-zinc-900">{d.nome}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/* --- Accordion de FAQ (details/summary, sem JS) ------------------------- */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      {items.map((f) => (
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
  );
}

/* --- Faixa de números (Premium) — gradiente na cor do nicho ------------- */
export function StatsBand({ items, accent }: { items: Stat[]; accent: string }) {
  return (
    <section style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }} className="text-white">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-5 py-14 text-center sm:grid-cols-3">
        {items.map((s) => (
          <div key={s.label}>
            <p className="font-serif text-4xl font-bold sm:text-5xl">{s.value}</p>
            <p className="mt-1 text-sm text-white/80">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
