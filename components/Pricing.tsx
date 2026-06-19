import { Container, SectionHeading, Button, WhatsAppIcon } from "./ui";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { pricing, waLink } from "@/lib/site";

export default function Pricing() {
  return (
    <section id="planos" className="scroll-mt-24 py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Planos e preços"
          title="Investimento claro, sem surpresa"
          subtitle="Um plano direto para tirar seu negócio do papel, com manutenção mensal para manter tudo funcionando."
        />

        <div className="mx-auto mt-14 max-w-3xl">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-deep-200 bg-white shadow-soft-lg">
              {/* Cabecalho escuro do plano */}
              <div className="relative bg-gradient-to-br from-deep-900 to-deep-700 px-8 py-10 text-center text-white">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider ring-1 ring-white/20">
                  <Icon name="Zap" className="h-3.5 w-3.5" />
                  Plano principal
                </span>
                <h3 className="mt-4 text-2xl font-bold">{pricing.planName}</h3>
                <p className="mt-3 text-4xl font-bold sm:text-5xl">{pricing.price}</p>
                <p className="mt-2 text-sm text-white/70">{pricing.priceNote}</p>
              </div>

              {/* Corpo do plano */}
              <div className="px-8 py-8">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  O que está incluso
                </p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {pricing.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-slate-700">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                        <Icon name="Check" className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Mensalidade */}
                <div className="mt-7 flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-deep-900 text-white">
                    <Icon name="Wrench" className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-bold text-deep-950">{pricing.monthly}</p>
                    <p className="mt-1 text-sm text-slate-600">{pricing.monthlyNote}</p>
                  </div>
                </div>

                {/* Observacao */}
                <p className="mt-5 text-center text-xs leading-relaxed text-slate-500">
                  {pricing.disclaimer}
                </p>

                <div className="mt-7">
                  <Button
                    href={waLink(
                      "Olá! Quero um orçamento para criar meu site. Pode me passar os valores e o que está incluso?"
                    )}
                    external
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Pedir orçamento no WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
