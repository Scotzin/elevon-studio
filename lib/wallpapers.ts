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
  // { file: "elevon-azul.jpg", name: "Elevon Azul", size: "1920×1080" },
  // { file: "elevon-escuro.jpg", name: "Elevon Escuro", size: "1920×1080" },
];
