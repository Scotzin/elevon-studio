import { siteConfig } from "@/lib/site";

/* ==========================================================================
   AVISO DE LEAD (notificação em tempo real)
   --------------------------------------------------------------------------
   Quando cai um lead (formulário ou clique no WhatsApp), avisa a equipe.
   Tudo OPCIONAL e à prova de falha: se as variáveis de ambiente não estiverem
   configuradas, simplesmente não faz nada (e nunca quebra o fluxo do lead).

   Configure nas env vars da Vercel (veja NOTIFICACOES-LEAD.md):
   - TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID  → manda no Telegram (recomendado)
   - LEAD_WEBHOOK_URL                       → POST genérico (Zapier/Make/Discord)
   ========================================================================== */

type LeadNotify = {
  fullName?: string | null;
  whatsapp?: string | null;
  nicho?: string | null;
  plan?: string | null;
  notes?: string | null;
  source?: string | null;
  page?: string | null;
};

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const digits = (s: string) => s.replace(/\D/g, "");

export async function notifyNewLead(lead: LeadNotify): Promise<void> {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chat = process.env.TELEGRAM_CHAT_ID;
    const hook = process.env.LEAD_WEBHOOK_URL;
    if ((!token || !chat) && !hook) return; // nada configurado

    const tasks: Promise<unknown>[] = [];

    if (token && chat) {
      const lines: string[] = ["🔥 <b>Novo lead na Elevon!</b>"];
      if (lead.fullName) lines.push(`👤 ${esc(lead.fullName)}`);
      if (lead.whatsapp) {
        const d = digits(lead.whatsapp);
        lines.push(`📱 ${esc(lead.whatsapp)}${d ? ` — <a href="https://wa.me/${d}">responder</a>` : ""}`);
      }
      if (lead.nicho) lines.push(`🏷️ ${esc(lead.nicho)}`);
      if (lead.plan) lines.push(`💼 plano ${esc(lead.plan)}`);
      if (lead.notes) lines.push(`🗒️ ${esc(lead.notes)}`);
      lines.push(`📍 origem: ${esc(lead.source || "site")}${lead.page ? ` (${esc(lead.page)})` : ""}`);
      lines.push(`➡️ <a href="${siteConfig.url}/painel/leads">ver no painel</a>`);

      tasks.push(
        fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chat,
            text: lines.join("\n"),
            parse_mode: "HTML",
            disable_web_page_preview: true,
          }),
        })
      );
    }

    if (hook) {
      tasks.push(
        fetch(hook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event: "new_lead", ...lead }),
        })
      );
    }

    await Promise.allSettled(tasks);
  } catch {
    // Notificação nunca pode derrubar o registro do lead.
  }
}
