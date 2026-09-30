# Pendências

Itens que dependem da Aliança Alimentos ou de acesso que não estava disponível durante o desenvolvimento.

## 1. Catálogo em PDF e imagens (prioridade alta)
- [ ] **PDF do catálogo ausente.** `assets/catalogo.pdf` não existia no repositório. O único "catálogo" encontrado no Google Drive conectado ("Catálogo atual.pdf") é de outra empresa (calçados) e foi descartado.
- [ ] **Fotos das embalagens:** todos os 28 SKUs usam placeholder vetorial na cor do tema (`components/PackShot.tsx`), já com o selo frontal "ALTO EM GORDURA SATURADA". Quando o PDF chegar: seguir a seção "Imagens do catálogo" do README (`npm run images`) e conferir se o selo ficou inteiro em cada recorte.
- [ ] **Cores reais por amostragem de pixels:** os tokens atuais são as aproximações do briefing. Rodar o script com a seção `cores` do `crops.json` e atualizar `data/products.ts` (`cores`) e `app/globals.css` (`--alianca-*`). Checkmate (cor base da linha) foi definido como grafite `#1E1B1C`, e Costelinha/Barbecue (Skin) como `#7A2E1A` — **confirmar**.
- [ ] **Selo por SKU:** confirmar, embalagem a embalagem, quais produtos têm o selo "Alto em gordura saturada" (campo `seloAltoGorduraSaturada`, hoje `true` para todos) e se algum tem outros selos (ex.: "Alto em sódio"). Zero Sódio precisa de conferência específica.
- [ ] **Logotipo oficial:** `components/Logo.tsx` é uma recriação vetorial provisória. Substituir pelo SVG oficial da marca (e `app/icon.svg`).
- [ ] **Sabor do Sachê 12g:** o catálogo não informa o sabor; exibido como "Sachê individual".
- [ ] **Nome comercial da Extrafina:** a paleta cita "Extrafina Gourmet"; o site usa "Batata Palha Extrafina" (como na lista de SKUs). Confirmar.

## 2. Dados institucionais `[PREENCHER]` (`lib/site.ts`)
- [ ] Razão social e CNPJ
- [ ] Endereço completo e cidade/UF
- [ ] Telefone, WhatsApp e e-mail comercial
- [ ] Horário de atendimento
- [ ] Redes sociais (Instagram, Facebook, LinkedIn) — hoje ocultas
- [ ] E-mail e nome do Encarregado de dados (LGPD)

## 3. Página Sobre (`app/sobre/page.tsx`)
- [ ] História: ano de fundação, origem, fundadores, marcos
- [ ] Estrutura fabril (localização, capacidade, processos)
- [ ] Certificações/registros comprováveis
- [ ] Missão, visão e valores oficiais
- [ ] Números (clientes, cidades atendidas, volume) — **somente dados verificados**
- [ ] Fotos reais (fábrica, equipe, produto em uso)

## 4. Legal
- [ ] Revisão jurídica da Política de Privacidade e dos Termos
- [ ] Datas de "Última atualização", prazo de retenção, fornecedores (operadores), foro

## 5. Leads e infraestrutura
- [ ] Escolher o destino dos leads e configurar na Vercel: `LEAD_PROVIDER=resend` (+ `RESEND_API_KEY`, `LEAD_EMAIL_TO`, `LEAD_EMAIL_FROM` com domínio verificado) **ou** `LEAD_PROVIDER=supabase` (+ credenciais e tabela — SQL no README). **Hoje: `log` (stub) — os leads aparecem apenas nos logs de runtime da Vercel.**
- [ ] Domínio próprio + `NEXT_PUBLIC_SITE_URL`
- [ ] (Opcional) Rate limiting por IP (ex.: Vercel Firewall / Upstash) se houver spam além do honeypot
- [ ] (Opcional) Analytics — se adotado, atualizar a seção de cookies da Política de Privacidade

## 6. Pesquisa de referências
- [ ] Os sites de referência estavam bloqueados pela política de rede do ambiente. Validar `docs/referencias.md` navegando ao vivo (checklist no fim do arquivo).

## 7. Conteúdo a validar com a Aliança
- [ ] Textos de marketing (headlines e chamadas) — tom e aprovação da marca
- [ ] Perfis de revenda e tipos de negócio do formulário
- [ ] Informações nutricionais/ingredientes **não** foram publicadas (sem fonte); decidir se entram nas páginas de linha
