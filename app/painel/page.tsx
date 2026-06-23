import { prisma } from "@/lib/prisma";
import Icon from "@/components/Icon";

// Sempre renderiza com dados frescos do banco.
export const dynamic = "force-dynamic";

function dayKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export default async function AnalisesPage() {
  const now = new Date();
  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const since = new Date(startToday);
  since.setDate(since.getDate() - 13); // 14 dias incluindo hoje

  const [total, todayCount, recent, topPaths, distinctVisitors] =
    await Promise.all([
      prisma.pageView.count(),
      prisma.pageView.count({ where: { createdAt: { gte: startToday } } }),
      prisma.pageView.findMany({
        where: { createdAt: { gte: since } },
        select: { createdAt: true },
      }),
      prisma.pageView.groupBy({
        by: ["path"],
        _count: { path: true },
        orderBy: { _count: { path: "desc" } },
        take: 8,
      }),
      prisma.pageView.findMany({
        distinct: ["visitorId"],
        select: { visitorId: true },
        where: { visitorId: { not: null } },
      }),
    ]);

  const uniqueVisitors = distinctVisitors.length;

  // Monta os 14 dias e distribui as visitas
  const days: { key: string; label: string; count: number }[] = [];
  for (let i = 0; i < 14; i++) {
    const d = new Date(since);
    d.setDate(since.getDate() + i);
    days.push({
      key: dayKey(d),
      label: d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
      count: 0,
    });
  }
  const byKey = new Map(days.map((d) => [d.key, d]));
  for (const r of recent) {
    const d = byKey.get(dayKey(new Date(r.createdAt)));
    if (d) d.count++;
  }
  const maxCount = Math.max(1, ...days.map((d) => d.count));
  const topPath = topPaths[0]?.path ?? "—";
  const maxPathCount = topPaths[0]?._count.path ?? 1;

  const kpis: {
    icon: string;
    label: string;
    value: string | number;
    small?: boolean;
  }[] = [
    { icon: "Eye", label: "Visitas totais", value: total },
    { icon: "Users", label: "Visitantes únicos", value: uniqueVisitors },
    { icon: "TrendingUp", label: "Visitas hoje", value: todayCount },
    {
      icon: "BarChart3",
      label: "Página mais acessada",
      value: topPath,
      small: true,
    },
  ];

  if (total === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-white/15 dark:bg-white/5">
        <h2 className="text-lg font-bold text-deep-950 dark:text-white">
          Ainda não há visitas registradas
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-600 dark:text-slate-300">
          Abra o site em outra aba e navegue pelas páginas — cada visita aparece
          aqui automaticamente.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-deep-950 dark:text-white">
          Análises de tráfego
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Visitas reais registradas no site da Elevon Studio.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-white/5"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent">
              <Icon name={k.icon} className="h-5 w-5" />
            </span>
            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {k.label}
            </p>
            <p
              className={`mt-1 font-bold text-deep-950 dark:text-white ${
                k.small ? "truncate text-lg" : "text-3xl"
              }`}
            >
              {k.value}
            </p>
          </div>
        ))}
      </div>

      {/* Visitas por dia */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/5">
        <h2 className="text-base font-bold text-deep-950 dark:text-white">
          Visitas por dia (últimos 14 dias)
        </h2>
        <div className="mt-6 flex h-48 items-end gap-1.5 sm:gap-2">
          {days.map((d) => (
            <div key={d.key} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex w-full flex-1 items-end">
                <div
                  className="w-full rounded-t-md bg-accent/80 transition-all hover:bg-accent"
                  style={{ height: `${Math.max(4, (d.count / maxCount) * 100)}%` }}
                  title={`${d.count} visita(s)`}
                />
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                {d.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Páginas mais acessadas */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/5">
        <h2 className="text-base font-bold text-deep-950 dark:text-white">
          Páginas mais acessadas
        </h2>
        <ul className="mt-4 space-y-3">
          {topPaths.map((p) => (
            <li key={p.path}>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="truncate font-medium text-deep-950 dark:text-white">
                  {p.path}
                </span>
                <span className="shrink-0 text-slate-500 dark:text-slate-400">
                  {p._count.path}
                </span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${(p._count.path / maxPathCount) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
