import { NextResponse } from "next/server";
import { z } from "zod";
import { leadSchema, type Lead } from "@/lib/lead";
import { linhas } from "@/data/products";

export const runtime = "nodejs";

/**
 * Recebe leads B2B e de contato.
 * Destino configurável por LEAD_PROVIDER: "resend" | "supabase" | "log" (padrão).
 * Ver .env.example e README.md.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requisição inválida." }, { status: 400 });
  }

  // Anti-spam 1: honeypot preenchido → fingimos sucesso sem processar.
  const raw = body as Record<string, unknown>;
  if (typeof raw?.website === "string" && raw.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Confira os campos destacados.", fields: z.flattenError(parsed.error).fieldErrors },
      { status: 422 },
    );
  }

  // Anti-spam 2: formulário válido preenchido rápido demais para um humano → descartado em silêncio.
  const startedAt = Number(raw?.startedAt ?? 0);
  if (startedAt && Date.now() - startedAt < 2500) {
    return NextResponse.json({ ok: true });
  }

  const lead = parsed.data;
  const provider = (process.env.LEAD_PROVIDER ?? "log").toLowerCase();

  try {
    if (provider === "resend") await enviarResend(lead);
    else if (provider === "supabase") await salvarSupabase(lead);
    else console.info("[lead] LEAD_PROVIDER=log — lead recebido:", JSON.stringify(resumo(lead)));
  } catch (err) {
    console.error("[lead] falha ao entregar lead", err);
    return NextResponse.json(
      { ok: false, error: "Não foi possível enviar agora. Tente novamente em instantes." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

function resumo(lead: Lead) {
  const { website: _w, consentimento: _c, ...rest } = lead;
  return { ...rest, recebidoEm: new Date().toISOString() };
}

const nomeLinha = (slug: string) => linhas.find((l) => l.slug === slug)?.nome ?? slug;

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function enviarResend(lead: Lead) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;
  const from = process.env.LEAD_EMAIL_FROM ?? "Site Aliança <onboarding@resend.dev>";
  if (!key || !to) throw new Error("RESEND_API_KEY e LEAD_EMAIL_TO são obrigatórios com LEAD_PROVIDER=resend");

  const dados = resumo(lead) as Record<string, unknown>;
  if (lead.origem === "revenda") dados.interesse = lead.interesse.map(nomeLinha).join(", ");
  const linhasHtml = Object.entries(dados)
    .map(([k, v]) => `<tr><th align="left" style="padding:4px 12px 4px 0">${esc(k)}</th><td>${esc(String(v))}</td></tr>`)
    .join("");

  const subject =
    lead.origem === "revenda"
      ? `Novo lead de revenda: ${lead.empresa} (${lead.cidade}/${lead.uf})`
      : `Contato pelo site: ${lead.assunto}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      reply_to: lead.email,
      subject,
      html: `<h2>${esc(subject)}</h2><table>${linhasHtml}</table>`,
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

async function salvarSupabase(lead: Lead) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.SUPABASE_LEADS_TABLE ?? "leads";
  if (!url || !key) throw new Error("SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY são obrigatórios com LEAD_PROVIDER=supabase");

  const { origem, nome, email } = lead;
  const row = {
    origem,
    nome,
    email,
    telefone: lead.telefone || null,
    empresa: lead.origem === "revenda" ? lead.empresa : null,
    cnpj: lead.origem === "revenda" ? lead.cnpj : null,
    cidade: lead.origem === "revenda" ? lead.cidade : null,
    uf: lead.origem === "revenda" ? lead.uf : null,
    tipo_negocio: lead.origem === "revenda" ? lead.tipoNegocio : null,
    interesse: lead.origem === "revenda" ? lead.interesse : null,
    assunto: lead.origem === "contato" ? lead.assunto : null,
    mensagem: lead.mensagem || null,
  };

  const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
}
