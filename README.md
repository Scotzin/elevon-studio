# Elevon Studio — Landing page

Landing page profissional da **Elevon Studio**, marca de criação de sites para pequenos negócios.
Construída com **Next.js 14 (App Router)** + **Tailwind CSS** + **TypeScript**, pronta para publicar na **Vercel**.

---

## 🚀 Como rodar no seu computador

```bash
npm install      # instala as dependências (só na primeira vez)
npm run dev      # inicia o site em http://localhost:3000
```

Para gerar a versão de produção:

```bash
npm run build
npm run start
```

---

## ✏️ Onde editar cada coisa

**Quase tudo fica em um único arquivo:** [`lib/site.ts`](lib/site.ts).
Abra ele e troque os textos/links. O site inteiro se atualiza sozinho.

| O que mudar | Onde |
| --- | --- |
| 📱 **Número do WhatsApp** | `lib/site.ts` → `whatsappNumber` (formato: `5511999999999`) |
| 📸 **Link do Instagram** | `lib/site.ts` → `instagram` |
| 🏷️ **Nome da marca** | `lib/site.ts` → `brand` |
| 🧩 **Modelos (nichos)** | `lib/site.ts` → `models` (descrição, recursos, link de prévia) |
| ⭐ **Textos dos feedbacks** | `lib/site.ts` → `testimonials` |
| 💲 **Valores dos planos** | `lib/site.ts` → `pricing` |
| ❓ **Perguntas do FAQ** | `lib/site.ts` → `faq` |
| 🪜 **Passos do "Como funciona"** | `lib/site.ts` → `steps` |
| 🖼️ **Foto / painel da marca** | `components/About.tsx` (instruções comentadas no arquivo) |
| 🟦 **Logo (monograma ES + nome)** | `components/Logo.tsx` |

> Os comentários dentro de cada arquivo mostram exatamente onde trocar.

### Colocar uma foto no lugar do painel da marca
Hoje a seção "Quem sou eu" mostra um painel de marca (monograma **ES** + nome).
Para usar uma foto no lugar:
1. Coloque a foto na pasta `public/` (ex.: `public/enzo.jpg`).
2. Em `components/About.tsx`, siga o comentário `IDENTIDADE VISUAL (no lugar da foto)` e substitua o bloco por:
   ```tsx
   <img src="/enzo.jpg" alt="Enzo Tofani Ramos"
        className="aspect-[4/5] w-full rounded-3xl object-cover shadow-soft-lg" />
   ```

### Usar o arquivo de imagem da logo (opcional)
A logo é recriada em código em `components/Logo.tsx` (fica nítida e leve).
Se quiser usar o arquivo de imagem: salve em `public/logo.png` e troque `<BrandMark />`
por `<img src="/logo.png" alt="Elevon Studio" className="h-9 w-auto" />`.

### Adicionar a prévia de um modelo
No `lib/site.ts`, dentro de `models`, preencha o campo `preview` com o link do site publicado.
Se ficar vazio (`""`), o botão **"Ver prévia"** simplesmente não aparece.

---

## ☁️ Publicar na Vercel

1. Suba este projeto para um repositório no GitHub.
2. Acesse [vercel.com](https://vercel.com), faça login e clique em **Add New → Project**.
3. Selecione o repositório. A Vercel detecta o Next.js automaticamente.
4. Clique em **Deploy**. Pronto — o site fica no ar com HTTPS e domínio gratuito.

Depois é só conectar um domínio próprio (ex.: `seunegocio.com.br`) nas configurações da Vercel.

---

## 🎨 Paleta de cores

Definida em [`tailwind.config.ts`](tailwind.config.ts):

- `deep` — azul profundo (cor principal)
- `accent` — azul vivo (destaques e links)
- `signal` — vermelho (usado de forma muito pontual)
- cinzas: escala `slate` padrão do Tailwind

---

## 📁 Estrutura

```
enzo-sites/
├── app/
│   ├── layout.tsx      # SEO, fonte, dados estruturados
│   ├── page.tsx        # monta todas as seções na ordem
│   ├── globals.css     # estilos globais
│   └── icon.svg        # favicon
├── components/         # cada seção é um componente
│   ├── Header.tsx  Hero.tsx  Trust.tsx  Models.tsx
│   ├── About.tsx  Feedbacks.tsx  HowItWorks.tsx
│   ├── Pricing.tsx  FAQ.tsx  FinalCTA.tsx  Footer.tsx
│   ├── WhatsappFloat.tsx  SiteMockup.tsx  Reveal.tsx
│   ├── Logo.tsx        # monograma ES + wordmark Elevon Studio
│   ├── ui.tsx          # botões, container, títulos, ícone do WhatsApp
│   └── Icon.tsx        # mapa de ícones (lucide-react)
└── lib/
    └── site.ts         # 👈 CONTEÚDO E CONFIGURAÇÃO (edite aqui)
```

© Enzo Tofani Ramos
