/**
 * Dados institucionais. Tudo marcado com [PREENCHER] precisa ser confirmado
 * pela Aliança Alimentos antes de ir ao ar — ver docs/pendencias.md.
 */

export const PREENCHER = "[PREENCHER]";

function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export const site = {
  nome: "Aliança Alimentos",
  descricao:
    "Fabricante de batata palha e snacks. Batata Palha Aliança, Batata Ondulada Krisp's e Salgadinho de Trigo Checkmate para varejo, atacado e food service.",
  url: siteUrl(),
  razaoSocial: `${PREENCHER} razão social`,
  cnpj: `${PREENCHER} CNPJ`,
  endereco: `${PREENCHER} endereço completo`,
  cidadeUf: `${PREENCHER} cidade/UF`,
  telefone: `${PREENCHER} telefone`,
  whatsapp: `${PREENCHER} WhatsApp`,
  email: `${PREENCHER} e-mail comercial`,
  emailPrivacidade: `${PREENCHER} e-mail do encarregado (LGPD)`,
  horario: `${PREENCHER} horário de atendimento`,
  redes: {
    instagram: null as string | null,
    facebook: null as string | null,
    linkedin: null as string | null,
  },
};

export const nav = [
  { href: "/produtos", label: "Produtos" },
  { href: "/produtos/food-service", label: "Food Service" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export const ufs = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA",
  "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

export const tiposNegocio = [
  "Supermercado / varejo",
  "Atacadista / distribuidor",
  "Restaurante / lanchonete",
  "Padaria / confeitaria",
  "Delivery / dark kitchen",
  "Representante comercial",
  "Outro",
];
