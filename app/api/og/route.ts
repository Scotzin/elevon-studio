import { previaDemos } from "@/lib/previaDemos";
import { previaOgResponse } from "@/lib/og";

/* ==========================================================================
   OG PERSONALIZADA — card de preview de link com o NOME do prospect.
   Ex.: /api/og?nicho=barbearia&nome=Barbearia%20do%20João
   Usada pelo generateMetadata da prévia quando o link tem ?nome=.
   ========================================================================== */
export const runtime = "edge";

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const nichoSlug = searchParams.get("nicho") || "";
  const demo = previaDemos[nichoSlug];
  const nome = (searchParams.get("nome") || "").trim().slice(0, 40);

  return previaOgResponse({
    accent: demo?.accent || "#2563eb",
    business: nome || demo?.business || "Elevon Studio",
    nicho: demo?.nicho || "negócios",
  });
}
