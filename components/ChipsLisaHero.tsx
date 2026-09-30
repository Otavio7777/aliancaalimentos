"use client";

import Link from "next/link";
import { useState } from "react";
import type { Linha, Produto } from "@/data/products";
import { PackShot } from "./PackShot";
import { Container } from "./ui";

/**
 * Hero da linha Batata Chips Lisa: fundo preto, dourado fixo e a cor do sabor
 * escolhido trocando o "lisa", o botão principal e os detalhes (`--sabor`).
 */
export function ChipsLisaHero({ linha, itens }: { linha: Linha; itens: Produto[] }) {
  // um item por sabor (o primeiro declarado — 45g quando existir)
  const sabores = itens.filter((p, i) => itens.findIndex((x) => x.sabor === p.sabor) === i);
  const [ativo, setAtivo] = useState(sabores[0]);
  const cor = ativo.corSabor?.texto ?? linha.acento;

  return (
    <section
      data-theme={linha.cor.bg}
      data-theme-ink={linha.cor.ink}
      className="relative isolate overflow-hidden"
      style={{ backgroundColor: linha.cor.bg, color: linha.cor.ink, ["--sabor" as string]: cor }}
      aria-labelledby="linha-title"
    >
      <div
        aria-hidden="true"
        className="absolute -right-32 top-10 -z-10 h-[30rem] w-[30rem] rounded-full opacity-25 blur-3xl transition-colors duration-500"
        style={{ backgroundColor: "var(--sabor)" }}
      />
      <Container className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <nav aria-label="Trilha" className="text-sm text-white/80">
            <Link href="/produtos" className="underline-offset-4 hover:underline">
              Produtos
            </Link>{" "}
            / <span aria-current="page">{linha.titulo}</span>
          </nav>
          {linha.selo && (
            <p className="mt-6 font-condensed text-sm uppercase tracking-[0.35em]" style={{ color: linha.acento }}>
              · {linha.selo} ·
            </p>
          )}
          <h1 id="linha-title" className="mt-2 font-condensed uppercase leading-[0.9]" style={{ color: linha.acento }}>
            <span className="block text-6xl sm:text-8xl">Batata</span>
            <span className="block text-6xl sm:text-8xl">
              Chips{" "}
              <span className="font-script text-5xl normal-case transition-colors duration-500 sm:text-7xl" style={{ color: "var(--sabor)" }}>
                lisa
              </span>
            </span>
          </h1>
          <p className="mt-5 text-xl font-semibold">{linha.chamada}</p>
          <p className="mt-3 max-w-xl text-lg text-white/85">{linha.descricao}</p>

          <fieldset className="mt-8">
            <legend className="text-sm font-bold text-white/80">Escolha o sabor</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {sabores.map((p) => {
                const on = p.id === ativo.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setAtivo(p)}
                    className="min-h-11 rounded-full px-4 py-2 text-sm font-bold ring-2 ring-inset transition"
                    style={{
                      color: on ? linha.cor.bg : p.corSabor?.texto,
                      backgroundColor: on ? p.corSabor?.texto : "transparent",
                      ["--tw-ring-color" as string]: p.corSabor?.texto,
                    }}
                  >
                    {p.sabor.replace(/ \(.*\)$/, "")}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/revenda?interesse=${linha.slug}#formulario`}
              className="inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 font-bold transition-colors duration-500 hover:brightness-110"
              style={{ backgroundColor: "var(--sabor)", color: linha.cor.bg }}
            >
              Solicitar cotação
            </Link>
            <a
              href="#skus"
              className="inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 font-bold ring-2 ring-inset transition hover:bg-white/10"
              style={{ color: linha.acento, ["--tw-ring-color" as string]: linha.acento }}
            >
              Ver {itens.length} itens
            </a>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-xs sm:max-w-sm" aria-live="polite">
          <PackShot key={ativo.id} produto={ativo} priority sizes="(min-width: 1024px) 24rem, (min-width: 640px) 24rem, 20rem" />
        </div>
      </Container>
    </section>
  );
}
