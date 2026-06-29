# Aviso de lead na hora

Sempre que cair um lead (pelo formulário do site ou por um clique no WhatsApp),
a equipe pode ser avisada na hora. É **opcional**: sem configurar nada, o lead
continua sendo gravado no painel normalmente — só não dispara aviso.

## Opção recomendada: Telegram (grátis, instantâneo)

1. No Telegram, fale com **@BotFather** → envie `/newbot` → escolha um nome e um
   usuário pro bot → copie o **token** que ele te dá (algo como `123456:ABC-...`).
2. Crie um **grupo** (ex.: "Leads Elevon") e **adicione o seu bot** nele. Mande
   qualquer mensagem no grupo.
3. Pegue o **chat id**: abra no navegador
   `https://api.telegram.org/bot<SEU_TOKEN>/getUpdates`
   e procure `"chat":{"id":-100......}` — esse número (com o sinal) é o chat id.
4. Na **Vercel → Settings → Environment Variables (Production)** adicione:
   ```
   TELEGRAM_BOT_TOKEN = (o token do passo 1)
   TELEGRAM_CHAT_ID   = (o id do passo 3)
   ```
5. **Redeploy**. Pronto! Cada lead novo chega no grupo com um botão **responder**
   (abre o WhatsApp do lead) e um link pro painel.

## Opção alternativa: webhook genérico

Para integrar com Zapier, Make, Discord, n8n, etc., defina:
```
LEAD_WEBHOOK_URL = https://...
```
Cada lead vira um `POST` JSON `{ "event": "new_lead", fullName, whatsapp, nicho, plan, notes, source, page }`.
Pode usar junto com o Telegram (os dois disparam).

> Dica: comece só com o Telegram — é o mais rápido de configurar e já resolve.
> Quanto mais rápido você responde um lead, maior a chance de fechar.
