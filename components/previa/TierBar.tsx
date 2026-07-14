import Link from "next/link";
import Icon from "../Icon";
import { waLink } from "@/lib/site";
import { TIERS } from "@/lib/previaTiers";
import { WhatsAppIcon } from "../ui";
import type { Plan } from "./types";

/* ==========================================================================
   BARRA DE PLANOS (overlay da Elevon sobre a prévia)
   --------------------------------------------------------------------------
   Fica fixa no topo. Deixa claro que é uma demonstração E funciona como uma
   "escada de valor": mostra os 3 planos com preço, o plano atual em destaque
   e, logo abaixo, o que aquele nível entrega. Trocar de plano muda a prévia
   E esta faixa — a evolução Básico → Profissional → Premium fica evidente.
   ========================================================================== */
const ORDER: Plan[] = ["basico", "profissional", "premium"];

export default function TierBar({
  current,
  basePath,
  nicho,
  extra = "",
}: {
  current: Plan;
  basePath: string;
  nicho: string;
  extra?: string;
}) {
  const t = TIERS[current] ?? TIERS.profissional;

  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-deep-950 text-white">
      {/* Linha 1 — marca + seletor de planos com preço + CTA */}
      <div className="mx-auto flex max-w-6xl flex-col gap-2.5 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-xs">
          <span className="rounded-md bg-accent px-2 py-0.5 font-bold uppercase tracking-wide">Demo</span>
          <span className="hidden text-white/60 sm:inline">Prévia Elevon Studio · compare os planos</span>
        </p>

        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-xl bg-white/10 p-0.5">
            {ORDER.map((key) => {
              const tt = TIERS[key];
              const active = current === key;
              return (
                <Link
                  key={key}
                  href={`${basePath}?plano=${key}${extra}`}
                  scroll={false}
                  aria-current={active ? "true" : undefined}
                  className={`flex flex-col items-center rounded-lg px-3 py-1.5 leading-tight transition-colors ${
                    active ? "bg-white text-deep-950" : "text-white/75 hover:text-white"
                  }`}
                >
                  <span className="text-xs font-semibold">{tt.label}</span>
                  <span className={`text-[10px] ${active ? "text-deep-950/60" : "text-white/40"}`}>{tt.setup}</span>
                </Link>
              );
            })}
          </div>

          <a
            href={waLink(`Olá! Vi a prévia do site para ${nicho} (plano ${t.label}) e quero um site assim.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Quero o {t.label}</span>
            <span className="sm:hidden">Quero</span>
          </a>
        </div>
      </div>

      {/* Linha 2 — o que este plano entrega (muda ao trocar de plano) */}
      <div className="border-t border-white/10 bg-white/[0.04]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-1.5 px-4 py-2 text-xs">
          <span className="font-semibold text-white">
            Plano {t.label}
            <span className="ml-2 font-normal text-white/55">{t.pitch}</span>
          </span>
          <span className="hidden h-3 w-px bg-white/15 sm:block" />
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/70">
            {t.perks.map((p) => (
              <li key={p} className="flex items-center gap-1.5">
                <Icon name="Check" className="h-3.5 w-3.5 text-accent" strokeWidth={3} />
                {p}
              </li>
            ))}
          </ul>
          <span className="ml-auto hidden font-medium text-white/80 md:inline">
            Criação {t.setup} · {t.monthly}
          </span>
        </div>
      </div>
    </div>
  );
}
