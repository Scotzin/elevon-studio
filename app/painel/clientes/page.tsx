import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/painel/ui";
import CrudManager, { type CrudField } from "@/components/painel/CrudManager";
import { clientToProject } from "@/lib/crudActions";
import {
  CLIENT_PAYMENT_STATUS,
  CLIENT_SITE_STATUS,
  PLANS,
  NICHOS,
} from "@/lib/painelConfig";

export const dynamic = "force-dynamic";

const fields: CrudField[] = [
  { key: "name", label: "Nome do cliente", type: "text", required: true },
  { key: "business", label: "Nome do negócio", type: "text" },
  { key: "nicho", label: "Nicho", type: "select", options: ["", ...NICHOS] },
  { key: "whatsapp", label: "WhatsApp", type: "tel" },
  { key: "email", label: "E-mail", type: "email" },
  { key: "plan", label: "Plano contratado", type: "select", options: ["", ...PLANS] },
  { key: "initialValue", label: "Valor inicial", money: true },
  { key: "monthly", label: "Mensalidade", money: true },
  { key: "closedAt", label: "Data de fechamento", type: "date" },
  { key: "paymentStatus", label: "Status do pagamento", type: "select", options: CLIENT_PAYMENT_STATUS },
  { key: "siteStatus", label: "Status do site", type: "select", options: CLIENT_SITE_STATUS, required: true },
  { key: "siteUrl", label: "Link do site", type: "url" },
  { key: "notes", label: "Observações", type: "textarea", full: true },
];

export default async function ClientesPage() {
  const items = await prisma.client.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clientes"
        subtitle="Clientes fechados (de leads/orçamentos) e cadastros manuais."
      />
      <CrudManager
        model="client"
        items={items}
        fields={fields}
        titleKey="name"
        subtitleKeys={["business", "nicho"]}
        columns={["plan", "monthly", "paymentStatus"]}
        statusKey="siteStatus"
        statusOptions={CLIENT_SITE_STATUS}
        searchKeys={["name", "business", "email", "whatsapp", "nicho", "plan"]}
        linkKeys={["siteUrl"]}
        newLabel="Novo cliente"
        emptyText="Nenhum cliente ainda. Feche um lead/orçamento ou cadastre manualmente."
        convert={{ label: "Gerar projeto", action: clientToProject }}
      />
    </div>
  );
}
