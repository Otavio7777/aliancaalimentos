import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "gold" | "outline" | "outline-light" | "dark" | "theme";

const variants: Record<Variant, string> = {
  primary: "bg-red text-white hover:bg-red-deep",
  gold: "bg-gold text-ink hover:brightness-105",
  outline: "ring-2 ring-inset ring-ink text-ink hover:bg-ink hover:text-white",
  "outline-light": "ring-2 ring-inset ring-white text-white hover:bg-white hover:text-ink",
  dark: "bg-ink text-white hover:bg-black",
  theme: "themed hover:brightness-110",
};

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; children: ReactNode }) {
  return (
    <Link
      {...props}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-bold transition ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`font-condensed text-sm uppercase tracking-[0.2em] ${className}`}>{children}</p>;
}

export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <mark className="rounded bg-yellow-200 px-1 font-mono text-[0.9em] text-ink" title="Conteúdo a ser preenchido pela Aliança">
      {children}
    </mark>
  );
}

export function PageHero({
  eyebrow,
  title,
  children,
  theme = "#C8102E",
  ink = "#FFFFFF",
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  theme?: string;
  ink?: string;
}) {
  return (
    <section data-theme={theme} data-theme-ink={ink} style={{ backgroundColor: theme, color: ink }} className="juta relative overflow-hidden">
      <Container className="py-16 sm:py-20 lg:py-24">
        {eyebrow && <Eyebrow className="opacity-90">{eyebrow}</Eyebrow>}
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-7xl">{title}</h1>
        {children && <div className="mt-6 max-w-2xl text-lg opacity-95 sm:text-xl">{children}</div>}
      </Container>
    </section>
  );
}
