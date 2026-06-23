"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/painel", label: "Análises" },
  { href: "/painel/gastos", label: "Gastos" },
  { href: "/painel/equipe", label: "Equipe" },
];

export default function PainelTabs() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1">
      {tabs.map((t) => {
        const active = pathname === t.href;
        return (
          <Link
            key={t.href}
            href={t.href}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-deep-900 text-white dark:bg-white dark:text-deep-950"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
