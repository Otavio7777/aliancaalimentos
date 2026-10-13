const itens = [
  "38 produtos em 6 linhas",
  "Vendido em caixas fechadas",
  "Varejo, atacado e food service",
  "Do sachê de 12g ao pacote de 800g",
  "Cotação direto no WhatsApp",
];

/** Faixa rolante no estilo da Bold, com fatos do catálogo. */
export function Marquee() {
  const linha = (oculto: boolean) => (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={oculto || undefined}>
      {itens.map((t) => (
        <li key={t} className="flex items-center gap-10 whitespace-nowrap font-display text-xl uppercase tracking-wide">
          <span>{t}</span>
          <span aria-hidden="true" className="inline-block size-3 rotate-45 bg-red" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="group overflow-hidden border-y-[3px] border-ink bg-yellow py-3 text-ink">
      <div className="flex w-max animate-[marquee_32s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {linha(false)}
        {linha(true)}
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}
