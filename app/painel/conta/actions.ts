"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export type PwState = { error?: string; success?: string };

/** Troca a senha do usuário logado (confere a senha atual via bcrypt). */
export async function changePassword(_prev: PwState, formData: FormData): Promise<PwState> {
  const user = await getCurrentUser();
  if (!user) return { error: "Sessão expirada. Entre novamente." };

  const current = String(formData.get("current") || "");
  const next = String(formData.get("next") || "");
  const confirm = String(formData.get("confirm") || "");

  if (!current || !next || !confirm) return { error: "Preencha todos os campos." };
  if (next.length < 8) return { error: "A nova senha precisa ter pelo menos 8 caracteres." };
  if (next !== confirm) return { error: "A confirmação não confere com a nova senha." };
  if (next === current) return { error: "A nova senha precisa ser diferente da atual." };

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (!dbUser) return { error: "Usuário não encontrado." };

  const ok = await bcrypt.compare(current, dbUser.passwordHash);
  if (!ok) return { error: "A senha atual está incorreta." };

  const hash = await bcrypt.hash(next, 10);
  await prisma.user.update({ where: { id: user.id }, data: { passwordHash: hash } });

  return { success: "Senha alterada com sucesso!" };
}
