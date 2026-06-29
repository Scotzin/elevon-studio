import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const s = (v: unknown, max = 200) => (v ? String(v).trim().slice(0, max) : null);

/**
 * Recebe o formulário de orçamento do site público e grava um Lead no CRM
 * (aba Leads do painel). Diferente do clique no WhatsApp, aqui já vêm nome +
 * contato, então o lead chega "qualificado".
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

    // Honeypot anti-bot: o campo invisível "empresa" deve vir vazio.
    if (s(body.empresa)) return NextResponse.json({ ok: true });

    const fullName = s(body.fullName, 120);
    const whatsapp = s(body.whatsapp, 40);
    const nicho = s(body.nicho, 60);
    const message = s(body.message, 600);

    if (!fullName || !whatsapp) {
      return NextResponse.json(
        { ok: false, error: "Informe pelo menos nome e WhatsApp." },
        { status: 400 }
      );
    }

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

    // Evita duplicar se a pessoa reenviar o form em poucos minutos.
    const since = new Date(Date.now() - 10 * 60 * 1000);
    const dup = await prisma.lead.findFirst({
      where: { whatsapp, createdAt: { gte: since } },
    });

    if (!dup) {
      await prisma.lead.create({
        data: {
          fullName,
          whatsapp,
          nicho,
          notes: message,
          status: "Novo",
          source: "Formulário do site",
          page: "/",
          button: "form-orcamento",
          visitorId: vid,
        },
      });
    }

    return res;
  } catch {
    return NextResponse.json({ ok: false, error: "Não foi possível enviar agora." }, { status: 200 });
  }
}
