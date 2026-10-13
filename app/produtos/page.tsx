import type { Metadata } from "next";
import { CatalogBrowser } from "@/components/CatalogBrowser";
import { CtaBand } from "@/components/CtaBand";
import { linhas, produtos, type LinhaSlug } from "@/data/catalogo";

export const metadata: Metadata = {
  title: "Produtos",
  description: `Os ${produtos.length} produtos Aliança: Batata Palha, Batata Chips Lisa, Krisp's, Checkmate e food service, com peso e unidades por caixa.`,
  alternates: { canonical: "/produtos" },
};

export default async function ProdutosPage({ searchParams }: { searchParams: Promise<{ linha?: string }> }) {
  const { linha } = await searchParams;
  const inicial = linhas.some((l) => l.slug === linha) ? { linha: linha as LinhaSlug } : undefined;
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6">
        <h1 className="font-display text-[clamp(2.6rem,7vw,5rem)] uppercase leading-[0.92]">Todos os produtos</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          Do sachê de 12g ao pacote de 800g. Filtre por linha, peso e canal, e adicione as caixas que quer cotar.
        </p>
        <div className="mt-8">
          <CatalogBrowser inicial={inicial} />
        </div>
      </section>
      <CtaBand titulo="Montou sua lista?" texto="Revise as caixas e envie a cotação pelo WhatsApp." />
    </>
  );
}
