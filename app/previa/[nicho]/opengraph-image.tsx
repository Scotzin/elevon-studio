import { previaDemos } from "@/lib/previaDemos";
import { previaOgResponse, OG_SIZE } from "@/lib/og";

/* Card de preview de link padrão de cada prévia (sem personalização). */
export const runtime = "edge";
export const alt = "Prévia de site — Elevon Studio";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image({ params }: { params: { nicho: string } }) {
  const demo = previaDemos[params.nicho];
  return previaOgResponse({
    accent: demo?.accent || "#2563eb",
    business: demo?.business || "Elevon Studio",
    nicho: demo?.nicho || "negócios",
  });
}
