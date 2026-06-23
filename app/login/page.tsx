"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { login, type LoginState } from "./actions";
import { BrandMark } from "@/components/Logo";
import Icon from "@/components/Icon";

const initialState: LoginState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-accent px-5 py-3.5 font-semibold text-white shadow-glow transition hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Entrando..." : "Entrar"}
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useFormState(login, initialState);

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-gradient-to-br from-deep-950 via-deep-900 to-deep-800 px-5 py-12">
      {/* Brilhos decorativos */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-soft-lg backdrop-blur sm:p-10">
          <div className="flex flex-col items-center text-center">
            <BrandMark className="h-12 w-12" textClass="text-base" />
            <h1 className="mt-5 text-2xl font-bold text-white">Área da equipe</h1>
            <p className="mt-2 text-sm text-slate-300">
              Entre com a sua conta da Elevon Studio.
            </p>
          </div>

          <form action={formAction} className="mt-8 space-y-4">
            {state?.error ? (
              <p className="rounded-xl border border-signal/40 bg-signal/10 px-4 py-3 text-sm text-red-200">
                {state.error}
              </p>
            ) : null}

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-200">
                E-mail
              </span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="voce@elevon.studio"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-accent focus:ring-2 focus:ring-accent/40"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-200">
                Senha
              </span>
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-accent focus:ring-2 focus:ring-accent/40"
              />
            </label>

            <SubmitButton />
          </form>

          <p className="mt-6 text-center text-xs text-slate-400">
            Acesso restrito aos membros da Elevon Studio.
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-300 transition hover:text-white"
          >
            <Icon name="ArrowRight" className="h-4 w-4 rotate-180" />
            Voltar ao site
          </Link>
        </div>
      </div>
    </main>
  );
}
