import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { StatCard, PageHeader, Panel } from "@/components/painel/ui";
import VisitsChart from "@/components/painel/VisitsChart";
import IgnoreMeToggle from "@/components/painel/IgnoreMeToggle";

export const dynamic = "force-dynamic";

const PERIODS = [
  { k: "hoje", label: "Hoje" },
  { k: "7", label: "7 dias" },
  { k: "14", label: "14 dias" },
  { k: "30", label: "30 dias" },
  { k: "mes", label: "Mês atual" },
];

function dayKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export default async function AnalisesPage({
  searchParams,
}: {
  searchParams: { periodo?: string };
}) {
  const periodo = searchParams.periodo || "14";
  const now = new Date();
  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let windowDays: number;
  if (periodo === "hoje") windowDays = 1;
  else if (periodo === "mes") windowDays = now.getDate();
  else windowDays = parseInt(periodo) || 14;

  const since = new Date(startToday);
  since.setDate(since.getDate() - (windowDays - 1));

  // Em todas as consultas excluímos os acessos internos (equipe) com internal:false.
  const [total, todayCount, distinctVisitors, topPaths, recent, whatsappClicks, topPrevia, topNicho, teamCount] =
    await Promise.all([
      prisma.pageView.count({ where: { internal: false } }),
      prisma.pageView.count({ where: { internal: false, createdAt: { gte: startToday } } }),
      prisma.pageView.findMany({
        distinct: ["visitorId"],
        select: { visitorId: true },
        where: { internal: false, visitorId: { not: null } },
      }),
      prisma.pageView.groupBy({
        by: ["path"],
        where: { internal: false },
        _count: { path: true },
        orderBy: { _count: { path: "desc" } },
        take: 8,
      }),
      prisma.pageView.findMany({
        where: { internal: false, createdAt: { gte: since } },
        select: { createdAt: true },
      }),
      prisma.event.count({ where: { internal: false, type: "whatsapp" } }),
      prisma.pageView.groupBy({
        by: ["path"],
        where: { internal: false, path: { startsWith: "/previa/" } },
        _count: { path: true },
        orderBy: { _count: { path: "desc" } },
        take: 1,
      }),
      prisma.event.groupBy({
        by: ["nicho"],
        where: { internal: false, nicho: { not: null } },
        _count: { nicho: true },
        orderBy: { _count: { nicho: "desc" } },
        take: 1,
      }),
      prisma.pageView.count({ where: { internal: true } }),
    ]);

  // buckets do gráfico
  const days: { label: string; count: number }[] = [];
  const idx = new Map<string, number>();
  for (let i = 0; i < windowDays; i++) {
    const d = new Date(since);
    d.setDate(since.getDate() + i);
    idx.set(dayKey(d), i);
    days.push({
      label: d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
      count: 0,
    });
  }
  for (const r of recent) {
    const i = idx.get(dayKey(new Date(r.createdAt)));
    if (i !== undefined) days[i].count++;
  }

  const topPath = topPaths[0]?.path ?? "—";
  const previaTop = topPrevia[0]?.path?.replace("/previa/", "") ?? "—";
  const nichoTop = topNicho[0]?.nicho ?? "—";
  const maxPath = topPaths[0]?._count.path ?? 1;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Análises de tráfego"
        subtitle="Visitas reais de visitantes — os acessos da equipe não entram na conta."
      />

      {/* Acessos da equipe (descontados) + opt-out por dispositivo */}
      <Panel>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-bold text-deep-950 dark:text-white">Acessos da equipe</h2>
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
              {teamCount > 0
                ? `${teamCount} acesso(s) da equipe já foram descontados destes números.`
                : "Quem está logado no painel já não é contado. Marque também seus outros aparelhos."}
            </p>
          </div>
          <IgnoreMeToggle />
        </div>
      </Panel>

      {/* Cards principais */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Visitas totais" value={total} icon="Eye" />
        <StatCard label="Visitantes únicos" value={distinctVisitors.length} icon="Users" />
        <StatCard label="Visitas hoje" value={todayCount} icon="TrendingUp" />
        <StatCard label="Cliques no WhatsApp" value={whatsappClicks} icon="MessageCircle" />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Página mais acessada" value={<span className="text-lg">{topPath}</span>} icon="FileText" />
        <StatCard label="Prévia mais acessada" value={<span className="text-lg">{previaTop}</span>} icon="Eye" />
        <StatCard label="Nicho mais acessado" value={<span className="text-lg">{nichoTop}</span>} icon="LayoutGrid" />
      </div>

      {/* Gráfico + filtro de período */}
      <Panel>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-base font-bold text-deep-950 dark:text-white">Visitas por dia</h2>
          <div className="flex flex-wrap gap-1">
            {PERIODS.map((p) => {
              const active = periodo === p.k;
              return (
                <Link
                  key={p.k}
                  href={`/painel/analises?periodo=${p.k}`}
                  scroll={false}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                    active
                      ? "bg-accent text-white"
                      : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10"
                  }`}
                >
                  {p.label}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="mt-6">
          <VisitsChart days={days} />
        </div>
      </Panel>

      {/* Páginas mais acessadas */}
      <Panel>
        <h2 className="text-base font-bold text-deep-950 dark:text-white">Páginas mais acessadas</h2>
        {topPaths.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Nenhuma visita registrada ainda.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {topPaths.map((p) => (
              <li key={p.path}>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="truncate font-medium text-deep-950 dark:text-white">{p.path}</span>
                  <span className="shrink-0 text-slate-500 dark:text-slate-400">{p._count.path}</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${(p._count.path / maxPath) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
