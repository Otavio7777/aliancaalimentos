"use client";

import Link from "next/link";
import { useState } from "react";
import { nomeProduto, produtoPorId } from "@/data/catalogo";
import { Pack } from "./Pack";
import { AddToQuote } from "./Quote";

const versoes = [
  { g: 45, rotulo: "45g", sub: "para o dia a dia", id: "lisa-costelinha-barbecue-45g" },
  { g: 150, rotulo: "150g", sub: "para compartilhar", id: "lisa-costelinha-barbecue-150g" },
];

/** Bloco "duas versões" no formato da Bold, aplicado à Batata Chips Lisa. */
export function VersionToggle() {
  const [v, setV] = useState(0);
  const p = produtoPorId(versoes[v].id)!;
  return (
    <section className="border-y-[3px] border-ink bg-[#111111] text-white" aria-labelledby="t-versoes">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2">
        <div>
          <span className="inline-block rounded-full bg-gold px-3 py-1 text-sm font-extrabold text-ink">Batata Chips Lisa</span>
          <h2 id="t-versoes" className="mt-4 font-display text-[clamp(2.6rem,6vw,4.2rem)] uppercase leading-[0.92]">
            5 sabores em <span className="text-gold">duas versões</span>
          </h2>
          <p className="mt-3 font-script text-2xl text-gold">Lisa, macia e cheia de sabor.</p>
          <div role="radiogroup" aria-label="Escolha a versão" className="mt-6 inline-flex rounded-2xl border-[3px] border-gold p-1.5">
            {versoes.map((x, k) => (
              <button
                key={x.g}
                type="button"
                role="radio"
                aria-checked={k === v}
                onClick={() => setV(k)}
                className="rounded-xl px-6 py-2 text-center aria-checked:bg-gold aria-checked:text-ink"
              >
                <span className="block font-display text-2xl">{x.rotulo}</span>
                <span className="block text-xs font-bold">{x.sub}</span>
              </button>
            ))}
          </div>
          <p className="mt-4 text-white/80">Original, Creme de Cebola, Costelinha com Barbecue, Frango Grelhado e Cheddar e Bacon.</p>
        </div>
        <div className="text-center">
          <div key={p.id} className="mx-auto h-72 animate-[entra_.4s_ease-out] sm:h-96">
            <Pack p={p} sizes="(min-width: 768px) 320px, 60vw" />
          </div>
          <p className="mt-4 font-extrabold uppercase text-gold">{nomeProduto(p)} · caixa: consulte-nos</p>
          <div className="mx-auto mt-3 max-w-xs">
            <AddToQuote id={p.id} nome={nomeProduto(p)} tom="escuro" />
          </div>
          <Link href="/produtos/batata-chips-lisa" className="mt-3 inline-block font-bold underline underline-offset-4">Ver os 10 itens da linha</Link>
        </div>
      </div>
      <style>{`@keyframes entra{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}
