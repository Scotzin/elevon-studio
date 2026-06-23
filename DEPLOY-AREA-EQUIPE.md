# Publicar a Área da Equipe (login + painel) com PostgreSQL

A branch `feature/area-equipe` traz a área interna (login + painel de análises).
O site de marketing continua estático; só `/login`, `/painel` e `/api/track`
usam o banco. Siga os passos abaixo para colocar no ar.

## 1) Criar o banco PostgreSQL (grátis)

**Opção A — Vercel (mais integrada):**
1. Vercel → projeto `elevon-studio` → aba **Storage** → **Create Database** → **Postgres** (Neon).
2. Conecte ao projeto. A Vercel cria sozinha as variáveis `DATABASE_URL`/`POSTGRES_*`.

**Opção B — Neon direto (neon.tech):**
1. Crie um projeto → copie a **connection string** (com `?sslmode=require`).
2. Use-a como `DATABASE_URL`.

## 2) Variáveis de ambiente na Vercel
Em **Settings → Environment Variables** (ambiente Production e Preview):

| Variável        | Valor                                                        |
|-----------------|--------------------------------------------------------------|
| `DATABASE_URL`  | connection string do Postgres (se usou a Opção A, já existe) |
| `AUTH_SECRET`   | valor aleatório longo (ex.: `openssl rand -hex 32`)          |
| `SEED_PASSWORD` | senha inicial forte das contas da equipe                     |

## 3) Criar as tabelas e as contas (uma vez)
No seu PC, com a `DATABASE_URL` do Postgres no `.env` local:

```bash
npx prisma db push     # cria as tabelas no Postgres
node prisma/seed.mjs    # cria as 4 contas (use SEED_PASSWORD p/ definir a senha)
```

## 4) Publicar
Faça o merge da branch na `main` e dê push — a Vercel publica sozinha:

```bash
git checkout main
git merge feature/area-equipe
git push origin main
```

> Importante: configure as variáveis (passo 2) ANTES do deploy, senão o build
> da Vercel falha (o `prisma generate` precisa de `DATABASE_URL` definida).

## Acesso
- Site: `/` (marketing, igual antes)
- Login da equipe: `/login`  →  painel em `/painel`
- Contas: `enzo@`, `wiliam@`, `andre@`, `cesar@` + `elevon.studio`
