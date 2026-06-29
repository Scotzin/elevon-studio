"use client";

import { useState } from "react";
import { Container, WhatsAppIcon } from "./ui";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { waLink } from "@/lib/site";

/* ==========================================================================
   FORMULÁRIO DE ORÇAMENTO
   --------------------------------------------------------------------------
   Captura o lead direto no CRM (POST /api/lead → modelo Lead). Para quem não
   clica no botão do WhatsApp: deixa nome + contato e a equipe retorna.
   ========================================================================== */
const NICHOS = [
  "Barbearia",
  "Restaurante",
  "Loja de roupas",
  "Clínica / Estética",
  "Imobiliária",
  "Prestador de serviços",
  "Outro",
];

const BENEFITS = [
  "Resposta rápida, sem compromisso",
  "A gente indica o melhor plano pro seu caso",
  "Orçamento gratuito e transparente",
];

type Status = "idle" | "sending" | "success" | "error";

export default function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ fullName: "", whatsapp: "", nicho: NICHOS[0], message: "", empresa: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.fullName.trim() || !form.whatsapp.trim()) {
      setError("Preencha seu nome e WhatsApp.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await r.json().catch(() => ({}));
      if (r.ok && data.ok) {
        setStatus("success");
      } else {
        setError(data.error || "Não foi possível enviar. Tente pelo WhatsApp.");
        setStatus("error");
      }
    } catch {
      setError("Sem conexão. Tente pelo WhatsApp.");
      setStatus("error");
    }
  }

  const waSuccess = waLink(
    `Olá! Acabei de pedir um orçamento pelo site. Meu nome é ${form.fullName || "..."}${
      form.nicho ? ` e meu negócio é do ramo de ${form.nicho.toLowerCase()}` : ""
    }.`
  );

  return (
    <section id="orcamento" className="py-20 md:py-28">
      <Container>
        <Reveal>
          <div className="grid items-center gap-10 overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-soft dark:border-white/10 dark:bg-white/5 md:grid-cols-2 md:p-12">
            {/* Texto */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-deep-100 bg-deep-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-deep-700 dark:border-white/10 dark:bg-white/10 dark:text-deep-100">
                <Icon name="Mail" className="h-3.5 w-3.5" />
                Peça seu orçamento
              </span>
              <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-deep-950 dark:text-white sm:text-4xl">
                Conte sobre o seu negócio e a gente te retorna.
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-slate-600 dark:text-slate-300">
                Deixe seu contato que a nossa equipe fala com você — rápido e sem compromisso.
              </p>
              <ul className="mt-6 space-y-3">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-200">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                      <Icon name="Check" className="h-3.5 w-3.5" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Form / sucesso */}
            <div>
              {status === "success" ? (
                <div className="flex flex-col items-center rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center dark:border-emerald-500/30 dark:bg-emerald-500/10">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white">
                    <Icon name="Check" className="h-7 w-7" />
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-deep-950 dark:text-white">Recebemos o seu pedido! 🎉</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    Nossa equipe vai te chamar em breve. Quer adiantar e falar agora?
                  </p>
                  <a
                    href={waSuccess}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-accent-dark"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Falar agora no WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  {/* honeypot anti-bot (invisível) */}
                  <input
                    type="text"
                    name="empresa"
                    value={form.empresa}
                    onChange={set("empresa")}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  />

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-900 dark:text-slate-200">Seu nome</label>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={set("fullName")}
                      placeholder="Como podemos te chamar?"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-deep-900 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-white/15 dark:bg-deep-950/40 dark:text-white dark:placeholder:text-slate-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-900 dark:text-slate-200">WhatsApp</label>
                    <input
                      type="tel"
                      inputMode="tel"
                      value={form.whatsapp}
                      onChange={set("whatsapp")}
                      placeholder="(11) 99999-9999"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-deep-900 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-white/15 dark:bg-deep-950/40 dark:text-white dark:placeholder:text-slate-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-900 dark:text-slate-200">Tipo de negócio</label>
                    <select
                      value={form.nicho}
                      onChange={set("nicho")}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-deep-900 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-white/15 dark:bg-deep-950/40 dark:text-white"
                    >
                      {NICHOS.map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-900 dark:text-slate-200">
                      Mensagem <span className="font-normal text-slate-400">(opcional)</span>
                    </label>
                    <textarea
                      value={form.message}
                      onChange={set("message")}
                      rows={3}
                      placeholder="Conte rapidinho o que você precisa."
                      className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-deep-900 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-white/15 dark:bg-deep-950/40 dark:text-white dark:placeholder:text-slate-500"
                    />
                  </div>

                  {status === "error" && (
                    <p className="flex items-center gap-2 text-sm text-signal">
                      <Icon name="X" className="h-4 w-4" />
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "sending" ? (
                      "Enviando..."
                    ) : (
                      <>
                        Pedir meu orçamento
                        <Icon name="ArrowRight" className="h-4 w-4" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-slate-400">
                    Prefere o WhatsApp? Use o botão verde no canto da tela.
                  </p>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
