"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { linhaPorSlug, produtosDaLinha, type LinhaSlug } from "@/data/catalogo";
import { ProductCard } from "./ProductCard";

/** Carrossel horizontal de uma linha, no formato das vitrines da Bold. */
export function LineCarousel({ slug, titulo }: { slug: LinhaSlug; titulo?: string }) {
  const l = linhaPorSlug(slug)!;
  const itens = produtosDaLinha(slug);
  const trilho = useRef<HTMLUListElement>(null);
  const [pos, setPos] = useState({ inicio: true, fim: false });

  const atualiza = () => {
    const el = trilho.current;
    if (!el) return;
    setPos({ inicio: el.scrollLeft < 8, fim: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  };
  useEffect(atualiza, []);

  const passo = (dir: 1 | -1) => {
    const el = trilho.current;
    if (!el) return;
    const card = el.querySelector("li");
    const w = card ? card.getBoundingClientRect().width + 20 : el.clientWidth;
    el.scrollBy({ left: dir * w * Math.max(1, Math.floor(el.clientWidth / w)), behavior: "smooth" });
  };

  const href = slug === "food-service" ? "/food-service" : `/produtos/${slug}`;
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6" aria-labelledby={`t-${slug}`}>
      <div className="text-center">
        <h2 id={`t-${slug}`} className="font-display text-[clamp(2.2rem,5vw,3.4rem)] uppercase leading-none">{titulo ?? l.nome}</h2>
        <p className="mt-2 font-script text-xl" style={{ color: l.cor === "#111111" ? "#8A6420" : l.cor }}>{l.slogan}</p>
      </div>
      <div className="relative mt-8">
        <ul
          ref={trilho}
          onScroll={atualiza}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:thin]"
          aria-label={`Produtos ${l.nome}`}
        >
          {itens.map((p) => (
            <li key={p.id} className="w-[72%] shrink-0 snap-start sm:w-[44%] md:w-[30%] lg:w-[23%]">
              <ProductCard p={p} />
            </li>
          ))}
        </ul>
        {!pos.inicio && (
          <button type="button" onClick={() => passo(-1)} aria-label="Ver anteriores" className="absolute -left-3 top-[100px] z-10 hidden size-12 place-items-center rounded-full border-[3px] border-ink bg-red text-xl font-black text-white shadow-[3px_3px_0_#141010] sm:grid">‹</button>
        )}
        {!pos.fim && (
          <button type="button" onClick={() => passo(1)} aria-label="Ver mais" className="absolute -right-3 top-[100px] z-10 hidden size-12 place-items-center rounded-full border-[3px] border-ink bg-red text-xl font-black text-white shadow-[3px_3px_0_#141010] sm:grid">›</button>
        )}
      </div>
      <div className="mt-4 text-center">
        <Link href={href} className="btn btn-solid">Ver toda a linha {l.curto}</Link>
      </div>
    </section>
  );
}
