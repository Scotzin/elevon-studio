import { Container, SectionHeading } from "./ui";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { testimonials } from "@/lib/site";

export default function Feedbacks() {
  // Há pelo menos um depoimento REAL (não-ilustrativo)?
  const hasReal = testimonials.some((t) => !t.placeholder);

  return (
    <section id="depoimentos" className="scroll-mt-24 py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Depoimentos"
          title={hasReal ? "Quem é cliente, recomenda" : "O valor de uma presença digital profissional"}
          subtitle={
            hasReal
              ? "O que os nossos clientes falam sobre trabalhar com a Elevon Studio."
              : "Exemplos do que um site profissional entrega — em breve, com as palavras reais dos nossos clientes."
          }
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((item, i) => {
            const rating = Math.max(0, Math.min(5, item.rating ?? 5));
            const initial = item.author.trim().split(" ").slice(-1)[0]?.charAt(0).toUpperCase() ?? "•";
            const sub = [item.business, item.nicho].filter(Boolean).join(" · ");
            const subline = sub || (item.placeholder ? "Depoimento ilustrativo" : "");

            return (
              <Reveal key={i} delay={i * 100}>
                <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg dark:border-white/10 dark:bg-white/5">
                  {/* Nota (estrelas) + aspas */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5 text-accent">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Icon
                          key={s}
                          name="Star"
                          className={`h-4 w-4 ${s < rating ? "fill-current" : "fill-none text-slate-300 dark:text-white/20"}`}
                          strokeWidth={s < rating ? 0 : 1.5}
                        />
                      ))}
                    </div>
                    <Icon name="Quote" className="h-7 w-7 text-deep-100 dark:text-white/10" />
                  </div>

                  <blockquote className="mt-4 flex-1 text-pretty leading-relaxed text-slate-700 dark:text-slate-200">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>

                  <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5 dark:border-white/10">
                    {item.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.photo}
                        alt={item.author}
                        loading="lazy"
                        className="h-11 w-11 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-deep-800 to-deep-950 text-sm font-bold text-white dark:from-white/15 dark:to-white/5">
                        {initial}
                      </span>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate text-sm font-semibold text-deep-950 dark:text-white">
                          {item.author}
                        </span>
                        {item.verified ? (
                          <span title="Cliente verificado" className="inline-flex shrink-0 text-accent">
                            <Icon name="BadgeCheck" className="h-4 w-4" />
                          </span>
                        ) : null}
                      </div>
                      {subline ? (
                        <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                          {subline}
                          {item.city ? ` · ${item.city}` : ""}
                        </p>
                      ) : null}
                    </div>

                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Perfil de ${item.author}`}
                        className="shrink-0 text-slate-400 transition hover:text-accent"
                      >
                        <Icon name="ExternalLink" className="h-4 w-4" />
                      </a>
                    ) : null}
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>

        {!hasReal ? (
          <p className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500">
            * Depoimentos ilustrativos. Os primeiros relatos reais dos nossos clientes entram aqui em breve.
          </p>
        ) : null}
      </Container>
    </section>
  );
}
