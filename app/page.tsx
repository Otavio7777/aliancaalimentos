import Link from "next/link";
import { Hero } from "@/components/Hero";
import { PackShot } from "@/components/PackShot";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { linhas, produtos, produtosDaLinha } from "@/data/products";

const destaquePorLinha: Record<string, string> = {
  "batata-palha": "bp-tradicional-100g",
  "food-service": "fs-tradicional-800g",
  krisps: "krisps-original-45g",
  checkmate: "checkmate-petisco-queijo-50g",
};

const motivos = [
  {
    titulo: "Crocância em cada fio",
    texto: "Batata palha fininha e sequinha, feita para finalizar o prato e segurar a crocância no strogonoff, no cachorro-quente e no lanche.",
  },
  {
    titulo: "Variedade que gira",
    texto: "Tradicional, Extrafina, Temperada e Zero Sódio, além de batata ondulada e salgadinho de trigo em vários sabores.",
  },
  {
    titulo: "Do varejo ao food service",
    texto: "Embalagens de 12g a 800g para a gôndola, o atacado, o delivery e a cozinha profissional.",
  },
  {
    titulo: "Pronto para o seu pedido",
    texto: "Caixas padronizadas por SKU para facilitar a compra, o estoque e a reposição do seu negócio.",
  },
];

export default function HomePage() {
  const sache = produtos.find((p) => p.id === "fs-sache-12g")!;
  const granel = produtos.find((p) => p.id === "fs-tradicional-800g")!;

  return (
    <>
      <Hero />

      {/* ------------------------------ Linhas ------------------------------ */}
      <section aria-labelledby="linhas-title" className="bg-offwhite py-16 sm:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <Eyebrow className="text-red">Nossas linhas</Eyebrow>
              <h2 id="linhas-title" className="mt-2 font-serif text-4xl sm:text-5xl">
                Escolha o seu crocante.
              </h2>
            </div>
            <Link href="/produtos" className="font-bold text-red underline-offset-4 hover:underline">
              Ver catálogo completo →
            </Link>
          </div>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {linhas.map((linha, i) => {
              const destaque = produtos.find((p) => p.id === destaquePorLinha[linha.slug])!;
              const qtd = produtosDaLinha(linha.slug).length;
              return (
                <Reveal as="li" key={linha.slug} delay={i * 0.08}>
                  <Link
                    href={`/produtos/${linha.slug}`}
                    className="group relative flex h-full min-h-[26rem] flex-col overflow-hidden rounded-[2rem] p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                    style={{ backgroundColor: linha.cor.bg, color: linha.cor.ink }}
                  >
                    <div className="juta absolute inset-0 opacity-50" aria-hidden="true" />
                    <div className="relative">
                      <p className="text-xs font-bold uppercase tracking-widest opacity-85">{qtd} itens</p>
                      <h3 className={`mt-1 text-4xl leading-none ${linha.fonteTitulo === "serif" ? "font-serif" : "font-condensed uppercase"}`}>
                        {linha.titulo}
                      </h3>
                      <p className="mt-3 text-sm opacity-90">{linha.chamada}</p>
                    </div>
                    <div className="relative mt-auto flex items-end justify-between gap-2">
                      <span
                        className="rounded-full px-4 py-2 text-sm font-bold"
                        style={{ backgroundColor: linha.cor.ink, color: linha.cor.bg }}
                      >
                        Conhecer
                      </span>
                      <PackShot
                        produto={destaque}
                        className="w-32 translate-y-4 rotate-6 transition duration-500 group-hover:rotate-0"
                        sizes="160px"
                      />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* --------------------------- Por que Aliança -------------------------- */}
      <section
        aria-labelledby="porque-title"
        data-theme="#1E1B1C"
        className="relative overflow-hidden bg-graphite py-16 text-white sm:py-24"
      >
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow className="text-gold">Por que Aliança</Eyebrow>
            <h2 id="porque-title" className="mt-2 font-serif text-4xl sm:text-5xl">
              Um portfólio feito para vender <span className="font-script text-gold">todo dia</span>.
            </h2>
            <p className="mt-6 max-w-md text-lg text-white/80">
              Linhas clássicas e snacks de sabor marcante, com embalagens pensadas para cada canal.
            </p>
            <ButtonLink href="/sobre" variant="outline-light" className="mt-8">
              Conheça a Aliança
            </ButtonLink>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {motivos.map((m, i) => (
              <Reveal as="li" key={m.titulo} delay={i * 0.06} className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
                <span className="font-condensed text-3xl text-gold" aria-hidden="true">
                  0{i + 1}
                </span>
                <h3 className="mt-2 text-xl font-bold">{m.titulo}</h3>
                <p className="mt-2 text-white/80">{m.texto}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* ---------------------------- Food Service ---------------------------- */}
      <section
        aria-labelledby="fs-title"
        data-theme="#C9A24B"
        data-theme-ink="#1A1414"
        className="juta relative overflow-hidden bg-gold py-16 text-ink sm:py-24"
      >
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>Atacado &amp; Food Service</Eyebrow>
            <h2 id="fs-title" className="mt-2 font-serif text-4xl sm:text-5xl">
              Batata palha no ritmo da sua cozinha.
            </h2>
            <p className="mt-5 max-w-lg text-lg">
              Para restaurantes, lanchonetes, dark kitchens e distribuidores: o volume do pacote de 800g e a
              praticidade do sachê individual de 12g.
            </p>
            <dl className="mt-8 grid max-w-lg grid-cols-2 gap-4">
              {[granel, sache].map((p) => (
                <div key={p.id} className="rounded-2xl bg-offwhite/90 p-4">
                  <dt className="text-sm font-semibold text-ink/75">{p.nome}</dt>
                  <dd className="mt-1 font-condensed text-3xl">{p.gramatura}</dd>
                  <dd className="text-sm">Caixa c/ {p.unidadesPorCaixa} un</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/revenda#food-service" variant="dark">
                Pedir cotação
              </ButtonLink>
              <ButtonLink href="/produtos/food-service" variant="outline">
                Ver linha Food Service
              </ButtonLink>
            </div>
          </div>
          <div className="relative mx-auto flex w-full max-w-md items-end justify-center gap-4">
            <Reveal className="w-[58%]">
              <PackShot produto={granel} sizes="30vw" />
            </Reveal>
            <Reveal className="w-[32%]" delay={0.1}>
              <PackShot produto={sache} sizes="20vw" />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ------------------------ Checkmate (vertical) ------------------------ */}
      <section
        aria-labelledby="snacks-title"
        data-theme="#1B2A5C"
        className="relative overflow-hidden bg-navy py-16 text-white sm:py-24"
      >
        <span
          aria-hidden="true"
          className="text-vertical pointer-events-none absolute -left-4 top-0 hidden h-full select-none font-condensed text-[9rem] leading-none text-white/5 md:block"
        >
          CHECKMATE
        </span>
        <Container className="relative">
          <Eyebrow className="text-[#F2C230]">Snacks</Eyebrow>
          <h2 id="snacks-title" className="mt-2 max-w-3xl font-condensed text-5xl uppercase leading-none sm:text-7xl">
            Ondulada ou de trigo? <span className="text-[#F2C230]">Os dois.</span>
          </h2>
          <ul className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-6">
            {[
              "krisps-original-45g",
              "krisps-churrasco-45g",
              "checkmate-petisco-pimenta-50g",
              "checkmate-petisco-bacon-50g",
              "checkmate-petisco-queijo-50g",
              "checkmate-skin-costelinha-limao-40g",
            ].map((id, i) => {
              const p = produtos.find((x) => x.id === id)!;
              return (
                <Reveal as="li" key={id} delay={i * 0.05}>
                  <PackShot produto={p} sizes="(min-width: 640px) 16vw, 33vw" />
                </Reveal>
              );
            })}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/produtos/krisps" variant="gold">
              Linha Krisp&apos;s
            </ButtonLink>
            <ButtonLink href="/produtos/checkmate" variant="outline-light">
              Linha Checkmate
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* ---------------------------- Distribuidores --------------------------- */}
      <section aria-labelledby="revenda-title" data-theme="#C8102E" className="juta bg-red py-16 text-white sm:py-24">
        <Container className="text-center">
          <p className="font-script text-3xl text-gold-light sm:text-4xl">Vamos crescer juntos</p>
          <h2 id="revenda-title" className="mx-auto mt-3 max-w-3xl font-serif text-4xl sm:text-6xl">
            Leve Aliança para a sua prateleira.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/90">
            Supermercados, atacadistas, distribuidores e representantes: fale com o nosso comercial e receba
            condições para o seu negócio.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/revenda" variant="gold">
              Quero vender Aliança
            </ButtonLink>
            <ButtonLink href="/contato" variant="outline-light">
              Falar com a gente
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
