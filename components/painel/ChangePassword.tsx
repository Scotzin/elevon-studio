"use client";

import { useFormState, useFormStatus } from "react-dom";
import { changePassword, type PwState } from "@/app/painel/conta/actions";
import Icon from "../Icon";

const initial: PwState = {};

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-deep-900 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-white/15 dark:bg-deep-950/40 dark:text-white dark:placeholder:text-slate-500";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Salvando..." : "Trocar senha"}
    </button>
  );
}

export default function ChangePassword() {
  const [state, action] = useFormState(changePassword, initial);

  return (
    <form action={action} className="space-y-4">
      {state.error ? (
        <p className="flex items-center gap-2 rounded-xl border border-signal/40 bg-signal/10 px-4 py-3 text-sm text-signal dark:text-red-300">
          <Icon name="X" className="h-4 w-4 shrink-0" />
          {state.error}
        </p>
      ) : null}
      {state.success ? (
        <p className="flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
          <Icon name="Check" className="h-4 w-4 shrink-0" />
          {state.success}
        </p>
      ) : null}

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-deep-900 dark:text-slate-200">Senha atual</span>
        <input name="current" type="password" required autoComplete="current-password" placeholder="••••••••" className={inputClass} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-deep-900 dark:text-slate-200">Nova senha</span>
        <input name="next" type="password" required autoComplete="new-password" placeholder="mínimo 8 caracteres" className={inputClass} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-deep-900 dark:text-slate-200">Confirmar nova senha</span>
        <input name="confirm" type="password" required autoComplete="new-password" placeholder="repita a nova senha" className={inputClass} />
      </label>

      <Submit />
    </form>
  );
}
