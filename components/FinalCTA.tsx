import { Container, Button, WhatsAppIcon } from "./ui";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { waLink } from "@/lib/site";

export default function FinalCTA() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-deep-900 via-deep-800 to-deep-700 px-6 py-16 text-center shadow-soft-lg md:px-16 md:py-20">
            {/* Brilhos decorativos */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
              <div className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
              <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                  maskImage:
                    "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 75%)",
                }}
              />
            </div>

            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Pronto para deixar seu negócio com uma presença digital mais profissional?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-white/80">
                Me chame no WhatsApp, conte qual é o seu negócio e eu te mostro o
                melhor caminho para criar seu site.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  href={waLink("Olá! Quero deixar meu negócio mais profissional. Vamos criar meu site?")}
                  external
                  variant="whatsapp"
                  size="lg"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Chamar no WhatsApp agora
                </Button>
                <Button href="#modelos" variant="outline" size="lg" className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40">
                  Ver modelos
                  <Icon name="ArrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
