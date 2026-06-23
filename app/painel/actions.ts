"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE } from "@/lib/auth";

/** Encerra a sessão e volta para o login. */
export async function logout() {
  cookies().delete(SESSION_COOKIE);
  redirect("/login");
}
