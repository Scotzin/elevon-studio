import Icon from "@/components/Icon";
import { wallpapers } from "@/lib/wallpapers";

export default function WallpapersPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-deep-950 dark:text-white">Wallpapers da Elevon</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Baixe e deixe seu PC com a cara da Elevon.
        </p>
      </div>

      {/* Aviso honesto sobre o "trocar automático" */}
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-200">
        <Icon name="Monitor" className="mt-0.5 h-5 w-5 shrink-0" />
        <p>
          Por segurança, o navegador <strong>não troca o papel de parede do PC sozinho</strong>. É rapidinho:
          clique em <strong>Baixar</strong> e depois defina no seu computador (passo a passo em cada wallpaper).
        </p>
      </div>

      {wallpapers.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-white/15 dark:bg-white/5">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-slate-400 dark:bg-white/10">
            <Icon name="Image" className="h-6 w-6" />
          </span>
          <p className="mt-4 font-semibold text-deep-950 dark:text-white">Nenhum wallpaper ainda</p>
          <p className="mx-auto mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
            Coloque as imagens em <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-white/10">/public/wallpapers/</code>{" "}
            e cadastre em <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-white/10">lib/wallpapers.ts</code>.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wallpapers.map((w) => (
            <div
              key={w.file}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft dark:border-white/10 dark:bg-white/5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/wallpapers/${w.file}`}
                alt={w.name}
                loading="lazy"
                className="aspect-video w-full object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-deep-950 dark:text-white">{w.name}</p>
                    {w.size ? <p className="text-xs text-slate-500 dark:text-slate-400">{w.size}</p> : null}
                  </div>
                  <a
                    href={`/wallpapers/${w.file}`}
                    download={w.file}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-accent-dark"
                  >
                    <Icon name="Download" className="h-3.5 w-3.5" />
                    Baixar
                  </a>
                </div>

                <details className="group/d mt-3">
                  <summary className="flex cursor-pointer list-none items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-deep-900 dark:text-slate-400 dark:hover:text-white">
                    <Icon name="ChevronDown" className="h-3.5 w-3.5 transition group-open/d:rotate-180" />
                    Como definir no PC
                  </summary>
                  <div className="mt-2 space-y-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    <p>
                      <strong>Windows:</strong> botão direito no arquivo baixado → “Definir como plano de fundo da
                      área de trabalho”.
                    </p>
                    <p>
                      <strong>Mac:</strong> botão direito na imagem → “Definir Imagem da Mesa” (ou Ajustes →
                      Papel de Parede).
                    </p>
                  </div>
                </details>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
