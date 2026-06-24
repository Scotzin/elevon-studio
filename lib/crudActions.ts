"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";

/* ==========================================================================
   AÇÕES DE CRUD GENÉRICAS + CONVERSÕES DO FLUXO (lead → cliente → projeto)
   Usadas pelo componente CrudManager e pelas páginas do painel.
   ========================================================================== */

type ModelKey = "lead" | "client" | "project" | "budget" | "expense" | "user";

// Campos que devem ser tratados como número.
const NUMERIC = new Set(["initialValue", "monthly", "amount"]);

function coerce(data: Record<string, unknown>) {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(data)) {
    if (NUMERIC.has(k)) {
      const n =
        typeof v === "number"
          ? v
          : parseFloat(String(v ?? "0").replace(",", "."));
      out[k] = Number.isFinite(n) ? n : 0;
    } else {
      out[k] = v === "" ? null : v;
    }
  }
  return out;
}

export type ActionResult = { ok?: boolean; error?: string };

/** Cria (id null) ou atualiza um registro de qualquer modelo permitido. */
export async function saveRecord(
  model: ModelKey,
  id: string | null,
  data: Record<string, unknown>,
  path: string
): Promise<ActionResult> {
  const delegate = (prisma as unknown as Record<string, any>)[model];
  if (!delegate) return { error: "Modelo inválido." };
  try {
    const payload = coerce(data);
    if (id) await delegate.update({ where: { id }, data: payload });
    else await delegate.create({ data: payload });
    revalidatePath(path);
    return { ok: true };
  } catch {
    return { error: "Não foi possível salvar. Confira os campos." };
  }
}

/** Remove um registro de qualquer modelo permitido. */
export async function removeRecord(
  model: ModelKey,
  id: string,
  path: string
): Promise<ActionResult> {
  const delegate = (prisma as unknown as Record<string, any>)[model];
  if (!delegate) return { error: "Modelo inválido." };
  try {
    await delegate.delete({ where: { id } });
    revalidatePath(path);
    return { ok: true };
  } catch {
    return { error: "Não foi possível excluir." };
  }
}

const today = () => new Date().toISOString().slice(0, 10);

/** Transforma um lead em cliente (e marca o lead como Fechado). */
export async function leadToClient(id: string, path: string): Promise<ActionResult> {
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) return { error: "Lead não encontrado." };
  await prisma.client.create({
    data: {
      name: lead.fullName || "Cliente (do lead)",
      whatsapp: lead.whatsapp,
      email: lead.email,
      nicho: lead.nicho,
      plan: lead.plan,
      closedAt: today(),
    },
  });
  await prisma.lead.update({ where: { id }, data: { status: "Fechado" } });
  revalidatePath(path);
  revalidatePath("/painel/clientes");
  return { ok: true };
}

/** Transforma um orçamento aprovado em cliente. */
export async function budgetToClient(id: string, path: string): Promise<ActionResult> {
  const b = await prisma.budget.findUnique({ where: { id } });
  if (!b) return { error: "Orçamento não encontrado." };
  await prisma.client.create({
    data: {
      name: b.clientName || "Cliente (do orçamento)",
      business: b.business,
      nicho: b.nicho,
      plan: b.plan,
      initialValue: b.initialValue,
      monthly: b.monthly,
      closedAt: today(),
    },
  });
  await prisma.budget.update({ where: { id }, data: { status: "Aprovado" } });
  revalidatePath(path);
  revalidatePath("/painel/clientes");
  return { ok: true };
}

/** Cria um projeto a partir de um cliente. */
export async function clientToProject(id: string, path: string): Promise<ActionResult> {
  const c = await prisma.client.findUnique({ where: { id } });
  if (!c) return { error: "Cliente não encontrado." };
  await prisma.project.create({
    data: {
      name: `Site — ${c.business || c.name}`,
      clientName: c.name,
      business: c.business,
      nicho: c.nicho,
      plan: c.plan,
      status: "Aguardando informações",
    },
  });
  revalidatePath(path);
  revalidatePath("/painel/projetos");
  return { ok: true };
}
