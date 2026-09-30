# Pendências

Itens que dependem da Aliança Alimentos ou de acesso que não estava disponível durante o desenvolvimento.

## 0. Lotes de fotos e novas linhas (set/2026)

### Imagens pendentes
Status arquivo a arquivo em `docs/assets-manifest.md`.
- [ ] **Substituir pelos originais (lote 01 e logo):** os 5 SKUs da Chips Lisa do lote 01 e a logo já estão no site, mas foram processados a partir das cópias de baixa qualidade enviadas por mensagem. Sobrescrever os arquivos em `assets/incoming/lote-01/` pelos originais e rodar `npm run images:lote -- scripts/lotes/lote-01.json` e `npm run images:logo -- assets/incoming/lote-01/logo-alianca-alimentos.png`.
- [ ] Largura real das fotos do lote 01: as cópias rendem 1180px de largura útil, então os arquivos `*-1600.webp` da Chips Lisa têm **1180px** (não foram ampliados). Com os originais, gerar de novo em 1600px.
- [ ] [PREENCHER] logo em maior resolução ou vetorial: a área útil da logo recebida tem 1099 px de largura (menos que 1200).
- [ ] O ® da logo é preto e fica ilegível sobre fundo escuro. No rodapé, a logo foi posta sobre uma placa creme. Confirmar se existe versão oficial para fundo escuro.
- [ ] **Lote 02 (`assets/incoming/lote-02/`), sem arquivo no ambiente:** Krisp's Churrasco 45g, Palha Extrafina 80g, Palha Extrafina 300g, Palha Tradicional 80g, Checkmate Petisco Bacon 50g. Processar com `npm run images:lote -- scripts/lotes/lote-02.json`.
- [ ] **Lote 03 (`assets/incoming/lote-03/`), sem arquivo no ambiente:** Checkmate Petisco Costelinha/Limão 100g, Checkmate Skin Bacon 40g, Palha Zero Sódio 100g, Palha Tradicional 100g e Chips Lisa Original 150g. Processar com `npm run images:lote -- scripts/lotes/lote-03.json`.
- [ ] Logo oficial em maior resolução ou vetorial, se o PNG do lote 1B tiver menos de 1200px de largura (checar ao receber).

### Batata Chips Lisa
- [ ] [PREENCHER] un/cx Chips Lisa 45g
- [ ] [PREENCHER] un/cx Chips Lisa 150g (Creme de Cebola, Costelinha com Barbecue e Original, esta incluída no lote 3)
- [ ] [PREENCHER] canal da linha. Hoje fica `null`: a UI mostra "Consulte-nos" e os filtros tratam como Varejo.
- [ ] [RECONFIRMAR com originais] cores de sabor (`saboresChipsLisa` em `data/products.ts`: vermelho `#F21815`, verde `#057225`, laranja `#C43801`, azul `#015CBF`) e preto `#141414`. Foram amostradas por pixel nas cópias de baixa qualidade. O Original 150g usa o mesmo azul do 45g e continua com placeholder.
- [ ] Texto de marketing da linha ("Lâmina fina, crocância premium.") precisa da aprovação da marca.

### Lote 2: observações para conferir nos originais
- [ ] **Selo frontal no Checkmate Petisco:** as embalagens de Bacon 50g e Costelinha/Limão 100g **não têm** o selo "ALTO EM GORDURA SATURADA". Seguindo a instrução do lote 3, `seloAltoGorduraSaturada` passou a `false` para **toda** a linha Petisco (placeholder e alt sem selo). Falta confirmar Pimenta, Queijo, Churrasco e Cebola e Salsa nas duas gramaturas.
- [ ] **Zero Sódio:** usar a formulação da embalagem ("Zero adição de sal*", com a nota "*Contém sódio próprio dos ingredientes") nos textos do SKU e da linha. Aplicar junto com a foto do lote 3.
- [ ] A página da linha Checkmate é `/produtos/checkmate` (Skin e Petisco juntos). Não existe `/produtos/checkmate-petisco`. O destino da foto (`/products/checkmate-petisco/`) é só uma pasta.

### Qualidade
- [ ] O projeto não tem linter configurado (o Next 16 removeu o `next lint`). Hoje a validação é feita com `npm run typecheck` e `npm run build`. Decidir se entra ESLint ou Biome.

## 1. Catálogo em PDF e imagens (prioridade alta)
- [ ] **PDF do catálogo ausente.** `assets/catalogo.pdf` não existia no repositório. O único "catálogo" encontrado no Google Drive conectado ("Catálogo atual.pdf") é de outra empresa (calçados) e foi descartado.
- [ ] **Fotos das embalagens:** todos os 28 SKUs usam placeholder vetorial na cor do tema (`components/PackShot.tsx`), já com o selo frontal "ALTO EM GORDURA SATURADA". Quando o PDF chegar: seguir a seção "Imagens do catálogo" do README (`npm run images`) e conferir se o selo ficou inteiro em cada recorte.
- [ ] **Cores reais por amostragem de pixels:** os tokens atuais são as aproximações do briefing. Rodar o script com a seção `cores` do `crops.json` e atualizar `data/products.ts` (`cores`) e `app/globals.css` (`--alianca-*`). Checkmate (cor base da linha) foi definido como grafite `#1E1B1C`, e Costelinha/Barbecue (Skin) como `#7A2E1A` — **confirmar**.
- [ ] **Selo por SKU:** confirmar, embalagem a embalagem, quais produtos têm o selo "Alto em gordura saturada" (campo `seloAltoGorduraSaturada`, hoje `true` para todos) e se algum tem outros selos (ex.: "Alto em sódio"). Zero Sódio precisa de conferência específica.
- [x] **Logotipo oficial:** aplicado a partir da cópia recebida (lote 1B). Substituir pelo original ou vetorial: ver seção 0.
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
- [ ] **Decidido: e-mail via Resend** (Supabase fica para depois). Configurar na Vercel `LEAD_PROVIDER=resend`, `RESEND_API_KEY`, `LEAD_EMAIL_TO` e `LEAD_EMAIL_FROM`, com domínio verificado no Resend. Opções originais: `LEAD_PROVIDER=resend` (+ `RESEND_API_KEY`, `LEAD_EMAIL_TO`, `LEAD_EMAIL_FROM` com domínio verificado) **ou** `LEAD_PROVIDER=supabase` (+ credenciais e tabela — SQL no README). **Hoje: `log` (stub) — os leads aparecem apenas nos logs de runtime da Vercel.**
- [ ] Domínio próprio + `NEXT_PUBLIC_SITE_URL`
- [ ] (Opcional) Rate limiting por IP (ex.: Vercel Firewall / Upstash) se houver spam além do honeypot
- [ ] (Opcional) Analytics — se adotado, atualizar a seção de cookies da Política de Privacidade

## 6. Pesquisa de referências
- [ ] Os sites de referência estavam bloqueados pela política de rede do ambiente. Validar `docs/referencias.md` navegando ao vivo (checklist no fim do arquivo).

## 7. Conteúdo a validar com a Aliança
- [ ] Textos de marketing (headlines e chamadas) — tom e aprovação da marca
- [ ] Perfis de revenda e tipos de negócio do formulário
- [ ] Informações nutricionais/ingredientes **não** foram publicadas (sem fonte); decidir se entram nas páginas de linha
