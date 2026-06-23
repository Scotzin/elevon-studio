import { prisma } from "@/lib/prisma";
import Icon from "@/components/Icon";

export const dynamic = "force-dynamic";

export default async function EquipePage() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-deep-950 dark:text-white">Equipe</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Contas com acesso ao painel ({users.length}).
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {users.map((u) => (
          <div
            key={u.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-white/5"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-deep-900 text-base font-bold text-white dark:bg-white/10">
                {u.name.charAt(0).toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="font-bold leading-tight text-deep-950 dark:text-white">
                  {u.name}
                </p>
                <p className="mt-0.5 text-xs font-semibold text-accent">
                  {u.role}
                </p>
              </div>
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <Icon name="Mail" className="h-4 w-4 text-slate-400" />
              {u.email}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
