"use client";

import { useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Icon from "../Icon";
import { Badge } from "./ui";
import { brl } from "@/lib/painelConfig";
import {
  saveRecord,
  removeRecord,
  type ActionResult,
} from "@/lib/crudActions";

/* ==========================================================================
   CRUD MANAGER GENÉRICO
   Lista (cards/kanban), busca, filtro por status, criar/editar (modal),
   excluir, mudar status inline, converter (lead→cliente, etc.) e copiar texto.
   ========================================================================== */

export type CrudField = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "select" | "date" | "url" | "email" | "tel";
  options?: string[];
  required?: boolean;
  money?: boolean;
  full?: boolean;
  placeholder?: string;
};

export type CrudConvert = {
  label: string;
  whenStatus?: string;
  action: (id: string, path: string) => Promise<ActionResult>;
};

type Item = Record<string, any>;

export default function CrudManager({
  model,
  items,
  fields,
  titleKey,
  titleFallbackKey,
  subtitleKeys = [],
  columns = [],
  statusKey,
  statusOptions = [],
  searchKeys = [],
  newLabel = "Novo",
  emptyText = "Nenhum registro ainda.",
  convert,
  copyKey,
  linkKeys = [],
  canCreate = true,
  canDelete = true,
  kanban = false,
  extraFilter,
}: {
  model: "lead" | "client" | "project" | "budget" | "expense" | "user";
  items: Item[];
  fields: CrudField[];
  titleKey: string;
  titleFallbackKey?: string;
  subtitleKeys?: string[];
  columns?: string[];
  statusKey?: string;
  statusOptions?: string[];
  searchKeys?: string[];
  newLabel?: string;
  emptyText?: string;
  convert?: CrudConvert;
  copyKey?: string;
  linkKeys?: string[];
  canCreate?: boolean;
  canDelete?: boolean;
  kanban?: boolean;
  extraFilter?: { key: string; options: string[]; allLabel?: string };
}) {
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todos");
  const [filter2, setFilter2] = useState("Todos");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const fieldByKey = useMemo(
    () => Object.fromEntries(fields.map((f) => [f.key, f])),
    [fields]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((it) => {
      if (statusKey && filter !== "Todos" && it[statusKey] !== filter) return false;
      if (extraFilter && filter2 !== "Todos" && it[extraFilter.key] !== filter2) return false;
      if (q && !searchKeys.some((k) => String(it[k] ?? "").toLowerCase().includes(q)))
        return false;
      return true;
    });
  }, [items, search, filter, filter2, statusKey, searchKeys, extraFilter]);

  function fmt(key: string, value: any): string {
    const f = fieldByKey[key];
    if (value === null || value === undefined || value === "") return "—";
    if (f?.money) return brl(Number(value));
    return String(value);
  }

  function openNew() {
    setEditItem(null);
    setError("");
    setOpen(true);
  }
  function openEdit(it: Item) {
    setEditItem(it);
    setError("");
    setOpen(true);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data: Record<string, unknown> = {};
    for (const f of fields) {
      const raw = fd.get(f.key);
      if (f.type === "number" || f.money) {
        data[f.key] = raw === null || raw === "" ? 0 : Number(String(raw).replace(",", "."));
      } else {
        data[f.key] = raw === null ? "" : String(raw);
      }
    }
    setBusy(true);
    setError("");
    const res = await saveRecord(model, editItem?.id ?? null, data, path);
    setBusy(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    setOpen(false);
    router.refresh();
  }

  async function handleDelete(it: Item) {
    if (!confirm("Tem certeza que deseja excluir este registro?")) return;
    await removeRecord(model, it.id, path);
    router.refresh();
  }

  async function handleStatus(it: Item, value: string) {
    if (!statusKey) return;
    await saveRecord(model, it.id, { [statusKey]: value }, path);
    router.refresh();
  }

  async function handleConvert(it: Item) {
    if (!convert) return;
    setBusy(true);
    await convert.action(it.id, path);
    setBusy(false);
    router.refresh();
  }

  function handleCopy(text: string, id: string) {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 1800);
    });
  }

  const showConvert = (it: Item) =>
    convert && (!convert.whenStatus || (statusKey && it[statusKey] === convert.whenStatus));

  /* --- Card de um item --------------------------------------------------- */
  function ItemCard({ it }: { it: Item }) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-4 transition-colors dark:border-white/10 dark:bg-white/5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="truncate font-semibold text-deep-950 dark:text-white">
                {it[titleKey] || (titleFallbackKey ? it[titleFallbackKey] : "") || "—"}
              </p>
              {statusKey ? <Badge>{it[statusKey]}</Badge> : null}
            </div>
            {subtitleKeys.length > 0 ? (
              <p className="mt-0.5 truncate text-sm text-slate-500 dark:text-slate-400">
                {subtitleKeys.map((k) => fmt(k, it[k])).filter((v) => v !== "—").join(" · ") || "—"}
              </p>
            ) : null}
            {columns.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                {columns.map((k) => (
                  <span key={k}>
                    <span className="text-slate-400 dark:text-slate-500">{fieldByKey[k]?.label || k}:</span>{" "}
                    <span className="text-slate-600 dark:text-slate-300">{fmt(k, it[k])}</span>
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {statusKey && statusOptions.length > 0 ? (
              <select
                value={it[statusKey] || ""}
                onChange={(e) => handleStatus(it, e.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs text-deep-900 outline-none dark:border-white/15 dark:bg-deep-950/40 dark:text-white"
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            ) : null}

            {linkKeys.map((k) =>
              it[k] ? (
                <a
                  key={k}
                  href={it[k]}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={fieldByKey[k]?.label || k}
                  className="grid h-8 w-8 place-items-center rounded-lg border border-slate-300 text-slate-500 transition hover:bg-slate-100 dark:border-white/15 dark:text-slate-300 dark:hover:bg-white/10"
                >
                  <Icon name="ExternalLink" className="h-4 w-4" />
                </a>
              ) : null
            )}

            {copyKey && it[copyKey] ? (
              <button
                type="button"
                onClick={() => handleCopy(it[copyKey], it.id)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100 dark:border-white/15 dark:text-slate-300 dark:hover:bg-white/10"
              >
                <Icon name={copied === it.id ? "Check" : "Copy"} className="h-3.5 w-3.5" />
                {copied === it.id ? "Copiado" : "Copiar"}
              </button>
            ) : null}

            {showConvert(it) ? (
              <button
                type="button"
                onClick={() => handleConvert(it)}
                disabled={busy}
                className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-accent-dark disabled:opacity-60"
              >
                <Icon name="ArrowRight" className="h-3.5 w-3.5" />
                {convert!.label}
              </button>
            ) : null}

            <button
              type="button"
              onClick={() => openEdit(it)}
              aria-label="Editar"
              className="grid h-8 w-8 place-items-center rounded-lg border border-slate-300 text-slate-500 transition hover:bg-slate-100 dark:border-white/15 dark:text-slate-300 dark:hover:bg-white/10"
            >
              <Icon name="Pencil" className="h-4 w-4" />
            </button>
            {canDelete ? (
              <button
                type="button"
                onClick={() => handleDelete(it)}
                aria-label="Excluir"
                className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-rose-500/10 hover:text-rose-500"
              >
                <Icon name="Trash2" className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Barra de ações: busca + filtro + novo */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          {searchKeys.length > 0 ? (
            <div className="relative flex-1 sm:max-w-xs">
              <Icon
                name="Search"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar…"
                className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-deep-900 outline-none transition focus:border-accent dark:border-white/15 dark:bg-white/5 dark:text-white"
              />
            </div>
          ) : null}
          {statusKey && statusOptions.length > 0 ? (
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-deep-900 outline-none dark:border-white/15 dark:bg-white/5 dark:text-white"
            >
              <option value="Todos">Todos os status</option>
              {statusOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          ) : null}
          {extraFilter ? (
            <select
              value={filter2}
              onChange={(e) => setFilter2(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-deep-900 outline-none dark:border-white/15 dark:bg-white/5 dark:text-white"
            >
              <option value="Todos">{extraFilter.allLabel || "Todas as categorias"}</option>
              {extraFilter.options.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          ) : null}
        </div>
        {canCreate ? (
          <button
            type="button"
            onClick={openNew}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-deep-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-deep-800 dark:bg-white dark:text-deep-950 dark:hover:bg-slate-200"
          >
            <Icon name="Plus" className="h-4 w-4" />
            {newLabel}
          </button>
        ) : null}
      </div>

      {/* Lista */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-white/15 dark:bg-white/5">
          <Icon name="Inbox" className="mx-auto h-8 w-8 text-slate-300 dark:text-white/20" strokeWidth={1.5} />
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            {items.length === 0 ? emptyText : "Nenhum resultado para o filtro/busca."}
          </p>
        </div>
      ) : kanban && statusKey ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {statusOptions.map((s) => {
            const col = filtered.filter((it) => it[statusKey] === s);
            if (col.length === 0) return null;
            return (
              <div key={s} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-3 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="mb-3 flex items-center justify-between px-1">
                  <Badge>{s}</Badge>
                  <span className="text-xs text-slate-400">{col.length}</span>
                </div>
                <div className="space-y-3">
                  {col.map((it) => (
                    <ItemCard key={it.id} it={it} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((it) => (
            <ItemCard key={it.id} it={it} />
          ))}
        </div>
      )}

      {/* Modal de criar/editar */}
      {open ? (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-deep-950/60 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-soft-lg dark:border-white/10 dark:bg-deep-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-deep-950 dark:text-white">
                {editItem ? "Editar" : newLabel}
              </h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10"
              >
                <Icon name="X" className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 grid gap-4 sm:grid-cols-2">
              {fields.map((f) => {
                const val = editItem?.[f.key] ?? "";
                const cls =
                  "w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-deep-950 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30 dark:border-white/15 dark:bg-deep-950/40 dark:text-white";
                return (
                  <label
                    key={f.key}
                    className={`block ${f.full || f.type === "textarea" ? "sm:col-span-2" : ""}`}
                  >
                    <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
                      {f.label}
                      {f.required ? <span className="text-rose-500"> *</span> : null}
                    </span>
                    {f.type === "textarea" ? (
                      <textarea
                        name={f.key}
                        defaultValue={val}
                        required={f.required}
                        rows={3}
                        placeholder={f.placeholder}
                        className={cls}
                      />
                    ) : f.type === "select" ? (
                      <select name={f.key} defaultValue={val || f.options?.[0]} className={cls}>
                        {f.options?.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        name={f.key}
                        type={f.type === "number" || f.money ? "number" : f.type || "text"}
                        step={f.money || f.type === "number" ? "0.01" : undefined}
                        defaultValue={val}
                        required={f.required}
                        placeholder={f.placeholder}
                        className={cls}
                      />
                    )}
                  </label>
                );
              })}

              {error ? (
                <p className="sm:col-span-2 rounded-lg bg-rose-500/10 px-3 py-2 text-sm text-rose-500">
                  {error}
                </p>
              ) : null}

              <div className="sm:col-span-2 mt-1 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:border-white/15 dark:text-slate-300 dark:hover:bg-white/10"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={busy}
                  className="rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-white transition hover:bg-accent-dark disabled:opacity-60"
                >
                  {busy ? "Salvando…" : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
