import { z } from "zod";
import { produtoPorId } from "@/data/catalogo";
import { tiposNegocio, ufs } from "@/lib/site";

export const onlyDigits = (v: string) => v.replace(/\D/g, "");

export function cnpjValido(value: string): boolean {
  const c = onlyDigits(value);
  if (c.length !== 14 || /^(\d)\1{13}$/.test(c)) return false;
  const calc = (len: number) => {
    const pesos = len === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const soma = pesos.reduce((acc, p, i) => acc + Number(c[i]) * p, 0);
    const r = soma % 11;
    return r < 2 ? 0 : 11 - r;
  };
  return calc(12) === Number(c[12]) && calc(13) === Number(c[13]);
}

export const cotacaoSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome.").max(120),
  empresa: z.string().trim().min(2, "Informe a empresa.").max(160),
  cnpj: z
    .string()
    .trim()
    .refine((v) => v === "" || cnpjValido(v), "CNPJ inválido. Confira os 14 números ou deixe em branco."),
  telefone: z
    .string()
    .trim()
    .refine((v) => onlyDigits(v).length >= 10 && onlyDigits(v).length <= 11, "Informe DDD e número."),
  cidade: z.string().trim().min(2, "Informe a cidade.").max(100),
  uf: z.enum(ufs as [string, ...string[]], { message: "Escolha o estado." }),
  tipo: z.enum(tiposNegocio as [string, ...string[]], { message: "Escolha o tipo de negócio." }),
  itens: z
    .record(z.string(), z.number().int().min(1).max(999))
    .refine((r) => Object.keys(r).every((id) => !!produtoPorId(id)), "Item inválido."),
  mensagem: z.string().trim().max(1500).optional().default(""),
  consentimento: z.literal(true, { message: "Marque a caixa para o comercial poder responder." }),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type Cotacao = z.infer<typeof cotacaoSchema>;
