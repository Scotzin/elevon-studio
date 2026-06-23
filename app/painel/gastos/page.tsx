import { prisma } from "@/lib/prisma";
import Icon from "@/components/Icon";
import { addExpense, updateExpense, deleteExpense } from "./actions";

export const dynamic = "force-dynamic";

const CATEGORIES = ["IA", "Anúncios", "Domínio", "Impostos", "Outros"];
const RECURRENCES = ["mensal", "anual", "única"];

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// Quanto cada gasto representa POR MÊS (anual é dividido por 12).
function monthlyCost(e: { amount: number; recurrence: string }) {
  if (e.recurrence === "mensal") return e.amount;
  if (e.recurrence === "anual") return e.amount / 12;
  return 0; // "única" não entra no custo recorrente
}

export default async function GastosPage() {
  const expenses = await prisma.expense.findMany({
    orderBy: [{ category: "asc" }, { createdAt: "asc" }],
  });

  const monthlyTotal = expenses.reduce((s, e) => s + monthlyCost(e), 0);
  const yearlyTotal = monthlyTotal * 12;

  // Agrupa por categoria
  const byCategory = new Map<string, typeof expenses>();
  for (const e of expenses) {
    if (!byCategory.has(e.category)) byCategory.set(e.category, []);
    byCategory.get(e.category)!.push(e);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-deep-950 dark:text-white">
          Gastos da empresa
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Custos fixos e variáveis. Edite os valores e o total se atualiza
          sozinho. (Gastos anuais entram no total mensal divididos por 12.)
        </p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-white/5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent">
            <Icon name="Wallet" className="h-5 w-5" />
          </span>
          <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Custo mensal estimado
          </p>
          <p className="mt-1 text-3xl font-bold text-deep-950 dark:text-white">
            {brl(monthlyTotal)}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-white/5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent">
            <Icon name="TrendingUp" className="h-5 w-5" />
          </span>
          <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Custo anual estimado
          </p>
          <p className="mt-1 text-3xl font-bold text-deep-950 dark:text-white">
            {brl(yearlyTotal)}
          </p>
        </div>
      </div>

      {/* Adicionar gasto */}
      <form
        action={addExpense}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/5"
      >
        <h2 className="flex items-center gap-2 text-base font-bold text-deep-950 dark:text-white">
          <Icon name="PlusCircle" className="h-5 w-5 text-accent" />
          Adicionar gasto
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
          <input
            name="name"
            required
            placeholder="Nome (ex.: Canva Pro)"
            className="rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-deep-950 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30 dark:border-white/15 dark:bg-deep-950/40 dark:text-white"
          />
          <select
            name="category"
            defaultValue="Outros"
            className="rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-deep-950 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30 dark:border-white/15 dark:bg-deep-950/40 dark:text-white"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            name="amount"
            type="number"
            step="0.01"
            min="0"
            placeholder="0,00"
            className="rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-deep-950 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30 dark:border-white/15 dark:bg-deep-950/40 dark:text-white"
          />
          <select
            name="recurrence"
            defaultValue="mensal"
            className="rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-deep-950 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30 dark:border-white/15 dark:bg-deep-950/40 dark:text-white"
          >
            {RECURRENCES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-xl bg-deep-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-deep-800 dark:bg-white dark:text-deep-950 dark:hover:bg-slate-200"
          >
            Adicionar
          </button>
        </div>
      </form>

      {/* Lista por categoria */}
      {expenses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-white/15 dark:bg-white/5">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Nenhum gasto cadastrado ainda. Adicione o primeiro acima.
          </p>
        </div>
      ) : (
        Array.from(byCategory.entries()).map(([cat, items]) => {
          const subtotal = items.reduce((s, e) => s + monthlyCost(e), 0);
          return (
            <div
              key={cat}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-white/10">
                <h3 className="font-bold text-deep-950 dark:text-white">{cat}</h3>
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  {brl(subtotal)}/mês
                </span>
              </div>
              <ul className="divide-y divide-slate-100 dark:divide-white/10">
                {items.map((e) => (
                  <li
                    key={e.id}
                    className="flex flex-wrap items-center gap-3 px-6 py-4"
                  >
                    <div className="min-w-[8rem] flex-1">
                      <p className="font-medium text-deep-950 dark:text-white">
                        {e.name}
                      </p>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {e.recurrence}
                      </span>
                    </div>

                    {/* Editar valor */}
                    <form
                      action={updateExpense}
                      className="flex items-center gap-2"
                    >
                      <input type="hidden" name="id" value={e.id} />
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        R$
                      </span>
                      <input
                        name="amount"
                        type="number"
                        step="0.01"
                        min="0"
                        defaultValue={e.amount}
                        className="w-28 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-deep-950 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30 dark:border-white/15 dark:bg-deep-950/40 dark:text-white"
                      />
                      <button
                        type="submit"
                        className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-deep-900 transition hover:bg-slate-100 dark:border-white/15 dark:text-white dark:hover:bg-white/10"
                      >
                        Salvar
                      </button>
                    </form>

                    {/* Remover */}
                    <form action={deleteExpense}>
                      <input type="hidden" name="id" value={e.id} />
                      <button
                        type="submit"
                        aria-label={`Remover ${e.name}`}
                        className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 transition hover:bg-signal/10 hover:text-signal"
                      >
                        <Icon name="Trash2" className="h-4 w-4" />
                      </button>
                    </form>
                  </li>
                ))}
              </ul>
            </div>
          );
        })
      )}
    </div>
  );
}
