IMAGENS DOS NICHOS — Elevon Studio
===================================

Imagens usadas na seção "Modelos por nicho" da página inicial.
Os nomes precisam ser EXATAMENTE estes (tudo minúsculo, extensão .png):

  barbearia.png       -> Barbearias
  restaurante.png     -> Restaurantes e Pizzarias
  loja-roupas.png     -> Lojas de roupas
  estetica.png        -> Clínicas e Estéticas
  imobiliaria.png     -> Imobiliárias
  servicos.png        -> Prestadores de serviço

ATENÇÃO ao trocar/adicionar imagens no Windows:
- O Windows costuma "ocultar extensões conhecidas". Se você renomear um
  arquivo "foto.png" para "barbearia.png" com isso ligado, pode acabar
  criando "barbearia.png.png" (extensão dupla) e a imagem NÃO aparece.
- Garanta que o nome final é só "barbearia.png" (uma extensão só).

Recomendações:
- Proporção aproximada 16:10.
- Para web, o ideal é otimizar (PNG de foto fica pesado; .jpg ou .webp
  abaixo de ~300 KB carregam bem mais rápido). As imagens atuais são PNG.

Enquanto um arquivo não existir, o card mostra automaticamente um fundo
em gradiente azul com o ícone do nicho (fallback), então o layout NUNCA
quebra.

Para usar outra extensão (ex.: .jpg ou .webp) ou outro caminho, edite o
campo "image" de cada nicho em: lib/site.ts (seção 6).
