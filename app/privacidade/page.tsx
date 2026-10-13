import type { Metadata } from "next";
import { Legal } from "@/components/Legal";

export const metadata: Metadata = { title: "Política de Privacidade", alternates: { canonical: "/privacidade" } };

export default function Page() {
  return (
    <Legal titulo="Política de Privacidade">
      <p>Esta política explica como a Aliança Alimentos trata os dados pessoais informados neste site, conforme a Lei nº 13.709/2018 (LGPD).</p>
      <h2>Dados coletados</h2>
      <ul>
        <li>Na cotação: nome, empresa, CNPJ (opcional), WhatsApp, cidade, estado, tipo de negócio, produtos e observações.</li>
        <li>Dados técnicos necessários ao funcionamento e à segurança do site.</li>
        <li>A lista de cotação fica salva apenas no seu navegador até ser enviada ou esvaziada.</li>
      </ul>
      <h2>Finalidade</h2>
      <p>Responder pedidos de cotação e conduzir a relação comercial. A base legal é o consentimento e a execução de procedimentos preliminares a contrato.</p>
      <h2>Compartilhamento</h2>
      <p>O pedido é enviado pelo WhatsApp, serviço da Meta, sob as regras dele. Não vendemos dados pessoais.</p>
      <h2>Seus direitos</h2>
      <p>Você pode pedir acesso, correção ou exclusão dos seus dados pelo WhatsApp comercial informado na página de contato.</p>
    </Legal>
  );
}
