import { ImageResponse } from "next/og";

/* ==========================================================================
   RENDER COMPARTILHADO DA OG DE PRÉVIA (card de preview de link)
   --------------------------------------------------------------------------
   Usado por:
   - app/previa/[nicho]/opengraph-image.tsx  (card padrão do nicho)
   - app/api/og/route.ts                     (card PERSONALIZADO via ?nome=)
   ========================================================================== */
export const OG_SIZE = { width: 1200, height: 630 };

export function previaOgResponse({
  accent,
  business,
  nicho,
}: {
  accent: string;
  business: string;
  nicho: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg, #06182b 0%, #0a2540 60%)",
          padding: "80px",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 460,
            height: 460,
            borderRadius: 460,
            background: accent,
            opacity: 0.4,
            filter: "blur(40px)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            padding: "10px 20px",
            borderRadius: 999,
            background: accent,
            color: "#ffffff",
            fontSize: 24,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          Prévia de site
        </div>

        <div style={{ display: "flex", marginTop: 36, fontSize: 84, fontWeight: 800, letterSpacing: -2, lineHeight: 1 }}>
          {business}
        </div>

        <div style={{ display: "flex", marginTop: 16, fontSize: 34, color: "#8badd1" }}>Modelo de site para {nicho}</div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 56 }}>
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            ES
          </div>
          <div style={{ display: "flex", gap: 8, fontSize: 28, color: "#dbe7f2" }}>
            <span>Feito pela</span>
            <span style={{ fontWeight: 700, color: "#ffffff" }}>Elevon Studio</span>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
