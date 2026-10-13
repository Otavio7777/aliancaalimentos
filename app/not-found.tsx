import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
      <h1 className="font-display text-6xl uppercase">Página não encontrada</h1>
      <p className="mt-3 text-lg text-muted">O endereço pode ter mudado. Comece pelo catálogo.</p>
      <Link href="/produtos" className="btn btn-solid mt-6">Ver produtos</Link>
    </section>
  );
}
