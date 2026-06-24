import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/painel/ui";
import CrudManager, { type CrudField } from "@/components/painel/CrudManager";
import { budgetToClient } from "@/lib/crudActions";
import { BUDGET_STATUS, PLANS, NICHOS, budgetWaMessage } from "@/lib/painelConfig";

export const dynamic = "force-dynamic";

const fields: CrudField[] = [
  { key: "clientName", label: "Nome do cliente", type: "text" },
  { key: "business", label: "Nome do negócio", type: "text" },
  { key: "nicho", label: "Nicho", type: "select", options: ["", ...NICHOS] },
  { key: "wants", label: "O que o cliente quer", type: "textarea", full: true },
  { key: "plan", label: "Plano sugerido", type: "select", options: PLANS, required: true },
  { key: "initialValue", label: "Valor inicial", money: true },
  { key: "monthly", label: "Mensalidade", money: true },
  { key: "status", label: "Status", type: "select", options: BUDGET_STATUS, required: true },
  {
    key: "waMessage",
    label: "Mensagem sugerida (deixe em branco para gerar automática)",
    type: "textarea",
    full: true,
  },
  { key: "notes", label: "Observações", type: "textarea", full: true },
];

export default async function OrcamentosPage() {
  const raw = await prisma.budget.findMany({ orderBy: { createdAt: "desc" } });
  // Garante uma mensagem copiável: usa a personalizada ou gera pela do plano.
  const items = raw.map((b) => ({
    ...b,
    waMessage: b.waMessage || budgetWaMessage(b.plan, b.initialValue, b.monthly),
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orçamentos"
        subtitle="Orçamentos em preparação, enviados ou em negociação. A mensagem do WhatsApp é gerada conforme o plano."
      />
      <CrudManager
        model="budget"
        items={items}
        fields={fields}
        titleKey="clientName"
        titleFallbackKey="business"
        subtitleKeys={["nicho", "plan"]}
        columns={["plan", "initialValue", "monthly"]}
        statusKey="status"
        statusOptions={BUDGET_STATUS}
        searchKeys={["clientName", "business", "nicho", "plan"]}
        copyKey="waMessage"
        newLabel="Novo orçamento"
        emptyText="Nenhum orçamento ainda. Crie um quando o cliente pedir preço."
        convert={{ label: "Virar cliente", whenStatus: "Aprovado", action: budgetToClient }}
      />
    </div>
  );
}
