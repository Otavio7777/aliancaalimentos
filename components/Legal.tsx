import type { ReactNode } from "react";

export function Legal({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:uppercase [&_li]:ml-5 [&_li]:list-disc [&_p]:mt-3 [&_p]:leading-relaxed [&_ul]:mt-3 [&_ul]:space-y-1">
      <h1 className="font-display text-5xl uppercase">{titulo}</h1>
      <p className="mt-3 rounded-xl bg-yellow/40 p-3 text-sm">Texto-base, a ser revisado pela Aliança Alimentos antes da publicação definitiva.</p>
      {children}
    </article>
  );
}
