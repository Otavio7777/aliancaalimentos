"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { produtoPorId } from "@/data/catalogo";

type Itens = Record<string, number>;
type Ctx = {
  itens: Itens;
  pronto: boolean;
  set: (id: string, cx: number) => void;
  add: (id: string) => void;
  limpar: () => void;
  totalCaixas: number;
  totalItens: number;
};

const QuoteCtx = createContext<Ctx | null>(null);
const KEY = "alianca-cotacao-v1";

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<Itens>({});
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Itens;
        const valido: Itens = {};
        for (const [id, n] of Object.entries(parsed)) if (produtoPorId(id) && n > 0) valido[id] = Math.min(999, Math.floor(n));
        setItens(valido);
      }
    } catch {}
    setPronto(true);
  }, []);

  useEffect(() => {
    if (!pronto) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(itens));
    } catch {}
  }, [itens, pronto]);

  const set = useCallback((id: string, cx: number) => {
    setItens((cur) => {
      const n = { ...cur };
      if (cx <= 0) delete n[id];
      else n[id] = Math.min(999, cx);
      return n;
    });
  }, []);
  const add = useCallback((id: string) => setItens((cur) => ({ ...cur, [id]: (cur[id] ?? 0) + 1 })), []);
  const limpar = useCallback(() => setItens({}), []);

  const value = useMemo(
    () => ({
      itens,
      pronto,
      set,
      add,
      limpar,
      totalCaixas: Object.values(itens).reduce((a, b) => a + b, 0),
      totalItens: Object.keys(itens).length,
    }),
    [itens, pronto, set, add, limpar],
  );
  return <QuoteCtx.Provider value={value}>{children}</QuoteCtx.Provider>;
}

export function useQuote() {
  const c = useContext(QuoteCtx);
  if (!c) throw new Error("useQuote fora do QuoteProvider");
  return c;
}

/** Botão "adicionar" que vira seletor de caixas quando o item já está na cotação. */
export function AddToQuote({ id, nome, tom = "claro" }: { id: string; nome: string; tom?: "claro" | "escuro" }) {
  const { itens, set, add } = useQuote();
  const n = itens[id] ?? 0;
  const borda = tom === "escuro" ? "border-white text-white" : "border-ink text-ink";
  if (!n)
    return (
      <button
        type="button"
        onClick={() => add(id)}
        className={`w-full rounded-full border-[3px] px-3 py-2 text-sm font-extrabold transition-colors hover:bg-ink hover:text-white ${borda}`}
      >
        Adicionar à cotação
      </button>
    );
  return (
    <div className="flex w-full items-center justify-between gap-2" role="group" aria-label={`Caixas de ${nome}`}>
      <button
        type="button"
        onClick={() => set(id, n - 1)}
        aria-label={`Tirar uma caixa de ${nome}`}
        className={`grid size-10 place-items-center rounded-full border-[3px] text-lg font-black ${borda}`}
      >
        −
      </button>
      <span className={`text-sm font-extrabold ${tom === "escuro" ? "text-white" : ""}`} aria-live="polite">
        {n} {n > 1 ? "caixas" : "caixa"}
      </span>
      <button
        type="button"
        onClick={() => set(id, n + 1)}
        aria-label={`Mais uma caixa de ${nome}`}
        className={`grid size-10 place-items-center rounded-full border-[3px] text-lg font-black ${borda}`}
      >
        +
      </button>
    </div>
  );
}
