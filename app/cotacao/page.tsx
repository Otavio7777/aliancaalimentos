import type { Metadata } from "next";
import { QuoteBuilder } from "@/components/QuoteBuilder";

export const metadata: Metadata = {
  title: "Solicitar cotação",
  description: "Monte sua cotação em caixas fechadas e envie ao comercial da Aliança pelo WhatsApp.",
  alternates: { canonical: "/cotacao" },
};

export default function CotacaoPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6">
      <h1 className="font-display text-[clamp(2.6rem,7vw,5rem)] uppercase leading-[0.92]">Solicitar cotação</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted">
        Escolha os produtos em caixas fechadas e informe seus dados. O WhatsApp do comercial abre com o pedido escrito.
      </p>
      <div className="mt-8"><QuoteBuilder /></div>
    </section>
  );
}
