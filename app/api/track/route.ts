import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

/**
 * Registra uma visita de página (tráfego real). Chamado pelo componente
 * <Tracker /> a cada navegação. Usa um cookie "vid" para estimar visitantes
 * únicos (sem dado pessoal).
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as { path?: string };
    const path = String(body.path || "/").slice(0, 200);

    const jar = cookies();
    let vid = jar.get("vid")?.value;
    const res = NextResponse.json({ ok: true });

    if (!vid) {
      vid = randomUUID();
      res.cookies.set("vid", vid, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
      });
    }

    await prisma.pageView.create({ data: { path, visitorId: vid } });
    return res;
  } catch {
    // Nunca quebra a navegação por causa do tracking.
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
