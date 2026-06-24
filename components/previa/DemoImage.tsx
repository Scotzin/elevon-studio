"use client";

import { useState } from "react";
import Icon from "../Icon";

/* ==========================================================================
   IMAGEM DA DEMO (foto ilustrativa com fallback)
   Mostra a foto; se ela não carregar, cai num fundo em gradiente da cor do
   nicho com o ícone — então o layout nunca quebra.
   ========================================================================== */
export default function DemoImage({
  src,
  alt,
  icon,
  accent,
  label,
  className = "",
}: {
  src: string;
  alt: string;
  icon: string;
  accent: string;
  label?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(!src);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: `linear-gradient(150deg, ${accent}, ${accent}55)` }}
    >
      <span className="absolute inset-0 grid place-items-center text-white/35">
        <Icon name={icon} className="h-12 w-12" strokeWidth={1} />
      </span>
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : null}
      {label ? (
        <span className="absolute bottom-2 right-2 rounded bg-black/30 px-2 py-0.5 text-[10px] text-white/85 backdrop-blur">
          {label}
        </span>
      ) : null}
    </div>
  );
}
