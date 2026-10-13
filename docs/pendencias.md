# Pendências do site (branch site-novo-catalogo)

Base: "Catálogo de Produtos - Aliança Alimentos" (out/2026), 38 SKUs em 6 linhas.

## Dados a confirmar com a Aliança
- [ ] Unidades por caixa da Batata Chips Lisa (45g e 150g). O catálogo diz "caixa com 24 unidades" nos cabeçalhos, mas deixa Un/cx em branco na tabela comercial. O site mostra "Consulte-nos".
- [ ] Texto de apresentação da Chips Lisa 150g diz "Bacon"; os itens e a tabela dizem "Cheddar e Bacon". O site usa "Cheddar e Bacon".
- [ ] E-mail comercial, endereço, CNPJ e razão social (não exibidos no site até serem informados).
- [ ] Revisão jurídica da Política de Privacidade e dos Termos (texto-base).
- [ ] Prazo de resposta do comercial e regiões atendidas (se quiserem exibir).

## Fotos
- 15 SKUs usam os arquivos originais enviados (alta resolução).
- 23 SKUs usam as embalagens extraídas do catálogo em PDF (menor resolução, suficiente para cards). Substituir pelos originais quando disponíveis: mesmo nome de arquivo em `public/produtos/<id>.webp`.

## Leads
- A cotação é enviada pelo WhatsApp (5531999915082), aberto no navegador do cliente.
- Cópia no servidor: `LEAD_PROVIDER=log` (padrão, só log). Para receber por e-mail, configurar `LEAD_PROVIDER=resend`, `RESEND_API_KEY` e `LEAD_EMAIL_TO` na Vercel.
