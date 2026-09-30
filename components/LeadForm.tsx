"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { linhas } from "@/data/products";
import { tiposNegocio, ufs } from "@/lib/site";

type Tipo = "revenda" | "contato";
type Erros = Record<string, string[] | undefined>;
type Status = { state: "idle" | "sending" | "ok" | "error"; message?: string };

const maskCnpj = (v: string) =>
  v
    .replace(/\D/g, "")
    .slice(0, 14)
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");

const maskTel = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 10) return d.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
  return d.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
};

export function LeadForm({ tipo }: { tipo: Tipo }) {
  const uid = useId();
  const startedAt = useRef(Date.now());
  const statusRef = useRef<HTMLDivElement>(null);
  const [erros, setErros] = useState<Erros>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [interesse, setInteresse] = useState<string[]>([]);

  useEffect(() => {
    startedAt.current = Date.now();
    const q = new URLSearchParams(window.location.search).get("interesse");
    if (q && linhas.some((l) => l.slug === q)) setInteresse([q]);
    else if (window.location.hash === "#food-service") setInteresse(["food-service"]);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload: Record<string, unknown> = Object.fromEntries(fd.entries());
    payload.origem = tipo;
    payload.consentimento = fd.get("consentimento") === "on";
    payload.startedAt = startedAt.current;
    if (tipo === "revenda") payload.interesse = interesse;

    setStatus({ state: "sending" });
    setErros({});
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok: boolean; error?: string; fields?: Erros };
      if (data.ok) {
        setStatus({ state: "ok", message: "Recebemos sua mensagem! Nosso time vai entrar em contato em breve." });
        (e.target as HTMLFormElement).reset();
        setInteresse([]);
      } else {
        setErros(data.fields ?? {});
        setStatus({ state: "error", message: data.error ?? "Não foi possível enviar." });
      }
    } catch {
      setStatus({ state: "error", message: "Falha de conexão. Tente novamente." });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const field = (name: string) => ({
    id: `${uid}-${name}`,
    name,
    "aria-invalid": erros[name] ? true : undefined,
    "aria-describedby": erros[name] ? `${uid}-${name}-erro` : undefined,
  });

  const input =
    "mt-1 block w-full rounded-xl border-0 bg-white px-4 py-3 text-base text-ink shadow-sm ring-1 ring-black/20 placeholder:text-ink/45 focus:ring-2 focus:ring-red aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red";

  if (status.state === "ok") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-3xl bg-green p-8 text-white">
        <p className="font-serif text-3xl">Obrigado!</p>
        <p className="mt-2 text-lg">{status.message}</p>
        <button type="button" className="mt-6 rounded-full bg-white px-5 py-3 font-bold text-green" onClick={() => setStatus({ state: "idle" })}>
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2" aria-describedby={`${uid}-obrig`}>
      <p id={`${uid}-obrig`} className="text-sm text-ink/70 sm:col-span-2">
        Campos com <span className="text-red">*</span> são obrigatórios.
      </p>

      <CampoBase uid={uid} erro={erros.nome?.[0]} name="nome" label="Nome">
        <input {...field("nome")} className={input} autoComplete="name" required />
      </CampoBase>

      {tipo === "revenda" ? (
        <>
          <CampoBase uid={uid} erro={erros.empresa?.[0]} name="empresa" label="Empresa">
            <input {...field("empresa")} className={input} autoComplete="organization" required />
          </CampoBase>
          <CampoBase uid={uid} erro={erros.cnpj?.[0]} name="cnpj" label="CNPJ">
            <input
              {...field("cnpj")}
              className={input}
              inputMode="numeric"
              placeholder="00.000.000/0000-00"
              required
              onChange={(e) => (e.target.value = maskCnpj(e.target.value))}
            />
          </CampoBase>
          <CampoBase uid={uid} erro={erros.tipoNegocio?.[0]} name="tipoNegocio" label="Tipo de negócio">
            <select {...field("tipoNegocio")} className={input} defaultValue="" required>
              <option value="" disabled>
                Selecione
              </option>
              {tiposNegocio.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </CampoBase>
        </>
      ) : null}

      <CampoBase uid={uid} erro={erros.email?.[0]} name="email" label="E-mail">
        <input {...field("email")} type="email" className={input} autoComplete="email" required />
      </CampoBase>
      <CampoBase uid={uid} erro={erros.telefone?.[0]} name="telefone" label="Telefone / WhatsApp" required={tipo === "revenda"}>
        <input
          {...field("telefone")}
          type="tel"
          className={input}
          autoComplete="tel"
          placeholder="(00) 00000-0000"
          onChange={(e) => (e.target.value = maskTel(e.target.value))}
        />
      </CampoBase>

      {tipo === "revenda" ? (
        <>
          <CampoBase uid={uid} erro={erros.cidade?.[0]} name="cidade" label="Cidade">
            <input {...field("cidade")} className={input} autoComplete="address-level2" required />
          </CampoBase>
          <CampoBase uid={uid} erro={erros.uf?.[0]} name="uf" label="UF">
            <select {...field("uf")} className={input} defaultValue="" required>
              <option value="" disabled>
                Selecione
              </option>
              {ufs.map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
          </CampoBase>

          <fieldset
            className="sm:col-span-2"
            aria-invalid={erros.interesse ? true : undefined}
            aria-describedby={erros.interesse ? `${uid}-interesse-erro` : undefined}
          >
            <legend className="text-sm font-bold">
              Linhas de interesse<span aria-hidden="true" className="text-red"> *</span>
            </legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {linhas.map((l) => {
                const checked = interesse.includes(l.slug);
                return (
                  <label
                    key={l.slug}
                    className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl bg-white px-4 py-3 font-semibold ring-1 ring-black/15 has-[:checked]:ring-2 has-[:checked]:ring-red"
                  >
                    <input
                      type="checkbox"
                      className="h-5 w-5 accent-[#C8102E]"
                      checked={checked}
                      onChange={() => setInteresse((cur) => (checked ? cur.filter((s) => s !== l.slug) : [...cur, l.slug]))}
                    />
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: l.cor.bg }} aria-hidden="true" />
                    {l.nome}
                  </label>
                );
              })}
            </div>
            {erros.interesse && (
              <p id={`${uid}-interesse-erro`} className="mt-1 text-sm font-semibold text-red-deep">
                {erros.interesse[0]}
              </p>
            )}
          </fieldset>
        </>
      ) : (
        <CampoBase uid={uid} erro={erros.assunto?.[0]} name="assunto" label="Assunto" className="sm:col-span-2">
          <input {...field("assunto")} className={input} required />
        </CampoBase>
      )}

      <CampoBase uid={uid} erro={erros.mensagem?.[0]} name="mensagem" label="Mensagem" className="sm:col-span-2" required={tipo === "contato"}>
        <textarea
          {...field("mensagem")}
          rows={5}
          className={input}
          placeholder={tipo === "revenda" ? "Volume estimado, frequência de compra, região de atendimento..." : ""}
        />
      </CampoBase>

      {/* honeypot — invisível para pessoas, atraente para bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Não preencha este campo
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            name="consentimento"
            className="mt-0.5 h-5 w-5 shrink-0 accent-[#C8102E]"
            aria-invalid={erros.consentimento ? true : undefined}
            aria-describedby={erros.consentimento ? `${uid}-consentimento-erro` : undefined}
          />
          <span>
            Concordo com o tratamento dos meus dados para retorno comercial, conforme a{" "}
            <Link href="/privacidade" className="font-bold text-red underline">
              Política de Privacidade
            </Link>
            .
          </span>
        </label>
        {erros.consentimento && (
          <p id={`${uid}-consentimento-erro`} className="mt-1 text-sm font-semibold text-red-deep">
            {erros.consentimento[0]}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status.state === "sending"}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-red px-8 py-3 text-base font-bold text-white transition hover:bg-red-deep disabled:opacity-60"
        >
          {status.state === "sending" ? "Enviando..." : tipo === "revenda" ? "Quero ser revendedor" : "Enviar mensagem"}
        </button>
        <div ref={statusRef} tabIndex={-1} role="alert" aria-live="assertive" className="text-sm font-semibold text-red-deep">
          {status.state === "error" && status.message}
        </div>
      </div>
    </form>
  );
}

/** Declarado fora do formulário para que os inputs não sejam remontados a cada render. */
function CampoBase({
  uid,
  name,
  label,
  erro,
  children,
  className = "",
  required = true,
}: {
  uid: string;
  name: string;
  label: string;
  erro?: string;
  children: ReactNode;
  className?: string;
  required?: boolean;
}) {
  return (
    <div className={className}>
      <label htmlFor={`${uid}-${name}`} className="text-sm font-bold">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-red">
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-ink/65"> (opcional)</span>
        )}
      </label>
      {children}
      {erro && (
        <p id={`${uid}-${name}-erro`} className="mt-1 text-sm font-semibold text-red-deep">
          {erro}
        </p>
      )}
    </div>
  );
}
