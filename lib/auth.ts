import { SignJWT, jwtVerify } from "jose";

/* ==========================================================================
   AUTENTICAÇÃO (sessão via JWT em cookie) — SEM dependências de Node/Prisma,
   para poder ser usada também no middleware (edge runtime).
   ========================================================================== */

export const SESSION_COOKIE = "elevon_session";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "dev-secret-troque-isto"
);

export type SessionUser = { id: string; name: string; role: string };

/** Cria o token de sessão assinado (válido por 8h). */
export async function createSessionToken(user: SessionUser): Promise<string> {
  return await new SignJWT({ name: user.name, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secret);
}

/** Verifica o token e devolve o usuário, ou null se inválido/expirado. */
export async function verifySessionToken(
  token: string
): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    if (!payload.sub) return null;
    return {
      id: String(payload.sub),
      name: String((payload as Record<string, unknown>).name ?? ""),
      role: String((payload as Record<string, unknown>).role ?? ""),
    };
  } catch {
    return null;
  }
}
