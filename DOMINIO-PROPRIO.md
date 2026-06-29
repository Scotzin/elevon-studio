# Como colocar um domínio próprio (ex.: elevonstudio.com.br)

Hoje o site está em `elevon-studio.vercel.app`. Trocar por um domínio próprio
(`elevonstudio.com.br`) é o que mais passa profissionalismo pro cliente. O
código **já está pronto** — só falta comprar o domínio e configurar.

---

## 1) Comprar o domínio
- **.com.br** → [registro.br](https://registro.br) (~R$ 40/ano). É o oficial do Brasil.
- **.com** → Namecheap, GoDaddy, Cloudflare (~US$ 10–12/ano).
- Sugestão: registrar os dois (`.com.br` e `.com`) e redirecionar um pro outro.

## 2) Adicionar o domínio na Vercel
1. Acesse o projeto **elevon-studio** na Vercel.
2. **Settings → Domains → Add Domain**.
3. Digite `elevonstudio.com.br` e também `www.elevonstudio.com.br`.
4. A Vercel vai mostrar **os registros DNS que você precisa criar** (guarde esses valores — eles mandam).

## 3) Apontar o DNS (no registro.br / registrar)
No painel do registro.br, em **DNS / Editar Zona**, crie o que a Vercel pediu. Normalmente:

| Tipo  | Nome  | Valor (use o que a Vercel mostrar) |
|-------|-------|------------------------------------|
| A     | `@`   | `76.76.21.21`                      |
| CNAME | `www` | `cname.vercel-dns.com`             |

> ⚠️ Sempre use os valores que **aparecem na sua Vercel** — eles podem mudar.
> A propagação leva de alguns minutos até algumas horas. A Vercel emite o
> **HTTPS (SSL) automático** quando o DNS aponta certo.

## 4) Definir o domínio principal
Na Vercel, deixe `elevonstudio.com.br` como **Primary** e configure o `www`
para redirecionar pra ele (ou o contrário — só mantenha um padrão).

## 5) Atualizar a URL do site (1 variável)
Na Vercel: **Settings → Environment Variables → Production**, adicione:

```
NEXT_PUBLIC_SITE_URL = https://elevonstudio.com.br
```

Depois faça um **Redeploy**. Isso atualiza sozinho: SEO, imagem de preview de
link (Open Graph), `sitemap.xml`, `robots.txt` e os dados estruturados.
(Não precisa mexer em código — o `lib/site.ts` já lê essa variável.)

## 6) E-mail profissional (opcional, mas recomendado)
Trocar `elevonstudio.digital@gmail.com` por `contato@elevonstudio.com.br`:
- **Zoho Mail** — plano grátis pra 1 domínio (mais simples/barato).
- **Google Workspace** — pago (~US$ 6/usuário/mês), e-mail no Gmail.
- **Encaminhamento** — alguns registradores oferecem redirecionar
  `contato@seudominio` → seu Gmail (mais simples, sem caixa própria).

Em qualquer opção, será preciso criar os **registros MX** que o provedor de
e-mail indicar, no mesmo painel de DNS do passo 3.

## 7) Depois de tudo no ar
- Atualizar o `email` em `lib/site.ts` (se trocar o e-mail) e fazer deploy.
- Conferir o card de link colando `https://elevonstudio.com.br` no WhatsApp.
- Atualizar a bio do Instagram e materiais com o domínio novo.

---

**Resumo do que já está pronto no código:** `siteConfig.url` lê
`NEXT_PUBLIC_SITE_URL`; tudo que depende da URL (metadados, OG, sitemap,
robots) acompanha automaticamente. Você só precisa dos passos manuais acima.
