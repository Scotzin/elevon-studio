import { Container, Eyebrow } from "./ui";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { S_BLUE } from "./Logo";
import { aboutParagraphs, aboutClosing, aboutCards, team, siteConfig } from "@/lib/site";

export default function About() {
  return (
    <section id="sobre" className="scroll-mt-24 border-y border-slate-100 bg-slate-50/60 py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* COLUNA DA IDENTIDADE VISUAL */}
          <Reveal className="order-1">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-deep-100 to-accent/10 blur-2xl" />

              {/*
                PAINEL DE MARCA (no lugar de uma foto)
                Painel elegante da marca (monograma + nome) que parece
                INTENCIONAL, não um espaço vazio.

                QUANDO QUISER COLOCAR UMA FOTO DA EQUIPE:
                1) Coloque o arquivo em /public (ex.: /public/equipe.jpg)
                2) Substitua TODO o bloco <div ...>...</div> abaixo por:
                   <img src="/equipe.jpg" alt="Equipe Elevon Studio"
                        className="aspect-[4/5] w-full rounded-3xl object-cover shadow-soft-lg" />
              */}
              <div className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-deep-900 to-deep-700 shadow-soft-lg">
                {/* grade + brilho decorativos */}
                <div
                  className="absolute inset-0 opacity-[0.15]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                    maskImage:
                      "radial-gradient(ellipse 75% 75% at 50% 40%, black 35%, transparent 80%)",
                  }}
                />
                <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-accent/25 blur-3xl" />

                <div className="relative flex flex-col items-center text-center">
                  {/* Monograma "ES" da marca (E branco + S azul) */}
                  <span className="grid h-24 w-24 place-items-center rounded-2xl bg-white/10 text-3xl font-extrabold tracking-tight text-white ring-1 ring-white/20">
                    <span>
                      E<span style={{ color: S_BLUE }}>S</span>
                    </span>
                  </span>
                  <p className="mt-5 text-xl font-bold text-white">{siteConfig.brand}</p>
                  <span className="mt-3 h-px w-12 bg-white/25" />
                  <p className="mt-3 max-w-[16rem] px-4 text-sm text-white/70">
                    Equipe especializada em sites profissionais para o seu negócio crescer no digital
                  </p>
                </div>
              </div>

              {/* Cartão flutuante de identificação da equipe */}
              <div className="absolute -bottom-5 left-1/2 w-[88%] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft-lg">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-deep-900 text-white">
                    <Icon name="BadgeCheck" className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-deep-950">Equipe {siteConfig.brand}</p>
                    <p className="text-xs text-slate-500">Desenvolvimento • Comercial • Design</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* COLUNA DO TEXTO */}
          <div className="order-2">
            <Reveal>
              <Eyebrow>Nossa equipe</Eyebrow>
              <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-deep-950 sm:text-4xl">
                Quem está por trás da Elevon Studio
              </h2>
            </Reveal>

            <div className="mt-6 space-y-4">
              {aboutParagraphs.map((paragraph, i) => (
                <Reveal key={i} delay={i * 80}>
                  <p className="text-pretty leading-relaxed text-slate-600">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            {/* Frase de fechamento (tom mais humano), em destaque */}
            <Reveal delay={100}>
              <p className="mt-6 border-l-2 border-accent pl-4 text-pretty font-medium leading-relaxed text-deep-900">
                {aboutClosing}
              </p>
            </Reveal>

            {/* Selos de valor */}
            <Reveal delay={120}>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {aboutCards.map((card) => (
                  <div
                    key={card.title}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-soft"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                      <Icon name={card.icon} className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold text-deep-950">{card.title}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* GRID DA EQUIPE (integrantes) */}
        <div className="mt-20 md:mt-24">
          <Reveal>
            <h3 className="text-center text-2xl font-bold tracking-tight text-deep-950">
              A equipe por trás dos seus projetos
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-center text-pretty text-slate-600">
              Cada pessoa tem um papel claro para que o seu site seja entregue com
              organização, qualidade e atenção do começo ao fim.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={(i % 4) * 90}>
                <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-deep-200 hover:shadow-soft-lg">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-deep-900 text-white transition-colors group-hover:bg-accent">
                      <Icon name={member.icon} className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="font-bold leading-tight text-deep-950">{member.name}</p>
                      <p className="mt-0.5 text-xs font-semibold text-accent">{member.role}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">{member.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
