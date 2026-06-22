"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";

/* ==========================================================================
   BOTÃO DE TEMA (claro / escuro)
   --------------------------------------------------------------------------
   - Lê a preferência já aplicada no <html> (definida pelo script em
     app/layout.tsx, que roda ANTES do paint para evitar "flash").
   - Ao clicar, alterna a classe `dark` no <html> e salva a escolha no
     localStorage para lembrar nas próximas visitas.
   ========================================================================== */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignora se o localStorage estiver indisponível */
    }
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Ativar tema claro" : "Ativar tema escuro"}
      title={dark ? "Tema claro" : "Tema escuro"}
      className={`grid h-10 w-10 place-items-center rounded-lg text-deep-900 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10 ${className}`}
    >
      {/* Antes de montar mostra a lua (padrão), evitando divergência de hidratação */}
      <Icon name={mounted && dark ? "Sun" : "Moon"} className="h-5 w-5" />
    </button>
  );
}
