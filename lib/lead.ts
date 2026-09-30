import { z } from "zod";
import { linhas } from "@/data/products";
import { tiposNegocio, ufs } from "@/lib/site";

export const onlyDigits = (v: string) => v.replace(/\D/g, "");

/** Valida CNPJ (14 dígitos + dígitos verificadores). */
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

const texto = (min: number, max: number, msg: string) => z.string().trim().min(min, msg).max(max, "Texto muito longo.");

const telefone = z
  .string()
  .trim()
  .refine((v) => onlyDigits(v).length >= 10 && onlyDigits(v).length <= 13, "Informe um telefone com DDD.");

const comum = {
  nome: texto(2, 120, "Informe seu nome."),
  email: z.string().trim().email("Informe um e-mail válido.").max(160),
  consentimento: z.literal(true, { error: "É preciso aceitar a Política de Privacidade." }),
  /** honeypot — deve vir vazio */
  website: z.string().max(0).optional().or(z.literal("")),
};

const linhaSlugs = linhas.map((l) => l.slug) as [string, ...string[]];

export const revendaSchema = z.object({
  origem: z.literal("revenda"),
  ...comum,
  empresa: texto(2, 160, "Informe o nome da empresa."),
  cnpj: z.string().trim().refine(cnpjValido, "CNPJ inválido."),
  telefone,
  cidade: texto(2, 100, "Informe a cidade."),
  uf: z.enum(ufs as [string, ...string[]], { error: "Selecione a UF." }),
  tipoNegocio: z.enum(tiposNegocio as [string, ...string[]], { error: "Selecione o tipo de negócio." }),
  interesse: z.array(z.enum(linhaSlugs)).min(1, "Selecione ao menos uma linha de interesse."),
  mensagem: z.string().trim().max(2000, "Mensagem muito longa.").optional().default(""),
});

export const contatoSchema = z.object({
  origem: z.literal("contato"),
  ...comum,
  telefone: telefone.optional().or(z.literal("")),
  assunto: texto(2, 120, "Informe o assunto."),
  mensagem: texto(5, 2000, "Escreva sua mensagem."),
});

export const leadSchema = z.discriminatedUnion("origem", [revendaSchema, contatoSchema]);

export type Lead = z.infer<typeof leadSchema>;
