import { Container, Button, WhatsAppIcon } from "./ui";
import Icon from "./Icon";
import Reveal from "./Reveal";
import SiteMockup from "./SiteMockup";
import { heroHighlights, waLink } from "@/lib/site";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden scroll-mt-24 pt-28 md:pt-36"
    >
      {/* Fundo decorativo: grade suave + brilho */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.06),transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(10,37,64,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,37,64,0.04) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
          }}
        />
      </div>

      <Container className="grid items-center gap-12 pb-16 md:pb-24 lg:grid-cols-2 lg:gap-8">
        {/* COLUNA DE TEXTO */}
        <div className="flex flex-col items-start">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-deep-100 bg-deep-50 px-4 py-1.5 text-xs font-semibold text-deep-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Disponivel para novos projetos
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-deep-950 sm:text-5xl lg:text-[3.4rem]">
              Sites profissionais para pequenos negocios{" "}
              <span className="text-accent">venderem mais pelo WhatsApp.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
              Crio sites modernos, rapidos e personalizados para barbearias,
              lojas, restaurantes, prestadores de servico e negocios locais que
              querem passar mais confianca e atrair mais clientes.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href={waLink("Ola, quero criar meu site profissional. Pode me ajudar?")}
                external
                variant="primary"
                size="lg"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Quero meu site
              </Button>
              <Button href="#modelos" variant="outline" size="lg">
                Ver modelos disponiveis
                <Icon name="ArrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          </Reveal>

          {/* MINI CARDS DE DESTAQUE */}
          <Reveal delay={320}>
            <div className="mt-10 flex flex-wrap gap-2.5">
              {heroHighlights.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3.5 py-2 text-sm font-medium text-slate-700 shadow-soft backdrop-blur"
                >
                  <Icon name={item.icon} className="h-4 w-4 text-accent" />
                  {item.label}
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* COLUNA DO MOCKUP */}
        <Reveal delay={200} className="lg:pl-6">
          <SiteMockup />
        </Reveal>
      </Container>
    </section>
  );
}
