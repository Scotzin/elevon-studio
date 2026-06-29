export type Wallpaper = {
  file: string; // arquivo dentro de /public/wallpapers/
  name: string; // nome exibido na página
  size?: string; // resolução (opcional), ex.: "1920×1080"
};

/* ==========================================================================
   WALLPAPERS DA ELEVON (área da equipe → aba Wallpapers)
   --------------------------------------------------------------------------
   Como adicionar um wallpaper:
   1) Coloque a imagem em /public/wallpapers/ (ex.: elevon-azul.jpg)
   2) Adicione uma linha aqui com o arquivo + nome.
   (ou só mande os arquivos que a gente cadastra)
   ========================================================================== */
export const wallpapers: Wallpaper[] = [
  { file: "elevon-ondas.png", name: "Elevon Ondas", size: "1920×1080" },
  { file: "elevon-luz.png", name: "Elevon Luz", size: "1920×1080" },
  { file: "elevon-arcos.png", name: "Elevon Arcos", size: "1920×1080" },
  { file: "elevon-horizonte.png", name: "Elevon Horizonte", size: "1920×1080" },
  { file: "elevon-neon.png", name: "Elevon Neon", size: "1920×1080" },
  { file: "elevon-metal.png", name: "Elevon Metal", size: "1920×1080" },
  { file: "elevon-navy.png", name: "Elevon Navy", size: "1920×1080" },
  { file: "elevon-papel.png", name: "Elevon Papel", size: "1920×1080" },
  { file: "elevon-claro.png", name: "Elevon Claro", size: "1920×1080" },
  { file: "elevon-neve.png", name: "Elevon Neve", size: "1920×1080" },
];
