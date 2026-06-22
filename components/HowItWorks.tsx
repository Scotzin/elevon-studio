import { Container, SectionHeading, Button, WhatsAppIcon } from "./ui";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { steps, waLink } from "@/lib/site";

export default function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="scroll-mt-24 border-y border-slate-100 bg-slate-50/60 py-20 md:py-28 dark:border-white/10 dark:bg-deep-900/30"
    >
      <Container>
        <SectionHeading
          eyebrow="Como funciona"
          title="Do primeiro contato ao site no ar"
          subtitle="Um processo simples e transparente. Você acompanha cada etapa e aprova antes da publicação."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 100}>
              <div className="group relative h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20">
                {/* Numero do passo */}
                <span className="text-5xl font-bold leading-none text-deep-100 transition-colors group-hover:text-accent/30 dark:text-white/10">
                  0{i + 1}
                </span>

                <span className="mt-4 grid h-12 w-12 place-items-center rounded-xl bg-deep-900 text-white transition-colors group-hover:bg-accent dark:bg-white/10">
                  <Icon name={step.icon} className="h-6 w-6" />
                </span>

                <h3 className="mt-5 text-lg font-bold text-deep-950 dark:text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 flex justify-center">
            <Button
              href={waLink("Olá! Quero entender como funciona para criar meu site. Pode me explicar?")}
              external
              variant="primary"
              size="lg"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Começar agora pelo WhatsApp
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
