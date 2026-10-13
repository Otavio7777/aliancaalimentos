"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { caixaTexto, linhaPorSlug, linhas, nomeProduto, produtoPorId, produtosDaLinha } from "@/data/catalogo";
import { cotacaoSchema, onlyDigits } from "@/lib/lead";
import { linkWhatsApp, tiposNegocio, ufs } from "@/lib/site";
import { Pack } from "./Pack";
import { AddToQuote, useQuote } from "./Quote";

type Campos = { nome: string; empresa: string; cnpj: string; telefone: string; cidade: string; uf: string; tipo: string; mensagem: string; consentimento: boolean; website: string };
const vazio: Campos = { nome: "", empresa: "", cnpj: "", telefone: "", cidade: "", uf: "", tipo: "", mensagem: "", consentimento: false, website: "" };

const mascaraCnpj = (v: string) =>
  onlyDigits(v).slice(0, 14).replace(/^(\d{2})(\d)/, "$1.$2").replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3").replace(/\.(\d{3})(\d)/, ".$1/$2").replace(/(\d{4})(\d)/, "$1-$2");
const mascaraTel = (v: string) => onlyDigits(v).slice(0, 11).replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");

export function QuoteBuilder() {
  const { itens, pronto, totalCaixas, limpar } = useQuote();
  const [c, setC] = useState<Campos>(vazio);
  const [erros, setErros] = useState<Record<string, string>>({});
  const [enviado, setEnviado] = useState<{ texto: string; link: string } | null>(null);
  const [linhaRapida, setLinhaRapida] = useState(linhas[0].slug);
  const formRef = useRef<HTMLFormElement>(null);

  const lista = useMemo(() => Object.entries(itens).map(([id, n]) => ({ p: produtoPorId(id)!, n })).filter((x) => x.p), [itens]);
  const unidades = lista.reduce((a, { p, n }) => a + (p.caixa ? p.caixa * n : 0), 0);
  const temSemCaixa = lista.some(({ p }) => !p.caixa);

  const campo = (k: keyof Campos) => ({
    id: k,
    name: k,
    value: c[k] as string,
    "aria-invalid": !!erros[k] || undefined,
    "aria-describedby": erros[k] ? `e-${k}` : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      let v = e.target.value;
      if (k === "cnpj") v = mascaraCnpj(v);
      if (k === "telefone") v = mascaraTel(v);
      setC({ ...c, [k]: v });
    },
    className: "w-full rounded-xl border-2 border-ink bg-white px-3 py-2.5 aria-[invalid=true]:border-red",
  });
  const Erro = ({ k }: { k: string }) => (erros[k] ? <p id={`e-${k}`} className="mt-1 text-sm font-bold text-red-deep">{erros[k]}</p> : null);

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!lista.length) {
      setErros({ itens: "Adicione ao menos uma caixa à cotação." });
      return;
    }
    const r = cotacaoSchema.safeParse({ ...c, itens });
    if (!r.success) {
      const m: Record<string, string> = {};
      for (const i of r.error.issues) m[String(i.path[0])] ??= i.message;
      setErros(m);
      const primeiro = Object.keys(m)[0];
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>(`#${primeiro}`)?.focus());
      return;
    }
    setErros({});
    const d = r.data;
    const texto = [
      "Olá! Estou entrando em contato pelo site da Aliança e quero uma cotação:",
      "",
      ...lista.map(({ p, n }) => `• ${nomeProduto(p)}: ${n} ${n > 1 ? "caixas" : "caixa"}${p.caixa ? ` (${p.caixa * n} un)` : ""}`),
      "",
      `Total: ${totalCaixas} ${totalCaixas > 1 ? "caixas" : "caixa"}`,
      "",
      `${d.empresa} (${d.tipo})`,
      d.cnpj ? `CNPJ ${d.cnpj}` : null,
      `${d.cidade}/${d.uf}`,
      `Contato: ${d.nome}, ${d.telefone}`,
      d.mensagem ? `Obs.: ${d.mensagem}` : null,
    ]
      .filter((x) => x !== null)
      .join("\n");
    fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...d, itens }) }).catch(() => {});
    const link = linkWhatsApp(texto);
    setEnviado({ texto, link });
    window.open(link, "_blank", "noopener");
  }

  if (enviado)
    return (
      <div className="card-cat mx-auto max-w-2xl p-6 sm:p-8" role="status">
        <p className="font-display text-4xl uppercase">Cotação pronta</p>
        <p className="mt-2 text-muted">
          Abrimos o WhatsApp do comercial com o pedido escrito. Se a janela não abriu, use o botão abaixo.
        </p>
        <pre className="mt-5 whitespace-pre-wrap rounded-xl bg-cream p-4 font-sans text-sm">{enviado.texto}</pre>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={enviado.link} target="_blank" rel="noopener" className="btn bg-[#25D366] text-ink">
            Enviar pelo WhatsApp
          </a>
          <button type="button" className="btn btn-white" onClick={() => { limpar(); setEnviado(null); setC(vazio); }}>
            Fazer nova cotação
          </button>
        </div>
      </div>
    );

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
      <section aria-labelledby="t-itens" className="card-cat p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="t-itens" className="font-display text-3xl uppercase">1. Produtos em caixas</h2>
          {lista.length > 0 && (
            <button type="button" onClick={limpar} className="text-sm font-extrabold underline underline-offset-4">
              Esvaziar
            </button>
          )}
        </div>

        {!pronto ? (
          <p className="mt-4 text-muted">Carregando…</p>
        ) : lista.length ? (
          <ul className="mt-4 divide-y-2 divide-ink/10">
            {lista.map(({ p, n }) => {
              const l = linhaPorSlug(p.linha)!;
              return (
                <li key={p.id} className="grid grid-cols-[64px_1fr] items-center gap-3 py-3 sm:grid-cols-[64px_1fr_200px]">
                  <div className="grid h-20 place-items-center rounded-xl" style={{ background: l.cor }}>
                    <div className="h-16"><Pack p={p} sizes="64px" /></div>
                  </div>
                  <div>
                    <p className="font-extrabold leading-tight">{nomeProduto(p)}</p>
                    <p className="text-sm text-muted">
                      {caixaTexto(p)}
                      {p.caixa ? ` · ${p.caixa * n} un` : ""}
                    </p>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <AddToQuote id={p.id} nome={nomeProduto(p)} />
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-4 rounded-xl bg-cream p-4">
            Sua cotação está vazia. Adicione itens abaixo ou pelo <Link href="/produtos" className="font-extrabold underline">catálogo</Link>.
          </p>
        )}

        {lista.length > 0 && (
          <p className="mt-4 rounded-xl bg-yellow p-4 font-extrabold">
            {totalCaixas} {totalCaixas > 1 ? "caixas" : "caixa"}
            {unidades ? `, ${unidades.toLocaleString("pt-BR")} unidades` : ""}
            <span className="block text-sm font-medium">
              {temSemCaixa ? "Há item com unidades por caixa a confirmar. " : ""}Valores e condições vêm na resposta do comercial.
            </span>
          </p>
        )}
        {erros.itens && <p className="mt-3 font-bold text-red-deep" role="alert">{erros.itens}</p>}

        <div className="mt-6 border-t-2 border-ink/10 pt-5">
          <label htmlFor="linha-rapida" className="text-sm font-extrabold">Adicionar rápido</label>
          <select id="linha-rapida" value={linhaRapida} onChange={(e) => setLinhaRapida(e.target.value as typeof linhaRapida)} className="mt-2 w-full rounded-xl border-2 border-ink bg-white px-3 py-2.5">
            {linhas.map((l) => <option key={l.slug} value={l.slug}>{l.nome}</option>)}
          </select>
          <ul className="mt-3 grid gap-2">
            {produtosDaLinha(linhaRapida).filter((p) => !itens[p.id]).map((p) => (
              <li key={p.id} className="flex flex-col gap-2 rounded-xl border-2 border-ink/15 px-3 py-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm font-bold">{nomeProduto(p)}</span>
                <span className="w-full shrink-0 sm:w-44"><AddToQuote id={p.id} nome={nomeProduto(p)} /></span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <form ref={formRef} onSubmit={enviar} noValidate className="card-cat p-5 sm:p-6 lg:sticky lg:top-24" aria-labelledby="t-dados">
        <h2 id="t-dados" className="font-display text-3xl uppercase">2. Seus dados</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div><label htmlFor="nome" className="mb-1 block font-bold">Seu nome</label><input {...campo("nome")} autoComplete="name" /><Erro k="nome" /></div>
          <div><label htmlFor="empresa" className="mb-1 block font-bold">Empresa</label><input {...campo("empresa")} autoComplete="organization" /><Erro k="empresa" /></div>
          <div><label htmlFor="telefone" className="mb-1 block font-bold">WhatsApp</label><input {...campo("telefone")} inputMode="tel" autoComplete="tel-national" placeholder="(00) 00000-0000" /><Erro k="telefone" /></div>
          <div><label htmlFor="cnpj" className="mb-1 block font-bold">CNPJ <span className="font-normal text-muted">(opcional)</span></label><input {...campo("cnpj")} inputMode="numeric" placeholder="00.000.000/0000-00" /><Erro k="cnpj" /></div>
          <div><label htmlFor="cidade" className="mb-1 block font-bold">Cidade</label><input {...campo("cidade")} autoComplete="address-level2" /><Erro k="cidade" /></div>
          <div>
            <label htmlFor="uf" className="mb-1 block font-bold">Estado</label>
            <select {...campo("uf")} autoComplete="address-level1"><option value="">Escolha</option>{ufs.map((u) => <option key={u}>{u}</option>)}</select>
            <Erro k="uf" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="tipo" className="mb-1 block font-bold">Tipo de negócio</label>
            <select {...campo("tipo")}><option value="">Escolha</option>{tiposNegocio.map((t) => <option key={t}>{t}</option>)}</select>
            <Erro k="tipo" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="mensagem" className="mb-1 block font-bold">Observações <span className="font-normal text-muted">(opcional)</span></label>
            <textarea {...campo("mensagem")} rows={3} />
          </div>
        </div>
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="website">Não preencha</label>
          <input {...campo("website")} tabIndex={-1} autoComplete="off" />
        </div>
        <label className="mt-4 flex items-start gap-3 text-sm">
          <input
            id="consentimento"
            type="checkbox"
            checked={c.consentimento}
            onChange={(e) => setC({ ...c, consentimento: e.target.checked })}
            className="mt-0.5 size-5 accent-[#C8102E]"
            aria-invalid={!!erros.consentimento || undefined}
          />
          <span>
            Concordo em receber contato da Aliança sobre esta cotação, conforme a{" "}
            <Link href="/privacidade" className="font-bold underline">Política de Privacidade</Link>.
          </span>
        </label>
        <Erro k="consentimento" />
        <button type="submit" className="btn btn-solid mt-5 w-full text-lg">
          Enviar cotação pelo WhatsApp
        </button>
        <p className="mt-3 text-sm text-muted">O WhatsApp abre com o pedido já escrito. Você revisa e envia.</p>
      </form>
    </div>
  );
}
