"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Regra "cor da embalagem = tema": cada seção marcada com `data-theme`
 * (e opcionalmente `data-theme-ink`) passa sua cor para o documento quando
 * ocupa o centro da tela. Elementos globais (ex.: botão do cabeçalho) usam
 * `var(--theme)` e trocam de cor com transição suave.
 */
export function ThemeSync() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const apply = (el: Element | null) => {
      const color = el?.getAttribute("data-theme") ?? "#C8102E";
      const ink = el?.getAttribute("data-theme-ink") ?? "#FFFFFF";
      root.style.setProperty("--theme", color);
      root.style.setProperty("--theme-ink", ink);
    };

    const sections = Array.from(document.querySelectorAll("[data-theme]"));
    apply(sections[0] ?? null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) apply(entry.target);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
