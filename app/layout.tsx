import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";

// Fonte Inter (carregada de forma otimizada pelo Next.js)
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/* ==========================================================================
   SEO BASICO  ->  ajuste os textos conforme sua marca
   ========================================================================== */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.brand} | Sites profissionais para o seu negócio`,
    template: `%s | ${siteConfig.brand}`,
  },
  description:
    "Criamos sites modernos, rápidos e personalizados para diversos nichos: barbearias, restaurantes, lojas, clínicas e estéticas, imobiliárias e prestadores de serviço. Mais confiança e mais clientes pelo WhatsApp.",
  keywords: [
    "criação de sites",
    "site profissional para empresas",
    "site para barbearia",
    "site para restaurante",
    "site para loja",
    "site para clínica e estética",
    "site para imobiliária",
    "site para prestador de serviço",
    "landing page",
    "agência de criação de sites",
  ],
  authors: [{ name: siteConfig.brand }],
  creator: siteConfig.brand,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.url,
    siteName: siteConfig.brand,
    title: `${siteConfig.brand} | Sites profissionais para o seu negócio`,
    description:
      "Sites modernos e personalizados que ajudam empresas, profissionais e negócios locais a passar mais confiança e vender mais pelo WhatsApp.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.brand} | Sites profissionais para o seu negócio`,
    description:
      "Sites modernos e personalizados para diversos nichos: barbearias, restaurantes, lojas, clínicas, imobiliárias e mais.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a2540",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Dados estruturados (ajudam o Google a entender o negocio)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.brand,
    description:
      "Equipe de criação de sites profissionais e personalizados para diversos nichos de negócio.",
    founder: {
      "@type": "Person",
      name: siteConfig.personName,
    },
    url: siteConfig.url,
    areaServed: "BR",
    priceRange: "$$",
  };

  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
