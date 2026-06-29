# Prévia personalizada (com o nome do prospect)

Transforme cada abordagem num "olha o SEU site": é só adicionar `?nome=` no link
da prévia. O nome do negócio aparece no cabeçalho, no "Sobre", nos botões, no
rodapé — **e também no card de preview do link** quando você cola no WhatsApp.

## Como montar o link

```
/previa/<nicho>?nome=<nome do negócio>
```

Exemplos:
```
https://elevon-studio.vercel.app/previa/barbearia?nome=Barbearia do João
https://elevon-studio.vercel.app/previa/restaurante?nome=Cantina da Nonna&cidade=São Paulo
https://elevon-studio.vercel.app/previa/loja-roupas?nome=Loja da Maria&plano=premium
```

- **`nome`** (opcional): nome do negócio do prospect.
- **`cidade`** (opcional): aparece no bloco de contato/localização.
- **`plano`** (opcional): `basico`, `profissional` ou `premium` (padrão: profissional).
  Ao trocar o plano na barra do topo, o `?nome` é preservado.

Nichos disponíveis: `barbearia`, `restaurante`, `loja-roupas`, `estetica`,
`imobiliaria`, `servicos`.

## Dicas
- Espaços na URL viram `%20` (ou `+`). Ao colar no WhatsApp, ele encoda sozinho —
  pode digitar com espaço mesmo que funciona.
- Mande o link já no plano que faz sentido pro prospect (ex.: `&plano=premium`
  pra impressionar, `&plano=basico` pra quem quer o mais simples).
- O card de preview do WhatsApp pode demorar a atualizar por causa de cache —
  em link novo já vem com o nome certo.
