import type { Metadata } from "next";
import Link from "next/link";
import { ProductFilter } from "@/components/ProductFilter";
import { ButtonLink, Container, PageHero } from "@/components/ui";
import { linhas, produtos } from "@/data/products";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Catálogo Aliança Alimentos: batata palha Tradicional, Extrafina, Temperada e Zero Sódio, batata ondulada Krisp's, salgadinho de trigo Checkmate e Batata Chips Lisa Premium. Gramaturas e unidades por caixa.",
  alternates: { canonical: "/produtos" },
};

export default function ProdutosPage() {
  return (
    <>
      <PageHero eyebrow="Catálogo" title="Todos os produtos Aliança">
        <p>
          {produtos.length} itens em {linhas.length} linhas. Filtre por linha, gramatura ou canal e veja as unidades por
          caixa de cada item.
        </p>
      </PageHero>

      <Container className="py-12 sm:py-16">
        <nav aria-label="Linhas de produto" className="mb-8 flex flex-wrap gap-2">
          {linhas.map((l) => (
            <Link
              key={l.slug}
              href={`/produtos/${l.slug}`}
              className="rounded-full px-4 py-2 text-sm font-bold transition hover:brightness-110"
              style={{ backgroundColor: l.cor.bg, color: l.cor.ink }}
            >
              {l.nome}
            </Link>
          ))}
        </nav>
        <ProductFilter />
        <div className="mt-16 rounded-3xl bg-graphite p-8 text-white sm:flex sm:items-center sm:justify-between sm:p-10">
          <div>
            <h2 className="font-serif text-3xl">Quer uma cotação?</h2>
            <p className="mt-2 text-white/80">Conte o que você precisa e o nosso comercial retorna.</p>
          </div>
          <ButtonLink href="/revenda" variant="gold" className="mt-6 sm:mt-0">
            Solicitar cotação
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
