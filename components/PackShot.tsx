import { useId } from "react";
import Image from "next/image";
import type { Produto } from "@/data/products";

/**
 * Embalagem do produto. Usa a foto recortada do catálogo quando existir
 * (`produto.imagem`); caso contrário desenha um placeholder vetorial na cor do
 * tema, já com o selo frontal "ALTO EM GORDURA SATURADA" visível.
 */
export function PackShot({
  produto,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw",
}: {
  produto: Produto;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const alt = `Embalagem ${produto.nome} ${produto.formato === "chips" ? "sabor " : ""}${produto.sabor} ${produto.gramatura}${
    produto.seloAltoGorduraSaturada ? ", com selo frontal Alto em gordura saturada" : ""
  }`;

  if (produto.imagem) {
    return (
      <div className={`relative aspect-[5/7] ${className}`}>
        <Image src={produto.imagem} alt={alt} fill sizes={sizes} priority={priority} className="object-contain" />
      </div>
    );
  }

  if (produto.formato === "chips") return <ChipsIllustration produto={produto} alt={alt} className={className} />;
  return <PackIllustration produto={produto} alt={alt} className={className} />;
}

/** Placeholder da Batata Chips Lisa: embalagem preta, tipografia dourada e "lisa" na cor do sabor. */
function ChipsIllustration({ produto, alt, className }: { produto: Produto; alt: string; className: string }) {
  const uid = useId().replace(/:/g, "");
  const sabor = produto.corSabor?.texto ?? "#D4AF5A";
  const ouro = "#D4AF5A";
  const [saborNome, complemento] = produto.sabor.replace(")", "").split(" (");
  const serrilha = (y: number) => {
    let d = `M26 ${y}`;
    for (let x = 26; x < 174; x += 8) d += " l4 -4 l4 4";
    return d;
  };

  return (
    <svg viewBox="0 0 200 290" className={`h-auto w-full drop-shadow-xl ${className}`} role="img" aria-label={alt}>
      <title>{alt}</title>
      <defs>
        <linearGradient id={`ouro-${uid}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#E9CC7C" />
          <stop offset="1" stopColor="#A9832F" />
        </linearGradient>
        <radialGradient id={`luz-${uid}`} cx=".35" cy=".3" r=".8">
          <stop offset="0" stopColor="#fff" stopOpacity=".12" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="274" rx="78" ry="7" fill="rgba(0,0,0,.25)" />
      <path d="M22 24 L178 24 Q186 145 178 262 L22 262 Q14 145 22 24 Z" fill="#161616" stroke="#3A3222" strokeWidth="1.2" />
      <path d="M22 24 L178 24 Q186 145 178 262 L22 262 Q14 145 22 24 Z" fill={`url(#luz-${uid})`} />
      <path d={serrilha(34)} stroke="rgba(255,255,255,.12)" strokeWidth="1.5" fill="none" />
      <path d={serrilha(254)} stroke="rgba(255,255,255,.12)" strokeWidth="1.5" fill="none" />

      {/* oval da marca */}
      <g transform="translate(96 66)">
        <ellipse rx="34" ry="16" fill="#C9A24B" />
        <ellipse rx="31" ry="13.5" fill="#C8102E" />
        <text y="5" textAnchor="middle" fontFamily="var(--font-pacifico), cursive" fontSize="13" fill="#fff">
          Aliança
        </text>
      </g>

      <g fontFamily="var(--font-anton), Impact, sans-serif" fill={`url(#ouro-${uid})`} textAnchor="middle">
        <text x="92" y="112" fontSize="30" letterSpacing="1">BATATA</text>
        <text x="80" y="142" fontSize="30" letterSpacing="1">CHIPS</text>
      </g>
      <text x="150" y="144" textAnchor="middle" fontFamily="var(--font-pacifico), cursive" fontSize="22" fill={sabor} transform="rotate(-8 150 144)">
        lisa
      </text>

      {/* chips */}
      <g transform="translate(104 180)">
        {[
          [-26, 4, -14],
          [0, -4, 8],
          [24, 6, 20],
          [-10, 14, 30],
          [12, 16, -24],
        ].map(([x, y, r], i) => (
          <ellipse key={i} cx={x} cy={y} rx="20" ry="12" fill={i % 2 ? "#F0CB6A" : "#E3B24E"} stroke="#C99536" strokeWidth=".8" transform={`rotate(${r} ${x} ${y})`} />
        ))}
      </g>

      <text x="100" y="212" textAnchor="middle" fontFamily="var(--font-dm-sans), sans-serif" fontWeight="700" fontSize="6" letterSpacing="2" fill={ouro}>
        · PREMIUM ·
      </text>
      <text x="100" y="226" textAnchor="middle" fontFamily="var(--font-dm-sans), sans-serif" fontWeight="800" fontSize={saborNome.length > 16 ? 9 : 12} fill={sabor}>
        {saborNome.toUpperCase()}
      </text>
      {complemento && (
        <text x="100" y="237" textAnchor="middle" fontFamily="var(--font-dm-sans), sans-serif" fontSize="8" fill={sabor}>
          {complemento.toUpperCase()}
        </text>
      )}
      <text x="168" y="250" textAnchor="end" fontFamily="var(--font-dm-sans), sans-serif" fontWeight="800" fontSize="12" fill={sabor}>
        {produto.gramatura}
      </text>

      {/* selo frontal de alerta nutricional — sempre visível */}
      {produto.seloAltoGorduraSaturada && (
        <g transform="translate(126 36)">
          <rect width="46" height="32" rx="2.5" fill="#fff" stroke="#000" strokeWidth="1.2" />
          <circle cx="8" cy="8" r="3.6" fill="none" stroke="#000" strokeWidth="1.4" />
          <path d="M10.6 10.6 L13.4 13.4" stroke="#000" strokeWidth="1.6" strokeLinecap="round" />
          <text x="16" y="10.5" fontFamily="var(--font-dm-sans), Arial, sans-serif" fontWeight="800" fontSize="6.4" fill="#000">ALTO EM</text>
          <rect x="3" y="15" width="40" height="14" rx="1.5" fill="#000" />
          <text x="23" y="21" textAnchor="middle" fontFamily="var(--font-dm-sans), Arial, sans-serif" fontWeight="800" fontSize="5.2" fill="#fff">GORDURA</text>
          <text x="23" y="27" textAnchor="middle" fontFamily="var(--font-dm-sans), Arial, sans-serif" fontWeight="800" fontSize="5.2" fill="#fff">SATURADA</text>
        </g>
      )}
    </svg>
  );
}

function PackIllustration({ produto, alt, className }: { produto: Produto; alt: string; className: string }) {
  const uid = useId().replace(/:/g, "");
  const { bg, ink } = produto.corTema;
  const f = produto.formato;
  const isSnack = f === "ondulada" || f === "trigo";
  const shade = "rgba(0,0,0,.18)";

  // silhuetas
  const body =
    f === "pouch"
      ? "M28 34 Q100 22 172 34 L180 262 Q100 272 20 262 Z"
      : f === "sache"
        ? "M40 70 L160 70 L160 230 L40 230 Z"
        : f === "granel"
          ? "M18 30 L182 30 L188 266 L12 266 Z"
          : f === "familia"
            ? "M20 26 L180 26 L184 258 L16 258 Z"
            : "M30 30 L170 30 Q178 150 170 256 L30 256 Q22 150 30 30 Z";

  const serrilha = (y: number, x1: number, x2: number) => {
    let d = `M${x1} ${y}`;
    for (let x = x1; x < x2; x += 8) d += ` l4 -5 l4 5`;
    return d;
  };
  const top = f === "pouch" ? 34 : f === "sache" ? 70 : f === "granel" ? 30 : f === "familia" ? 26 : 30;
  const bottom = f === "pouch" ? 262 : f === "sache" ? 230 : f === "granel" ? 266 : f === "familia" ? 258 : 256;
  const left = f === "sache" ? 40 : f === "granel" ? 12 : 20;
  const right = 200 - left;

  const titulo =
    produto.linha === "krisps" ? "KRISP'S" : produto.linha === "checkmate" ? "CHECKMATE" : "BATATA PALHA";

  return (
    <svg viewBox="0 0 200 290" className={`h-auto w-full drop-shadow-xl ${className}`} role="img" aria-label={alt}>
      <title>{alt}</title>
      <defs>
        <pattern id={`juta-${uid}`} width="6" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill="#D9C39A" />
          <path d="M0 1.5h6M0 4.5h6" stroke="#B89B68" strokeWidth="1.2" />
          <path d="M1.5 0v6M4.5 0v6" stroke="#E9D9B6" strokeWidth="1" />
        </pattern>
        <linearGradient id={`shine-${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".0" />
          <stop offset=".45" stopColor="#fff" stopOpacity=".22" />
          <stop offset=".6" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`clip-${uid}`}>
          <path d={body} />
        </clipPath>
      </defs>

      <ellipse cx="100" cy={bottom + 14} rx="78" ry="7" fill="rgba(0,0,0,.18)" />

      <g clipPath={`url(#clip-${uid})`}>
        <rect x="0" y="0" width="200" height="290" fill={bg} />
        {f === "pouch" && <rect x="0" y="0" width="200" height="92" fill={`url(#juta-${uid})`} />}
        {f === "pouch" && <rect x="0" y="88" width="200" height="6" fill="#C9A24B" />}

        {/* elemento gráfico por linha */}
        {produto.linha === "checkmate" && (
          <>
            <rect x="30" y="0" width="34" height="290" fill="rgba(0,0,0,.35)" />
            <text
              x="0"
              y="0"
              transform={`translate(56 ${bottom - 22}) rotate(-90)`}
              fontFamily="var(--font-anton), Impact, sans-serif"
              fontSize="24"
              letterSpacing="1"
              fill={ink}
            >
              CHECKMATE
            </text>
          </>
        )}

        {/* janela com o produto */}
        {!isSnack && (
          <g>
            <ellipse cx="100" cy={f === "sache" ? 175 : 190} rx={f === "sache" ? 40 : 58} ry={f === "sache" ? 22 : 34} fill="#F6D57A" />
            {Array.from({ length: 26 }).map((_, i) => {
              const cx = 100 + Math.cos(i * 2.4) * (f === "sache" ? 30 : 46) * ((i % 5) / 5 + 0.2);
              const cy = (f === "sache" ? 175 : 190) + Math.sin(i * 1.7) * (f === "sache" ? 14 : 22) * ((i % 4) / 4 + 0.2);
              const a = (i * 47) % 180;
              return (
                <rect
                  key={i}
                  x={cx - 11}
                  y={cy - 1.4}
                  width="22"
                  height="2.8"
                  rx="1.4"
                  fill={i % 3 ? "#E9B64A" : "#D69A2E"}
                  transform={`rotate(${a} ${cx} ${cy})`}
                />
              );
            })}
          </g>
        )}
        {f === "ondulada" && (
          <g transform="translate(100 190)">
            {[0, 1, 2].map((i) => (
              <path
                key={i}
                d="M-44 0 q11 -12 22 0 t22 0 t22 0 t22 0"
                transform={`translate(${(i - 1) * 8} ${(i - 1) * 16}) rotate(${(i - 1) * 12})`}
                stroke="#E9B64A"
                strokeWidth="14"
                fill="none"
                strokeLinecap="round"
              />
            ))}
          </g>
        )}
        {f === "trigo" && (
          <g transform="translate(112 190)">
            {Array.from({ length: 9 }).map((_, i) => (
              <rect
                key={i}
                x={-40 + (i % 3) * 28}
                y={-26 + Math.floor(i / 3) * 18}
                width="22"
                height="12"
                rx="2"
                fill={i % 2 ? "#E9B64A" : "#D69A2E"}
                transform={`rotate(${(i * 23) % 40 - 20})`}
              />
            ))}
          </g>
        )}

        <rect x="0" y="0" width="200" height="290" fill={`url(#shine-${uid})`} />
        <rect x="0" y={bottom - 16} width="200" height="16" fill={shade} />
        <rect x="0" y={top} width="200" height="10" fill={shade} />
      </g>

      {/* serrilhas de selagem */}
      {f !== "pouch" && (
        <>
          <path d={serrilha(top + 2, left + 6, right - 6)} stroke="rgba(0,0,0,.25)" strokeWidth="1.5" fill="none" />
          <path d={serrilha(bottom - 4, left + 6, right - 6)} stroke="rgba(0,0,0,.25)" strokeWidth="1.5" fill="none" />
        </>
      )}

      {/* oval da marca */}
      {!isSnack && (
        <g transform={`translate(100 ${f === "sache" ? 98 : f === "pouch" ? 66 : 70})`}>
          <ellipse rx={f === "sache" ? 30 : 42} ry={f === "sache" ? 14 : 20} fill="#C9A24B" />
          <ellipse rx={f === "sache" ? 27 : 38} ry={f === "sache" ? 12 : 17} fill="#C8102E" />
          <text y={f === "sache" ? 4 : 6} textAnchor="middle" fontFamily="var(--font-pacifico), cursive" fontSize={f === "sache" ? 11 : 16} fill="#fff">
            Aliança
          </text>
        </g>
      )}

      {/* nome */}
      <g fill={ink} textAnchor="middle">
        {isSnack ? (
          <>
            {produto.linha === "krisps" && (
              <text x="100" y="82" fontFamily="var(--font-anton), Impact, sans-serif" fontSize="38" letterSpacing="1">
                {titulo}
              </text>
            )}
            <text
              x={produto.linha === "checkmate" ? 117 : 100}
              y={produto.linha === "checkmate" ? 76 : 104}
              fontFamily="var(--font-anton), Impact, sans-serif"
              fontSize={produto.linha === "checkmate" ? 22 : 12}
              letterSpacing="1"
            >
              {produto.linha === "checkmate" ? produto.nome.replace("Checkmate ", "").toUpperCase() : "BATATA ONDULADA"}
            </text>
            <text x={produto.linha === "checkmate" ? 117 : 100} y={produto.linha === "checkmate" ? 100 : 128} fontFamily="var(--font-dm-sans), sans-serif" fontWeight="700" fontSize="13">
              {produto.sabor.toUpperCase()}
            </text>
          </>
        ) : (
          <>
            <text
              x="100"
              y={f === "sache" ? 130 : f === "pouch" ? 120 : 118}
              fontFamily="var(--font-dm-serif), Georgia, serif"
              fontSize={f === "sache" ? 15 : 22}
            >
              {titulo}
            </text>
            <text x="100" y={f === "sache" ? 146 : f === "pouch" ? 140 : 138} fontFamily="var(--font-dm-sans), sans-serif" fontWeight="700" fontSize={f === "sache" ? 9 : 12} letterSpacing="2">
              {produto.sabor.toUpperCase()}
            </text>
          </>
        )}
        <text x={right - 10} y={bottom - 24} textAnchor="end" fontFamily="var(--font-dm-sans), sans-serif" fontWeight="700" fontSize="12">
          {produto.gramatura}
        </text>
      </g>

      {/* selo frontal de alerta nutricional — sempre visível */}
      {produto.seloAltoGorduraSaturada && (
        <g transform={`translate(${f === "sache" ? 48 : produto.linha === "checkmate" ? 72 : left + 10} ${bottom - (f === "sache" ? 46 : 60)})`}>
          <rect width={f === "sache" ? 64 : 76} height={f === "sache" ? 26 : 30} fill="#fff" stroke="#000" strokeWidth="1.6" />
          <g transform={`translate(${f === "sache" ? 9 : 10} ${f === "sache" ? 13 : 15})`}>
            <circle r="5" fill="none" stroke="#000" strokeWidth="1.8" />
            <path d="M3.6 3.6 L7.4 7.4" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
          </g>
          <text
            x={f === "sache" ? 19 : 22}
            y={f === "sache" ? 11 : 13}
            fontFamily="var(--font-dm-sans), Arial, sans-serif"
            fontWeight="800"
            fontSize={f === "sache" ? 6 : 7}
            fill="#000"
          >
            ALTO EM
          </text>
          <text x={f === "sache" ? 19 : 22} y={f === "sache" ? 19 : 22} fontFamily="var(--font-dm-sans), Arial, sans-serif" fontWeight="800" fontSize={f === "sache" ? 5.2 : 6.2} fill="#000">
            GORDURA
          </text>
          <text x={f === "sache" ? 19 : 22} y={f === "sache" ? 24.5 : 28} fontFamily="var(--font-dm-sans), Arial, sans-serif" fontWeight="800" fontSize={f === "sache" ? 5.2 : 6.2} fill="#000">
            SATURADA
          </text>
        </g>
      )}
    </svg>
  );
}
