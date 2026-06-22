import { Container } from "./ui";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { trustPhrases, trustCards } from "@/lib/site";

export default function Trust() {
  return (
    <section className="scroll-mt-24 border-y border-slate-100 bg-slate-50/60 py-16 md:py-24 dark:border-white/10 dark:bg-deep-900/30">
      <Container>
        {/* Faixa de frases curtas de confianca */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustPhrases.map((phrase, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="flex h-full items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                  <Icon name="Check" className="h-4 w-4" strokeWidth={2.5} />
                </span>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{phrase}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Cards com icones */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trustCards.map((card, i) => (
            <Reveal key={card.title} delay={i * 90}>
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-deep-200 hover:shadow-soft-lg dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-deep-900 text-white transition-colors group-hover:bg-accent dark:bg-white/10">
                  <Icon name={card.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-deep-950 dark:text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{card.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
