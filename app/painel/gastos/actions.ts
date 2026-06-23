"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

function parseAmount(value: FormDataEntryValue | null): number {
  const n = parseFloat(String(value ?? "0").replace(",", "."));
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

/** Adiciona um novo gasto. */
export async function addExpense(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  if (!name) return;
  await prisma.expense.create({
    data: {
      name,
      category: String(formData.get("category") || "Outros"),
      amount: parseAmount(formData.get("amount")),
      recurrence: String(formData.get("recurrence") || "mensal"),
    },
  });
  revalidatePath("/painel/gastos");
}

/** Atualiza o valor de um gasto. */
export async function updateExpense(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.expense.update({
    where: { id },
    data: { amount: parseAmount(formData.get("amount")) },
  });
  revalidatePath("/painel/gastos");
}

/** Remove um gasto. */
export async function deleteExpense(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.expense.delete({ where: { id } });
  revalidatePath("/painel/gastos");
}
