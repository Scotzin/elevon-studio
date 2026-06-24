"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/* ==========================================================================
   RASTREAMENTO DO SITE PÚBLICO
   - Registra cada visita de página (/api/track type=pageview).
   - Listener global de cliques: WhatsApp e "Ver prévia" viram eventos
     (e o clique no WhatsApp cria um lead automático no painel).
   NÃO captura nome/telefone/e-mail — só contexto (página, nicho, plano…).
   ========================================================================== */

const NICHO_MAP: [string, string][] = [
  ["barbearia", "Barbearia"],
  ["restaurante", "Restaurante"],
  ["pizzaria", "Restaurante"],
  ["loja de roupa", "Loja de roupas"],
  ["roupas", "Loja de roupas"],
  ["estética", "Clínica/Estética"],
  ["estetica", "Clínica/Estética"],
  ["clínica", "Clínica/Estética"],
  ["clinica", "Clínica/Estética"],
  ["imobiliária", "Imobiliária"],
  ["imobiliaria", "Imobiliária"],
  ["prestador", "Prestador de serviço"],
  ["serviço", "Prestador de serviço"],
  ["servico", "Prestador de serviço"],
];

function detectNicho(text: string): string | null {
  const t = text.toLowerCase();
  for (const [k, v] of NICHO_MAP) if (t.includes(k)) return v;
  return null;
}

function detectPlan(text: string): string | null {
  const t = text.toLowerCase();
  if (t.includes("premium")) return "Premium";
  if (t.includes("profissional")) return "Profissional";
  if (t.includes("básico") || t.includes("basico")) return "Básico";
  if (t.includes("personalizado")) return "Personalizado";
  return null;
}

function send(payload: Record<string, unknown>) {
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {});
}

export default function Tracker() {
  const pathname = usePathname();

  // Visita de página (ignora a área interna).
  useEffect(() => {
    if (!pathname) return;
    if (pathname.startsWith("/painel") || pathname.startsWith("/login")) return;
    send({ type: "pageview", path: pathname });
  }, [pathname]);

  // Cliques importantes (WhatsApp / prévia).
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const link = target?.closest("a");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      const here = window.location.pathname;
      if (here.startsWith("/painel") || here.startsWith("/login")) return;

      const utm = new URLSearchParams(window.location.search).get("utm_source");
      const button = (link.textContent || "").trim().slice(0, 80) || null;

      if (/wa\.me|api\.whatsapp\.com|whatsapp\.com\/send/.test(href)) {
        let msg = "";
        try {
          msg = decodeURIComponent(new URL(href).searchParams.get("text") || "");
        } catch {
          /* ignore */
        }
        send({
          type: "whatsapp",
          path: here,
          button,
          nicho: detectNicho(msg),
          plan: detectPlan(msg),
          source: utm,
        });
      } else if (href.includes("/previa/")) {
        const slug = href.split("/previa/")[1]?.split(/[?#]/)[0] || null;
        send({ type: "previa", path: here, button, nicho: slug });
      }
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
