"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import { WhatsAppIcon } from "./ui";

/* ==========================================================================
   SiteMockup: demonstração realista de um site feito pela Elevon, aberto
   num navegador (desktop) e num celular (mobile) AO MESMO TEMPO.

   - Usa as fotos premium da própria marca já no projeto (/public/images/nichos),
     otimizadas pelo next/image (leve no mobile). Nada de imagem externa.
   - Alterna suavemente (crossfade) entre alguns projetos existentes. O
     navegador e o celular mostram sempre o MESMO projeto.
   - Respeita "prefers-reduced-motion": sem alternância e sem flutuar.
   - Sem deslocamento de layout: tudo em camadas absolutas de proporção fixa.
   ========================================================================== */

type Demo = {
  id: string;
  business: string;
  domain: string;
  icon: string;
  eyebrow: string;
  title: string;
  cta: string;
  image: string;
};

/* Mesmos negócios/headlines das prévias reais (lib/previaDemos.ts), para o
   mockup bater com o que o cliente vê ao abrir a prévia. */
const demos: Demo[] = [
  {
    id: "barbearia",
    business: "Navalha Barbearia",
    domain: "navalhabarbearia.com.br",
    icon: "Scissors",
    eyebrow: "Tradição & estilo",
    title: "Corte afiado, visual no ponto.",
    cta: "Agendar",
    image: "/images/nichos/barbearia.png",
  },
  {
    id: "restaurante",
    business: "Cantina Bella",
    domain: "cantinabella.com.br",
    icon: "UtensilsCrossed",
    eyebrow: "Comida caseira de verdade",
    title: "Sabor que abraça.",
    cta: "Pedir",
    image: "/images/nichos/restaurante.png",
  },
  {
    id: "loja",
    business: "Bella Moda",
    domain: "bellamoda.com.br",
    icon: "ShoppingBag",
    eyebrow: "Nova coleção",
    title: "Seu estilo, do seu jeito.",
    cta: "Comprar",
    image: "/images/nichos/loja-roupas.png",
  },
  {
    id: "estetica",
    business: "Lumière Estética",
    domain: "lumiereestetica.com.br",
    icon: "Sparkles",
    eyebrow: "Autoestima & beleza",
    title: "Realce a sua beleza natural.",
    cta: "Agendar",
    image: "/images/nichos/estetica.png",
  },
];

/* Desliga movimento para quem prefere menos animação. */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

export default function SiteMockup() {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || demos.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % demos.length),
      4800
    );
    return () => clearInterval(id);
  }, [reduced]);

  const active = demos[index];

  return (
    <div className="relative mx-auto w-full max-w-xl">
      {/* Brilho de fundo */}
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-deep-100 via-white to-accent/10 blur-2xl dark:from-deep-800 dark:via-deep-900 dark:to-accent/20" />

      {/* JANELA DO NAVEGADOR */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft-lg dark:border-white/10 dark:bg-deep-900">
        {/* barra superior do navegador */}
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
          <span className="h-3 w-3 rounded-full bg-slate-300 dark:bg-white/20" />
          <span className="h-3 w-3 rounded-full bg-slate-300 dark:bg-white/20" />
          <span className="h-3 w-3 rounded-full bg-slate-300 dark:bg-white/20" />
          <div className="ml-3 hidden h-6 flex-1 items-center gap-1.5 rounded-md bg-white px-3 text-[10px] font-medium text-slate-400 dark:bg-white/10 dark:text-slate-400 sm:flex">
            <Icon name="Lock" className="h-2.5 w-2.5" strokeWidth={2.5} />
            <span key={active.id} className="animate-fade-up">
              {active.domain}
            </span>
          </div>
        </div>

        {/* TELA — projetos reais em crossfade (mesmo do celular) */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-deep-950">
          {demos.map((d, i) => (
            <DesktopScreen
              key={d.id}
              demo={d}
              active={i === index}
              priority={i === 0}
            />
          ))}
        </div>
      </div>

      {/* CELULAR flutuante — mesmo projeto em versão mobile */}
      <div className="absolute -bottom-8 -right-2 w-28 animate-float rounded-[1.75rem] border border-slate-200 bg-white p-1.5 shadow-soft-lg motion-reduce:animate-none dark:border-white/10 dark:bg-deep-900 sm:-right-6 sm:w-36">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[1.35rem] bg-deep-950">
          {demos.map((d, i) => (
            <MobileScreen key={d.id} demo={d} active={i === index} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* --- Tela do navegador (desktop) ---------------------------------------- */
function DesktopScreen({
  demo,
  active,
  priority,
}: {
  demo: Demo;
  active: boolean;
  priority?: boolean;
}) {
  return (
    <div
      aria-hidden={!active}
      className={`absolute inset-0 transition-opacity duration-700 ease-out ${
        active ? "opacity-100" : "opacity-0"
      }`}
    >
      <Image
        src={demo.image}
        alt={`Exemplo de site criado pela Elevon Studio — ${demo.business}`}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 36rem, 90vw"
        className="object-cover"
      />
      {/* Escurecimento para leitura (base + esquerda) */}
      <div className="absolute inset-0 bg-gradient-to-t from-deep-950/90 via-deep-950/25 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-deep-950/85 via-deep-950/20 to-transparent" />

      {/* Barra de navegação do mini-site */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-3.5">
        <span className="flex items-center gap-1.5 text-white">
          <Icon name={demo.icon} className="h-4 w-4 text-accent" />
          <span className="text-[11px] font-semibold tracking-wide">
            {demo.business}
          </span>
        </span>
        <span className="hidden items-center gap-3 text-[9px] font-medium uppercase tracking-widest text-white/70 sm:flex">
          <span>Início</span>
          <span>Serviços</span>
          <span>Contato</span>
        </span>
        <span className="rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-semibold text-white ring-1 ring-inset ring-white/20 backdrop-blur-sm">
          {demo.cta}
        </span>
      </div>

      {/* Hero do mini-site (canto inferior esquerdo) */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-accent">
          {demo.eyebrow}
        </span>
        <p className="mt-1.5 max-w-[15rem] text-lg font-bold leading-tight text-white">
          {demo.title}
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-[10px] font-semibold text-white shadow-glow">
          <WhatsAppIcon className="h-3 w-3" />
          {demo.cta} pelo WhatsApp
        </span>
      </div>
    </div>
  );
}

/* --- Tela do celular (mobile) ------------------------------------------- */
function MobileScreen({ demo, active }: { demo: Demo; active: boolean }) {
  return (
    <div
      aria-hidden={!active}
      className={`absolute inset-0 transition-opacity duration-700 ease-out ${
        active ? "opacity-100" : "opacity-0"
      }`}
    >
      <Image
        src={demo.image}
        alt=""
        fill
        sizes="150px"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-deep-950/95 via-deep-950/35 to-deep-950/20" />

      {/* Marca (topo) */}
      <div className="absolute inset-x-0 top-0 flex items-center gap-1 px-2.5 py-2 text-white">
        <Icon name={demo.icon} className="h-2.5 w-2.5 shrink-0 text-accent" />
        <span className="truncate text-[7px] font-semibold tracking-wide">
          {demo.business}
        </span>
      </div>

      {/* Headline + CTA (base) */}
      <div className="absolute inset-x-0 bottom-0 p-2.5">
        <p className="text-[9px] font-bold leading-tight text-white">
          {demo.title}
        </p>
        <span className="mt-1.5 flex items-center justify-center gap-1 rounded-md bg-accent px-2 py-1 text-[7px] font-semibold text-white">
          <WhatsAppIcon className="h-2 w-2" />
          {demo.cta}
        </span>
      </div>
    </div>
  );
}
