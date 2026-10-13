import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Pack } from "@/components/Pack";
import { Showcase } from "@/components/Showcase";
import { linhas, produtoPorId, produtos } from "@/data/catalogo";

export default function Home() {
  const fs800 = produtoPorId("foodservice-tradicional-800g")!;
  const fs12 = produtoPorId("foodservice-sache-12g")!;
  return (
    <>
      <Showcase />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-labelledby="t-linhas">
        <p className="font-extrabold text-muted">Produtos</p>
        <h2 id="t-linhas" className="font-display text-[clamp(2.4rem,6vw,4rem)] uppercase leading-none">Nossas linhas</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {linhas.map((l, k) => {
            const capa = produtoPorId(l.capa)!;
            const href = l.slug === "food-service" ? "/food-service" : `/produtos/${l.slug}`;
            const n = produtos.filter((p) => p.linha === l.slug).length;
            return (
              <li key={l.slug}>
                <Link href={href} className="card-cat group flex items-stretch overflow-hidden transition-transform hover:-translate-y-1">
                  <span className="grid w-20 shrink-0 place-items-center font-display text-4xl" style={{ background: l.cor, color: l.tinta }}>
                    {String(k + 1).padStart(2, "0")}
                  </span>
                  <span className="flex flex-1 flex-col justify-center px-4 py-4">
                    <span className="font-display text-2xl uppercase leading-tight">{l.nome}</span>
                    <span className="text-sm text-muted">{l.resumo} · {n} itens</span>
                  </span>
                  <span className="hidden h-28 w-24 shrink-0 items-center justify-center p-2 sm:flex">
                    <Pack p={capa} sizes="80px" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
        <Link href="/produtos" className="btn btn-solid mt-8">Ver os {produtos.length} produtos</Link>
      </section>

      <section className="border-y-[3px] border-ink bg-mustard" aria-labelledby="t-fs">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 sm:px-6 md:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 id="t-fs" className="font-display text-[clamp(2.4rem,6vw,4rem)] uppercase leading-[0.95]">Atacado &amp; Food Service</h2>
            <p className="mt-3 font-script text-3xl text-red-deep">Batata palha no volume da sua cozinha.</p>
            <ul className="mt-5 space-y-2 text-lg">
              <li><b>Tradicional 800g</b>, caixa com 8, para cozinhas</li>
              <li><b>Sachê individual 12g</b>, caixa com 150, para delivery e porcionamento</li>
            </ul>
            <Link href="/food-service" className="btn btn-solid mt-6">Ver food service</Link>
          </div>
          <div className="flex h-72 items-end justify-center gap-4 sm:h-80">
            <div className="h-full"><Pack p={fs800} sizes="220px" /></div>
            <div className="h-[62%]"><Pack p={fs12} sizes="160px" /></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-labelledby="t-como">
        <h2 id="t-como" className="font-display text-[clamp(2.2rem,5vw,3.4rem)] uppercase leading-none">Como pedir</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["Escolha os produtos", "No catálogo, adicione os itens em caixas fechadas."],
            ["Envie a cotação", "Informe seus dados. O WhatsApp abre com o pedido escrito."],
            ["Receba as condições", "O comercial da Aliança responde com valores e prazos."],
          ].map(([t, d], k) => (
            <li key={t} className="card-cat p-5">
              <span className="grid size-11 place-items-center rounded-full bg-red font-display text-2xl text-white">{k + 1}</span>
              <h3 className="mt-3 font-display text-2xl uppercase">{t}</h3>
              <p className="mt-1 text-muted">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <CtaBand titulo="Quer Aliança no seu negócio?" cor="#C8102E" />
    </>
  );
}
