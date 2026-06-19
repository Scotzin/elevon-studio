import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Trust from "@/components/Trust";
import Models from "@/components/Models";
import About from "@/components/About";
import Feedbacks from "@/components/Feedbacks";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import WhatsappFloat from "@/components/WhatsappFloat";

/* ==========================================================================
   PAGINA PRINCIPAL (landing page de uma pagina so)
   A ordem das secoes esta listada abaixo, de cima para baixo.
   ========================================================================== */
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />          {/* 1. Primeira dobra + mockup */}
        <Trust />         {/* 2. Autoridade e confianca */}
        <Models />        {/* 3. Vitrine de modelos por nicho */}
        <About />         {/* 4. Quem sou eu */}
        <Feedbacks />     {/* 5. Depoimentos */}
        <HowItWorks />    {/* 6. Passo a passo */}
        <Pricing />       {/* 7. Planos e precos */}
        <FAQ />           {/* 8. Perguntas frequentes */}
        <FinalCTA />      {/* 9. Chamada final */}
      </main>
      <Footer />          {/* 10. Rodape */}
      <WhatsappFloat />   {/* Botao flutuante do WhatsApp */}
    </>
  );
}
