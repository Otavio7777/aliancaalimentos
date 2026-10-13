import type { MetadataRoute } from "next";
import { linhas } from "@/data/catalogo";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const fixas = ["", "/produtos", "/food-service", "/cotacao", "/sobre", "/contato", "/privacidade", "/termos"];
  return [
    ...fixas.map((p) => ({ url: `${site.url}${p}`, lastModified: new Date() })),
    ...linhas.filter((l) => l.slug !== "food-service").map((l) => ({ url: `${site.url}/produtos/${l.slug}`, lastModified: new Date() })),
  ];
}
