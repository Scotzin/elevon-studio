import Link from "next/link";
import { waLink } from "@/lib/site";
import { WhatsAppIcon } from "../ui";

/* ==========================================================================
   BARRA DE DEMONSTRAÇÃO (overlay da Elevon sobre a prévia)
   --------------------------------------------------------------------------
   Fica fixa no topo da página de prévia. Deixa claro que é uma demonstração
   e permite alternar entre os planos (Básico / Profissional / Premium).
   ========================================================================== */
const tiers = [
  { key: "basico", label: "Básico" },
  { key: "profissional", label: "Profissional" },
  { key: "premium", label: "Premium" },
];

export default function TierBar({
  current,
  basePath,
  nicho,
}: {
  current: string;
  basePath: string;
  nicho: string;
}) {
  const currentLabel =
    tiers.find((t) => t.key === current)?.label ?? "Profissional";

  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-deep-950 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-2.5 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-xs">
          <span className="rounded-md bg-accent px-2 py-0.5 font-bold uppercase tracking-wide">
            Demo
          </span>
          <span className="text-white/70">
            Prévia Elevon Studio — você está vendo o plano{" "}
            <strong className="text-white">{currentLabel}</strong>
          </span>
        </p>

        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-lg bg-white/10 p-0.5">
            {tiers.map((t) => {
              const active = current === t.key;
              return (
                <Link
                  key={t.key}
                  href={`${basePath}?plano=${t.key}`}
                  scroll={false}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                    active
                      ? "bg-white text-deep-950"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {t.label}
                </Link>
              );
            })}
          </div>

          <a
            href={waLink(
              `Olá! Vi a prévia do site para ${nicho} (plano ${currentLabel}) e quero um site assim.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Quero este site</span>
            <span className="sm:hidden">Quero</span>
          </a>
        </div>
      </div>
    </div>
  );
}
