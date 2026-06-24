import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const s = (v: unknown, max = 120) =>
  v ? String(v).slice(0, max) : null;

/**
 * Registra tráfego e eventos do site público:
 * - type "pageview" (padrão) → grava uma visita (PageView).
 * - outros tipos (whatsapp, previa, quero-site, plano) → grava um Event.
 * - type "whatsapp" → cria um Lead automático (dedupe por visitante/30min).
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const type = String(body.type || "pageview");
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

    if (type === "pageview") {
      await prisma.pageView.create({ data: { path, visitorId: vid } });
      return res;
    }

    const nicho = s(body.nicho, 60);
    const plan = s(body.plan, 40);
    const button = s(body.button, 80);
    const source = s(body.source, 80);

    await prisma.event.create({
      data: { type: type.slice(0, 30), path, button, nicho, plan, source, visitorId: vid },
    });

    // Clique no WhatsApp → cria lead automático (sem dados pessoais).
    if (type === "whatsapp") {
      const since = new Date(Date.now() - 30 * 60 * 1000);
      const recent = await prisma.lead.findFirst({
        where: { visitorId: vid, createdAt: { gte: since } },
      });
      if (!recent) {
        await prisma.lead.create({
          data: { status: "Novo", page: path, button, nicho, plan, source, visitorId: vid },
        });
      }
    }

    return res;
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
