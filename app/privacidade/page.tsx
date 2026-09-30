import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a Aliança Alimentos trata dados pessoais conforme a LGPD (Lei 13.709/2018).",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacidadePage() {
  return (
    <LegalPage title="Política de Privacidade" updated="[PREENCHER] data">
      <p>
        Esta Política explica como a {site.nome} ({site.razaoSocial}, {site.cnpj}), na qualidade de controladora, trata os
        dados pessoais coletados neste site, em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº
        13.709/2018 — LGPD).
      </p>

      <h2>1. Dados que coletamos</h2>
      <ul>
        <li>Formulário de revenda: nome, empresa, CNPJ, e-mail, telefone, cidade/UF, tipo de negócio, linhas de interesse e mensagem.</li>
        <li>Formulário de contato: nome, e-mail, telefone (opcional), assunto e mensagem.</li>
        <li>Dados técnicos de navegação estritamente necessários ao funcionamento e à segurança do site (ex.: endereço IP e registros de acesso).</li>
      </ul>

      <h2>2. Para que usamos</h2>
      <ul>
        <li>Responder solicitações de contato e de cotação;</li>
        <li>Avaliar e conduzir relações comerciais com revendedores, distribuidores e clientes de food service;</li>
        <li>Cumprir obrigações legais e regulatórias e garantir a segurança do site.</li>
      </ul>

      <h2>3. Bases legais</h2>
      <p>
        Tratamos os dados com base no consentimento do titular, na execução de procedimentos preliminares a contrato, no
        legítimo interesse (atendimento e segurança) e no cumprimento de obrigação legal, conforme o art. 7º da LGPD.
      </p>

      <h2>4. Compartilhamento</h2>
      <p>
        Os dados podem ser compartilhados com fornecedores que nos apoiam na operação do site e na comunicação (por
        exemplo, hospedagem, envio de e-mails e armazenamento de dados), sempre sob obrigações de confidencialidade.
        Fornecedores utilizados: [PREENCHER]. Não vendemos dados pessoais.
      </p>

      <h2>5. Armazenamento e retenção</h2>
      <p>
        Mantemos os dados pelo tempo necessário para as finalidades descritas ou para cumprir obrigações legais. Prazo de
        retenção adotado: [PREENCHER].
      </p>

      <h2>6. Direitos do titular</h2>
      <p>
        Você pode solicitar confirmação de tratamento, acesso, correção, anonimização, portabilidade, eliminação, informação
        sobre compartilhamentos e revogação do consentimento, nos termos do art. 18 da LGPD.
      </p>

      <h2>7. Cookies</h2>
      <p>
        Este site não utiliza cookies de publicidade. Caso ferramentas de análise sejam adotadas no futuro, esta Política
        será atualizada. [PREENCHER se houver ferramentas de análise]
      </p>

      <h2>8. Encarregado (DPO) e contato</h2>
      <p>
        Encarregado pelo tratamento de dados: [PREENCHER nome]. Contato: {site.emailPrivacidade}. Endereço: {site.endereco}.
      </p>

      <h2>9. Alterações</h2>
      <p>Esta Política pode ser atualizada a qualquer momento. A versão vigente estará sempre disponível nesta página.</p>
    </LegalPage>
  );
}
