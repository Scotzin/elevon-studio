import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/* robots.txt — o Google indexa só a home. Painel, prévias (demos), login e
   API ficam de fora. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/painel", "/previa", "/login", "/api"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
