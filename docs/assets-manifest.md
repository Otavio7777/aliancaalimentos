# Manifesto de assets

Rastreia cada arquivo recebido da Aliança: **original** (em `assets/incoming/<lote>/`, nunca alterado) → **arquivo final** (em `public/`) → **SKU** → **status**.

- **ok:** processado com `npm run images:lote`, pranchas conferidas (selo, "Imagem ilustrativa", tabela e rodapé intactos) e ligado ao SKU.
- **pendente:** original ainda não está no repositório. O SKU usa placeholder na cor do tema.

Os arquivos finais saem em duas larguras, `-800.webp` e `-1600.webp`. O site referencia a `-1600`, e o `next/image` gera os tamanhos menores.

## Lote 01: Batata Chips Lisa (`scripts/lotes/lote-01.json`)

| Original | Arquivo final (`public/products/batata-chips-lisa/`) | SKU | Status |
|---|---|---|---|
| `46985-MOCKUP-BATATA-CHIPS-LISA-COSTELINHA-COM-BARBECUE-150G_AF01.png` | `costelinha-barbecue-150g-{800,1600}.webp` | `chips-lisa-costelinha-com-barbecue-150g` | pendente |
| `46989-MOCKUP-BATATA-CHIPS-LISA-CREME-DE-CEBOLA-150G_AF01.png` | `creme-de-cebola-150g-{800,1600}.webp` | `chips-lisa-creme-de-cebola-150g` | pendente |
| `47679-MOCKUP-BATATA-CHIPS-LISA-CREME-DE-CEBOLA-45G_AF01.png` | `creme-de-cebola-45g-{800,1600}.webp` | `chips-lisa-creme-de-cebola-45g` | pendente |
| `47680-MOCKUP-BATATA-CHIPS-LISA-FRANGO-GRELHADO-45G_AF01.png` | `frango-grelhado-45g-{800,1600}.webp` | `chips-lisa-frango-grelhado-45g` | pendente |
| `47978-MOCKUP-BATATA-CHIPS-LISA-ORIGINAL-45G_AF01.png` | `original-45g-{800,1600}.webp` | `chips-lisa-original-45g` | pendente |

## Lote 01B: logo oficial

| Original | Arquivo final | Uso | Status |
|---|---|---|---|
| a identificar em `assets/incoming/lote-01/` | `assets/source/logo-alianca-original.<ext>`, `public/brand/logo-alianca.{png,webp}`, `public/brand/logo-alianca-header.webp`, `app/icon.png`, `app/favicon.ico`, `public/og-image.png` | header, rodapé, favicon, og:image, schema.org | pendente |

## Lote 02: SKUs existentes (`scripts/lotes/lote-02.json`)

| Original | Arquivo final (`public/products/`) | SKU | Status |
|---|---|---|---|
| `BATATA_ONDULADA_CHURRASCO_45G.png` | `krisps/churrasco-45g-{800,1600}.webp` | `krisps-churrasco-45g` | pendente |
| `Batata_Palha_EF_Alianc_a_80g.png` | `batata-palha/extrafina-80g-{800,1600}.webp` | `bp-extrafina-80g` | pendente |
| `Batata_Palha_EF_Alianc_a_300g.png` | `batata-palha/extrafina-300g-{800,1600}.webp` | `bp-extrafina-300g` | pendente |
| `Batata_tradicional_80g.png` | `batata-palha/tradicional-80g-{800,1600}.webp` | `bp-tradicional-80g` | pendente |
| `Checkmate_Petisco_50g_Bacon.png` | `checkmate-petisco/bacon-50g-{800,1600}.webp` | `checkmate-petisco-bacon-50g` | pendente |

## Lote 03 (`scripts/lotes/lote-03.json`)

| Original | Arquivo final (`public/products/`) | SKU | Status |
|---|---|---|---|
| `Checkmate_Petisco_100g_Costelinha.png` | `checkmate-petisco/costelinha-limao-100g-{800,1600}.webp` | `checkmate-petisco-costelinha-limao-100g` | pendente |
| `Checkmate_Skin_Bacon_40g.png` | `checkmate-skin/bacon-40g-{800,1600}.webp` | `checkmate-skin-bacon-40g` | pendente |
| `Palha_EF_zero_sal_100g.png` | `batata-palha/zero-sodio-100g-{800,1600}.webp` | `bp-zero-sodio-100g` | pendente |
| `Palha_tradicional_100g.png` | `batata-palha/tradicional-100g-{800,1600}.webp` | `bp-tradicional-100g` | pendente |
| `46707-MOCKUP-BATATA-CHIPS-LISA-ORIGINAL-150G_AF01.png` | `batata-chips-lisa/original-150g-{800,1600}.webp` | `chips-lisa-original-150g` | pendente |
