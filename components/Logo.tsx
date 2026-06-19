import Link from "next/link";
import { siteConfig } from "@/lib/site";

/* ==========================================================================
   LOGO DA MARCA — ELEVON STUDIO
   --------------------------------------------------------------------------
   Recriacao em codigo (nitida, leve e escalavel) da logo:
   - Monograma "ES": E em branco + S em azul vivo, sobre um quadrado marinho.
   - Wordmark "Elevon" (marinho) + "Studio" (azul).

   QUER USAR O ARQUIVO DE IMAGEM DA LOGO NO LUGAR?
   1) Salve a imagem em /public (ex.: /public/logo.png)
   2) Troque <BrandMark /> por:
      <img src="/logo.png" alt="Elevon Studio" className="h-9 w-auto" />
   ========================================================================== */

// Cor do "S" no monograma (azul vivo que contrasta no fundo marinho).
export const S_BLUE = "#5b9bff";

/* Monograma "ES" em quadrado marinho (usado no header, rodape e secao sobre). */
export function BrandMark({
  className = "h-9 w-9",
  textClass = "text-sm",
}: {
  className?: string;
  textClass?: string;
}) {
  return (
    <span
      className={`grid place-items-center rounded-xl bg-deep-900 font-extrabold leading-none tracking-tight shadow-soft ${className}`}
      aria-hidden="true"
    >
      <span className={textClass}>
        <span className="text-white">E</span>
        <span style={{ color: S_BLUE }}>S</span>
      </span>
    </span>
  );
}

/* Wordmark "Elevon Studio" (primeira palavra marinho, resto azul). */
export function Wordmark({ className = "text-lg" }: { className?: string }) {
  const [first, ...rest] = siteConfig.brand.split(" ");
  return (
    <span className={`font-bold tracking-tight text-deep-950 ${className}`}>
      {first}
      {rest.length ? <span className="text-accent"> {rest.join(" ")}</span> : null}
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
