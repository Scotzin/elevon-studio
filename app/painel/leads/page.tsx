import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/painel/ui";
import CrudManager, { type CrudField } from "@/components/painel/CrudManager";
import { leadToClient } from "@/lib/crudActions";
import { LEAD_STATUS, PLANS, NICHOS } from "@/lib/painelConfig";

export const dynamic = "force-dynamic";

const fields: CrudField[] = [
  { key: "fullName", label: "Nome completo", type: "text" },
  { key: "whatsapp", label: "WhatsApp", type: "tel" },
  { key: "email", label: "E-mail", type: "email" },
  { key: "nicho", label: "Nicho de interesse", type: "select", options: ["", ...NICHOS] },
  { key: "plan", label: "Plano de interesse", type: "select", options: ["", ...PLANS] },
  { key: "source", label: "Origem", type: "text", placeholder: "site, instagram, utm…" },
  { key: "page", label: "Página", type: "text" },
  { key: "status", label: "Status", type: "select", options: LEAD_STATUS, required: true },
  { key: "notes", label: "Observações", type: "textarea", full: true },
];

export default async function LeadsPage() {
  const items = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leads"
        subtitle="Cada clique no WhatsApp do site cria um lead. Complete os dados após a conversa."
      />
      <CrudManager
        model="lead"
        items={items}
        fields={fields}
        titleKey="fullName"
        titleFallbackKey="nicho"
        subtitleKeys={["whatsapp", "email"]}
        columns={["nicho", "plan", "source", "page"]}
        statusKey="status"
        statusOptions={LEAD_STATUS}
        searchKeys={["fullName", "whatsapp", "email", "nicho"]}
        newLabel="Novo lead"
        emptyText="Nenhum lead registrado ainda. Eles aparecem automaticamente quando alguém clica no WhatsApp do site."
        convert={{ label: "Virar cliente", whenStatus: "Fechado", action: leadToClient }}
      />
    </div>
  );
}
