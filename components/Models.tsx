import { Container, SectionHeading, Button, WhatsAppIcon } from "./ui";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { models, waLink } from "@/lib/site";

export default function Models() {
  return (
    <section id="modelos" className="scroll-mt-24 py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Modelos disponiveis"
          title="Escolha um modelo pronto para o seu negocio"
          subtitle="Cada modelo e uma base profissional que eu personalizo com as suas cores, textos, fotos e informacoes. Veja as opcoes mais procuradas."
        />

        {/* GRID DE MODELOS */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {models.map((model, i) => (
            <Reveal key={model.id} delay={(i % 3) * 100}>
              <article className="group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-deep-200 hover:shadow-soft-lg">
                {/* Selo de destaque (so aparece se popular: true) */}
                {model.popular ? (
                  <span className="absolute -top-3 right-5 inline-flex items-center gap-1 rounded-full bg-signal px-3 py-1 text-xs font-semibold text-white shadow-soft">
                    <Icon name="Star" className="h-3 w-3" strokeWidth={2.5} />
                    Mais procurado
                  </span>
                ) : null}

                {/* Icone do nicho */}
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-deep-50 text-deep-900 transition-colors group-hover:bg-deep-900 group-hover:text-white">
                  <Icon name={model.icon} className="h-7 w-7" />
                </span>

                <h3 className="mt-5 text-xl font-bold text-deep-950">{model.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
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

                {/* Botoes do card */}
                <div className="mt-7 flex flex-col gap-2.5">
                  <Button
                    href={waLink(
                      `Ola! Tenho interesse no modelo de site para ${model.name}. Pode me passar mais detalhes?`
                    )}
                    external
                    variant="primary"
                    size="md"
                    className="w-full"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Quero um modelo assim
                  </Button>

                  {/* Botao "Ver previa" so aparece se houver link em lib/site.ts */}
                  {model.preview ? (
                    <Button href={model.preview} external variant="outline" size="md" className="w-full">
                      Ver previa
                      <Icon name="ArrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* CHAMADA: NAO ENCONTROU SEU NICHO? */}
        <Reveal>
          <div className="mt-14 overflow-hidden rounded-3xl border border-deep-100 bg-deep-50/70 p-8 text-center md:p-12">
            <h3 className="text-2xl font-bold text-deep-950">Nao encontrou o seu nicho?</h3>
            <p className="mx-auto mt-3 max-w-xl text-pretty text-slate-600">
              Sem problema. Me chame no WhatsApp e me diga qual tipo de site voce
              precisa. Eu posso criar uma opcao personalizada para o seu negocio.
            </p>
            <div className="mt-7 flex justify-center">
              <Button
                href={waLink(
                  "Ola! Nao encontrei meu nicho nos modelos. Pode criar um site personalizado para o meu negocio?"
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
