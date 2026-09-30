"use client";

import { useEffect, useMemo, useState } from "react";
import { categorias, gramaturas, linhas, produtos, type Categoria, type LinhaSlug } from "@/data/products";
import { ProductCard } from "./ProductCard";

type Filtros = { linha: LinhaSlug | ""; gramas: string; canal: Categoria | "" };

const vazio: Filtros = { linha: "", gramas: "", canal: "" };

export function ProductFilter() {
  const [f, setF] = useState<Filtros>(vazio);

  // lê filtros da URL (permite compartilhar links filtrados)
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setF({
      linha: (linhas.some((l) => l.slug === q.get("linha")) ? q.get("linha") : "") as Filtros["linha"],
      gramas: gramaturas.map(String).includes(q.get("gramatura") ?? "") ? (q.get("gramatura") as string) : "",
      canal: (q.get("canal") && q.get("canal")! in categorias ? q.get("canal") : "") as Filtros["canal"],
    });
  }, []);

  useEffect(() => {
    const q = new URLSearchParams();
    if (f.linha) q.set("linha", f.linha);
    if (f.gramas) q.set("gramatura", f.gramas);
    if (f.canal) q.set("canal", f.canal);
    const qs = q.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [f]);

  const lista = useMemo(
    () =>
      produtos.filter(
        (p) =>
          (!f.linha || p.linha === f.linha) &&
          (!f.gramas || String(p.gramas) === f.gramas) &&
          (!f.canal || p.categoria === f.canal),
      ),
    [f],
  );

  const select =
    "mt-1 block w-full rounded-xl border-0 bg-white px-3 py-3 text-base font-semibold shadow-sm ring-1 ring-black/15 focus:ring-2 focus:ring-red";

  return (
    <div>
      <form
        role="search"
        aria-label="Filtrar produtos"
        className="grid gap-4 rounded-3xl bg-juta p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="text-sm font-bold">
          Linha
          <select className={select} value={f.linha} onChange={(e) => setF({ ...f, linha: e.target.value as Filtros["linha"] })}>
            <option value="">Todas as linhas</option>
            {linhas.map((l) => (
              <option key={l.slug} value={l.slug}>
                {l.nome}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-bold">
          Gramatura
          <select className={select} value={f.gramas} onChange={(e) => setF({ ...f, gramas: e.target.value })}>
            <option value="">Todas</option>
            {gramaturas.map((g) => (
              <option key={g} value={g}>
                {g}g
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-bold">
          Canal
          <select className={select} value={f.canal} onChange={(e) => setF({ ...f, canal: e.target.value as Filtros["canal"] })}>
            <option value="">Todos os canais</option>
            {Object.entries(categorias).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={() => setF(vazio)}
          className="min-h-12 rounded-full px-5 font-bold text-red ring-2 ring-inset ring-red hover:bg-red hover:text-white"
        >
          Limpar filtros
        </button>
      </form>

      <p className="mt-6 text-sm font-semibold text-ink/75" role="status" aria-live="polite">
        {lista.length} {lista.length === 1 ? "produto encontrado" : "produtos encontrados"}
      </p>

      {lista.length ? (
        <ul className="mt-4 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {lista.map((p) => (
            <li key={p.id}>
              <ProductCard produto={p} headingLevel="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 rounded-3xl bg-white p-10 text-center text-lg">Nenhum produto com essa combinação. Tente outros filtros.</p>
      )}
    </div>
  );
}
