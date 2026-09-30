import type { MetadataRoute } from "next";
import { linhas } from "@/data/products";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const rotas = ["", "/produtos", "/sobre", "/revenda", "/contato", "/privacidade", "/termos"];
  const now = new Date();
  return [
    ...rotas.map((r) => ({
      url: `${site.url}${r}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: r === "" ? 1 : r === "/produtos" || r === "/revenda" ? 0.9 : 0.5,
    })),
    ...linhas.map((l) => ({
      url: `${site.url}/produtos/${l.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
