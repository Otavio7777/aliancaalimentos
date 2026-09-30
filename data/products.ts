/**
 * Catálogo Aliança Alimentos — fonte de verdade dos SKUs.
 * Gramaturas e unidades por caixa conforme o catálogo comercial.
 * Cores de tema são aproximações (ver docs/pendencias.md — amostragem do PDF pendente).
 */

import { imagensProdutos } from "./product-images";

export type Categoria = "varejo" | "atacado-foodservice";

export type LinhaSlug = "batata-palha" | "food-service" | "krisps" | "checkmate";

/** Formato visual usado pelo placeholder de embalagem quando não há foto. */
export type Formato = "pacote" | "pouch" | "familia" | "sache" | "granel" | "ondulada" | "trigo";

export interface Cor {
  /** cor de fundo / tema */
  bg: string;
  /** cor de texto com contraste AA sobre `bg` */
  ink: string;
}

export interface Produto {
  id: string;
  linha: LinhaSlug;
  /** sublinha comercial (ex.: "Pouch 100g", "Checkmate Petisco") */
  grupo: string;
  nome: string;
  sabor: string;
  gramatura: string;
  /** gramatura em gramas, usada para filtros e ordenação */
  gramas: number;
  unidadesPorCaixa: number;
  categoria: Categoria;
  corTema: Cor;
  formato: Formato;
  /** caminho em /public/products; `null` enquanto o recorte do catálogo estiver pendente */
  imagem: string | null;
  /** selo frontal de alerta nutricional (lupa) — manter visível */
  seloAltoGorduraSaturada: boolean;
}

export interface Linha {
  slug: LinhaSlug;
  nome: string;
  /** título curto usado em cards */
  titulo: string;
  chamada: string;
  descricao: string;
  cor: Cor;
  /** cor de acento (texto grande) com contraste AA sobre `cor.bg` */
  acento: string;
  fonteTitulo: "serif" | "condensed";
}

/** Tokens de cor — espelhados em app/globals.css */
export const cores = {
  vermelho: { bg: "#C8102E", ink: "#FFFFFF" },
  dourado: { bg: "#C9A24B", ink: "#1A1414" },
  douradoEscuro: { bg: "#8A6420", ink: "#FFFFFF" },
  verde: { bg: "#1F4D36", ink: "#FFFFFF" },
  azul: { bg: "#2E6DA4", ink: "#FFFFFF" },
  marinho: { bg: "#1B2A5C", ink: "#FFFFFF" },
  grafite: { bg: "#1E1B1C", ink: "#FFFFFF" },
  pimenta: { bg: "#8E1B1B", ink: "#FFFFFF" },
  bacon: { bg: "#8B2C6F", ink: "#FFFFFF" },
  queijo: { bg: "#F2C230", ink: "#1A1414" },
  churrasco: { bg: "#6B3A1F", ink: "#FFFFFF" },
  cebolaSalsa: { bg: "#5E6B2A", ink: "#FFFFFF" },
  costelinhaLimao: { bg: "#16706B", ink: "#FFFFFF" },
  costelinhaBarbecue: { bg: "#7A2E1A", ink: "#FFFFFF" },
} satisfies Record<string, Cor>;

export const linhas: Linha[] = [
  {
    slug: "batata-palha",
    nome: "Batata Palha Aliança",
    titulo: "Batata Palha",
    chamada: "Fininha, sequinha e crocante do primeiro ao último fio.",
    descricao:
      "Tradicional, Extrafina, Temperada e Zero Sódio em embalagens de 80g, pouch 100g e tamanho família 300g.",
    cor: cores.vermelho,
    acento: "#F3D98B",
    fonteTitulo: "serif",
  },
  {
    slug: "food-service",
    nome: "Atacado & Food Service",
    titulo: "Food Service",
    chamada: "Batata palha no volume da sua cozinha.",
    descricao: "Tradicional 800g para cozinhas e sachê individual de 12g para delivery e porcionamento.",
    cor: cores.dourado,
    acento: "#7A0A1B",
    fonteTitulo: "serif",
  },
  {
    slug: "krisps",
    nome: "Batata Ondulada Krisp's",
    titulo: "Krisp's",
    chamada: "Ondulada, crocante e cheia de sabor.",
    descricao: "Batata ondulada 45g nos sabores Original, Churrasco e Cebola/Salsa.",
    cor: cores.marinho,
    acento: "#F2C230",
    fonteTitulo: "condensed",
  },
  {
    slug: "checkmate",
    nome: "Salgadinho de Trigo Checkmate",
    titulo: "Checkmate",
    chamada: "Xeque-mate na fome.",
    descricao: "Salgadinho de trigo nas versões Skin 40g e Petisco 50g e 100g, com seis sabores.",
    cor: cores.grafite,
    acento: "#F2C230",
    fonteTitulo: "condensed",
  },
];

type Base = Omit<Produto, "id" | "imagem" | "seloAltoGorduraSaturada"> & { id?: string };

function p(item: Base & { id: string }): Produto {
  return { ...item, imagem: imagensProdutos[item.id] ?? null, seloAltoGorduraSaturada: true };
}

const slug = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/* ---------------------------- Batata Palha ---------------------------- */

const batataPalha: Produto[] = [
  // Embalagem 80g — cx c/ 50un
  p({ id: "bp-tradicional-80g", linha: "batata-palha", grupo: "Embalagem 80g", nome: "Batata Palha Tradicional", sabor: "Tradicional", gramatura: "80g", gramas: 80, unidadesPorCaixa: 50, categoria: "varejo", corTema: cores.vermelho, formato: "pacote" }),
  p({ id: "bp-extrafina-80g", linha: "batata-palha", grupo: "Embalagem 80g", nome: "Batata Palha Extrafina", sabor: "Extrafina", gramatura: "80g", gramas: 80, unidadesPorCaixa: 50, categoria: "varejo", corTema: cores.dourado, formato: "pacote" }),
  // Pouch 100g — cx c/ 40un
  p({ id: "bp-tradicional-100g", linha: "batata-palha", grupo: "Pouch 100g", nome: "Batata Palha Tradicional", sabor: "Tradicional", gramatura: "100g", gramas: 100, unidadesPorCaixa: 40, categoria: "varejo", corTema: cores.vermelho, formato: "pouch" }),
  p({ id: "bp-extrafina-100g", linha: "batata-palha", grupo: "Pouch 100g", nome: "Batata Palha Extrafina", sabor: "Extrafina", gramatura: "100g", gramas: 100, unidadesPorCaixa: 40, categoria: "varejo", corTema: cores.dourado, formato: "pouch" }),
  p({ id: "bp-temperada-100g", linha: "batata-palha", grupo: "Pouch 100g", nome: "Batata Palha Temperada", sabor: "Temperada", gramatura: "100g", gramas: 100, unidadesPorCaixa: 40, categoria: "varejo", corTema: cores.verde, formato: "pouch" }),
  p({ id: "bp-zero-sodio-100g", linha: "batata-palha", grupo: "Pouch 100g", nome: "Batata Palha Zero Sódio", sabor: "Zero Sódio", gramatura: "100g", gramas: 100, unidadesPorCaixa: 40, categoria: "varejo", corTema: cores.azul, formato: "pouch" }),
  // Embalagem 300g (tamanho família) — cx c/ 16un
  p({ id: "bp-tradicional-300g", linha: "batata-palha", grupo: "Tamanho família 300g", nome: "Batata Palha Tradicional", sabor: "Tradicional", gramatura: "300g", gramas: 300, unidadesPorCaixa: 16, categoria: "varejo", corTema: cores.vermelho, formato: "familia" }),
  p({ id: "bp-extrafina-300g", linha: "batata-palha", grupo: "Tamanho família 300g", nome: "Batata Palha Extrafina", sabor: "Extrafina", gramatura: "300g", gramas: 300, unidadesPorCaixa: 16, categoria: "varejo", corTema: cores.dourado, formato: "familia" }),
];

/* ----------------------- Atacado & Food Service ----------------------- */

const foodService: Produto[] = [
  p({ id: "fs-sache-12g", linha: "food-service", grupo: "Atacado & Food Service", nome: "Batata Palha Sachê", sabor: "Sachê individual", gramatura: "12g", gramas: 12, unidadesPorCaixa: 150, categoria: "atacado-foodservice", corTema: cores.dourado, formato: "sache" }),
  p({ id: "fs-tradicional-800g", linha: "food-service", grupo: "Atacado & Food Service", nome: "Batata Palha Tradicional", sabor: "Tradicional", gramatura: "800g", gramas: 800, unidadesPorCaixa: 8, categoria: "atacado-foodservice", corTema: cores.vermelho, formato: "granel" }),
];

/* ------------------------------ Krisp's ------------------------------- */

const krisps: Produto[] = (
  [
    ["Original", cores.marinho],
    ["Churrasco", cores.churrasco],
    ["Cebola/Salsa", cores.cebolaSalsa],
  ] as const
).map(([sabor, cor]) =>
  p({ id: `krisps-${slug(sabor)}-45g`, linha: "krisps", grupo: "Krisp's 45g", nome: "Batata Ondulada Krisp's", sabor, gramatura: "45g", gramas: 45, unidadesPorCaixa: 24, categoria: "varejo", corTema: cor, formato: "ondulada" }),
);

/* ----------------------------- Checkmate ------------------------------ */

const checkmateSkin: Produto[] = (
  [
    ["Bacon", cores.bacon],
    ["Costelinha/Barbecue", cores.costelinhaBarbecue],
    ["Costelinha/Limão", cores.costelinhaLimao],
  ] as const
).map(([sabor, cor]) =>
  p({ id: `checkmate-skin-${slug(sabor)}-40g`, linha: "checkmate", grupo: "Checkmate Skin 40g", nome: "Checkmate Skin", sabor, gramatura: "40g", gramas: 40, unidadesPorCaixa: 20, categoria: "varejo", corTema: cor, formato: "trigo" }),
);

const saboresPetisco = [
  ["Pimenta", cores.pimenta],
  ["Bacon", cores.bacon],
  ["Queijo", cores.queijo],
  ["Churrasco", cores.churrasco],
  ["Cebola e Salsa", cores.cebolaSalsa],
  ["Costelinha/Limão", cores.costelinhaLimao],
] as const;

const checkmatePetisco: Produto[] = (
  [
    [50, 30],
    [100, 25],
  ] as const
).flatMap(([gramas, cx]) =>
  saboresPetisco.map(([sabor, cor]) =>
    p({ id: `checkmate-petisco-${slug(sabor)}-${gramas}g`, linha: "checkmate", grupo: `Checkmate Petisco ${gramas}g`, nome: "Checkmate Petisco", sabor, gramatura: `${gramas}g`, gramas, unidadesPorCaixa: cx, categoria: "varejo", corTema: cor, formato: "trigo" }),
  ),
);

export const produtos: Produto[] = [
  ...batataPalha,
  ...foodService,
  ...krisps,
  ...checkmateSkin,
  ...checkmatePetisco,
];

export const categorias: Record<Categoria, string> = {
  varejo: "Varejo",
  "atacado-foodservice": "Atacado & Food Service",
};

export function getLinha(slug: string): Linha | undefined {
  return linhas.find((l) => l.slug === slug);
}

export function produtosDaLinha(slug: LinhaSlug): Produto[] {
  return produtos.filter((p) => p.linha === slug);
}

/** Agrupa preservando a ordem de declaração. */
export function agruparPorGrupo(lista: Produto[]): [string, Produto[]][] {
  const map = new Map<string, Produto[]>();
  for (const item of lista) {
    map.set(item.grupo, [...(map.get(item.grupo) ?? []), item]);
  }
  return [...map.entries()];
}

export const gramaturas = [...new Set(produtos.map((p) => p.gramas))].sort((a, b) => a - b);
