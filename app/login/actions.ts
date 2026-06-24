"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSessionToken, SESSION_COOKIE } from "@/lib/auth";

export type LoginState = { error?: string };

/** Verifica e-mail/senha, cria a sessão e leva ao /painel. */
export async function login(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Preencha e-mail e senha." };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return { error: "E-mail ou senha incorretos." };
  }

  // Registra o último acesso (mostrado na página Equipe).
  await prisma.user
    .update({ where: { id: user.id }, data: { lastAccessAt: new Date() } })
    .catch(() => {});

  const token = await createSessionToken({
    id: user.id,
    name: user.name,
    role: user.role,
  });

  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 horas
  });

  redirect("/painel");
}
