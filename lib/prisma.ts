import { PrismaClient } from "@prisma/client";

/**
 * Cliente único do Prisma (evita abrir várias conexões durante o hot-reload
 * do `next dev`). Use `import { prisma } from "@/lib/prisma"`.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
