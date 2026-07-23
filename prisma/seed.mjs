// Cria/atualiza as contas fixas da equipe. Rodar com: node prisma/seed.mjs
import pkg from "@prisma/client";
import bcrypt from "bcryptjs";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// Senha inicial dos membros. Em produção, defina SEED_PASSWORD com um valor
// forte antes de rodar o seed; localmente cai no padrão de teste.
const PASSWORD = process.env.SEED_PASSWORD || "elevon@2026";

const members = [
  {
    name: "Enzo Tofani Ramos",
    email: "enzo@elevon.studio",
    role: "CEO · Desenvolvimento e Produto Digital",
    accessLevel: "CEO / Admin",
  },
  { name: "Wiliam Ramos", email: "wiliam@elevon.studio", role: "Comercial e Relacionamento", accessLevel: "Sócio / Comercial" },
];

// Gastos iniciais (valores em R$ — edite depois pelo painel). Só são criados
// se a tabela de gastos estiver vazia.
const initialExpenses = [
  { name: "ChatGPT", category: "IA", amount: 0, recurrence: "mensal" },
  { name: "Claude", category: "IA", amount: 0, recurrence: "mensal" },
  { name: "Google Ads", category: "Anúncios", amount: 0, recurrence: "mensal" },
  { name: "Facebook Ads", category: "Anúncios", amount: 0, recurrence: "mensal" },
  { name: "Instagram Ads", category: "Anúncios", amount: 0, recurrence: "mensal" },
  { name: "Domínio", category: "Domínio", amount: 0, recurrence: "anual" },
  { name: "MEI (DAS)", category: "Impostos", amount: 150, recurrence: "mensal" },
];

async function main() {
  const passwordHash = await bcrypt.hash(PASSWORD, 10);
  for (const m of members) {
    await prisma.user.upsert({
      where: { email: m.email },
      update: { name: m.name, role: m.role, accessLevel: m.accessLevel, passwordHash },
      create: { ...m, passwordHash },
    });
    console.log("conta ok:", m.email);
  }
  const totalUsers = await prisma.user.count();
  console.log(`\n${totalUsers} contas no banco. Senha de todas: ${PASSWORD}`);

  // Gastos: só cria os iniciais se a tabela ainda estiver vazia.
  const expenseCount = await prisma.expense.count();
  if (expenseCount === 0) {
    await prisma.expense.createMany({ data: initialExpenses });
    console.log(`${initialExpenses.length} gastos iniciais criados.`);
  } else {
    console.log(`${expenseCount} gastos já existem (não recriados).`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
