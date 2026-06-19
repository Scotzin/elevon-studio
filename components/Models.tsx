import { Container, SectionHeading, Button, WhatsAppIcon } from "./ui";
import Icon from "./Icon";
import Reveal from "./Reveal";
import ModelThumb from "./ModelThumb";
import { models, waLink } from "@/lib/site";

export default function Models() {
  return (
    <section id="modelos" className="scroll-mt-24 py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Modelos disponíveis"
          title="Escolha um modelo pronto para o seu negócio"
          subtitle="Cada modelo é uma base profissional que eu personalizo com as suas cores, textos, fotos e informações. Veja as opções mais procuradas."
        />

        {/* GRID DE MODELOS */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {models.map((model, i) => (
            <Reveal key={model.id} delay={(i % 3) * 100}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-deep-200 hover:shadow-soft-lg">
                {/* Selo de destaque (só aparece se popular: true) */}
                {model.popular ? (
                  <span className="absolute right-5 top-5 z-10 inline-flex items-center gap-1 rounded-full bg-signal px-3 py-1 text-xs font-semibold text-white shadow-soft">
                    <Icon name="Star" className="h-3 w-3" strokeWidth={2.5} />
                    Mais procurado
                  </span>
                ) : null}

                {/* Miniatura / mockup do modelo */}
                <div className="p-3 pb-0">
                  <ModelThumb icon={model.icon} name={model.name} image={model.image} />
                </div>

                <div className="flex flex-1 flex-col p-6 pt-5">
                  {/* Ícone do nicho + nome */}
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-deep-50 text-deep-900 transition-colors group-hover:bg-deep-900 group-hover:text-white">
                      <Icon name={model.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="text-lg font-bold text-deep-950">{model.name}</h3>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {model.description}
                  </p>

                  {/* Lista de recursos */}
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {model.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-sm text-slate-700">
                        <Icon name="Check" className="h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Botões do card */}
                  <div className="mt-7 flex flex-col gap-2.5">
                    <Button
                      href={waLink(
                        `Olá! Tenho interesse no modelo de site para ${model.name}. Pode me passar mais detalhes?`
                      )}
                      external
                      variant="primary"
                      size="md"
                      className="w-full"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      Quero um modelo assim
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
          <div className="mt-14 overflow-hidden rounded-3xl border border-deep-100 bg-deep-50/70 p-8 text-center md:p-12">
            <h3 className="text-2xl font-bold text-deep-950">Não encontrou o seu nicho?</h3>
            <p className="mx-auto mt-3 max-w-xl text-pretty text-slate-600">
              Sem problema. Me chame no WhatsApp e me diga qual tipo de site você
              precisa. Eu posso criar uma opção personalizada para o seu negócio.
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
