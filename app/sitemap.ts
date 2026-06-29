import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/* Sitemap — só as páginas públicas reais. As prévias (/previa/*) são
   demonstrações com dados fictícios e ficam fora do índice (noindex). */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
