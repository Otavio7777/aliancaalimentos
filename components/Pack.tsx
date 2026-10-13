import Image from "next/image";
import { nomeProduto, type Produto } from "@/data/catalogo";

export function Pack({
  p,
  className = "",
  sizes = "(min-width: 1024px) 220px, 40vw",
  priority = false,
}: {
  p: Produto;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={p.imagem}
      alt={`Embalagem ${nomeProduto(p)}`}
      width={p.w}
      height={p.h}
      sizes={sizes}
      priority={priority}
      className={`h-full w-auto object-contain drop-shadow-[0_14px_14px_rgba(0,0,0,0.35)] ${className}`}
    />
  );
}
