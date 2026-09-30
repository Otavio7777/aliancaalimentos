import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { PackShot } from "@/components/PackShot";
import { Reveal } from "@/components/Reveal";
import { Container, Eyebrow, PageHero } from "@/components/ui";
import { produtos } from "@/data/products";

export const metadata: Metadata = {
  title: "Seja um revendedor e Food Service",
  description:
    "Revenda os produtos Aliança Alimentos: batata palha, Krisp's e Checkmate para supermercados, atacadistas, distribuidores e food service. Solicite uma cotação.",
  alternates: { canonical: "/revenda" },
};

const perfis = [
  { titulo: "Varejo", texto: "Supermercados, mercearias e conveniências: embalagens de 45g a 300g com giro de gôndola." },
  { titulo: "Atacado e distribuição", texto: "Caixas padronizadas por item para montar o mix e abastecer sua rota." },
  { titulo: "Food Service", texto: "Batata palha 800g para a cozinha e sachê 12g para o delivery e o balcão." },
];

export default function RevendaPage() {
  const fs = produtos.filter((p) => p.categoria === "atacado-foodservice");
  return (
    <>
      <PageHero eyebrow="Seja um revendedor" title={<>Venda Aliança no seu negócio.</>}>
        <p>Preencha o formulário e o nosso time comercial retorna com condições, mix sugerido e prazos para a sua região.</p>
      </PageHero>

      <section aria-labelledby="perfis-title" className="bg-offwhite py-14 sm:py-20">
        <Container>
          <h2 id="perfis-title" className="sr-only">
            Para quem vendemos
          </h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {perfis.map((p, i) => (
              <Reveal as="li" key={p.titulo} delay={i * 0.06} className="rounded-3xl bg-white p-6 ring-1 ring-black/5">
                <h3 className="font-condensed text-2xl uppercase text-red">{p.titulo}</h3>
                <p className="mt-2 text-ink/80">{p.texto}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section
        id="food-service"
        aria-labelledby="fs-title"
        data-theme="#C9A24B"
        data-theme-ink="#1A1414"
        className="juta scroll-mt-24 bg-gold py-14 text-ink sm:py-20"
      >
        <Container className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <Eyebrow>Food Service</Eyebrow>
            <h2 id="fs-title" className="mt-2 font-serif text-4xl sm:text-5xl">
              Para cozinhas que não param.
            </h2>
            <p className="mt-4 max-w-xl text-lg">
              Restaurantes, lanchonetes, hamburguerias, pizzarias e dark kitchens: batata palha no formato certo para
              finalizar pratos e montar kits de delivery.
            </p>
            <ul className="mt-6 space-y-2 text-lg">
              {fs.map((p) => (
                <li key={p.id} className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-ink" aria-hidden="true" />
                  <strong>{p.nome} {p.gramatura}</strong> — caixa c/ {p.unidadesPorCaixa} un
                </li>
              ))}
            </ul>
          </div>
          <div className="mx-auto flex w-full max-w-sm items-end gap-4">
            <div className="w-[60%]">
              <PackShot produto={fs[1]} sizes="30vw" />
            </div>
            <div className="w-[35%]">
              <PackShot produto={fs[0]} sizes="20vw" />
            </div>
          </div>
        </Container>
      </section>

      <section id="formulario" aria-labelledby="form-title" data-theme="#C8102E" className="scroll-mt-24 bg-juta py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow className="text-red">Cadastro de revenda</Eyebrow>
            <h2 id="form-title" className="mt-2 font-serif text-4xl sm:text-5xl">
              Fale com o comercial.
            </h2>
            <p className="mt-4 text-lg text-ink/80">
              Conte um pouco sobre o seu negócio. Usamos os dados apenas para o retorno comercial.
            </p>
          </div>
          <div className="rounded-3xl bg-offwhite p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
            <LeadForm tipo="revenda" />
          </div>
        </Container>
      </section>
    </>
  );
}
