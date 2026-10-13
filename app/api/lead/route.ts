import { NextResponse } from "next/server";
import { cotacaoSchema } from "@/lib/lead";

export const runtime = "nodejs";

/**
 * Registra a cotação montada no site. O envio ao comercial acontece pelo WhatsApp,
 * aberto no navegador do cliente; aqui o pedido fica no log do servidor (LEAD_PROVIDER=log)
 * ou segue por e-mail via Resend (LEAD_PROVIDER=resend). Ver .env.example.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (typeof body?.website === "string" && body.website.length > 0) return NextResponse.json({ ok: true });

  const parsed = cotacaoSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Dados inválidos." }, { status: 422 });

  const { website: _w, consentimento: _c, ...lead } = parsed.data;
  const provider = (process.env.LEAD_PROVIDER ?? "log").toLowerCase();
  try {
    if (provider === "resend") await enviarResend(lead);
    else console.info("[cotacao]", JSON.stringify({ ...lead, recebidoEm: new Date().toISOString() }));
  } catch (e) {
    console.error("[cotacao] falha ao entregar", e);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

async function enviarResend(lead: Record<string, unknown>) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;
  const from = process.env.LEAD_EMAIL_FROM ?? "Site Aliança <onboarding@resend.dev>";
  if (!key || !to) throw new Error("RESEND_API_KEY e LEAD_EMAIL_TO são obrigatórios");
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      subject: `Cotação pelo site: ${lead.empresa}`,
      text: JSON.stringify(lead, null, 2),
    }),
  });
  if (!r.ok) throw new Error(`Resend ${r.status}`);
}
