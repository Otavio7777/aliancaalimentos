import type { Metadata, Viewport } from "next";
import { Anton, DM_Sans, DM_Serif_Display, Pacifico } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeSync } from "@/components/ThemeSync";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400", variable: "--font-dm-serif", display: "swap" });
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap" });
const pacifico = Pacifico({ subsets: ["latin"], weight: "400", variable: "--font-pacifico", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Aliança Alimentos — Batata palha e snacks",
    template: "%s | Aliança Alimentos",
  },
  description: site.descricao,
  applicationName: site.nome,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.nome,
    title: "Aliança Alimentos — Batata palha e snacks",
    description: site.descricao,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#C8102E",
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.nome,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  description: site.descricao,
  brand: [
    { "@type": "Brand", name: "Aliança" },
    { "@type": "Brand", name: "Krisp's" },
    { "@type": "Brand", name: "Checkmate" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${dmSerif.variable} ${anton.variable} ${pacifico.variable}`}>
      <body className="min-h-dvh">
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <ThemeSync />
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <JsonLd data={organization} />
      </body>
    </html>
  );
}
