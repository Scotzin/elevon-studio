"use client";

import { useState } from "react";

/* ==========================================================================
   GRÁFICO DE VISITAS (linha + área, com pontos e tooltip ao passar o mouse)
   ========================================================================== */
export default function VisitsChart({
  days,
}: {
  days: { label: string; count: number }[];
}) {
  const [hover, setHover] = useState<number | null>(null);

  const total = days.reduce((s, d) => s + d.count, 0);
  if (total === 0) {
    return (
      <div className="grid h-56 place-items-center rounded-xl border border-dashed border-slate-300 text-sm text-slate-500 dark:border-white/15 dark:text-slate-400">
        Nenhuma visita registrada neste período ainda.
      </div>
    );
  }

  const W = 720;
  const H = 240;
  const padX = 16;
  const padTop = 16;
  const padBottom = 28;
  const innerW = W - padX * 2;
  const innerH = H - padTop - padBottom;
  const n = days.length;
  const max = Math.max(1, ...days.map((d) => d.count));
  const x = (i: number) => padX + (n <= 1 ? innerW / 2 : (i / (n - 1)) * innerW);
  const y = (v: number) => padTop + innerH - (v / max) * innerH;

  const pts = days.map((d, i) => [x(i), y(d.count)] as const);
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
  const area = `${line} L${x(n - 1)},${padTop + innerH} L${x(0)},${padTop + innerH} Z`;
  const labelEvery = Math.ceil(n / 8);

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="visitsGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* linhas de grade horizontais */}
        {[0, 0.5, 1].map((g) => (
          <line
            key={g}
            x1={padX}
            x2={W - padX}
            y1={padTop + innerH * g}
            y2={padTop + innerH * g}
            className="stroke-slate-200 dark:stroke-white/10"
            strokeWidth={1}
          />
        ))}

        <path d={area} fill="url(#visitsGrad)" />
        <path d={line} fill="none" stroke="#2563eb" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />

        {pts.map((p, i) => (
          <g key={i}>
            <circle
              cx={p[0]}
              cy={p[1]}
              r={hover === i ? 5 : 3.5}
              fill="#2563eb"
              className="transition-all"
            />
            {/* área invisível para captar o hover */}
            <rect
              x={x(i) - innerW / Math.max(1, n) / 2}
              y={0}
              width={innerW / Math.max(1, n)}
              height={H}
              fill="transparent"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            />
            {i % labelEvery === 0 || i === n - 1 ? (
              <text
                x={p[0]}
                y={H - 8}
                textAnchor="middle"
                className="fill-slate-400 text-[10px]"
              >
                {days[i].label}
              </text>
            ) : null}
          </g>
        ))}
      </svg>

      {hover !== null ? (
        <div
          className="pointer-events-none absolute -translate-x-1/2 rounded-lg bg-deep-950 px-2.5 py-1.5 text-center text-xs text-white shadow-lg dark:bg-white dark:text-deep-950"
          style={{
            left: `${(x(hover) / W) * 100}%`,
            top: `${(y(days[hover].count) / H) * 100}%`,
            transform: "translate(-50%, -130%)",
          }}
        >
          <div className="font-bold">{days[hover].count}</div>
          <div className="opacity-70">{days[hover].label}</div>
        </div>
      ) : null}
    </div>
  );
}
