import { WhatsAppIcon } from "./ui";

/**
 * SiteMockup: ilustracao de um site dentro de um navegador + um celular,
 * feita 100% com CSS (sem imagens). Da o ar de "preview" na primeira dobra.
 */
export default function SiteMockup() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      {/* Brilho de fundo */}
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-deep-100 via-white to-accent/10 blur-2xl" />

      {/* JANELA DO NAVEGADOR */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft-lg">
        {/* barra superior do navegador */}
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-slate-300" />
          <span className="h-3 w-3 rounded-full bg-slate-300" />
          <span className="h-3 w-3 rounded-full bg-slate-300" />
          <div className="ml-3 hidden h-6 flex-1 items-center rounded-md bg-white px-3 text-[10px] font-medium text-slate-400 sm:flex">
            seunegocio.com.br
          </div>
        </div>

        {/* conteudo do mini-site */}
        <div className="space-y-4 p-5">
          {/* header do mini-site */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-deep-900" />
              <div className="h-2.5 w-20 rounded-full bg-slate-200" />
            </div>
            <div className="hidden gap-2 sm:flex">
              <div className="h-2 w-10 rounded-full bg-slate-200" />
              <div className="h-2 w-10 rounded-full bg-slate-200" />
              <div className="h-2 w-10 rounded-full bg-slate-200" />
            </div>
          </div>

          {/* hero do mini-site */}
          <div className="rounded-xl bg-gradient-to-br from-deep-900 to-deep-700 p-5">
            <div className="h-2.5 w-3/4 rounded-full bg-white/80" />
            <div className="mt-2 h-2.5 w-1/2 rounded-full bg-white/40" />
            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-2">
                <WhatsAppIcon className="h-3 w-3 text-white" />
                <div className="h-1.5 w-12 rounded-full bg-white/90" />
              </div>
              <div className="h-7 w-16 rounded-lg border border-white/30" />
            </div>
          </div>

          {/* cards do mini-site */}
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-lg border border-slate-100 bg-slate-50 p-3"
              >
                <div className="h-6 w-6 rounded-md bg-deep-100" />
                <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200" />
                <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CELULAR flutuante (canto inferior direito) */}
      <div className="absolute -bottom-8 -right-2 w-28 animate-float rounded-[1.75rem] border border-slate-200 bg-white p-1.5 shadow-soft-lg sm:-right-6 sm:w-36">
        <div className="overflow-hidden rounded-[1.35rem] bg-white">
          <div className="bg-gradient-to-br from-deep-900 to-deep-700 p-3">
            <div className="mx-auto h-1 w-8 rounded-full bg-white/30" />
            <div className="mt-3 h-1.5 w-3/4 rounded-full bg-white/80" />
            <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-white/40" />
          </div>
          <div className="space-y-2 p-3">
            <div className="flex items-center gap-1.5 rounded-md bg-accent px-2 py-1.5">
              <WhatsAppIcon className="h-2.5 w-2.5 text-white" />
              <div className="h-1 w-10 rounded-full bg-white/90" />
            </div>
            <div className="h-8 rounded-md bg-slate-100" />
            <div className="h-8 rounded-md bg-slate-100" />
          </div>
        </div>
      </div>

      {/* Selo flutuante "100% responsivo" */}
      <div className="absolute -left-3 top-6 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-soft sm:-left-6">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent/10 text-accent">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth={2}>
              <rect x="5" y="2" width="14" height="20" rx="2" />
              <path d="M12 18h.01" />
            </svg>
          </span>
          <div>
            <p className="text-[10px] font-bold leading-tight text-deep-950">100% responsivo</p>
            <p className="text-[9px] leading-tight text-slate-500">celular e desktop</p>
          </div>
        </div>
      </div>
    </div>
  );
}
