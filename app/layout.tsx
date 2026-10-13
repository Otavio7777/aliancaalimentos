import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuoteProvider } from "@/components/Quote";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { site } from "@/lib/site";

// Fontes hospedadas no próprio site (OFL): DM Sans, Anton e Pacifico.
const body = localFont({
  src: [
    { path: "./fonts/dm-sans-latin-wght-normal.woff2", weight: "100 1000", style: "normal" },
    { path: "./fonts/dm-sans-latin-ext-wght-normal.woff2", weight: "100 1000", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});
const anton = localFont({
  src: [{ path: "./fonts/anton-latin-400-normal.woff2" }, { path: "./fonts/anton-latin-ext-400-normal.woff2" }],
  variable: "--font-anton",
  display: "swap",
});
const script = localFont({
  src: [{ path: "./fonts/pacifico-latin-400-normal.woff2" }, { path: "./fonts/pacifico-latin-ext-400-normal.woff2" }],
  variable: "--font-script-face",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Aliança Alimentos: batata palha, batata chips e snacks", template: "%s | Aliança Alimentos" },
  description: site.descricao,
  applicationName: site.nome,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.nome,
    title: "Aliança Alimentos",
    description: site.descricao,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Aliança Alimentos" }],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#C8102E" };

const org = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.nome,
  url: site.url,
  logo: `${site.url}/brand/logo.png`,
  slogan: site.slogan,
  brand: ["Aliança", "Krisp's", "Checkmate"].map((name) => ({ "@type": "Brand", name })),
  contactPoint: { "@type": "ContactPoint", telephone: "+55-31-99991-5082", contactType: "sales", areaServed: "BR", availableLanguage: "Portuguese" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${body.variable} ${anton.variable} ${script.variable}`}>
      <body className="min-h-dvh">
        <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
        <QuoteProvider>
          <Header />
          <main id="conteudo">{children}</main>
          <Footer />
          <WhatsAppFab />
        </QuoteProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      </body>
    </html>
  );
}
