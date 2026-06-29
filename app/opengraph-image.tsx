import { ImageResponse } from "next/og";

/* ==========================================================================
   IMAGEM DE PREVIEW DE LINK (Open Graph / Twitter) — MARCA ELEVON
   --------------------------------------------------------------------------
   É o card que aparece quando alguém cola o link do site no WhatsApp,
   Instagram, etc. O Next usa este arquivo automaticamente como og:image
   e twitter:image de todas as rotas que não têm a sua própria.
   ========================================================================== */
export const runtime = "edge";
export const alt = "Elevon Studio — Sites profissionais para o seu negócio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const nichos = ["Barbearias", "Restaurantes", "Lojas", "Estética", "Imobiliárias", "Serviços"];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg, #06182b 0%, #0a2540 55%, #102f52 100%)",
          padding: "80px",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* brilho de destaque */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 460,
            height: 460,
            borderRadius: 460,
            background: "#2563eb",
            opacity: 0.35,
            filter: "blur(40px)",
            display: "flex",
          }}
        />

        {/* logo + marca */}
        <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
          <div
            style={{
              display: "flex",
              width: 104,
              height: 104,
              borderRadius: 26,
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 56,
              fontWeight: 800,
              letterSpacing: -2,
            }}
          >
            ES
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 56, fontWeight: 800, letterSpacing: -1 }}>Elevon Studio</div>
            <div style={{ fontSize: 26, color: "#8badd1" }}>Criação de sites profissionais</div>
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", marginTop: 52, fontSize: 46, fontWeight: 700, lineHeight: 1.15, maxWidth: 980 }}>
          Sites que passam confiança e vendem mais pelo WhatsApp.
        </div>

        {/* chips de nicho */}
        <div style={{ display: "flex", gap: 12, marginTop: 44 }}>
          {nichos.map((n) => (
            <div
              key={n}
              style={{
                display: "flex",
                padding: "10px 18px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.16)",
                color: "#dbe7f2",
                fontSize: 22,
              }}
            >
              {n}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
