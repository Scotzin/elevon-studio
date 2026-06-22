import Link from "next/link";
import type { ReactNode } from "react";

/* ==========================================================================
   COMPONENTES DE UI REUTILIZAVEIS
   (espacamento, titulos de secao, botoes e o icone do WhatsApp)
   ========================================================================== */

/* --- Container: centraliza e limita a largura do conteudo --------------- */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

/* --- Eyebrow: pequeno rotulo em maiusculas acima dos titulos ------------ */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-deep-100 bg-deep-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-deep-700 dark:border-white/10 dark:bg-white/10 dark:text-deep-100">
      {children}
    </span>
  );
}

/* --- SectionHeading: titulo + subtitulo padronizados das secoes --------- */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  const alignment =
    align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment} ${className}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="text-balance text-3xl font-bold tracking-tight text-deep-950 dark:text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="text-pretty text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

/* --- Button: link estilizado com variantes ------------------------------
   Use como link (href). Variantes: primary | outline | whatsapp | ghost.
   Tamanhos: md | lg.
------------------------------------------------------------------------- */
type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "whatsapp" | "ghost";
  size?: "md" | "lg";
  external?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  external = false,
  className = "",
}: ButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 motion-reduce:transition-none";

  const sizes = {
    md: "px-5 py-3 text-sm",
    lg: "px-7 py-4 text-base",
  };

  const variants = {
    primary:
      "bg-deep-900 text-white shadow-soft hover:-translate-y-0.5 hover:bg-deep-800 hover:shadow-soft-lg dark:bg-white dark:text-deep-950 dark:hover:bg-slate-200",
    whatsapp:
      "bg-accent text-white shadow-glow hover:-translate-y-0.5 hover:bg-accent-dark",
    outline:
      "border border-slate-300 bg-white text-deep-900 hover:-translate-y-0.5 hover:border-deep-300 hover:bg-slate-50 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/10",
    ghost: "text-deep-900 hover:bg-slate-100 dark:text-white dark:hover:bg-white/10",
  };

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

/* --- WhatsAppIcon: icone oficial (lucide nao tem icone de marca) -------- */
export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}
