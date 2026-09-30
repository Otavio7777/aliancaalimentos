import type { ReactNode } from "react";
import { Container } from "./ui";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <Container className="py-14 sm:py-20">
      <article className="mx-auto max-w-3xl [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-2xl [&_li]:ml-5 [&_li]:list-disc [&_p]:mt-4 [&_p]:leading-relaxed [&_ul]:mt-4 [&_ul]:space-y-2">
        <h1 className="font-serif text-4xl sm:text-5xl">{title}</h1>
        <p className="text-sm text-ink/70">Última atualização: {updated}</p>
        <p className="rounded-xl bg-yellow-100 p-4 text-sm">
          Texto-base para revisão jurídica. Os trechos marcados com [PREENCHER] devem ser completados pela Aliança Alimentos
          antes da publicação definitiva.
        </p>
        {children}
      </article>
    </Container>
  );
}
