import type { Metadata } from "next";
import { PackShot } from "@/components/PackShot";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, Eyebrow, PageHero, Placeholder } from "@/components/ui";
import { linhas, produtos } from "@/data/products";

export const metadata: Metadata = {
  title: "Sobre a Aliança",
  description: "Conheça a Aliança Alimentos, fabricante de batata palha e snacks para varejo, atacado e food service.",
  alternates: { canonical: "/sobre" },
};

const pilares = [
  { t: "Crocância", d: "É o que a gente persegue em cada lote: fio sequinho e crocante do pacote ao prato." },
  { t: "Variedade", d: "Da batata palha clássica aos snacks de sabor marcante, com opções para cada canal." },
  { t: "Parceria", d: "Relação próxima com quem revende, distribui e cozinha com os nossos produtos." },
];

export default function SobrePage() {
  return (
    <>
      <PageHero eyebrow="Sobre a Aliança" title={<>Feita para dar <span className="font-script text-gold-light">crocância</span> ao dia a dia.</>}>
        <p>A Aliança Alimentos fabrica batata palha e snacks para o varejo, o atacado e o food service.</p>
      </PageHero>

      <section aria-labelledby="historia-title" className="py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow className="text-red">Nossa história</Eyebrow>
            <h2 id="historia-title" className="mt-2 font-serif text-4xl">De onde viemos</h2>
            <div className="mt-6 space-y-4 text-lg text-ink/85">
              <p>
                <Placeholder>[PREENCHER]</Placeholder> História da empresa: ano de fundação, cidade de origem, fundadores e
                marcos importantes.
              </p>
              <p>
                <Placeholder>[PREENCHER]</Placeholder> Estrutura fabril: localização da fábrica, capacidade e processos que a
                Aliança queira destacar.
              </p>
              <p>
                <Placeholder>[PREENCHER]</Placeholder> Certificações e registros (apenas os que a empresa possui e pode comprovar).
              </p>
            </div>
          </div>
          <div className="juta flex items-end justify-center gap-3 rounded-[2rem] bg-red p-8">
            {["bp-tradicional-80g", "bp-extrafina-100g", "bp-zero-sodio-100g"].map((id, i) => (
              <div key={id} className={i === 1 ? "w-[40%]" : "w-[30%]"}>
                <PackShot produto={produtos.find((p) => p.id === id)!} sizes="20vw" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="pilares-title" data-theme="#1E1B1C" className="bg-graphite py-14 text-white sm:py-20">
        <Container>
          <Eyebrow className="text-gold">No que acreditamos</Eyebrow>
          <h2 id="pilares-title" className="mt-2 font-serif text-4xl">Nossos pilares</h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {pilares.map((p, i) => (
              <Reveal as="li" key={p.t} delay={i * 0.06} className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
                <h3 className="font-condensed text-3xl uppercase text-gold">{p.t}</h3>
                <p className="mt-2 text-white/80">{p.d}</p>
              </Reveal>
            ))}
          </ul>
          <p className="mt-8 text-sm text-white/70">
            Missão, visão e valores oficiais: <Placeholder>[PREENCHER]</Placeholder>
          </p>
        </Container>
      </section>

      <section aria-labelledby="marcas-title" className="py-14 sm:py-20">
        <Container>
          <h2 id="marcas-title" className="font-serif text-4xl">Nossas marcas</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {linhas.map((l) => (
              <li key={l.slug} className="rounded-3xl p-6" style={{ backgroundColor: l.cor.bg, color: l.cor.ink }}>
                <h3 className={`text-3xl ${l.fonteTitulo === "serif" ? "font-serif" : "font-condensed uppercase"}`}>{l.titulo}</h3>
                <p className="mt-2 text-sm opacity-90">{l.descricao}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/produtos">Ver produtos</ButtonLink>
            <ButtonLink href="/revenda" variant="outline">Seja um revendedor</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
