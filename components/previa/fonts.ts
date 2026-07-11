import {
  Oswald,
  Playfair_Display,
  DM_Serif_Display,
  Cormorant_Garamond,
  Sora,
  Poppins,
} from "next/font/google";

/* ==========================================================================
   FONTES DE EXIBIÇÃO DAS PRÉVIAS (uma por nicho)
   --------------------------------------------------------------------------
   Cada nicho ganha uma tipografia de título própria — é o que dá "voz"
   diferente para cada demo (uma barbearia não escreve como uma clínica de
   estética). São carregadas só nas rotas de prévia (este módulo só é
   importado lá), então não pesam no site de marketing.

   Uso: no dispatcher da prévia aplicamos a `.variable` do nicho ao wrapper,
   e no layout usamos a classe utilitária `font-<nicho>` (ver tailwind.config).
   ========================================================================== */

// Barbearia — condensada, forte, masculina (caixa-alta).
export const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-barbearia",
});

// Restaurante — serifada clássica e acolhedora (apetite).
export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-restaurante",
});

// Loja de roupas — serifada de alto contraste, editorial de moda.
export const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-loja",
});

// Estética — serifada delicada e elegante (spa).
export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-estetica",
});

// Imobiliária — grotesca moderna e estruturada (portal/confiança).
export const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  variable: "--font-imobiliaria",
});

// Serviços — geométrica amigável e direta.
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  variable: "--font-servicos",
});

/* Mapa layout → className da fonte (aplicado ao wrapper da prévia). */
export const fontByLayout: Record<string, string> = {
  barbearia: oswald.variable,
  restaurante: playfair.variable,
  loja: dmSerif.variable,
  estetica: cormorant.variable,
  imobiliaria: sora.variable,
  servicos: poppins.variable,
};
