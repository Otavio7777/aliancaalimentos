"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { Logo } from "./Logo";
import { useQuote } from "./Quote";

export function Header() {
  const [aberto, setAberto] = useState(false);
  const path = usePathname();
  const { totalItens, pronto } = useQuote();
  useEffect(() => setAberto(false), [path]);

  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-ink bg-paper">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Logo className="h-11 w-auto" priority />
        <nav aria-label="Principal" className="ml-auto hidden items-center gap-6 font-extrabold md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={path.startsWith(n.href) ? "page" : undefined}
              className="py-2 underline-offset-[6px] hover:underline aria-[current=page]:underline"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link href="/cotacao" className="btn btn-solid ml-auto px-4 py-2.5 text-sm md:ml-0">
          Cotação
          {pronto && totalItens > 0 && (
            <span className="grid min-w-6 place-items-center rounded-full bg-yellow px-1.5 text-xs text-ink" aria-label={`${totalItens} itens`}>
              {totalItens}
            </span>
          )}
        </Link>
        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border-[3px] border-ink md:hidden"
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          onClick={() => setAberto((v) => !v)}
        >
          <span className="sr-only">{aberto ? "Fechar menu" : "Abrir menu"}</span>
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            {aberto ? (
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>
      {aberto && (
        <nav id="menu-mobile" aria-label="Menu" className="border-t-[3px] border-ink bg-paper px-4 pb-4 md:hidden">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="block border-b border-ink/15 py-3 text-lg font-extrabold">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
