import Link from "next/link";
import { Logo } from "./Logo";
import { linhas } from "@/data/products";
import { site } from "@/lib/site";

export function Footer() {
  const ano = new Date().getFullYear();
  return (
    <footer className="bg-graphite text-white">
      <div className="h-2 bg-gold" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          {/* placa creme: o ® da logo é preto e sumiria sobre o grafite */}
          <Link href="/" className="inline-block rounded-2xl bg-offwhite px-4 py-3">
            <Logo className="h-14 w-auto" sizes="125px" />
            <span className="sr-only">, página inicial</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-white/75">
            Batata palha e snacks para o varejo, o atacado e o food service.
          </p>
        </div>

        <nav aria-label="Produtos no rodapé">
          <h2 className="font-condensed text-lg tracking-wide text-gold">PRODUTOS</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {linhas.map((l) => (
              <li key={l.slug}>
                <Link href={`/produtos/${l.slug}`} className="text-white/85 hover:text-white hover:underline">
                  {l.nome}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/produtos" className="text-white/85 hover:text-white hover:underline">
                Catálogo completo
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Institucional">
          <h2 className="font-condensed text-lg tracking-wide text-gold">ALIANÇA</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ["/sobre", "Sobre a Aliança"],
              ["/revenda", "Seja um revendedor"],
              ["/revenda#food-service", "Food Service"],
              ["/contato", "Contato"],
              ["/privacidade", "Política de Privacidade"],
              ["/termos", "Termos de Uso"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="text-white/85 hover:text-white hover:underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-condensed text-lg tracking-wide text-gold">FALE COM A GENTE</h2>
          <address className="mt-4 space-y-2 text-sm not-italic text-white/85">
            <p>{site.endereco}</p>
            <p>{site.cidadeUf}</p>
            <p>Telefone: {site.telefone}</p>
            <p>WhatsApp: {site.whatsapp}</p>
            <p>E-mail: {site.email}</p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-white/70 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {ano} {site.nome} · {site.razaoSocial} · {site.cnpj}
          </p>
          <p>Imagens meramente ilustrativas.</p>
        </div>
      </div>
    </footer>
  );
}
