/**
 * Fonte de verdade: "Catálogo de Produtos - Aliança Alimentos" (out/2026).
 * Un/cx da Batata Chips Lisa fica null ("Consulte-nos") até confirmação da Aliança.
 */

export type LinhaSlug =
  | "batata-ondulada-krisps"
  | "checkmate-skin"
  | "batata-chips-lisa"
  | "checkmate-petisco"
  | "batata-palha"
  | "food-service";

export type Canal = "varejo" | "atacado";

export type Linha = {
  slug: LinhaSlug;
  nome: string;
  curto: string;
  slogan: string;
  descricao: string;
  resumo: string;
  /** cor de fundo da linha (vem da página da linha no catálogo) */
  cor: string;
  /** cor do texto sobre a cor da linha */
  tinta: string;
  /** destaque (slogan, botões) sobre a cor da linha */
  destaque: string;
  /** texto sobre o destaque */
  destaqueTinta: string;
  capa: string;
};

export type Produto = {
  id: string;
  linha: LinhaSlug;
  sabor: string;
  gramatura: number;
  caixa: number | null;
  canal: Canal;
  embalagem: string;
  imagem: string;
  w: number;
  h: number;
};

export const linhas: Linha[] = [
  {
    slug: "batata-ondulada-krisps",
    nome: "Batata Ondulada Krisp's",
    curto: "Krisp's",
    slogan: "Ondulada, crocante e cheia de sabor.",
    descricao: "Batata ondulada 45g nos sabores Original, Churrasco e Cebola/Salsa.",
    resumo: "Original, Churrasco e Cebola/Salsa, 45g",
    cor: "#1B2A6B",
    tinta: "#FFFFFF",
    destaque: "#F5C518",
    destaqueTinta: "#1B1405",
    capa: "krisps-churrasco-45g",
  },
  {
    slug: "checkmate-skin",
    nome: "Checkmate Skin",
    curto: "Checkmate Skin",
    slogan: "Xeque-mate na fome.",
    descricao: "Salgadinho de trigo Skin 40g nos sabores Bacon, Costelinha/Barbecue e Costelinha/Limão.",
    resumo: "Salgadinho de trigo, 40g",
    cor: "#2B0F24",
    tinta: "#FFFFFF",
    destaque: "#F5C518",
    destaqueTinta: "#1B1405",
    capa: "skin-bacon-40g",
  },
  {
    slug: "batata-chips-lisa",
    nome: "Batata Chips Lisa",
    curto: "Chips Lisa",
    slogan: "Lisa, macia e cheia de sabor.",
    descricao:
      "Batata lisa 45g e 150g nos sabores Original, Cheddar e Bacon, Frango Grelhado, Costelinha com Barbecue e Creme de Cebola.",
    resumo: "Batata lisa 45g e 150g em 5 sabores",
    cor: "#111111",
    tinta: "#FFFFFF",
    destaque: "#E2B657",
    destaqueTinta: "#1B1405",
    capa: "lisa-original-150g",
  },
  {
    slug: "checkmate-petisco",
    nome: "Checkmate Petisco",
    curto: "Checkmate Petisco",
    slogan: "Xeque-mate na fome.",
    descricao:
      "Salgadinho de trigo Petisco 50g e 100g nos sabores Pimenta, Bacon, Queijo, Churrasco, Cebola e Salsa e Costelinha/Limão.",
    resumo: "Salgadinho de trigo, 50g e 100g",
    cor: "#A8121C",
    tinta: "#FFFFFF",
    destaque: "#F5C518",
    destaqueTinta: "#1B1405",
    capa: "petisco-bacon-50g",
  },
  {
    slug: "batata-palha",
    nome: "Batata Palha Aliança",
    curto: "Batata Palha",
    slogan: "Fininha, sequinha e crocante do primeiro ao último fio.",
    descricao:
      "Tradicional, Extrafina, Temperada e Zero Sódio em embalagens de 80g, pouch 100g e tamanho família 300g.",
    resumo: "Embalagem 80g, pouch 100g e tamanho família 300g",
    cor: "#C8102E",
    tinta: "#FFFFFF",
    destaque: "#F5C518",
    destaqueTinta: "#1B1405",
    capa: "palha-extrafina-300g",
  },
  {
    slug: "food-service",
    nome: "Atacado & Food Service",
    curto: "Food Service",
    slogan: "Batata palha no volume da sua cozinha.",
    descricao: "Tradicional 800g para cozinhas e sachê individual de 12g para delivery e porcionamento.",
    resumo: "Sachê 12g e Tradicional 800g",
    cor: "#D9A62B",
    tinta: "#1B1405",
    destaque: "#A8121C",
    destaqueTinta: "#FFFFFF",
    capa: "foodservice-tradicional-800g",
  },
];

export const produtos: Produto[] = [
  { id: "krisps-original-45g", linha: "batata-ondulada-krisps", sabor: "Original", gramatura: 45, caixa: 24, canal: "varejo", embalagem: "", imagem: "/produtos/krisps-original-45g.webp", w: 441, h: 640 },
  { id: "krisps-churrasco-45g", linha: "batata-ondulada-krisps", sabor: "Churrasco", gramatura: 45, caixa: 24, canal: "varejo", embalagem: "", imagem: "/produtos/krisps-churrasco-45g.webp", w: 441, h: 640 },
  { id: "krisps-cebola-salsa-45g", linha: "batata-ondulada-krisps", sabor: "Cebola e Salsa", gramatura: 45, caixa: 24, canal: "varejo", embalagem: "", imagem: "/produtos/krisps-cebola-salsa-45g.webp", w: 441, h: 640 },
  { id: "skin-bacon-40g", linha: "checkmate-skin", sabor: "Bacon", gramatura: 40, caixa: 20, canal: "varejo", embalagem: "", imagem: "/produtos/skin-bacon-40g.webp", w: 449, h: 640 },
  { id: "skin-costelinha-barbecue-40g", linha: "checkmate-skin", sabor: "Costelinha com Barbecue", gramatura: 40, caixa: 20, canal: "varejo", embalagem: "", imagem: "/produtos/skin-costelinha-barbecue-40g.webp", w: 449, h: 640 },
  { id: "skin-costelinha-limao-40g", linha: "checkmate-skin", sabor: "Costelinha com Limão", gramatura: 40, caixa: 20, canal: "varejo", embalagem: "", imagem: "/produtos/skin-costelinha-limao-40g.webp", w: 449, h: 640 },
  { id: "lisa-original-45g", linha: "batata-chips-lisa", sabor: "Original", gramatura: 45, caixa: null, canal: "varejo", embalagem: "", imagem: "/produtos/lisa-original-45g.webp", w: 462, h: 640 },
  { id: "lisa-creme-cebola-45g", linha: "batata-chips-lisa", sabor: "Creme de Cebola", gramatura: 45, caixa: null, canal: "varejo", embalagem: "", imagem: "/produtos/lisa-creme-cebola-45g.webp", w: 462, h: 640 },
  { id: "lisa-costelinha-barbecue-45g", linha: "batata-chips-lisa", sabor: "Costelinha com Barbecue", gramatura: 45, caixa: null, canal: "varejo", embalagem: "", imagem: "/produtos/lisa-costelinha-barbecue-45g.webp", w: 462, h: 640 },
  { id: "lisa-frango-grelhado-45g", linha: "batata-chips-lisa", sabor: "Frango Grelhado", gramatura: 45, caixa: null, canal: "varejo", embalagem: "", imagem: "/produtos/lisa-frango-grelhado-45g.webp", w: 462, h: 640 },
  { id: "lisa-cheddar-bacon-45g", linha: "batata-chips-lisa", sabor: "Cheddar e Bacon", gramatura: 45, caixa: null, canal: "varejo", embalagem: "", imagem: "/produtos/lisa-cheddar-bacon-45g.webp", w: 462, h: 640 },
  { id: "lisa-original-150g", linha: "batata-chips-lisa", sabor: "Original", gramatura: 150, caixa: null, canal: "varejo", embalagem: "", imagem: "/produtos/lisa-original-150g.webp", w: 462, h: 640 },
  { id: "lisa-creme-cebola-150g", linha: "batata-chips-lisa", sabor: "Creme de Cebola", gramatura: 150, caixa: null, canal: "varejo", embalagem: "", imagem: "/produtos/lisa-creme-cebola-150g.webp", w: 462, h: 640 },
  { id: "lisa-costelinha-barbecue-150g", linha: "batata-chips-lisa", sabor: "Costelinha com Barbecue", gramatura: 150, caixa: null, canal: "varejo", embalagem: "", imagem: "/produtos/lisa-costelinha-barbecue-150g.webp", w: 462, h: 640 },
  { id: "lisa-frango-grelhado-150g", linha: "batata-chips-lisa", sabor: "Frango Grelhado", gramatura: 150, caixa: null, canal: "varejo", embalagem: "", imagem: "/produtos/lisa-frango-grelhado-150g.webp", w: 462, h: 640 },
  { id: "lisa-cheddar-bacon-150g", linha: "batata-chips-lisa", sabor: "Cheddar e Bacon", gramatura: 150, caixa: null, canal: "varejo", embalagem: "", imagem: "/produtos/lisa-cheddar-bacon-150g.webp", w: 462, h: 640 },
  { id: "petisco-bacon-50g", linha: "checkmate-petisco", sabor: "Bacon", gramatura: 50, caixa: 30, canal: "varejo", embalagem: "", imagem: "/produtos/petisco-bacon-50g.webp", w: 365, h: 640 },
  { id: "petisco-pimenta-50g", linha: "checkmate-petisco", sabor: "Pimenta", gramatura: 50, caixa: 30, canal: "varejo", embalagem: "", imagem: "/produtos/petisco-pimenta-50g.webp", w: 365, h: 640 },
  { id: "petisco-queijo-50g", linha: "checkmate-petisco", sabor: "Queijo", gramatura: 50, caixa: 30, canal: "varejo", embalagem: "", imagem: "/produtos/petisco-queijo-50g.webp", w: 365, h: 640 },
  { id: "petisco-cebola-salsa-50g", linha: "checkmate-petisco", sabor: "Cebola e Salsa", gramatura: 50, caixa: 30, canal: "varejo", embalagem: "", imagem: "/produtos/petisco-cebola-salsa-50g.webp", w: 365, h: 640 },
  { id: "petisco-churrasco-50g", linha: "checkmate-petisco", sabor: "Churrasco", gramatura: 50, caixa: 30, canal: "varejo", embalagem: "", imagem: "/produtos/petisco-churrasco-50g.webp", w: 365, h: 640 },
  { id: "petisco-costelinha-limao-50g", linha: "checkmate-petisco", sabor: "Costelinha com Limão", gramatura: 50, caixa: 30, canal: "varejo", embalagem: "", imagem: "/produtos/petisco-costelinha-limao-50g.webp", w: 365, h: 640 },
  { id: "petisco-bacon-100g", linha: "checkmate-petisco", sabor: "Bacon", gramatura: 100, caixa: 25, canal: "varejo", embalagem: "", imagem: "/produtos/petisco-bacon-100g.webp", w: 365, h: 640 },
  { id: "petisco-pimenta-100g", linha: "checkmate-petisco", sabor: "Pimenta", gramatura: 100, caixa: 25, canal: "varejo", embalagem: "", imagem: "/produtos/petisco-pimenta-100g.webp", w: 365, h: 640 },
  { id: "petisco-queijo-100g", linha: "checkmate-petisco", sabor: "Queijo", gramatura: 100, caixa: 25, canal: "varejo", embalagem: "", imagem: "/produtos/petisco-queijo-100g.webp", w: 365, h: 640 },
  { id: "petisco-churrasco-100g", linha: "checkmate-petisco", sabor: "Churrasco", gramatura: 100, caixa: 25, canal: "varejo", embalagem: "", imagem: "/produtos/petisco-churrasco-100g.webp", w: 365, h: 640 },
  { id: "petisco-costelinha-limao-100g", linha: "checkmate-petisco", sabor: "Costelinha com Limão", gramatura: 100, caixa: 25, canal: "varejo", embalagem: "", imagem: "/produtos/petisco-costelinha-limao-100g.webp", w: 365, h: 640 },
  { id: "petisco-cebola-salsa-100g", linha: "checkmate-petisco", sabor: "Cebola e Salsa", gramatura: 100, caixa: 25, canal: "varejo", embalagem: "", imagem: "/produtos/petisco-cebola-salsa-100g.webp", w: 365, h: 640 },
  { id: "palha-tradicional-80g", linha: "batata-palha", sabor: "Tradicional", gramatura: 80, caixa: 50, canal: "varejo", embalagem: "Embalagem 80g", imagem: "/produtos/palha-tradicional-80g.webp", w: 471, h: 640 },
  { id: "palha-extrafina-80g", linha: "batata-palha", sabor: "Extrafina", gramatura: 80, caixa: 50, canal: "varejo", embalagem: "Embalagem 80g", imagem: "/produtos/palha-extrafina-80g.webp", w: 471, h: 640 },
  { id: "palha-tradicional-pouch-100g", linha: "batata-palha", sabor: "Tradicional", gramatura: 100, caixa: 40, canal: "varejo", embalagem: "Pouch 100g", imagem: "/produtos/palha-tradicional-pouch-100g.webp", w: 416, h: 640 },
  { id: "palha-extrafina-pouch-100g", linha: "batata-palha", sabor: "Extrafina", gramatura: 100, caixa: 40, canal: "varejo", embalagem: "Pouch 100g", imagem: "/produtos/palha-extrafina-pouch-100g.webp", w: 413, h: 640 },
  { id: "palha-temperada-pouch-100g", linha: "batata-palha", sabor: "Temperada", gramatura: 100, caixa: 40, canal: "varejo", embalagem: "Pouch 100g", imagem: "/produtos/palha-temperada-pouch-100g.webp", w: 416, h: 640 },
  { id: "palha-zero-sodio-pouch-100g", linha: "batata-palha", sabor: "Zero Sódio", gramatura: 100, caixa: 40, canal: "varejo", embalagem: "Pouch 100g", imagem: "/produtos/palha-zero-sodio-pouch-100g.webp", w: 415, h: 640 },
  { id: "palha-tradicional-300g", linha: "batata-palha", sabor: "Tradicional", gramatura: 300, caixa: 16, canal: "varejo", embalagem: "Tamanho família 300g", imagem: "/produtos/palha-tradicional-300g.webp", w: 520, h: 640 },
  { id: "palha-extrafina-300g", linha: "batata-palha", sabor: "Extrafina", gramatura: 300, caixa: 16, canal: "varejo", embalagem: "Tamanho família 300g", imagem: "/produtos/palha-extrafina-300g.webp", w: 471, h: 640 },
  { id: "foodservice-sache-12g", linha: "food-service", sabor: "Sachê Extrafina", gramatura: 12, caixa: 150, canal: "atacado", embalagem: "Sachê individual 12g", imagem: "/produtos/foodservice-sache-12g.webp", w: 519, h: 578 },
  { id: "foodservice-tradicional-800g", linha: "food-service", sabor: "Tradicional", gramatura: 800, caixa: 8, canal: "atacado", embalagem: "Pacote 800g", imagem: "/produtos/foodservice-tradicional-800g.webp", w: 447, h: 640 },
];

export const linhaPorSlug = (slug: string) => linhas.find((l) => l.slug === slug);
export const produtoPorId = (id: string) => produtos.find((p) => p.id === id);
export const produtosDaLinha = (slug: LinhaSlug) => produtos.filter((p) => p.linha === slug);

/** Nome comercial completo, como na tabela do catálogo. */
export function nomeProduto(p: Produto) {
  const l = linhaPorSlug(p.linha)!;
  if (p.linha === "batata-palha") {
    const pouch = p.embalagem.startsWith("Pouch") ? " Pouch" : "";
    return `Batata Palha ${p.sabor}${pouch} ${p.gramatura}g`;
  }
  if (p.linha === "food-service") {
    return p.gramatura === 12 ? "Batata Palha Sachê Extrafina 12g" : "Batata Palha Tradicional 800g";
  }
  return `${l.nome} ${p.sabor} ${p.gramatura}g`;
}

export const caixaTexto = (p: Produto) => (p.caixa ? `caixa com ${p.caixa} un` : "caixa: consulte-nos");
export const canalTexto = (c: Canal) => (c === "varejo" ? "Varejo" : "Atacado & Food Service");

export const gramaturas = Array.from(new Set(produtos.map((p) => p.gramatura))).sort((a, b) => a - b);
