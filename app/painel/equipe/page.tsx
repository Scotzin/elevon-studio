import { prisma } from "@/lib/prisma";
import { PageHeader, Badge } from "@/components/painel/ui";
import Icon from "@/components/Icon";
import TeamEdit from "@/components/painel/TeamEdit";

export const dynamic = "force-dynamic";

const fmtAccess = (d: Date | null) =>
  d
    ? new Date(d).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Nunca acessou";

export default async function EquipePage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      accessLevel: true,
      status: true,
      lastAccessAt: true,
    },
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Equipe"
        subtitle="Sócios e direção da Elevon Studio. As permissões são visuais por enquanto."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {users.map((u) => (
          <div
            key={u.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-white/5"
          >
            <div className="flex items-start gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-deep-900 text-base font-bold text-white dark:bg-white/10">
                {u.name.charAt(0).toUpperCase()}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-bold leading-tight text-deep-950 dark:text-white">{u.name}</p>
                  <Badge tone={u.status === "Ativo" ? "green" : "red"}>{u.status}</Badge>
                </div>
                <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{u.role}</p>
              </div>
              <TeamEdit member={u} />
            </div>

            <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm dark:border-white/10">
              <p className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <Icon name="Mail" className="h-4 w-4 text-slate-400" />
                {u.email}
              </p>
              <div className="flex items-center gap-2">
                <Icon name="Lock" className="h-4 w-4 text-slate-400" />
                <Badge tone="blue">{u.accessLevel}</Badge>
              </div>
              <p className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Icon name="Clock" className="h-4 w-4 text-slate-400" />
                Último acesso: {fmtAccess(u.lastAccessAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
