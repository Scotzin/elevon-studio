import { Container, SectionHeading, Button, WhatsAppIcon } from "./ui";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { plans, pricingDisclaimer, waLink } from "@/lib/site";

export default function Pricing() {
  return (
    <section id="planos" className="scroll-mt-24 py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Planos e preços"
          title="Escolha o plano ideal para o seu negócio"
          subtitle="Três opções para começar com o pé direito no digital. Todos incluem publicação e manutenção mensal para manter o seu site sempre no ar."
        />

        {/* GRID DE PLANOS */}
        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-3 lg:gap-7">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={(i % 3) * 100} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-3xl border bg-white p-8 transition-all duration-300 dark:bg-white/5 ${
                  plan.highlighted
                    ? "border-accent shadow-soft-lg ring-1 ring-accent lg:-translate-y-4"
                    : "border-slate-200 shadow-soft hover:-translate-y-1 hover:border-deep-200 hover:shadow-soft-lg dark:border-white/10 dark:hover:border-white/20"
                }`}
              >
                {/* Selo "Mais escolhido" (só no plano destacado) */}
                {plan.highlighted ? (
                  <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-white shadow-glow">
                    <Icon name="Star" className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
                    {plan.badge}
                  </span>
                ) : null}

                {/* Nome + descrição */}
                <h3 className="text-xl font-bold text-deep-950 dark:text-white">{plan.name}</h3>
                <p className="mt-2 min-h-[4rem] text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {plan.description}
                </p>

                {/* Valores */}
                <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-5 dark:border-white/10 dark:bg-deep-950/40">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Criação · a partir de
                  </p>
                  <p className="mt-1 text-4xl font-bold tracking-tight text-deep-950 dark:text-white">
                    {plan.setup}
                  </p>
                  <div className="mt-4 flex items-baseline gap-1.5 border-t border-slate-200 pt-4 dark:border-white/10">
                    <span className="text-lg font-bold text-accent">+ {plan.monthly}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">manutenção</span>
                  </div>
                </div>

                {/* Itens inclusos */}
                <ul className="mt-6 flex-1 space-y-2.5">
                  {plan.features.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-200">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                        <Icon name="Check" className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-8">
                  <Button
                    href={waLink(
                      `Olá! Tenho interesse no plano ${plan.name}. Podem me passar mais detalhes e o que está incluso?`
                    )}
                    external
                    variant={plan.highlighted ? "whatsapp" : "primary"}
                    size="lg"
                    className="w-full"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Quero o plano {plan.name}
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Observação sobre variação de valores */}
        <Reveal>
          <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {pricingDisclaimer}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
