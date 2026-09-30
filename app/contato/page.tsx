import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { ButtonLink, Container, PageHero } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a Aliança Alimentos: atendimento comercial, dúvidas sobre produtos e parcerias.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  const canais = [
    ["Telefone", site.telefone],
    ["WhatsApp", site.whatsapp],
    ["E-mail", site.email],
    ["Endereço", `${site.endereco} — ${site.cidadeUf}`],
    ["Horário", site.horario],
  ];
  return (
    <>
      <PageHero eyebrow="Contato" title="Fale com a gente." theme="#1E1B1C">
        <p>Dúvidas, sugestões ou parcerias: mande sua mensagem.</p>
      </PageHero>
      <Container className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="font-serif text-3xl">Canais de atendimento</h2>
          <dl className="mt-6 space-y-4">
            {canais.map(([k, v]) => (
              <div key={k} className="rounded-2xl bg-juta p-4">
                <dt className="text-sm font-bold uppercase tracking-wide text-ink/70">{k}</dt>
                <dd className="mt-1 text-lg">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 rounded-3xl bg-red p-6 text-white">
            <p className="font-serif text-2xl">É lojista, distribuidor ou food service?</p>
            <ButtonLink href="/revenda#formulario" variant="gold" className="mt-4">
              Ir para o cadastro de revenda
            </ButtonLink>
          </div>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
          <h2 className="mb-6 font-serif text-3xl">Envie uma mensagem</h2>
          <LeadForm tipo="contato" />
        </div>
      </Container>
    </>
  );
}
