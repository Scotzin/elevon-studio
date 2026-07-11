"use client";

import { useEffect, useState } from "react";
import Icon from "../Icon";

/* ==========================================================================
   PERSONALIZADOR DA PRÉVIA (ferramenta da Elevon)
   --------------------------------------------------------------------------
   Botão flutuante que abre um formulário para preencher os dados do prospect
   (nome, cidade, cor, logo, slogan). Gera um LINK compartilhável com tudo na
   URL (o cliente abre e já vê o negócio dele) e também salva no navegador
   para reaproveitar. Não há backend: toda a personalização viaja na URL.
   ========================================================================== */

type Persona = { nome: string; cidade: string; cor: string; logo: string; slogan: string };

const STORAGE_KEY = "elevon:previa:persona";

const PRESET_CORES = [
  "#2563eb", "#0d9488", "#16a34a", "#db2777", "#e11d48",
  "#c2410c", "#c79a3a", "#7c3aed", "#dc2626", "#0891b2",
];

export default function PreviaCustomizer({
  nicho,
  plano,
  defaultAccent,
  current,
}: {
  nicho: string;
  plano: string;
  defaultAccent: string;
  current: Persona;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState<Persona>({
    nome: current.nome,
    cidade: current.cidade,
    cor: current.cor || defaultAccent,
    logo: current.logo,
    slogan: current.slogan,
  });

  // Se abriu uma prévia "limpa" (sem params), tenta reaproveitar o último
  // preenchimento salvo no navegador.
  useEffect(() => {
    const isEmpty = !current.nome && !current.cidade && !current.cor && !current.logo && !current.slogan;
    if (!isEmpty) return;
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (saved && typeof saved === "object") {
        setForm((f) => ({
          nome: saved.nome || f.nome,
          cidade: saved.cidade || f.cidade,
          cor: saved.cor || f.cor,
          logo: saved.logo || f.logo,
          slogan: saved.slogan || f.slogan,
        }));
      }
    } catch {
      /* ignora */
    }
  }, [current]);

  // Fecha com ESC.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const set = (k: keyof Persona, v: string) => setForm((f) => ({ ...f, [k]: v }));

  // Monta a query string com o que foi preenchido (cor só entra se != padrão).
  const buildQuery = () => {
    const p = new URLSearchParams();
    if (plano && plano !== "profissional") p.set("plano", plano);
    if (form.nome.trim()) p.set("nome", form.nome.trim());
    if (form.cidade.trim()) p.set("cidade", form.cidade.trim());
    if (form.cor && form.cor.toLowerCase() !== defaultAccent.toLowerCase()) p.set("cor", form.cor);
    if (form.logo.trim()) p.set("logo", form.logo.trim());
    if (form.slogan.trim()) p.set("slogan", form.slogan.trim());
    const qs = p.toString();
    return `/previa/${nicho}${qs ? `?${qs}` : ""}`;
  };

  const persist = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch {
      /* ignora */
    }
  };

  const gerar = () => {
    persist();
    window.location.href = buildQuery();
  };

  const copiar = async () => {
    persist();
    const url = `${window.location.origin}${buildQuery()}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* fallback simples */
      window.prompt("Copie o link da prévia:", url);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const limpar = () =>
    setForm({ nome: "", cidade: "", cor: defaultAccent, logo: "", slogan: "" });

  const logoValida = /^https?:\/\/[^\s]+$/i.test(form.logo.trim());

  return (
    <>
      {/* Botão flutuante */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full bg-deep-900 py-3.5 pl-4 pr-5 font-semibold text-white shadow-lg ring-1 ring-white/15 transition hover:scale-105"
      >
        <Icon name="Palette" className="h-5 w-5" />
        <span className="hidden text-sm sm:inline">Personalizar</span>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabeçalho */}
            <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
              <div>
                <p className="flex items-center gap-2 font-sans text-lg font-bold text-slate-900">
                  <Icon name="Palette" className="h-5 w-5 text-accent" />
                  Personalizar prévia
                </p>
                <p className="text-xs text-slate-500">Preencha e gere o link com o negócio do cliente.</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar"
                className="grid h-9 w-9 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <Icon name="X" className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5 px-6 py-5">
              {/* Nome */}
              <Field label="Nome do negócio">
                <input
                  value={form.nome}
                  onChange={(e) => set("nome", e.target.value)}
                  placeholder="Ex.: Barbearia do João"
                  maxLength={60}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-accent"
                />
              </Field>

              {/* Cidade */}
              <Field label="Cidade / endereço" hint="opcional">
                <input
                  value={form.cidade}
                  onChange={(e) => set("cidade", e.target.value)}
                  placeholder="Ex.: São Paulo — SP"
                  maxLength={60}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-accent"
                />
              </Field>

              {/* Cor */}
              <Field label="Cor de destaque">
                <div className="flex flex-wrap items-center gap-2">
                  {PRESET_CORES.map((c) => {
                    const active = form.cor.toLowerCase() === c.toLowerCase();
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => set("cor", c)}
                        aria-label={c}
                        className={`h-8 w-8 rounded-full ring-2 ring-offset-2 transition ${active ? "ring-slate-800" : "ring-transparent hover:ring-slate-300"}`}
                        style={{ backgroundColor: c }}
                      />
                    );
                  })}
                  <label className="ml-1 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-xs font-medium text-slate-600">
                    <input
                      type="color"
                      value={form.cor}
                      onChange={(e) => set("cor", e.target.value)}
                      className="h-5 w-5 cursor-pointer border-0 bg-transparent p-0"
                    />
                    {form.cor}
                  </label>
                </div>
              </Field>

              {/* Logo */}
              <Field label="URL da logo" hint="opcional — cole o link de uma imagem hospedada">
                <div className="flex items-center gap-3">
                  <input
                    value={form.logo}
                    onChange={(e) => set("logo", e.target.value)}
                    placeholder="https://…/logo.png"
                    className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-accent"
                  />
                  <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 text-slate-300">
                    {logoValida ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={form.logo} alt="logo" className="h-full w-full object-contain" />
                    ) : (
                      <Icon name="Image" className="h-5 w-5" />
                    )}
                  </span>
                </div>
              </Field>

              {/* Slogan */}
              <Field label="Slogan / frase do topo" hint="opcional — substitui o texto do hero">
                <textarea
                  value={form.slogan}
                  onChange={(e) => set("slogan", e.target.value)}
                  placeholder="Ex.: O melhor corte da cidade, sem fila e sem espera."
                  maxLength={160}
                  rows={2}
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-accent"
                />
              </Field>
            </div>

            {/* Rodapé de ações */}
            <div className="sticky bottom-0 flex flex-wrap items-center gap-2 border-t border-slate-100 bg-white px-6 py-4">
              <button
                type="button"
                onClick={gerar}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
              >
                <Icon name="Eye" className="h-4 w-4" />
                Ver prévia
              </button>
              <button
                type="button"
                onClick={copiar}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <Icon name={copied ? "Check" : "Copy"} className="h-4 w-4" />
                {copied ? "Link copiado!" : "Copiar link"}
              </button>
              <button
                type="button"
                onClick={limpar}
                className="rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:text-slate-600"
              >
                Limpar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 flex items-baseline gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
        {hint && <span className="font-normal normal-case tracking-normal text-slate-400">· {hint}</span>}
      </label>
      {children}
    </div>
  );
}
