const perguntas = [
  ["Como faço um pedido?", "Monte sua lista no catálogo, em caixas fechadas, e envie a cotação. O WhatsApp do comercial abre com o pedido escrito, e a Aliança responde com valores e condições."],
  ["Quantas unidades vêm em cada caixa?", "Depende do produto: 8 unidades no pacote de 800g, 16 no tamanho família de 300g, 20 no Checkmate Skin, 24 no Krisp's, 25 no Petisco 100g, 30 no Petisco 50g, 40 no pouch de 100g, 50 na embalagem de 80g e 150 no sachê de 12g. A Batata Chips Lisa é sob consulta."],
  ["Vocês atendem restaurantes e delivery?", "Sim. A linha de Atacado & Food Service tem a Batata Palha Tradicional de 800g, para cozinhas, e o sachê individual de 12g, para delivery e porcionamento."],
  ["Quais linhas a Aliança fabrica?", "Batata Palha Aliança, Batata Chips Lisa, Batata Ondulada Krisp's, Checkmate Skin, Checkmate Petisco e a linha de Atacado & Food Service."],
];

/** Perguntas frequentes (formato acordeão, como o guia da Bold). Respostas tiradas do catálogo. */
export function Faq() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6" aria-labelledby="t-faq">
      <h2 id="t-faq" className="text-center font-display text-[clamp(2.2rem,5vw,3.4rem)] uppercase leading-none">Dúvidas de quem compra em caixa</h2>
      <div className="mt-8 space-y-3">
        {perguntas.map(([q, a]) => (
          <details key={q} className="card-cat group px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-extrabold">
              {q}
              <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-white transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-muted">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
