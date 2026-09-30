import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChipsLisaHero } from "@/components/ChipsLisaHero";
import { JsonLd } from "@/components/JsonLd";
import { PackShot } from "@/components/PackShot";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { agruparPorGrupo, categorias, getLinha, linhas, produtosDaLinha, type Produto } from "@/data/products";
import { site } from "@/lib/site";

type Props = { params: Promise<{ linha: string }> };

const marca = (slug: string) => (slug === "krisps" ? "Krisp's" : slug === "checkmate" ? "Checkmate" : "Aliança");
const canal = (p: Produto) => (p.categoria ? categorias[p.categoria] : "Consulte-nos");
const caixaGrupo = (p: Produto) =>
  p.unidadesPorCaixa == null ? "un/cx: consulte-nos" : `caixa com ${p.unidadesPorCaixa} unidades`;

export function generateStaticParams() {
  return linhas.map((l) => ({ linha: l.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const linha = getLinha((await params).linha);
  if (!linha) return {};
  return {
    title: linha.nome,
    description: `${linha.chamada} ${linha.descricao}`,
    alternates: { canonical: `/produtos/${linha.slug}` },
    openGraph: { title: `${linha.nome} | Aliança Alimentos`, description: linha.descricao, images: ["/opengraph-image"] },
  };
}

export default async function LinhaPage({ params }: Props) {
  const linha = getLinha((await params).linha);
  if (!linha) notFound();

  const itens = produtosDaLinha(linha.slug);
  const grupos = agruparPorGrupo(itens);
  const heroItens = itens.slice(0, 3);
  const titleFont = linha.fonteTitulo === "serif" ? "font-serif" : "font-condensed uppercase";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: linha.nome,
    itemListElement: itens.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        sku: p.id,
        name: `${p.nome} ${p.sabor} ${p.gramatura}`,
        ...(p.categoria ? { category: categorias[p.categoria] } : {}),
        brand: { "@type": "Brand", name: marca(linha.slug) },
        manufacturer: { "@type": "Organization", name: site.nome },
        weight: { "@type": "QuantitativeValue", value: p.gramas, unitCode: "GRM" },
        url: `${site.url}/produtos/${linha.slug}#${p.id}`,
        ...(p.imagem ? { image: `${site.url}${p.imagem}` } : {}),
      },
    })),
  };

  return (
    <div style={{ ["--theme" as string]: linha.cor.bg, ["--theme-ink" as string]: linha.cor.ink }}>
      {linha.slug === "batata-chips-lisa" ? (
        <ChipsLisaHero linha={linha} itens={itens} />
      ) : (
        <section
          data-theme={linha.cor.bg}
          data-theme-ink={linha.cor.ink}
          className="juta relative isolate overflow-hidden"
          style={{ backgroundColor: linha.cor.bg, color: linha.cor.ink }}
          aria-labelledby="linha-title"
        >
          {linha.slug === "checkmate" && (
            <span
              aria-hidden="true"
              className="text-vertical pointer-events-none absolute right-0 top-0 -z-10 h-full select-none font-condensed text-[5rem] leading-none opacity-10 sm:text-[7.5rem]"
            >
              CHECKMATE
            </span>
          )}
          <Container className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <nav aria-label="Trilha" className="text-sm opacity-85">
                <Link href="/produtos" className="underline-offset-4 hover:underline">
                  Produtos
                </Link>{" "}
                / <span aria-current="page">{linha.titulo}</span>
              </nav>
              <h1 id="linha-title" className={`mt-4 text-5xl leading-none sm:text-7xl ${titleFont}`}>
                {linha.nome}
              </h1>
              <p className="mt-5 font-script text-2xl sm:text-3xl" style={{ color: linha.acento }}>
                {linha.chamada}
              </p>
              <p className="mt-4 max-w-xl text-lg opacity-95">{linha.descricao}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/revenda?interesse=${linha.slug}#formulario`}
                  className="inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 font-bold transition hover:brightness-95"
                  style={{ backgroundColor: linha.cor.ink, color: linha.cor.bg }}
                >
                  Solicitar cotação
                </Link>
                <a
                  href="#skus"
                  className="inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 font-bold ring-2 ring-inset ring-current transition hover:bg-black/10"
                >
                  Ver {itens.length} itens
                </a>
              </div>
            </div>
            <div className="relative mx-auto flex w-full max-w-md items-end justify-center">
              {heroItens.map((p, i) => (
                <div
                  key={p.id}
                  className={i === 1 ? "z-10 w-[44%]" : "w-[34%] opacity-95"}
                  style={{ transform: `rotate(${(i - 1) * 8}deg) translateY(${i === 1 ? 0 : 16}px)` }}
                >
                  <PackShot produto={p} priority={i === 1} sizes="25vw" />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section id="skus" aria-labelledby="skus-title" className="bg-offwhite py-14 sm:py-20">
        <Container>
          <Eyebrow className="text-ink/70">Portfólio</Eyebrow>
          <h2 id="skus-title" className="mt-2 font-serif text-4xl">
            Itens e embalagens
          </h2>

          {grupos.map(([grupo, lista]) => (
            <div key={grupo} className="mt-12">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-4 pb-3" style={{ borderColor: linha.cor.bg }}>
                <h3 className="font-condensed text-3xl uppercase">{grupo}</h3>
                <p className="text-sm font-semibold text-ink/75">
                  {lista[0].gramatura} · {caixaGrupo(lista[0])} · {lista[0].categoria ? categorias[lista[0].categoria] : "canal: consulte-nos"}
                </p>
              </div>
              <ul className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
                {lista.map((p, i) => (
                  <Reveal as="li" key={p.id} delay={i * 0.04}>
                    <div id={p.id} className="h-full scroll-mt-28">
                      <ProductCard produto={p} headingLevel="h4" />
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}

          <div className="mt-16 overflow-x-auto rounded-2xl ring-1 ring-black/10">
            <table className="w-full min-w-[34rem] bg-white text-left text-sm">
              <caption className="bg-juta px-4 py-3 text-left font-bold">
                Tabela comercial — {linha.nome}
              </caption>
              <thead className="bg-ink text-white">
                <tr>
                  <th scope="col" className="px-4 py-3">Produto</th>
                  <th scope="col" className="px-4 py-3">Sabor</th>
                  <th scope="col" className="px-4 py-3">Gramatura</th>
                  <th scope="col" className="px-4 py-3">Un/cx</th>
                  <th scope="col" className="px-4 py-3">Canal</th>
                </tr>
              </thead>
              <tbody>
                {itens.map((p) => (
                  <tr key={p.id} className="border-t border-black/5 odd:bg-offwhite/60">
                    <th scope="row" className="px-4 py-3 font-semibold">{p.nome}</th>
                    <td className="px-4 py-3">{p.sabor}</td>
                    <td className="px-4 py-3">{p.gramatura}</td>
                    <td className="px-4 py-3">{p.unidadesPorCaixa ?? "Consulte-nos"}</td>
                    <td className="px-4 py-3">{canal(p)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="cotacao-title"
        className="juta py-14 sm:py-20"
        style={{ backgroundColor: linha.cor.bg, color: linha.cor.ink }}
      >
        <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 id="cotacao-title" className={`text-4xl ${titleFont}`}>
              Quer {linha.titulo} no seu negócio?
            </h2>
            <p className="mt-2 text-lg opacity-90">Peça uma cotação com as quantidades que você precisa.</p>
          </div>
          <Link
            href={`/revenda?interesse=${linha.slug}#formulario`}
            className="inline-flex min-h-12 items-center justify-center rounded-full px-7 py-3 font-bold transition hover:brightness-95"
            style={{ backgroundColor: linha.cor.ink, color: linha.cor.bg }}
          >
            Solicitar cotação
          </Link>
        </Container>
      </section>

      <nav aria-label="Outras linhas" className="bg-offwhite py-12">
        <Container>
          <h2 className="font-condensed text-2xl uppercase">Outras linhas</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {linhas
              .filter((l) => l.slug !== linha.slug)
              .map((l) => (
                <ButtonLink key={l.slug} href={`/produtos/${l.slug}`} variant="outline">
                  {l.nome}
                </ButtonLink>
              ))}
          </div>
        </Container>
      </nav>

      <JsonLd data={jsonLd} />
    </div>
  );
}
