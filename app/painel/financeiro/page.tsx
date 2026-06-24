import { prisma } from "@/lib/prisma";
import { PageHeader, StatCard } from "@/components/painel/ui";
import CrudManager, { type CrudField } from "@/components/painel/CrudManager";
import { CLIENT_PAYMENT_STATUS, PLANS, brl } from "@/lib/painelConfig";

export const dynamic = "force-dynamic";

const fields: CrudField[] = [
  { key: "name", label: "Cliente", type: "text", required: true },
  { key: "plan", label: "Plano", type: "select", options: ["", ...PLANS] },
  { key: "initialValue", label: "Valor inicial", money: true },
  { key: "monthly", label: "Mensalidade", money: true },
  { key: "dueDate", label: "Data de vencimento", type: "date" },
  { key: "paidAt", label: "Data de pagamento", type: "date" },
  { key: "paymentStatus", label: "Status do pagamento", type: "select", options: CLIENT_PAYMENT_STATUS, required: true },
  { key: "notes", label: "Observações", type: "textarea", full: true },
];

export default async function FinanceiroPage() {
  const [clients, expenses] = await Promise.all([
    prisma.client.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.expense.findMany(),
  ]);

  const active = clients.filter(
    (c) => c.siteStatus !== "Cancelado" && c.paymentStatus !== "Cancelado"
  );
  const vendas = clients.length;
  const mensalidadesAtivas = active.filter((c) => (c.monthly || 0) > 0).length;
  const recebidos = clients
    .filter((c) => ["Entrada paga", "Mensalidade paga"].includes(c.paymentStatus))
    .reduce((s, c) => s + (c.initialValue || 0) + (c.monthly || 0), 0);
  const pendentes = clients
    .filter((c) => ["Pendente", "Em atraso"].includes(c.paymentStatus))
    .reduce((s, c) => s + (c.initialValue || 0), 0);
  const receitaRecorrente = active.reduce((s, c) => s + (c.monthly || 0), 0);
  const gastosMensais = expenses.reduce(
    (s, e) =>
      s + (e.recurrence === "mensal" ? e.amount : e.recurrence === "anual" ? e.amount / 12 : 0),
    0
  );
  const lucro = receitaRecorrente > 0 ? receitaRecorrente - gastosMensais : 0;

  const cards = [
    { label: "Vendas fechadas", value: vendas, icon: "BadgeCheck" },
    { label: "Mensalidades ativas", value: mensalidadesAtivas, icon: "Receipt" },
    { label: "Pagamentos recebidos", value: brl(recebidos), icon: "DollarSign" },
    { label: "Pagamentos pendentes", value: brl(pendentes), icon: "Clock" },
    { label: "Receita recorrente mensal", value: brl(receitaRecorrente), icon: "Banknote" },
    { label: "Lucro estimado", value: brl(lucro), icon: "TrendingUp", hint: "Receita recorrente − gastos mensais" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Financeiro"
        subtitle="Receitas, vendas e mensalidades. Os valores vêm dos clientes fechados."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <StatCard key={c.label} label={c.label} value={c.value} icon={c.icon} hint={c.hint} />
        ))}
      </div>

      <CrudManager
        model="client"
        items={clients}
        fields={fields}
        titleKey="name"
        subtitleKeys={["plan"]}
        columns={["initialValue", "monthly", "dueDate"]}
        statusKey="paymentStatus"
        statusOptions={CLIENT_PAYMENT_STATUS}
        searchKeys={["name", "plan"]}
        canCreate={false}
        canDelete={false}
        emptyText="Nenhuma receita registrada ainda. Quando um cliente for fechado, os valores aparecerão aqui automaticamente."
      />
    </div>
  );
}
