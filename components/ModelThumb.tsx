import Icon from "./Icon";
import { WhatsAppIcon } from "./ui";

/* ==========================================================================
   MINIATURA DO MODELO (mockup dentro de uma moldura de navegador)
   --------------------------------------------------------------------------
   Desenhada 100% em CSS para parecer um mini-site real. Quando você tiver um
   PRINT de verdade, basta preencher o campo "image" do modelo em lib/site.ts
   (ex.: "/modelos/barbearia.png") que a imagem aparece no lugar do mockup.
   ========================================================================== */
export default function ModelThumb({
  icon,
  name,
  image,
}: {
  icon: string;
  name: string;
  image?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Barra do navegador */}
      <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-slate-300" />
        <span className="h-2 w-2 rounded-full bg-slate-300" />
        <span className="h-2 w-2 rounded-full bg-slate-300" />
        <span className="ml-2 hidden h-3 flex-1 rounded-full bg-white sm:block" />
      </div>

      {/* Se houver print real, mostra a imagem; senão, o mockup em CSS */}
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={`Prévia do modelo de site para ${name}`}
          className="aspect-[16/10] w-full object-cover object-top"
        />
      ) : (
        <div className="space-y-2.5 p-3">
          {/* Cabeçalho do mini-site: ícone do nicho + nome + botão WhatsApp */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="grid h-5 w-5 place-items-center rounded-md bg-deep-900 text-white">
                <Icon name={icon} className="h-3 w-3" />
              </span>
              <span className="h-1.5 w-12 rounded-full bg-slate-200" />
            </div>
            <span className="flex items-center gap-1 rounded-md bg-accent px-1.5 py-1">
              <WhatsAppIcon className="h-2 w-2 text-white" />
              <span className="h-1 w-4 rounded-full bg-white/80" />
            </span>
          </div>

          {/* Banda hero */}
          <div className="rounded-lg bg-gradient-to-br from-deep-900 to-deep-700 p-2.5">
            <div className="h-1.5 w-3/4 rounded-full bg-white/80" />
            <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-white/40" />
            <div className="mt-2 h-3 w-12 rounded-md bg-accent" />
          </div>

          {/* Linha de mini-cards */}
          <div className="grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-md border border-slate-100 bg-slate-50 p-1.5"
              >
                <div className="h-3 w-3 rounded bg-deep-100" />
                <div className="mt-1 h-1 w-full rounded-full bg-slate-200" />
                <div className="mt-0.5 h-1 w-2/3 rounded-full bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
