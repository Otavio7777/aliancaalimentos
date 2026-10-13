import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { FoodServicePicker } from "@/components/FoodServicePicker";
import { Pack } from "@/components/Pack";
import { produtoPorId } from "@/data/catalogo";

export const metadata: Metadata = {
  title: "Atacado & Food Service",
  description: "Batata palha Tradicional 800g (caixa com 8) para cozinhas e sachê individual de 12g (caixa com 150) para delivery e porcionamento.",
  alternates: { canonical: "/food-service" },
};

export default function FoodServicePage() {
  const p800 = produtoPorId("foodservice-tradicional-800g")!;
  const p12 = produtoPorId("foodservice-sache-12g")!;
  return (
    <>
      <section className="border-b-[3px] border-ink bg-mustard">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.1fr_1fr]">
          <div>
            <h1 className="font-display text-[clamp(3rem,9vw,6rem)] uppercase leading-[0.9]">Atacado &amp; Food Service</h1>
            <p className="mt-3 font-script text-[clamp(1.5rem,3.4vw,2.2rem)] text-red-deep">Batata palha no volume da sua cozinha.</p>
            <p className="mt-4 max-w-lg text-lg">Tradicional 800g para cozinhas e sachê individual de 12g para delivery e porcionamento.</p>
          </div>
          <div className="flex h-72 items-end justify-center gap-6 sm:h-96">
            <div className="h-full"><Pack p={p800} priority sizes="260px" /></div>
            <div className="h-[60%]"><Pack p={p12} sizes="180px" /></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6" aria-labelledby="t-uso">
        <h2 id="t-uso" className="font-display text-[clamp(2rem,5vw,3.2rem)] uppercase leading-none">O que você vai servir?</h2>
        <p className="mt-2 text-muted">Sugestões de uso. Escolha uma aplicação e adicione as caixas à cotação.</p>
        <div className="mt-6"><FoodServicePicker /></div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6" aria-labelledby="t-tab">
        <h2 id="t-tab" className="font-display text-3xl uppercase">Tabela comercial: Food Service</h2>
        <div className="card-cat mt-5 overflow-x-auto" tabIndex={0} role="region" aria-labelledby="t-tab">
          <table className="w-full min-w-[520px] text-left">
            <thead className="bg-ink text-white"><tr>{["Produto", "Sabor", "Gramatura", "Un/cx", "Canal"].map((h) => <th key={h} scope="col" className="px-4 py-3">{h}</th>)}</tr></thead>
            <tbody>
              <tr className="border-t-2 border-ink/10"><td className="px-4 py-2.5">Batata Palha Sachê</td><td className="px-4 py-2.5 font-bold">Extrafina</td><td className="px-4 py-2.5">12g</td><td className="px-4 py-2.5">150</td><td className="px-4 py-2.5">Atacado &amp; Food Service</td></tr>
              <tr className="border-t-2 border-ink/10"><td className="px-4 py-2.5">Batata Palha</td><td className="px-4 py-2.5 font-bold">Tradicional</td><td className="px-4 py-2.5">800g</td><td className="px-4 py-2.5">8</td><td className="px-4 py-2.5">Atacado &amp; Food Service</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <CtaBand titulo="Quer Food Service no seu negócio?" cor="#141010" mensagem="Olá! Vim pelo site da Aliança e quero cotar produtos de food service." />
    </>
  );
}
