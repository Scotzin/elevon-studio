import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { StatCard, Panel } from "@/components/painel/ui";
import Icon from "@/components/Icon";
import { greeting, firstName, fraseDoDia, brl } from "@/lib/painelConfig";

export const dynamic = "force-dynamic";

const fmtDateTime = (d: Date) =>
  new Date(d).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const now = new Date();
  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [
    visitasHoje,
    whatsappClicks,
    leadsNovos,
    orcamentosAbertos,
    clientesAtivos,
    projetosProducao,
    pagamentosPendentes,
    receita,
    lastLead,
    lastBudget,
    lastClient,
    lastProject,
    lastVisit,
  ] = await Promise.all([
    prisma.pageView.count({ where: { createdAt: { gte: startToday } } }),
    prisma.event.count({ where: { type: "whatsapp" } }),
    prisma.lead.count({ where: { status: "Novo" } }),
    prisma.budget.count({ where: { status: { in: ["Rascunho", "Enviado", "Em negociação"] } } }),
    prisma.client.count({ where: { siteStatus: { not: "Cancelado" } } }),
    prisma.project.count({ where: { status: "Em desenvolvimento" } }),
    prisma.client.count({ where: { paymentStatus: { in: ["Pendente", "Em atraso"] } } }),
    prisma.client.aggregate({ _sum: { monthly: true }, where: { siteStatus: { not: "Cancelado" } } }),
    prisma.lead.findFirst({ orderBy: { createdAt: "desc" } }),
    prisma.budget.findFirst({ orderBy: { createdAt: "desc" } }),
    prisma.client.findFirst({ orderBy: { createdAt: "desc" } }),
    prisma.project.findFirst({ orderBy: { createdAt: "desc" } }),
    prisma.pageView.findFirst({ orderBy: { createdAt: "desc" } }),
  ]);

  const cards = [
    { label: "Visitas hoje", value: visitasHoje, icon: "Eye" },
    { label: "Cliques no WhatsApp", value: whatsappClicks, icon: "MessageCircle" },
    { label: "Leads novos", value: leadsNovos, icon: "Inbox" },
    { label: "Orçamentos em aberto", value: orcamentosAbertos, icon: "FileText" },
    { label: "Clientes ativos", value: clientesAtivos, icon: "Users" },
    { label: "Projetos em produção", value: projetosProducao, icon: "FolderKanban" },
    { label: "Pagamentos pendentes", value: pagamentosPendentes, icon: "Clock" },
    { label: "Receita recorrente mensal", value: brl(receita._sum.monthly || 0), icon: "Banknote" },
  ];

  const resumo = [
    {
      label: "Último lead gerado",
      value: lastLead
        ? `${lastLead.fullName || lastLead.nicho || "Lead automático"} · ${fmtDateTime(lastLead.createdAt)}`
        : null,
      empty: "Nenhum lead registrado ainda.",
      href: "/painel/leads",
    },
    {
      label: "Último orçamento criado",
      value: lastBudget
        ? `${lastBudget.clientName || lastBudget.business || lastBudget.plan} · ${fmtDateTime(lastBudget.createdAt)}`
        : null,
      empty: "Nenhum orçamento criado ainda.",
      href: "/painel/orcamentos",
    },
    {
      label: "Último cliente fechado",
      value: lastClient ? `${lastClient.name} · ${fmtDateTime(lastClient.createdAt)}` : null,
      empty: "Nenhum cliente fechado até o momento.",
      href: "/painel/clientes",
    },
    {
      label: "Último projeto atualizado",
      value: lastProject ? `${lastProject.name} · ${fmtDateTime(lastProject.createdAt)}` : null,
      empty: "Nenhum projeto criado ainda.",
      href: "/painel/projetos",
    },
    {
      label: "Última visita registrada",
      value: lastVisit ? `${lastVisit.path} · ${fmtDateTime(lastVisit.createdAt)}` : null,
      empty: "Nenhuma visita registrada ainda.",
      href: "/painel/analises",
    },
  ];

  const dataLonga = now.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  return (
    <div className="space-y-8">
      {/* Saudação + frase do dia */}
      <div className="relative overflow-hidden rounded-3xl border border-deep-100 bg-gradient-to-br from-deep-50 via-white to-accent/5 p-8 dark:border-white/10 dark:from-deep-900/70 dark:via-deep-950 dark:to-deep-900/40 sm:p-10">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
        <p className="text-sm font-medium capitalize text-slate-500 dark:text-slate-400">{dataLonga}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-deep-950 dark:text-white sm:text-4xl lg:text-5xl">
          {greeting(now)}, <span className="text-accent">{firstName(user)}</span>.
        </h1>
        <div className="mt-5 flex items-start gap-2.5 border-l-2 border-accent pl-4">
          <p className="max-w-2xl text-pretty text-base font-medium italic leading-relaxed text-deep-800 dark:text-slate-200">
            &ldquo;{fraseDoDia(now)}&rdquo;
          </p>
        </div>
      </div>

      {/* Cards de resumo */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <StatCard key={c.label} label={c.label} value={c.value} icon={c.icon} />
        ))}
      </div>

      {/* Resumo rápido */}
      <Panel>
        <h2 className="text-base font-bold text-deep-950 dark:text-white">Resumo rápido</h2>
        <ul className="mt-4 divide-y divide-slate-100 dark:divide-white/10">
          {resumo.map((r) => (
            <li key={r.label} className="flex items-center justify-between gap-4 py-3">
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  {r.label}
                </p>
                {r.value ? (
                  <p className="mt-0.5 truncate text-sm font-medium text-deep-950 dark:text-white">{r.value}</p>
                ) : (
                  <p className="mt-0.5 text-sm text-slate-400 dark:text-slate-500">{r.empty}</p>
                )}
              </div>
              <Link
                href={r.href}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-accent dark:hover:bg-white/10"
              >
                <Icon name="ArrowRight" className="h-4 w-4" />
              </Link>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
