"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "./ui";
import { waLink } from "@/lib/site";

/**
 * Botao flutuante do WhatsApp (canto inferior direito).
 * Aparece depois que o usuario rola um pouco a pagina.
 */
export default function WhatsappFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={waLink("Olá! Vim pelo site e quero saber mais sobre criar meu site profissional.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] py-3.5 pl-4 pr-5 font-semibold text-white shadow-soft-lg transition-all duration-300 hover:scale-105 hover:bg-[#1ebe5b] motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      {/* anel pulsante */}
      <span className="absolute inset-0 -z-10 rounded-full bg-[#25D366] motion-safe:animate-pulse-ring" />
      <WhatsAppIcon className="h-6 w-6" />
      <span className="hidden text-sm sm:inline">Fale comigo</span>
    </a>
  );
}
