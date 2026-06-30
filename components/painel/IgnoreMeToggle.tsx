"use client";

import { useEffect, useState } from "react";
import Icon from "../Icon";

const COOKIE = "elevon_notrack";

/* Botão por dispositivo: marca/desmarca este navegador para NÃO ser contado
   nas Análises. Seta um cookie que o /api/track lê e grava como "interno". */
export default function IgnoreMeToggle() {
  const [ignored, setIgnored] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    setIgnored(document.cookie.split("; ").some((c) => c === `${COOKIE}=1`));
  }, []);

  function toggle() {
    if (ignored) {
      document.cookie = `${COOKIE}=; path=/; max-age=0; samesite=lax`;
      setIgnored(false);
    } else {
      document.cookie = `${COOKIE}=1; path=/; max-age=${60 * 60 * 24 * 365 * 2}; samesite=lax`;
      setIgnored(true);
    }
  }

  if (!ready) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
        ignored
          ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300"
          : "border-slate-300 text-deep-900 hover:bg-slate-100 dark:border-white/15 dark:text-white dark:hover:bg-white/10"
      }`}
    >
      <Icon name={ignored ? "Check" : "Eye"} className="h-4 w-4" />
      {ignored ? "Seus acessos não contam neste dispositivo" : "Não contar meus acessos neste dispositivo"}
    </button>
  );
}
