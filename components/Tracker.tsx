"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Registra cada visita de página (tráfego real) chamando /api/track.
 * Fica invisível no layout. NÃO rastreia a área interna (/login e /painel).
 */
export default function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    if (pathname.startsWith("/painel") || pathname.startsWith("/login")) return;

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}
