"use client";

import { useState } from "react";
import Icon from "./Icon";

/* ==========================================================================
   IMAGEM DO NICHO (topo do card de modelos)
   --------------------------------------------------------------------------
   Mostra a imagem real do nicho com um leve zoom no hover e um overlay
   escuro para manter o texto legível por cima.

   FALLBACK AUTOMÁTICO: enquanto o arquivo da imagem não existir em
   /public/images/nichos, a imagem "some" sozinha (onError) e aparece um
   fundo em gradiente da marca com o ícone do nicho. Assim o layout nunca
   quebra — basta adicionar o arquivo depois para a foto aparecer.
   ========================================================================== */
export default function NichoImage({
  src,
  alt,
  icon,
}: {
  src: string;
  alt: string;
  icon: string;
}) {
  const [failed, setFailed] = useState(!src);

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-deep-900 to-deep-700">
      {/* Fallback (sempre presente atrás): grade sutil + ícone do nicho */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 40%, black 35%, transparent 85%)",
        }}
      />
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/25 blur-3xl" />
      <div className="absolute inset-0 grid place-items-center">
        <Icon name={icon} className="h-16 w-16 text-white/25" strokeWidth={1.5} />
      </div>

      {/* Imagem real por cima (se carregar). Some sozinha se o arquivo faltar. */}
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      ) : null}

      {/* Overlay escuro para leitura do nome do nicho */}
      <div className="absolute inset-0 bg-gradient-to-t from-deep-950/85 via-deep-950/25 to-transparent" />
    </div>
  );
}
