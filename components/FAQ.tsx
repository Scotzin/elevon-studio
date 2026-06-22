"use client";

import { useState } from "react";
import { Container, SectionHeading } from "./ui";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { faq } from "@/lib/site";

export default function FAQ() {
  // Primeira pergunta ja vem aberta.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 border-t border-slate-100 bg-slate-50/60 py-20 md:py-28 dark:border-white/10 dark:bg-deep-900/30">
      <Container>
        <SectionHeading
          eyebrow="Perguntas frequentes"
          title="Ficou com alguma dúvida?"
          subtitle="Reunimos as perguntas mais comuns. Se a sua não estiver aqui, é só chamar a nossa equipe no WhatsApp."
        />

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft dark:divide-white/10 dark:border-white/10 dark:bg-white/5">
            {faq.map((item, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={i} delay={i * 60}>
                  <div>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-white/5"
                      aria-expanded={isOpen}
                    >
                      <span className="text-base font-semibold text-deep-950 dark:text-white">
                        {item.question}
                      </span>
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-slate-200 text-deep-900 transition-all duration-300 dark:border-white/15 dark:text-white ${
                          isOpen ? "rotate-180 border-accent bg-accent text-white" : ""
                        }`}
                      >
                        <Icon name={isOpen ? "Minus" : "Plus"} className="h-4 w-4" />
                      </span>
                    </button>

                    {/* Resposta (anima a altura) */}
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
