/**
 * Recriação vetorial provisória do logotipo (oval vermelho, contorno dourado,
 * "Aliança" script, faixa dourada "ALIMENTOS"). Substituir pelo arquivo oficial
 * da marca assim que disponível — ver docs/pendencias.md.
 */
export function Logo({ className = "", title = "Aliança Alimentos" }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 220 120" className={className} role="img" aria-label={title}>
      <title>{title}</title>
      <ellipse cx="110" cy="54" rx="104" ry="50" fill="#C9A24B" />
      <ellipse cx="110" cy="54" rx="97" ry="44" fill="#C8102E" />
      <ellipse cx="110" cy="54" rx="92" ry="39.5" fill="none" stroke="#E8C77A" strokeWidth="1.5" />
      <text
        x="110"
        y="66"
        textAnchor="middle"
        fontFamily="var(--font-pacifico), cursive"
        fontSize="40"
        fill="#FFFFFF"
        stroke="#7A0A1B"
        strokeWidth="0.8"
        paintOrder="stroke"
      >
        Aliança
      </text>
      {/* faixa / fita dourada */}
      <path d="M22 92 L40 86 L180 86 L198 92 L180 112 L40 112 Z" fill="#B8892E" />
      <path d="M40 86 L180 86 L180 110 L40 110 Z" fill="#C9A24B" />
      <text
        x="110"
        y="103.5"
        textAnchor="middle"
        fontFamily="var(--font-dm-sans), sans-serif"
        fontWeight="700"
        fontSize="14"
        letterSpacing="5"
        fill="#1A1414"
      >
        ALIMENTOS
      </text>
    </svg>
  );
}
