import type { ReactNode } from "react";
import Icon from "../Icon";

/* ==========================================================================
   KIT DE UI DO PAINEL (cards, badges, estados vazios, cabeçalhos)
   Componentes de servidor, reaproveitados em todas as páginas do CRM.
   ========================================================================== */

/* --- Badge de status (cor escolhida por palavra-chave) ----------------- */
const TONES: Record<string, string> = {
  green:
    "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-400/20",
  red: "bg-rose-50 text-rose-700 ring-rose-600/20 dark:bg-rose-500/15 dark:text-rose-300 dark:ring-rose-400/20",
  blue: "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-500/15 dark:text-blue-300 dark:ring-blue-400/20",
  amber:
    "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-400/20",
  slate:
    "bg-slate-100 text-slate-600 ring-slate-300 dark:bg-white/10 dark:text-slate-300 dark:ring-white/15",
};

export function statusTone(value = ""): keyof typeof TONES {
  const s = value.toLowerCase();
  if (/(fechad|aprovad|pago|paga|ativo|publicad)/.test(s)) return "green";
  if (/(perdid|recusad|cancelad|fora do ar|inativo|atraso)/.test(s)) return "red";
  if (/(novo|conversa|desenvolvimento|produç|produc|negociaç|negociac|enviad|revis|rascunho)/.test(s))
    return "blue";
  if (!s) return "slate";
  return "amber";
}

export function Badge({ children, tone }: { children: ReactNode; tone?: keyof typeof TONES }) {
  const t = tone || statusTone(String(children ?? ""));
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${TONES[t]}`}
    >
      {children}
    </span>
  );
}

/* --- StatCard (números do dashboard/análises) -------------------------- */
export function StatCard({
  label,
  value,
  icon,
  hint,
}: {
  label: string;
  value: ReactNode;
  icon?: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-white/5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {label}
        </p>
        {icon ? (
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
            <Icon name={icon} className="h-5 w-5" />
          </span>
        ) : null}
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight text-deep-950 dark:text-white">
        {value}
      </p>
      {hint ? (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{hint}</p>
      ) : null}
    </div>
  );
}

/* --- EmptyState -------------------------------------------------------- */
export function EmptyState({ icon = "Inbox", text }: { icon?: string; text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-white/15 dark:bg-white/5">
      <Icon name={icon} className="mx-auto h-8 w-8 text-slate-300 dark:text-white/20" strokeWidth={1.5} />
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{text}</p>
    </div>
  );
}

/* --- PageHeader -------------------------------------------------------- */
export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-deep-950 dark:text-white">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{subtitle}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

/* --- Card simples (contêiner) ------------------------------------------ */
export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/5 ${className}`}
    >
      {children}
    </div>
  );
}
