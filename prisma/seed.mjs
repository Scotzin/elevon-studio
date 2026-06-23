// Cria/atualiza as contas fixas da equipe. Rodar com: node prisma/seed.mjs
import pkg from "@prisma/client";
import bcrypt from "bcryptjs";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// Senha padrão para o teste (todos os membros). Troque depois.
const PASSWORD = "elevon@2026";

const members = [
  {
    name: "Enzo Tofani Ramos",
    email: "enzo@elevon.studio",
    role: "CEO · Desenvolvimento e Produto Digital",
  },
  { name: "Wiliam", email: "wiliam@elevon.studio", role: "Comercial e Relacionamento" },
  { name: "André", email: "andre@elevon.studio", role: "Design e Marketing" },
  { name: "César", email: "cesar@elevon.studio", role: "Operação e Atendimento" },
];

async function main() {
  const passwordHash = await bcrypt.hash(PASSWORD, 10);
  for (const m of members) {
    await prisma.user.upsert({
      where: { email: m.email },
      update: { name: m.name, role: m.role, passwordHash },
      create: { ...m, passwordHash },
    });
    console.log("conta ok:", m.email);
  }
  const total = await prisma.user.count();
  console.log(`\n${total} contas no banco. Senha de todas: ${PASSWORD}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
