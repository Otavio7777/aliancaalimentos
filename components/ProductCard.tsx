import { caixaDe, type Produto } from "@/data/products";
import { PackShot } from "./PackShot";

export function ProductCard({ produto, headingLevel = "h3" }: { produto: Produto; headingLevel?: "h2" | "h3" | "h4" }) {
  const H = headingLevel;
  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative px-6 pb-2 pt-6" style={{ backgroundColor: produto.corTema.bg }}>
        <div className="juta absolute inset-0 opacity-60" aria-hidden="true" />
        <PackShot produto={produto} className="relative mx-auto max-w-[180px] transition duration-500 group-hover:scale-[1.03]" />
        {produto.corSabor && (
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1.5" style={{ backgroundColor: produto.corSabor.base }} />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-ink/60">{produto.grupo}</p>
          <H className="mt-1 text-lg font-bold leading-tight">
            {produto.nome} <span className="block font-semibold text-ink/75">{produto.sabor}</span>
          </H>
        </div>
        <dl className="mt-auto grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-xl bg-juta/70 px-3 py-2">
            <dt className="text-xs text-ink/65">Gramatura</dt>
            <dd className="font-bold">{produto.gramatura}</dd>
          </div>
          <div className="rounded-xl bg-juta/70 px-3 py-2">
            <dt className="text-xs text-ink/65">Caixa</dt>
            <dd className="font-bold">{caixaDe(produto)}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
