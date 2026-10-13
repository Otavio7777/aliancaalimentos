import Link from "next/link";
import { linkWhatsApp } from "@/lib/site";

export function CtaBand({
  titulo,
  texto = "Peça uma cotação com as quantidades que você precisa.",
  cor = "#141010",
  tinta = "#FFFFFF",
  mensagem,
}: {
  titulo: string;
  texto?: string;
  cor?: string;
  tinta?: string;
  mensagem?: string;
}) {
  return (
    <section style={{ background: cor, color: tinta }} className="border-y-[3px] border-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-[clamp(2.2rem,6vw,3.8rem)] uppercase leading-[0.95]">{titulo}</h2>
          <p className="mt-3 text-lg opacity-90">{texto}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/cotacao" className="btn btn-white text-lg">Solicitar cotação</Link>
          <a href={linkWhatsApp(mensagem)} target="_blank" rel="noopener" className="btn btn-ghost text-lg">Falar no WhatsApp</a>
        </div>
      </div>
    </section>
  );
}
