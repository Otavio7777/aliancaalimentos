import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { Pack } from "@/components/Pack";
import { ProductCard } from "@/components/ProductCard";
import { canalTexto, linhaPorSlug, linhas, nomeProduto, produtosDaLinha, type Produto } from "@/data/catalogo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return linhas.filter((l) => l.slug !== "food-service").map((l) => ({ linha: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ linha: string }> }): Promise<Metadata> {
  const l = linhaPorSlug((await params).linha);
  if (!l) return {};
  return { title: l.nome, description: `${l.slogan} ${l.descricao}`, alternates: { canonical: `/produtos/${l.slug}` } };
}

/** Agrupa como no catálogo: um bloco por embalagem/peso. */
function grupos(itens: Produto[]) {
  const m = new Map<string, Produto[]>();
  for (const p of itens) {
    const k = p.embalagem || `${p.gramatura}g`;
    m.set(k, [...(m.get(k) ?? []), p]);
  }
  return [...m.entries()];
}

export default async function LinhaPage({ params }: { params: Promise<{ linha: string }> }) {
  const { linha } = await params;
  if (linha === "food-service") redirect("/food-service");
  const l = linhaPorSlug(linha);
  if (!l) notFound();
  const itens = produtosDaLinha(l.slug);
  const fan = itens.filter((_, k) => k % Math.max(1, Math.floor(itens.length / 5)) === 0).slice(0, 5);

  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: l.nome,
    itemListElement: itens.map((p, k) => ({
      "@type": "ListItem",
      position: k + 1,
      item: {
        "@type": "Product",
        name: nomeProduto(p),
        image: `${site.url}${p.imagem}`,
        brand: { "@type": "Brand", name: l.nome.includes("Checkmate") ? "Checkmate" : l.nome.includes("Krisp") ? "Krisp's" : "Aliança" },
        weight: { "@type": "QuantitativeValue", value: p.gramatura, unitCode: "GRM" },
      },
    })),
  };

  return (
    <>
      <section style={{ background: l.cor, color: l.tinta }} className="relative overflow-hidden border-b-[3px] border-ink">
        <span className="wordmark-bg hidden lg:block" aria-hidden="true">{l.curto}</span>
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 pb-10 pt-10 sm:px-6 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <nav aria-label="Trilha" className="text-sm font-bold opacity-80">
              <Link href="/produtos" className="underline">Produtos</Link> / {l.curto}
            </nav>
            <h1 className="mt-3 font-display text-[clamp(3rem,10vw,6.5rem)] uppercase leading-[0.88]">{l.nome}</h1>
            <p className="mt-4 font-script text-[clamp(1.5rem,3.4vw,2.2rem)]" style={{ color: l.destaque }}>{l.slogan}</p>
            <p className="mt-4 max-w-md text-lg opacity-90">{l.descricao}</p>
          </div>
          <div className="flex h-64 items-end justify-center sm:h-80">
            {fan.map((p, k) => (
              <div key={p.id} className="-mx-3 h-full first:ml-0 last:mr-0" style={{ transform: `rotate(${(k - (fan.length - 1) / 2) * 5}deg) translateY(${Math.abs(k - (fan.length - 1) / 2) * 8}px)` }}>
                <Pack p={p} priority={k === 0} sizes="180px" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6" aria-labelledby="t-itens">
        <h2 id="t-itens" className="font-display text-[clamp(2rem,5vw,3.2rem)] uppercase leading-none">Itens e embalagens</h2>
        {grupos(itens).map(([k, ps]) => (
          <div key={k} className="mt-10">
            <h3 className="font-display text-2xl uppercase">{k}</h3>
            <p className="border-b-[3px] pb-2 text-sm font-bold text-muted" style={{ borderColor: l.cor }}>
              {ps[0].gramatura}g · {ps[0].caixa ? `caixa com ${ps[0].caixa} unidades` : "unidades por caixa: consulte-nos"} · {canalTexto(ps[0].canal)}
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
              {ps.map((p) => <li key={p.id}><ProductCard p={p} /></li>)}
            </ul>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6" aria-labelledby="t-tabela">
        <h2 id="t-tabela" className="font-display text-3xl uppercase">Tabela comercial: {l.nome}</h2>
        <div className="card-cat mt-5 overflow-x-auto" tabIndex={0} role="region" aria-labelledby="t-tabela">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead className="bg-ink text-white">
              <tr>{["Produto", "Sabor", "Gramatura", "Un/cx", "Canal"].map((h) => <th key={h} scope="col" className="px-4 py-3 font-extrabold">{h}</th>)}</tr>
            </thead>
            <tbody>
              {itens.map((p) => (
                <tr key={p.id} className="border-t-2 border-ink/10">
                  <td className="px-4 py-2.5">{p.embalagem.startsWith("Pouch") ? `${l.curto} Pouch` : l.curto}</td>
                  <td className="px-4 py-2.5 font-bold">{p.sabor}</td>
                  <td className="px-4 py-2.5">{p.gramatura}g</td>
                  <td className="px-4 py-2.5">{p.caixa ?? "Consulte-nos"}</td>
                  <td className="px-4 py-2.5">{canalTexto(p.canal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <CtaBand titulo={`Quer ${l.curto} no seu negócio?`} cor={l.cor} tinta={l.tinta} mensagem={`Olá! Vim pelo site da Aliança e quero cotar ${l.nome}.`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
