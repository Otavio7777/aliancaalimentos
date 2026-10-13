import Link from "next/link";
import { linhas } from "@/data/catalogo";
import { linkWhatsApp, site, WHATSAPP_LEGIVEL } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t-[3px] border-ink bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <span className="inline-block rounded-2xl bg-paper px-3 py-2">
            <Logo className="h-12 w-auto" />
          </span>
          <p className="mt-4 font-script text-2xl text-yellow">{site.slogan}</p>
          <p className="mt-3 max-w-sm text-sm text-white/75">
            Batata palha, batata chips e snacks para varejo, atacado e food service.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl uppercase">Linhas</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {linhas.map((l) => (
              <li key={l.slug}>
                <Link className="hover:underline" href={l.slug === "food-service" ? "/food-service" : `/produtos/${l.slug}`}>
                  {l.nome}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-xl uppercase">Fale com o comercial</h2>
          <a href={linkWhatsApp()} target="_blank" rel="noopener" className="btn mt-4 bg-yellow text-ink">
            WhatsApp {WHATSAPP_LEGIVEL}
          </a>
          <ul className="mt-5 space-y-2 text-sm text-white/75">
            <li><Link className="hover:underline" href="/cotacao">Montar cotação</Link></li>
            <li><Link className="hover:underline" href="/privacidade">Política de Privacidade</Link></li>
            <li><Link className="hover:underline" href="/termos">Termos de Uso</Link></li>
          </ul>
        </div>
      </div>
      <p className="border-t border-white/15 px-4 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} {site.nome}. Imagens ilustrativas.
      </p>
    </footer>
  );
}
