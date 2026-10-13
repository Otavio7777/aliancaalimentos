function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

/** Número comercial informado pela Aliança (WhatsApp). */
export const WHATSAPP = "5531999915082";
export const WHATSAPP_LEGIVEL = "(31) 99991-5082";
export const MSG_PADRAO = "Olá, estou entrando em contato pelo site da Aliança!";

export function linkWhatsApp(texto: string = MSG_PADRAO) {
  return `https://api.whatsapp.com/send/?phone=${WHATSAPP}&text=${encodeURIComponent(texto)}&type=phone_number&app_absent=0`;
}

export const site = {
  nome: "Aliança Alimentos",
  slogan: "Sabor que transforma o momento.",
  descricao:
    "Batata palha, batata chips e snacks Aliança para varejo, atacado e food service: Batata Palha, Batata Chips Lisa, Krisp's e Checkmate.",
  url: siteUrl(),
};

export const nav = [
  { href: "/produtos", label: "Produtos" },
  { href: "/food-service", label: "Food Service" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export const ufs = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA",
  "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

export const tiposNegocio = [
  "Supermercado ou mercearia",
  "Atacado ou distribuidor",
  "Restaurante ou lanchonete",
  "Padaria ou confeitaria",
  "Delivery",
  "Representante comercial",
  "Outro",
];
