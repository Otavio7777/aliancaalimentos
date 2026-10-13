import { caixaTexto, canalTexto, linhaPorSlug, nomeProduto, type Produto } from "@/data/catalogo";
import { Pack } from "./Pack";
import { AddToQuote } from "./Quote";

export function ProductCard({ p, mostrarLinha = false }: { p: Produto; mostrarLinha?: boolean }) {
  const l = linhaPorSlug(p.linha)!;
  return (
    <article className="card-cat flex h-full flex-col overflow-hidden">
      <div className="flex h-56 items-center justify-center overflow-hidden px-3 py-4" style={{ background: l.cor }}>
        <div className="flex h-48 max-w-full justify-center">
          <Pack p={p} sizes="(min-width: 1024px) 180px, 38vw" className="max-w-full" />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1 border-t-[3px] border-ink p-4">
        <p className="text-xs font-extrabold uppercase tracking-wide text-muted">
          {mostrarLinha ? l.curto : p.embalagem || l.curto} · {p.gramatura}g
        </p>
        <h3 className="font-display text-xl uppercase leading-tight">{p.sabor}</h3>
        <p className="text-sm text-muted">
          {caixaTexto(p)} · {canalTexto(p.canal)}
        </p>
        <div className="mt-auto pt-3">
          <AddToQuote id={p.id} nome={nomeProduto(p)} />
        </div>
      </div>
    </article>
  );
}
