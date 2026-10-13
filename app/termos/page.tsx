import type { Metadata } from "next";
import { Legal } from "@/components/Legal";

export const metadata: Metadata = { title: "Termos de Uso", alternates: { canonical: "/termos" } };

export default function Page() {
  return (
    <Legal titulo="Termos de Uso">
      <p>Este site apresenta os produtos da Aliança Alimentos e permite solicitar cotações.</p>
      <h2>Cotações</h2>
      <p>O envio de uma cotação não gera pedido nem obrigação de compra. Valores, prazos e condições são informados pelo comercial na resposta.</p>
      <h2>Imagens</h2>
      <p>As imagens das embalagens são ilustrativas. Marcas, logotipos e imagens pertencem à Aliança Alimentos.</p>
    </Legal>
  );
}
