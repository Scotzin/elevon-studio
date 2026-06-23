import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { BrandMark } from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import Icon from "@/components/Icon";
import PainelTabs from "@/components/painel/Tabs";
import { logout } from "./actions";

export default async function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Segurança extra (além do middleware): sem usuário, volta ao login.
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const initial = user.name.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-deep-950">
      <header className="border-b border-slate-200 bg-white dark:border-white/10 dark:bg-deep-900/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <BrandMark className="h-9 w-9" />
            <div className="leading-tight">
              <p className="text-sm font-bold text-deep-950 dark:text-white">
                Painel da equipe
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Elevon Studio
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-2.5 sm:flex">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-deep-900 text-sm font-bold text-white dark:bg-white/10">
                {initial}
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-deep-950 dark:text-white">
                  {user.name}
                </p>
                <p className="max-w-[14rem] truncate text-xs text-slate-500 dark:text-slate-400">
                  {user.role}
                </p>
              </div>
            </div>

            <ThemeToggle />

            <form action={logout}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-deep-900 transition hover:bg-slate-100 dark:border-white/15 dark:text-white dark:hover:bg-white/10"
              >
                <Icon name="LogOut" className="h-4 w-4" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </form>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-5 pb-3">
          <PainelTabs />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
    </div>
  );
}
