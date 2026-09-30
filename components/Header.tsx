"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { nav } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/produtos" ? pathname === "/produtos" || (pathname.startsWith("/produtos/") && !pathname.startsWith("/produtos/food-service")) : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-offwhite/95 backdrop-blur supports-[backdrop-filter]:bg-offwhite/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0" aria-label="Aliança Alimentos — página inicial">
          <Logo className="h-11 w-auto sm:h-14" title="Aliança Alimentos" />
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1 lg:gap-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="rounded-full px-3 py-2 text-sm font-semibold text-ink/80 transition hover:bg-black/5 hover:text-ink aria-[current=page]:text-red lg:px-4 lg:text-base"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/revenda"
            className="themed rounded-full px-4 py-2.5 text-sm font-bold shadow-sm ring-1 ring-black/10 hover:brightness-110 sm:px-5 sm:text-base"
          >
            <span className="sm:hidden">Revenda</span>
            <span className="hidden sm:inline">Seja um revendedor</span>
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-black/5 md:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <nav
        id="menu-mobile"
        aria-label="Menu móvel"
        hidden={!open}
        className="border-t border-black/10 bg-offwhite md:hidden"
      >
        <ul className="mx-auto max-w-7xl px-4 py-3">
          {[...nav, { href: "/revenda", label: "Seja um revendedor" }].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="block rounded-lg px-3 py-3 text-lg font-semibold hover:bg-black/5 aria-[current=page]:text-red"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
