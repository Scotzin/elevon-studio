"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "../Icon";

const tabs = [
  { href: "/painel", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/painel/analises", label: "Análises", icon: "BarChart3" },
  { href: "/painel/leads", label: "Leads", icon: "Inbox" },
  { href: "/painel/clientes", label: "Clientes", icon: "Users" },
  { href: "/painel/projetos", label: "Projetos", icon: "FolderKanban" },
  { href: "/painel/orcamentos", label: "Orçamentos", icon: "FileText" },
  { href: "/painel/financeiro", label: "Financeiro", icon: "Banknote" },
  { href: "/painel/gastos", label: "Gastos", icon: "Wallet" },
  { href: "/painel/equipe", label: "Equipe", icon: "Briefcase" },
];

export default function PainelTabs() {
  const pathname = usePathname();

  return (
    <nav className="-mx-1 flex gap-1 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {tabs.map((t) => {
        const active = pathname === t.href;
        return (
          <Link
            key={t.href}
            href={t.href}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-deep-900 text-white dark:bg-white dark:text-deep-950"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
            }`}
          >
            <Icon name={t.icon} className="h-4 w-4" />
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
