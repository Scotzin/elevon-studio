import { Container, SectionHeading } from "./ui";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { testimonials } from "@/lib/site";

export default function Feedbacks() {
  return (
    <section id="depoimentos" className="scroll-mt-24 py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Depoimentos"
          title="O valor de uma presença digital profissional"
          subtitle="Veja como uma presença digital mais profissional pode transmitir confiança e valor para pequenos negócios."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <Reveal key={i} delay={i * 100}>
              <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
                <Icon name="Quote" className="h-8 w-8 text-deep-200" />

                {/* Estrelas */}
                <div className="mt-4 flex gap-0.5 text-accent">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Icon key={s} name="Star" className="h-4 w-4 fill-current" strokeWidth={0} />
                  ))}
                </div>

                <blockquote className="mt-4 flex-1 text-pretty leading-relaxed text-slate-700">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-deep-900 text-sm font-bold text-white">
                    {item.author.split(" ").slice(-1)[0].charAt(0)}
                  </span>
                  <span className="text-sm font-semibold text-deep-950">{item.author}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
