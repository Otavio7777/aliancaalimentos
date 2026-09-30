/**
 * Pipeline de fotos de embalagem (lotes enviados pela Aliança).
 *
 *   npm run images:lote -- scripts/lotes/lote-01.json
 *   npm run images:lote -- scripts/lotes/lote-01.json --dry-run   # só valida e amostra cores
 *
 * Para cada item do lote:
 *  1. lê o original em `origem/arquivo` (nunca o altera);
 *  2. encontra a área útil (pixels não transparentes — ou diferentes do fundo,
 *     se o canvas for opaco) e recorta com ~2% de margem de segurança,
 *     preservando o canal alfa;
 *  3. exporta WebP (q90, alfa sem perda) em `<destino>-800.webp` e
 *     `<destino>-1600.webp`, sem distorção e sem ampliar;
 *  4. amostra a cor dominante de cada região `amostra` (coordenadas relativas
 *     ao canvas original) e imprime o hex para fixar os tokens;
 *  5. gera em `.image-previews/` uma prancha de conferência com a imagem
 *     inteira e ampliações das regiões `verificar` (selo "ALTO EM GORDURA
 *     SATURADA", texto "Imagem ilustrativa"). Abra e confira cada uma.
 *     `verificar` pode ser definido no lote (padrão) ou por item (sobrescreve).
 *
 * Ao final atualiza `data/product-images-lotes.ts` (sku → foto 1600) e grava
 * `.image-previews/<lote>.report.json`. O selo e o texto lateral ficam dentro
 * da embalagem; como o recorte parte da caixa delimitadora de TODO o conteúdo
 * não transparente e só acrescenta margem, eles não podem ser cortados — a
 * prancha serve para comprovar isso visualmente.
 *
 * Roda direto no Node ≥ 22.18 (type stripping nativo), sem transpilar.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import sharp from "sharp";

type Regiao = { x: number; y: number; w: number; h: number };
type Verificacao = Regiao & { nome: string };
type Item = {
  arquivo: string;
  destino: string;
  sku: string;
  confira: string;
  /** região única, ou regiões nomeadas (ex.: { base, acento }) */
  amostra?: Regiao | Record<string, Regiao>;
  verificar?: Verificacao[];
};
type Lote = { origem: string; verificar?: Verificacao[]; itens: Item[] };

const ROOT = resolve(import.meta.dirname, "..");
const LARGURAS = [800, 1600] as const;
const MARGEM = 0.02;
const QUALIDADE = 90;
const PREVIEWS = join(ROOT, ".image-previews");
const MAPA = join(ROOT, "data", "product-images-lotes.ts");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const arquivoLote = args.find((a) => !a.startsWith("--"));
if (!arquivoLote) {
  console.error("Uso: npm run images:lote -- scripts/lotes/<lote>.json [--dry-run]");
  process.exit(1);
}

const lote: Lote = JSON.parse(readFileSync(resolve(ROOT, arquivoLote), "utf8"));
const nomeLote = basename(arquivoLote, ".json");

// Falha cedo: nenhum item é processado se faltar qualquer original.
const faltando = lote.itens.filter((i) => !existsSync(join(ROOT, lote.origem, i.arquivo)));
if (faltando.length) {
  console.error(`Originais ausentes em ${lote.origem}/ — nada foi processado:`);
  for (const i of faltando) console.error(`  ✗ ${i.arquivo}`);
  process.exit(1);
}

const hex = (r: number, g: number, b: number) =>
  "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("").toUpperCase();

function hsv(r: number, g: number, b: number) {
  const max = Math.max(r, g, b);
  const d = max - Math.min(r, g, b);
  let h = 0;
  if (d) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
  }
  return { h: (h * 60 + 360) % 360, s: max ? d / max : 0, v: max / 255 };
}

/** Caixa delimitadora do conteúdo (alfa > 8, ou cor distante do fundo se opaco). */
function areaUtil(data: Buffer, w: number, h: number) {
  const fundo = [data[0], data[1], data[2], data[3]];
  const opaco = fundo[3] > 250;
  let x0 = w, y0 = h, x1 = -1, y1 = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const conteudo = opaco
        ? Math.abs(data[i] - fundo[0]) + Math.abs(data[i + 1] - fundo[1]) + Math.abs(data[i + 2] - fundo[2]) > 24
        : data[i + 3] > 8;
      if (conteudo) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
  }
  if (x1 < 0) throw new Error("imagem vazia");
  return { x0, y0, x1, y1, opaco, fundo };
}

/** Cor dominante saturada da região (descarta preto, branco e cinzas). */
function amostrar(data: Buffer, w: number, h: number, r: Regiao) {
  const bins = new Map<number, number[][]>();
  const xa = Math.floor(r.x * w), xb = Math.ceil((r.x + r.w) * w);
  const ya = Math.floor(r.y * h), yb = Math.ceil((r.y + r.h) * h);
  for (let y = ya; y < yb; y++) {
    for (let x = xa; x < xb; x++) {
      const i = (y * w + x) * 4;
      if (data[i + 3] < 250) continue;
      const c = hsv(data[i], data[i + 1], data[i + 2]);
      if (c.s < 0.45 || c.v < 0.25) continue;
      const bin = Math.floor(c.h / 10);
      if (!bins.has(bin)) bins.set(bin, []);
      bins.get(bin)!.push([data[i], data[i + 1], data[i + 2]]);
    }
  }
  const [, px] = [...bins.entries()].sort((a, b) => b[1].length - a[1].length)[0] ?? [0, []];
  if (!px.length) return null;
  const med = (k: number) => px.map((p) => p[k]).sort((a, b) => a - b)[Math.floor(px.length / 2)];
  return { hex: hex(med(0), med(1), med(2)), pixels: px.length };
}

const xadrez = (w: number, h: number) =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs><pattern id="p" width="24" height="24" patternUnits="userSpaceOnUse"><rect width="24" height="24" fill="#fff"/><rect width="12" height="12" fill="#ddd"/><rect x="12" y="12" width="12" height="12" fill="#ddd"/></pattern></defs><rect width="100%" height="100%" fill="url(#p)"/></svg>`,
  );

const rotulo = (texto: string, w: number) =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="40"><rect width="100%" height="100%" fill="#111"/><text x="12" y="27" font-family="sans-serif" font-size="20" fill="#fff">${texto.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</text></svg>`,
  );

async function processar(item: Item) {
  const origem = join(ROOT, lote.origem, item.arquivo);
  const meta = await sharp(origem).metadata();
  const { data, info } = await sharp(origem).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const avisos: string[] = [];

  if (!meta.hasAlpha) avisos.push("original sem canal alfa");
  const bb = areaUtil(data, W, H);
  if (bb.opaco) avisos.push(`fundo opaco (${hex(bb.fundo[0], bb.fundo[1], bb.fundo[2])}); recorte feito pela cor do fundo`);
  if (bb.x0 === 0 || bb.y0 === 0 || bb.x1 === W - 1 || bb.y1 === H - 1)
    avisos.push("conteúdo encosta na borda do original — confira se a embalagem já veio cortada");

  const cw = bb.x1 - bb.x0 + 1;
  const ch = bb.y1 - bb.y0 + 1;
  const m = Math.ceil(Math.max(cw, ch) * MARGEM);
  // margem além do canvas é completada com o próprio fundo (transparente, em geral)
  const left = bb.x0 - m, top = bb.y0 - m;
  const ext = {
    top: Math.max(0, -top),
    left: Math.max(0, -left),
    bottom: Math.max(0, bb.y1 + m - (H - 1)),
    right: Math.max(0, bb.x1 + m - (W - 1)),
  };
  const fundo = bb.opaco
    ? { r: bb.fundo[0], g: bb.fundo[1], b: bb.fundo[2], alpha: 1 }
    : { r: 0, g: 0, b: 0, alpha: 0 };

  // extend e extract em pipelines separados: o sharp reordena operações num mesmo pipeline
  const estendida = await sharp(data, { raw: { width: W, height: H, channels: 4 } })
    .extend({ ...ext, background: fundo })
    .png()
    .toBuffer();
  const recorte = await sharp(estendida)
    .extract({ left: Math.max(0, left), top: Math.max(0, top), width: cw + 2 * m, height: ch + 2 * m })
    .png()
    .toBuffer();
  const rw = cw + 2 * m;
  const rh = ch + 2 * m;

  const saidas: { arquivo: string; largura: number; altura: number; kb: number }[] = [];
  for (const alvo of LARGURAS) {
    const largura = Math.min(alvo, rw);
    if (largura < alvo) avisos.push(`recorte tem ${rw}px de largura; -${alvo}.webp saiu com ${largura}px (sem ampliar)`);
    const destino = join(ROOT, `${item.destino}-${alvo}.webp`);
    const buf = await sharp(recorte)
      .resize({ width: largura, fit: "inside", withoutEnlargement: true })
      .webp({ quality: QUALIDADE, alphaQuality: 100, effort: 6, smartSubsample: true })
      .toBuffer();
    const info2 = await sharp(buf).metadata();
    if (!dryRun) {
      mkdirSync(dirname(destino), { recursive: true });
      writeFileSync(destino, buf);
    }
    saidas.push({
      arquivo: destino.slice(ROOT.length + 1),
      largura: info2.width!,
      altura: info2.height!,
      kb: Math.round(buf.length / 1024),
    });
  }

  // prancha de conferência: imagem inteira + ampliações das regiões críticas
  const PW = 640;
  const inteira = await sharp(recorte).resize({ width: PW }).toBuffer();
  const ih = (await sharp(inteira).metadata()).height!;
  const zooms = await Promise.all(
    (item.verificar ?? lote.verificar ?? []).map(async (v) => {
      const box = {
        left: Math.floor(v.x * rw),
        top: Math.floor(v.y * rh),
        width: Math.min(rw - Math.floor(v.x * rw), Math.ceil(v.w * rw)),
        height: Math.min(rh - Math.floor(v.y * rh), Math.ceil(v.h * rh)),
      };
      const buf = await sharp(recorte).extract(box).resize({ width: PW, height: 520, fit: "inside" }).toBuffer();
      return { nome: v.nome, buf, h: (await sharp(buf).metadata()).height! };
    }),
  );
  const alturaTotal = 40 + ih + zooms.reduce((s, z) => s + 40 + z.h, 0);
  const camadas: sharp.OverlayOptions[] = [{ input: rotulo(`${item.sku} — confira: ${item.confira}`, PW), top: 0, left: 0 }];
  let y = 40;
  camadas.push({ input: inteira, top: y, left: 0 });
  y += ih;
  for (const z of zooms) {
    camadas.push({ input: rotulo(`ampliação: ${z.nome}`, PW), top: y, left: 0 });
    camadas.push({ input: z.buf, top: y + 40, left: 0 });
    y += 40 + z.h;
  }
  mkdirSync(PREVIEWS, { recursive: true });
  const prancha = join(PREVIEWS, `${nomeLote}-${basename(item.destino)}.png`);
  await sharp(xadrez(PW, alturaTotal)).composite(camadas).png().toFile(prancha);

  return {
    sku: item.sku,
    original: `${lote.origem}/${item.arquivo}`,
    formato: meta.format,
    canvas: `${W}x${H}`,
    alfa: Boolean(meta.hasAlpha),
    areaUtil: { x: bb.x0, y: bb.y0, w: cw, h: ch },
    margemPx: m,
    recorte: `${rw}x${rh}`,
    saidas,
    cores: Object.fromEntries(
      Object.entries(item.amostra ? ("x" in item.amostra ? { sabor: item.amostra as Regiao } : item.amostra) : {}).map(
        ([nome, regiao]) => [nome, amostrar(data, W, H, regiao as Regiao)],
      ),
    ),
    prancha: prancha.slice(ROOT.length + 1),
    avisos,
  };
}

const relatorio = [];
for (const item of lote.itens) {
  const r = await processar(item);
  relatorio.push(r);
  console.log(`\n✓ ${r.sku}  (${r.formato} ${r.canvas}${r.alfa ? ", com alfa" : ""})`);
  console.log(`  área útil ${r.areaUtil.w}x${r.areaUtil.h} + margem ${r.margemPx}px → ${r.recorte}`);
  for (const s of r.saidas) console.log(`  → ${s.arquivo}  ${s.largura}x${s.altura}  ${s.kb} KB${dryRun ? " (dry-run)" : ""}`);
  for (const [nome, c] of Object.entries(r.cores))
    console.log(`  cor ${nome}: ${c ? `${c.hex}  (${c.pixels} px amostrados)` : "sem pixels saturados na região"}`);
  console.log(`  prancha: ${r.prancha}`);
  for (const a of r.avisos) console.log(`  ⚠ ${a}`);
}

writeFileSync(join(PREVIEWS, `${nomeLote}.report.json`), JSON.stringify(relatorio, null, 2) + "\n");

if (!dryRun) {
  // mescla com o que já existe (lotes anteriores)
  const atual: Record<string, string> = {};
  if (existsSync(MAPA)) {
    for (const [, k, v] of readFileSync(MAPA, "utf8").matchAll(/"([^"]+)":\s*"([^"]+)"/g)) atual[k] = v;
  }
  for (const r of relatorio) atual[r.sku] = "/" + r.saidas.at(-1)!.arquivo.replace(/^public\//, "");
  const linhas = Object.entries(atual)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `  "${k}": "${v}",`)
    .join("\n");
  writeFileSync(
    MAPA,
    "/**\n * Gerado por `npm run images:lote` (scripts/process-images.ts).\n" +
      " * Mapeia id do produto → foto de embalagem (WebP 1600) em /public/products.\n */\n" +
      `export const imagensLotes: Record<string, string> = {\n${linhas}\n};\n`,
  );
  console.log(`\nMapa atualizado: ${MAPA.slice(ROOT.length + 1)}`);
}
console.log(`Relatório: .image-previews/${nomeLote}.report.json — abra as pranchas e confira o selo e o texto lateral.`);
