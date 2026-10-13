import Image from "next/image";
import Link from "next/link";

export function Logo({ className = "h-11 w-auto", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Link href="/" aria-label="Aliança Alimentos, página inicial" className="inline-flex shrink-0">
      <Image src="/brand/logo.webp" alt="Aliança Alimentos" width={480} height={205} priority={priority} className={className} />
    </Link>
  );
}
