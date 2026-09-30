import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de uso do site da Aliança Alimentos.",
  alternates: { canonical: "/termos" },
};

export default function TermosPage() {
  return (
    <LegalPage title="Termos de Uso" updated="[PREENCHER] data">
      <p>
        Ao acessar este site, você concorda com estes Termos de Uso. O site é mantido por {site.razaoSocial}, {site.cnpj}.
      </p>
      <h2>1. Finalidade do site</h2>
      <p>
        Este site tem caráter institucional e informativo, apresentando os produtos da {site.nome} e canais para contato
        comercial. As informações não constituem oferta de venda; condições comerciais são tratadas diretamente com o
        nosso time.
      </p>
      <h2>2. Produtos e imagens</h2>
      <p>
        As imagens são meramente ilustrativas. Informações nutricionais, ingredientes e alergênicos válidos são os
        impressos na embalagem de cada produto. Portfólio, gramaturas e quantidades por caixa podem mudar sem aviso prévio.
      </p>
      <h2>3. Propriedade intelectual</h2>
      <p>
        Marcas, logotipos, embalagens, textos e imagens deste site pertencem à {site.nome} ou são usados com autorização. É
        proibida a reprodução sem autorização prévia por escrito.
      </p>
      <h2>4. Uso adequado</h2>
      <p>
        É vedado usar o site para fins ilícitos, enviar informações falsas nos formulários ou tentar comprometer sua
        segurança e disponibilidade.
      </p>
      <h2>5. Responsabilidade</h2>
      <p>
        Empregamos esforços para manter as informações corretas e o site disponível, mas não garantimos ausência de erros ou
        interrupções.
      </p>
      <h2>6. Privacidade</h2>
      <p>O tratamento de dados pessoais segue a nossa Política de Privacidade.</p>
      <h2>7. Foro</h2>
      <p>Fica eleito o foro da comarca de [PREENCHER], com renúncia a qualquer outro.</p>
    </LegalPage>
  );
}
