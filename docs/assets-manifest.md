# Manifesto de assets

Rastreia cada arquivo recebido da Aliança: **original** (em `assets/incoming/<lote>/`, nunca alterado) → **arquivo final** (em `public/`) → **SKU** → **status**.

- **ok:** processado com `npm run images:lote`, pranchas conferidas (selo, "Imagem ilustrativa", tabela e rodapé intactos) e ligado ao SKU.
- **baixa qualidade, substituir pelos originais:** processado a partir da cópia enviada por mensagem, porque o original não chegou ao repositório. A cópia foi recebida como WebP recomprimido e gravada em `assets/incoming/` como PNG sem perdas, com o nome do roteiro. Quando o original chegar, sobrescreva o arquivo em `assets/incoming/` e rode o lote de novo.
- **pendente:** nenhuma imagem disponível no ambiente. O SKU usa placeholder na cor do tema.

Os arquivos finais saem em duas larguras, `-800.webp` e `-1600.webp`. O site referencia a `-1600`, e o `next/image` gera os tamanhos menores.

## Lote 01: Batata Chips Lisa (`scripts/lotes/lote-01.json`)

Fonte: cópias WebP 2000x2000 **com alfa real** (cantos com alpha 0). Trim: área útil 1116x1570 + 32px de margem → 1180x1634 (sem ampliar, a `-1600` saiu com 1180px). Selo e "Imagem ilustrativa" conferidos nas pranchas.

| Original | Arquivo final (`public/products/batata-chips-lisa/`) | SKU | Status |
|---|---|---|---|
| `46985-MOCKUP-BATATA-CHIPS-LISA-COSTELINHA-COM-BARBECUE-150G_AF01.png` | `costelinha-barbecue-150g-{800,1600}.webp` | `chips-lisa-costelinha-com-barbecue-150g` | baixa qualidade, substituir pelos originais |
| `46989-MOCKUP-BATATA-CHIPS-LISA-CREME-DE-CEBOLA-150G_AF01.png` | `creme-de-cebola-150g-{800,1600}.webp` | `chips-lisa-creme-de-cebola-150g` | baixa qualidade, substituir pelos originais |
| `47679-MOCKUP-BATATA-CHIPS-LISA-CREME-DE-CEBOLA-45G_AF01.png` | `creme-de-cebola-45g-{800,1600}.webp` | `chips-lisa-creme-de-cebola-45g` | baixa qualidade, substituir pelos originais |
| `47680-MOCKUP-BATATA-CHIPS-LISA-FRANGO-GRELHADO-45G_AF01.png` | `frango-grelhado-45g-{800,1600}.webp` | `chips-lisa-frango-grelhado-45g` | baixa qualidade, substituir pelos originais |
| `47978-MOCKUP-BATATA-CHIPS-LISA-ORIGINAL-45G_AF01.png` | `original-45g-{800,1600}.webp` | `chips-lisa-original-45g` | baixa qualidade, substituir pelos originais |

## Lote 01B: logo oficial

| Original | Arquivo final | Uso | Status |
|---|---|---|---|
| `logo-alianca-alimentos.png` (cópia WebP 2000x1414, alfa real) | `assets/source/logo-alianca-original.png`, `public/brand/logo-alianca.{png,webp}` (1143x514), `public/brand/logo-alianca-header.webp` (400x180), `app/icon.png` (512, só o oval), `app/favicon.ico` (16/32/48), `public/og-image.png` (1200x630, sobre creme) | header, rodapé, favicon, og:image, schema.org | baixa qualidade, substituir pelos originais |

Processada com `npm run images:logo -- assets/incoming/lote-01/logo-alianca-alimentos.png`. A área útil tem só 1099x470 px (com margem de 2%, 1143x514), abaixo dos 1200 px de largura pedidos.

## Lote 02: SKUs existentes (`scripts/lotes/lote-02.json`)

Fonte: cópias WebP reenviadas por mensagem, todas **com alfa real** (cantos com alpha 0), gravadas como PNG sem perdas. Selo, "Imagem ilustrativa", tabela nutricional, rodapés e "Novo peso…" foram conferidos nas pranchas. O Petisco não tem selo, e nenhum foi adicionado.

| SKU | Canvas | Área útil | Margem | Recorte final | `-800` / `-1600` | Cores medidas |
|---|---|---|---|---|---|---|
| `krisps-churrasco-45g` | 2000x2000 (muita margem) | 1097x1623 | 33px | 1163x1689 | 800 / **1163** px | navy `#28305E`, acento `#D92230` |
| `bp-extrafina-80g` | 1454x2000 (já justo) | 1451x2000 | 40px | 1531x2080 | 800 / **1531** px | `#C19F53` |
| `bp-extrafina-300g` | 1454x2000 (já justo) | 1451x2000 | 40px | 1531x2080 | 800 / **1531** px | `#C09C53` |
| `bp-tradicional-80g` | 1454x2000 (já justo) | 1451x2000 | 40px | 1531x2080 | 800 / **1531** px | vermelho `#DD1E21`, azul `#41649A` |
| `checkmate-petisco-bacon-50g` | 1110x2000 (já justo) | 1107x2000 | 40px | 1187x2080 | 800 / **1187** px | roxo `#481152`, magenta `#E55278` |

Nas imagens que já vinham justas, a embalagem encosta na borda do canvas. O pipeline não cortou nada, só acrescentou margem transparente. Nenhum `-1600` foi ampliado: todos ficaram na largura real da fonte.


| Original | Arquivo final (`public/products/`) | SKU | Status |
|---|---|---|---|
| `BATATA_ONDULADA_CHURRASCO_45G.png` | `krisps/churrasco-45g-{800,1600}.webp` | `krisps-churrasco-45g` | baixa qualidade, substituir pelos originais |
| `Batata_Palha_EF_Alianc_a_80g.png` | `batata-palha/extrafina-80g-{800,1600}.webp` | `bp-extrafina-80g` | baixa qualidade, substituir pelos originais |
| `Batata_Palha_EF_Alianc_a_300g.png` | `batata-palha/extrafina-300g-{800,1600}.webp` | `bp-extrafina-300g` | baixa qualidade, substituir pelos originais |
| `Batata_tradicional_80g.png` (a embalagem diz "Batata Palha", sem "Tradicional") | `batata-palha/tradicional-80g-{800,1600}.webp` | `bp-tradicional-80g` | baixa qualidade, substituir pelos originais |
| `Checkmate_Petisco_50g_Bacon.png` | `checkmate-petisco/bacon-50g-{800,1600}.webp` | `checkmate-petisco-bacon-50g` | baixa qualidade, substituir pelos originais |

## Lote 03 (`scripts/lotes/lote-03.json`)

As imagens do lote 03 ainda **não chegaram ao ambiente como arquivo**, então continuam pendentes e não serão recriadas.

| Original | Arquivo final (`public/products/`) | SKU | Status |
|---|---|---|---|
| `Checkmate_Petisco_100g_Costelinha.png` | `checkmate-petisco/costelinha-limao-100g-{800,1600}.webp` | `checkmate-petisco-costelinha-limao-100g` | pendente |
| `Checkmate_Skin_Bacon_40g.png` | `checkmate-skin/bacon-40g-{800,1600}.webp` | `checkmate-skin-bacon-40g` | pendente |
| `Palha_EF_zero_sal_100g.png` | `batata-palha/zero-sodio-100g-{800,1600}.webp` | `bp-zero-sodio-100g` | pendente |
| `Palha_tradicional_100g.png` | `batata-palha/tradicional-100g-{800,1600}.webp` | `bp-tradicional-100g` | pendente |
| `46707-MOCKUP-BATATA-CHIPS-LISA-ORIGINAL-150G_AF01.png` | `batata-chips-lisa/original-150g-{800,1600}.webp` | `chips-lisa-original-150g` | pendente |
