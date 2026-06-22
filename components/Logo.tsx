import Link from "next/link";
import { siteConfig } from "@/lib/site";

/* ==========================================================================
   LOGO DA MARCA — ELEVON STUDIO
   --------------------------------------------------------------------------
   Recriação em código (nítida, leve e escalável) da logo:
   - Monograma "ES": E branco + S azul, sobre um quadrado marinho com leve
     gradiente e um anel sutil (acabamento mais premium).
   - Wordmark em duas linhas: "Elevon" (marinho) + "STUDIO" (azul, espaçado).

   QUER USAR O ARQUIVO DE IMAGEM DA LOGO NO LUGAR?
   1) Salve a imagem em /public (ex.: /public/logo.png)
   2) Troque <BrandMark /> por:
      <img src="/logo.png" alt="Elevon Studio" className="h-9 w-auto" />
   ========================================================================== */

// Cor do "S" no monograma (azul vivo que contrasta no fundo marinho).
export const S_BLUE = "#5b9bff";

/* Monograma "ES" em quadrado marinho (usado no header, rodapé e seção sobre). */
export function BrandMark({
  className = "h-9 w-9",
  textClass = "text-sm",
}: {
  className?: string;
  textClass?: string;
}) {
  return (
    <span
      className={`grid place-items-center rounded-xl bg-gradient-to-br from-deep-800 to-deep-950 font-extrabold leading-none tracking-tight shadow-soft ring-1 ring-inset ring-white/10 ${className}`}
      aria-hidden="true"
    >
      <span className={textClass}>
        <span className="text-white">E</span>
        <span style={{ color: S_BLUE }}>S</span>
      </span>
    </span>
  );
}

/* Wordmark "Elevon Studio" em duas linhas (primeira marinho, segunda azul). */
export function Wordmark({ className = "" }: { className?: string }) {
  const [first, ...rest] = siteConfig.brand.split(" ");
  const second = rest.join(" ");
  return (
    <span className={`flex flex-col leading-none ${className}`}>
      <span className="text-[1.05rem] font-bold tracking-tight text-deep-950 dark:text-white">
        {first}
      </span>
      {second ? (
        <span className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-accent">
          {second}
        </span>
      ) : null}
    </span>
  );
}

/* Logo completa (monograma + wordmark) que leva ao topo. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="#inicio"
      aria-label={siteConfig.brand}
      className={`flex items-center gap-2.5 ${className}`}
    >
      <BrandMark />
      <Wordmark />
    </Link>
  );
}
