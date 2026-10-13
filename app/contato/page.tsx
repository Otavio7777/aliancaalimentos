import type { Metadata } from "next";
import Link from "next/link";
import { linkWhatsApp, WHATSAPP_LEGIVEL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com o comercial da Aliança Alimentos pelo WhatsApp.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-[clamp(2.8rem,8vw,5rem)] uppercase leading-[0.92]">Fale com a Aliança</h1>
      <p className="mt-3 text-lg text-muted">O atendimento comercial é feito pelo WhatsApp.</p>
      <div className="card-cat mt-8 p-6 sm:p-8">
        <p className="font-bold text-muted">WhatsApp comercial</p>
        <p className="font-display text-5xl">{WHATSAPP_LEGIVEL}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href={linkWhatsApp()} target="_blank" rel="noopener" className="btn bg-[#25D366] text-lg text-ink">Abrir conversa</a>
          <Link href="/cotacao" className="btn btn-white text-lg">Montar cotação</Link>
        </div>
      </div>
    </section>
  );
}
