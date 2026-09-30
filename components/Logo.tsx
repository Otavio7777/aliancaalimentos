import Image from "next/image";

/** Proporção do arquivo oficial recortado (public/brand/logo-alianca-header.webp, 400x180). */
const W = 400;
const H = 180;

/**
 * Logo oficial da Aliança Alimentos (lote 1B). Usar sobre fundo claro, creme ou
 * escuro neutro; nunca recolorir, distorcer, girar ou aplicar sombra.
 * `className` define a altura (ex.: "h-11 w-auto"); `sizes` deve refletir a largura exibida.
 */
export function Logo({
  className = "",
  priority = false,
  sizes = "125px",
}: {
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src="/brand/logo-alianca-header.webp"
      alt="Aliança Alimentos"
      width={W}
      height={H}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
