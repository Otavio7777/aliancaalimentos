"use client";

import { useMemo, useState } from "react";
import { canalTexto, gramaturas, linhas, nomeProduto, produtos, type Canal, type LinhaSlug, type Produto } from "@/data/catalogo";
import { ProductCard } from "./ProductCard";

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

type F = { linha: LinhaSlug | null; g: number | null; canal: Canal | null; q: string };

export function CatalogBrowser({ inicial }: { inicial?: Partial<F> }) {
  const [f, setF] = useState<F>({ linha: null, g: null, canal: null, q: "", ...inicial });

  const casa = (p: Produto, ignora?: keyof F) =>
    (ignora === "linha" || !f.linha || p.linha === f.linha) &&
    (ignora === "g" || !f.g || p.gramatura === f.g) &&
    (ignora === "canal" || !f.canal || p.canal === f.canal) &&
    (!f.q || norm(`${nomeProduto(p)} ${p.embalagem}`).includes(norm(f.q)));

  const lista = useMemo(() => produtos.filter((p) => casa(p)), [f]); // eslint-disable-line react-hooks/exhaustive-deps
  const conta = (k: keyof F, test: (p: Produto) => boolean) => produtos.filter((p) => casa(p, k) && test(p)).length;
  const temFiltro = f.linha || f.g || f.canal || f.q;

  const Chip = ({ ativo, onClick, children, n }: { ativo: boolean; onClick: () => void; children: React.ReactNode; n: number }) => (
    <button
      type="button"
      aria-pressed={ativo}
      onClick={onClick}
      disabled={!ativo && n === 0}
      className="rounded-full border-2 border-ink px-3.5 py-1.5 text-sm font-extrabold transition-colors hover:bg-ink/5 disabled:cursor-not-allowed disabled:opacity-35 aria-pressed:bg-ink aria-pressed:text-white"
    >
      {children} <span className="font-medium opacity-70">{n}</span>
    </button>
  );

  return (
    <div>
      <div className="card-cat grid gap-4 p-4 sm:p-5" role="search" aria-label="Filtrar produtos">
        <fieldset>
          <legend className="mb-2 text-sm font-extrabold">Linha</legend>
          <div className="flex flex-wrap gap-2">
            <Chip ativo={!f.linha} onClick={() => setF({ ...f, linha: null })} n={conta("linha", () => true)}>
              Todas
            </Chip>
            {linhas.map((l) => (
              <Chip key={l.slug} ativo={f.linha === l.slug} onClick={() => setF({ ...f, linha: l.slug })} n={conta("linha", (p) => p.linha === l.slug)}>
                {l.curto}
              </Chip>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="mb-2 text-sm font-extrabold">Peso</legend>
          <div className="flex flex-wrap gap-2">
            <Chip ativo={!f.g} onClick={() => setF({ ...f, g: null })} n={conta("g", () => true)}>
              Todos
            </Chip>
            {gramaturas.map((g) => (
              <Chip key={g} ativo={f.g === g} onClick={() => setF({ ...f, g })} n={conta("g", (p) => p.gramatura === g)}>
                {g}g
              </Chip>
            ))}
          </div>
        </fieldset>
        <div className="flex flex-wrap items-end gap-4">
          <fieldset>
            <legend className="mb-2 text-sm font-extrabold">Canal</legend>
            <div className="flex flex-wrap gap-2">
              <Chip ativo={!f.canal} onClick={() => setF({ ...f, canal: null })} n={conta("canal", () => true)}>
                Todos
              </Chip>
              {(["varejo", "atacado"] as Canal[]).map((c) => (
                <Chip key={c} ativo={f.canal === c} onClick={() => setF({ ...f, canal: c })} n={conta("canal", (p) => p.canal === c)}>
                  {canalTexto(c)}
                </Chip>
              ))}
            </div>
          </fieldset>
          <label className="min-w-[220px] flex-1">
            <span className="mb-2 block text-sm font-extrabold">Buscar sabor</span>
            <input
              type="search"
              value={f.q}
              onChange={(e) => setF({ ...f, q: e.target.value })}
              placeholder="Ex.: bacon, extrafina, pouch"
              className="w-full rounded-xl border-2 border-ink bg-white px-3 py-2.5"
            />
          </label>
        </div>
      </div>

      <div className="my-6 flex flex-wrap items-center gap-3" aria-live="polite">
        <p className="font-extrabold">
          {lista.length} de {produtos.length} produtos
        </p>
        {temFiltro && (
          <button type="button" className="font-extrabold text-red-deep underline underline-offset-4" onClick={() => setF({ linha: null, g: null, canal: null, q: "" })}>
            Limpar filtros
          </button>
        )}
      </div>

      {lista.length ? (
        <ul className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {lista.map((p) => (
            <li key={p.id}>
              <ProductCard p={p} mostrarLinha />
            </li>
          ))}
        </ul>
      ) : (
        <div className="card-cat p-8 text-center">
          <p className="font-display text-2xl uppercase">Nenhum produto com esses filtros</p>
          <p className="mt-2 text-muted">Tire um filtro ou busque outro sabor.</p>
        </div>
      )}
    </div>
  );
}
