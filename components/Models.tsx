import { Container, SectionHeading, Button, WhatsAppIcon } from "./ui";
import Icon from "./Icon";
import Reveal from "./Reveal";
import NichoImage from "./NichoImage";
import { models, waLink } from "@/lib/site";

export default function Models() {
  return (
    <section id="modelos" className="scroll-mt-24 py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Modelos por nicho"
          title="Um modelo pensado para o seu tipo de negócio"
          subtitle="Cada nicho tem uma base profissional que personalizamos com as suas cores, textos, fotos e informações. Veja alguns dos segmentos que atendemos."
        />

        {/* GRID DE NICHOS */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {models.map((model, i) => (
            <Reveal key={model.id} delay={(i % 3) * 100}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-deep-200 hover:shadow-soft-lg dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20">
                {/* Imagem do nicho (topo) com overlay + nome por cima */}
                <div className="relative">
                  <NichoImage
                    src={model.image}
                    alt={`Modelo de site para ${model.name}`}
                    icon={model.icon}
                  />

                  {/* Selo de destaque (só aparece se popular: true) */}
                  {model.popular ? (
                    <span className="absolute right-4 top-4 z-10 inline-flex items-center gap-1 rounded-full bg-signal px-3 py-1 text-xs font-semibold text-white shadow-soft">
                      <Icon name="Star" className="h-3 w-3" strokeWidth={2.5} />
                      Mais procurado
                    </span>
                  ) : null}

                  {/* Ícone do nicho + nome sobre a imagem */}
                  <div className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 p-5">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/15 text-white ring-1 ring-inset ring-white/25 backdrop-blur-sm">
                      <Icon name={model.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="text-lg font-bold leading-tight text-white drop-shadow-sm">
                      {model.name}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  {/* Frase curta de apoio */}
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {model.tagline}
                  </p>

                  {/* Botões do card */}
                  <div className="mt-6 flex flex-col gap-2.5 pt-1">
                    <Button
                      href={waLink(
                        `Olá! Tenho interesse em um site para ${model.name}. Podem me passar mais detalhes?`
                      )}
                      external
                      variant="primary"
                      size="md"
                      className="w-full"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      Quero um site assim
                    </Button>

                    {/*
                      "Ver prévia": se houver link em lib/site.ts (campo preview),
                      abre a prévia online; se não, abre o WhatsApp pedindo uma demonstração.
                    */}
                    <Button
                      href={
                        model.preview ||
                        waLink(`Olá! Posso ver uma prévia do modelo de site para ${model.name}?`)
                      }
                      external
                      variant="outline"
                      size="md"
                      className="w-full"
                    >
                      Ver prévia
                      <Icon name="ArrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* CHAMADA: NÃO ENCONTROU SEU NICHO? */}
        <Reveal>
          <div className="mt-14 overflow-hidden rounded-3xl border border-deep-100 bg-deep-50/70 p-8 text-center md:p-12 dark:border-white/10 dark:bg-deep-900/40">
            <h3 className="text-2xl font-bold text-deep-950 dark:text-white">Não encontrou o seu nicho?</h3>
            <p className="mx-auto mt-3 max-w-xl text-pretty text-slate-600 dark:text-slate-300">
              Sem problema. Chame a nossa equipe no WhatsApp e diga qual tipo de
              site você precisa. Criamos uma opção personalizada para o seu negócio.
            </p>
            <div className="mt-7 flex justify-center">
              <Button
                href={waLink(
                  "Olá! Não encontrei meu nicho nos modelos. Pode criar um site personalizado para o meu negócio?"
                )}
                external
                variant="primary"
                size="lg"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Pedir site personalizado
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
