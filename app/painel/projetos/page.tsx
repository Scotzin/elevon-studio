import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/painel/ui";
import CrudManager, { type CrudField } from "@/components/painel/CrudManager";
import { PROJECT_STATUS, PLANS, NICHOS } from "@/lib/painelConfig";

export const dynamic = "force-dynamic";

const fields: CrudField[] = [
  { key: "name", label: "Nome do projeto", type: "text", required: true },
  { key: "clientName", label: "Nome do cliente", type: "text" },
  { key: "business", label: "Nome do negócio", type: "text" },
  { key: "nicho", label: "Nicho", type: "select", options: ["", ...NICHOS] },
  { key: "plan", label: "Plano", type: "select", options: ["", ...PLANS] },
  { key: "status", label: "Status do projeto", type: "select", options: PROJECT_STATUS, required: true },
  { key: "previewUrl", label: "Link da prévia", type: "url" },
  { key: "finalUrl", label: "Link final do site", type: "url" },
  { key: "notes", label: "Observações", type: "textarea", full: true },
];

export default async function ProjetosPage() {
  const items = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projetos"
        subtitle="Andamento dos sites, organizados por status."
      />
      <CrudManager
        model="project"
        items={items}
        fields={fields}
        titleKey="name"
        subtitleKeys={["clientName", "business"]}
        columns={["nicho", "plan"]}
        statusKey="status"
        statusOptions={PROJECT_STATUS}
        searchKeys={["name", "clientName", "business", "nicho"]}
        linkKeys={["previewUrl", "finalUrl"]}
        newLabel="Novo projeto"
        emptyText="Nenhum projeto ainda. Crie manualmente ou gere a partir de um cliente."
        kanban
      />
    </div>
  );
}
