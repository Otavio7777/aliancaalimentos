"use client";

import Link from "next/link";
import { useState } from "react";
import { linhas, produtoPorId, produtosDaLinha, caixaTexto, type Linha } from "@/data/catalogo";
import { Pack } from "./Pack";

const hrefLinha = (l: Linha) => (l.slug === "food-service" ? "/food-service" : `/produtos/${l.slug}`);

export function Showcase() {
  const [i, setI] = useState(0);
  const l = linhas[i];
  const capa = produtoPorId(l.capa)!;
  const itens = produtosDaLinha(l.slug);
  const outros = itens.filter((p) => p.id !== capa.id).slice(0, 3);
  const pesos = Array.from(new Set(itens.map((p) => p.gramatura))).sort((a, b) => a - b);

  const style = {
    "--t-bg": l.cor,
    "--t-ink": l.tinta,
    "--t-acc": l.destaque,
    "--t-acc-ink": l.destaqueTinta,
  } as React.CSSProperties;

  const ir = (n: number) => setI((n + linhas.length) % linhas.length);

  return (
    <section style={style} className="relative overflow-hidden bg-t-bg text-t-ink transition-colors duration-500" aria-label="Linhas Aliança">
      <span className="wordmark-bg hidden lg:block" aria-hidden="true">
        {l.curto}
      </span>
      <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-8 sm:px-6">
        <div role="tablist" aria-label="Escolha a linha" className="flex flex-wrap gap-2">
          {linhas.map((x, k) => (
            <button
              key={x.slug}
              type="button"
              role="tab"
              id={`tab-${x.slug}`}
              aria-selected={k === i}
              aria-controls="vitrine"
              tabIndex={k === i ? 0 : -1}
              onClick={() => setI(k)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                  const n = e.key === "ArrowRight" ? k + 1 : k - 1;
                  ir(n);
                  document.getElementById(`tab-${linhas[(n + linhas.length) % linhas.length].slug}`)?.focus();
                }
              }}
              className="rounded-full border-2 border-current px-4 py-2 text-sm font-extrabold opacity-90 transition-colors hover:opacity-100 aria-selected:bg-t-ink aria-selected:text-t-bg aria-selected:opacity-100"
            >
              {x.curto}
            </button>
          ))}
        </div>

        <div id="vitrine" role="tabpanel" aria-labelledby={`tab-${l.slug}`} className="mt-8 grid items-center gap-8 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="font-extrabold opacity-85">{String(i + 1).padStart(2, "0")} · {l.resumo}</p>
            <h1 className="mt-2 font-display text-[clamp(3rem,9vw,6.5rem)] uppercase leading-[0.9]">{l.nome}</h1>
            <p className="mt-4 font-script text-[clamp(1.5rem,3.4vw,2.2rem)] leading-tight text-t-acc">{l.slogan}</p>
            <p className="mt-4 max-w-lg text-lg opacity-90">{l.descricao}</p>
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              <div>
                <dt className="text-sm opacity-80">Itens</dt>
                <dd className="font-display text-3xl">{itens.length}</dd>
              </div>
              <div>
                <dt className="text-sm opacity-80">Pesos</dt>
                <dd className="font-display text-3xl">{pesos.map((g) => `${g}g`).join(" · ")}</dd>
              </div>
              <div>
                <dt className="text-sm opacity-80">Caixa</dt>
                <dd className="font-display text-3xl">{caixaTexto(capa).replace("caixa com ", "").replace("caixa: ", "")}</dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={hrefLinha(l)} className="btn btn-acc">
                Ver {l.curto}
              </Link>
              <Link href="/cotacao" className="btn btn-ghost">
                Solicitar cotação
              </Link>
            </div>
          </div>

          <div className="relative grid h-[360px] place-items-center sm:h-[460px]">
            <div className="absolute aspect-square w-[min(88%,440px)] rounded-full bg-t-acc opacity-95" aria-hidden="true" />
            <div className="absolute left-[6%] top-[12%] hidden h-[45%] -rotate-6 sm:block">{outros[0] && <Pack p={outros[0]} sizes="160px" />}</div>
            <div className="absolute right-[4%] top-[18%] hidden h-[42%] rotate-6 sm:block">{outros[1] && <Pack p={outros[1]} sizes="160px" />}</div>
            <div key={l.slug} className="relative h-[88%] animate-[entra_.45s_ease-out]">
              <Pack p={capa} priority sizes="(min-width: 1024px) 380px, 70vw" />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={() => ir(i - 1)} className="grid size-11 place-items-center rounded-full border-2 border-current" aria-label="Linha anterior">
            ←
          </button>
          <button type="button" onClick={() => ir(i + 1)} className="grid size-11 place-items-center rounded-full border-2 border-current" aria-label="Próxima linha">
            →
          </button>
        </div>
      </div>
      <style>{`@keyframes entra{from{opacity:0;transform:translateY(18px) rotate(2deg)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}
