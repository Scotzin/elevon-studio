"use client";

import { useState } from "react";
import Icon from "../Icon";
import { WhatsAppIcon } from "../ui";
import { waLink } from "@/lib/site";

/* ==========================================================================
   WIDGET DE AGENDAMENTO (demonstração funcional)
   --------------------------------------------------------------------------
   O visitante escolhe serviço + dia + horário e o botão monta um link de
   WhatsApp já com a mensagem pronta. É só uma amostra — no site final dá para
   conectar com agenda real, confirmação automática etc.
   Usado pela barbearia e pela clínica de estética.
   ========================================================================== */
export default function AgendaWidget({
  services,
  accent,
  verb = "agendar",
  title = "Agende seu horário",
}: {
  services: string[];
  accent: string;
  verb?: string;
  title?: string;
}) {
  const days = ["Hoje", "Amanhã", "Qui", "Sex", "Sáb"];
  const times = ["09:00", "10:30", "13:00", "15:00", "16:30", "18:00"];

  const [service, setService] = useState(services[0]);
  const [day, setDay] = useState(days[0]);
  const [time, setTime] = useState(times[0]);

  const msg = `Olá! Quero ${verb} (vi na demonstração do site): ${service} — ${day} às ${time}. Pode confirmar a disponibilidade?`;

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl">
      <div className="px-6 py-5 text-white" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}>
        <p className="flex items-center gap-2 font-serif text-xl font-bold">
          <Icon name="CalendarCheck" className="h-5 w-5" />
          {title}
        </p>
        <p className="mt-0.5 text-sm text-white/80">Escolha e confirme pelo WhatsApp em segundos.</p>
      </div>

      <div className="space-y-5 p-6">
        {/* Serviço */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Serviço
          </label>
          <div className="relative">
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full appearance-none rounded-xl border border-zinc-300 bg-white px-4 py-3 pr-10 text-sm font-medium text-zinc-800 outline-none transition focus:border-zinc-900"
            >
              {services.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <Icon
              name="ChevronDown"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
            />
          </div>
        </div>

        {/* Dia */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-500">Dia</label>
          <div className="flex flex-wrap gap-2">
            {days.map((d) => {
              const active = d === day;
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDay(d)}
                  className="rounded-full border px-4 py-2 text-sm font-medium transition"
                  style={
                    active
                      ? { backgroundColor: accent, borderColor: accent, color: "#fff" }
                      : { borderColor: "#d4d4d8", color: "#3f3f46" }
                  }
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>

        {/* Horário */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-500">Horário</label>
          <div className="grid grid-cols-3 gap-2">
            {times.map((t) => {
              const active = t === time;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTime(t)}
                  className="rounded-xl border py-2.5 text-sm font-medium transition"
                  style={
                    active
                      ? { backgroundColor: accent, borderColor: accent, color: "#fff" }
                      : { borderColor: "#d4d4d8", color: "#3f3f46" }
                  }
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        <a
          href={waLink(msg)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5"
          style={{ backgroundColor: accent }}
        >
          <WhatsAppIcon className="h-4 w-4" />
          Confirmar pelo WhatsApp
        </a>
        <p className="text-center text-xs text-zinc-400">
          {service} · {day} · {time}
        </p>
      </div>
    </div>
  );
}
