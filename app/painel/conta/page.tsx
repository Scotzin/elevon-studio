import { getCurrentUser } from "@/lib/session";
import ChangePassword from "@/components/painel/ChangePassword";
import Icon from "@/components/Icon";

export default async function ContaPage() {
  const user = await getCurrentUser();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-deep-950 dark:text-white">Minha conta</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Seus dados de acesso e segurança.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Dados da conta */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/5">
          <h2 className="flex items-center gap-2 text-lg font-bold text-deep-950 dark:text-white">
            <Icon name="Users" className="h-5 w-5 text-accent" />
            Conta
          </h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500 dark:text-slate-400">Nome</dt>
              <dd className="font-medium text-deep-900 dark:text-white">{user?.name}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500 dark:text-slate-400">Função</dt>
              <dd className="font-medium text-deep-900 dark:text-white">{user?.role}</dd>
            </div>
          </dl>

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-200">
            <p className="flex items-center gap-2 font-semibold">
              <Icon name="ShieldCheck" className="h-4 w-4" />
              Dica de segurança
            </p>
            <p className="mt-1.5 leading-relaxed">
              Se você ainda usa a senha padrão de quando o painel foi criado, troque por uma só sua
              aqui ao lado.
            </p>
          </div>
        </div>

        {/* Trocar senha */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/5">
          <h2 className="flex items-center gap-2 text-lg font-bold text-deep-950 dark:text-white">
            <Icon name="Lock" className="h-5 w-5 text-accent" />
            Trocar senha
          </h2>
          <p className="mt-1 mb-5 text-sm text-slate-500 dark:text-slate-400">
            Confirme a senha atual e escolha uma nova (mínimo 8 caracteres).
          </p>
          <ChangePassword />
        </div>
      </div>
    </div>
  );
}
