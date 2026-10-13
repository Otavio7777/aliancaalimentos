import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { linhas, produtos, gramaturas } from "@/data/catalogo";

export const metadata: Metadata = {
  title: "Sobre a Aliança",
  description: "Aliança Alimentos: batata palha, batata chips e snacks para varejo, atacado e food service.",
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  return (
    <>
      <section className="border-b-[3px] border-ink bg-red text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="font-display text-[clamp(3rem,9vw,6rem)] uppercase leading-[0.9]">Sobre a Aliança</h1>
          <p className="mt-3 font-script text-[clamp(1.6rem,3.4vw,2.4rem)] text-yellow">Sabor que transforma o momento.</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4 text-lg">
          <p>
            A Aliança Alimentos produz batata palha, batata chips e snacks com as marcas Aliança, Krisp&apos;s e Checkmate.
          </p>
          <p>
            O portfólio atende do pequeno varejo ao atacado e à cozinha profissional: embalagens de 80g, pouch de 100g e
            tamanho família de 300g na gôndola, e pacote de 800g e sachê individual de 12g para food service.
          </p>
          <p>
            Todos os produtos são vendidos em caixas fechadas. Para cotar, monte sua lista no{" "}
            <Link href="/produtos" className="font-bold underline">catálogo</Link> e envie ao comercial.
          </p>
        </div>
        <dl className="grid grid-cols-3 gap-3 self-start">
          {[
            [String(linhas.length), "linhas"],
            [String(produtos.length), "produtos"],
            [String(gramaturas.length), "pesos"],
          ].map(([n, t]) => (
            <div key={t} className="card-cat p-4 text-center">
              <dd className="font-display text-5xl">{n}</dd>
              <dt className="font-bold text-muted">{t}</dt>
            </div>
          ))}
        </dl>
      </section>
      <CtaBand titulo="Quer Aliança no seu negócio?" cor="#141010" />
    </>
  );
}
