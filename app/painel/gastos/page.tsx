import { prisma } from "@/lib/prisma";
import { PageHeader, StatCard } from "@/components/painel/ui";
import CrudManager, { type CrudField } from "@/components/painel/CrudManager";
import {
  EXPENSE_CATEGORIES,
  EXPENSE_RECURRENCE,
  EXPENSE_STATUS,
  brl,
} from "@/lib/painelConfig";

export const dynamic = "force-dynamic";

const fields: CrudField[] = [
  { key: "name", label: "Nome do gasto", type: "text", required: true },
  { key: "category", label: "Categoria", type: "select", options: EXPENSE_CATEGORIES, required: true },
  { key: "amount", label: "Valor", money: true, required: true },
  { key: "recurrence", label: "Tipo (recorrência)", type: "select", options: EXPENSE_RECURRENCE, required: true },
  { key: "status", label: "Status", type: "select", options: EXPENSE_STATUS, required: true },
  { key: "dueDate", label: "Data de vencimento", type: "date" },
  { key: "notes", label: "Observação", type: "textarea", full: true },
];

export default async function GastosPage() {
  const items = await prisma.expense.findMany({ orderBy: [{ category: "asc" }, { createdAt: "asc" }] });

  const mensal = items.reduce(
    (s, e) =>
      s + (e.recurrence === "mensal" ? e.amount : e.recurrence === "anual" ? e.amount / 12 : 0),
    0
  );
  const anual = mensal * 12;
  const unico = items
    .filter((e) => e.recurrence === "único")
    .reduce((s, e) => s + e.amount, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gastos"
        subtitle="Apenas despesas. Gastos anuais entram no custo mensal divididos por 12."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Custo mensal estimado" value={brl(mensal)} icon="Wallet" />
        <StatCard label="Custo anual estimado" value={brl(anual)} icon="TrendingUp" />
        <StatCard label="Gastos únicos" value={brl(unico)} icon="Receipt" />
      </div>

      <CrudManager
        model="expense"
        items={items}
        fields={fields}
        titleKey="name"
        subtitleKeys={["category"]}
        columns={["amount", "recurrence", "dueDate"]}
        statusKey="status"
        statusOptions={EXPENSE_STATUS}
        extraFilter={{ key: "category", options: EXPENSE_CATEGORIES, allLabel: "Todas as categorias" }}
        searchKeys={["name", "category"]}
        newLabel="Novo gasto"
        emptyText="Nenhum gasto cadastrado ainda."
      />
    </div>
  );
}
