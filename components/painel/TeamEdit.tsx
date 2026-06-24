"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "../Icon";
import { saveRecord } from "@/lib/crudActions";
import { ACCESS_LEVELS, TEAM_STATUS } from "@/lib/painelConfig";

type Member = {
  id: string;
  name: string;
  role: string;
  accessLevel: string;
  status: string;
};

export default function TeamEdit({ member }: { member: Member }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    await saveRecord(
      "user",
      member.id,
      {
        name: String(fd.get("name")),
        role: String(fd.get("role")),
        accessLevel: String(fd.get("accessLevel")),
        status: String(fd.get("status")),
      },
      "/painel/equipe"
    );
    setBusy(false);
    setOpen(false);
    router.refresh();
  }

  const cls =
    "w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-deep-950 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30 dark:border-white/15 dark:bg-deep-950/40 dark:text-white";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-deep-900 transition hover:bg-slate-100 dark:border-white/15 dark:text-white dark:hover:bg-white/10"
      >
        <Icon name="Pencil" className="h-3.5 w-3.5" />
        Editar
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-deep-950/60 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-soft-lg dark:border-white/10 dark:bg-deep-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-deep-950 dark:text-white">Editar membro</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10"
              >
                <Icon name="X" className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={submit} className="mt-5 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">Nome</span>
                <input name="name" defaultValue={member.name} required className={cls} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">Cargo</span>
                <input name="role" defaultValue={member.role} required className={cls} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">Nível de acesso</span>
                <select name="accessLevel" defaultValue={member.accessLevel} className={cls}>
                  {ACCESS_LEVELS.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">Status</span>
                <select name="status" defaultValue={member.status} className={cls}>
                  {TEAM_STATUS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </label>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:border-white/15 dark:text-slate-300 dark:hover:bg-white/10"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={busy}
                  className="rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-white transition hover:bg-accent-dark disabled:opacity-60"
                >
                  {busy ? "Salvando…" : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
