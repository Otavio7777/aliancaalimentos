/**
 * Logo oficial → arquivos do site (lote 1B).
 *
 *   npm run images:logo -- assets/incoming/lote-01/logo-alianca-alimentos.png
 *
 * Gera, sem alterar o original:
 *  - assets/source/logo-alianca-original.<ext>   cópia byte a byte
 *  - public/brand/logo-alianca.png / .webp       área útil + ~2% de margem, com alfa
 *  - public/brand/logo-alianca-header.webp       ~400px de largura
 *  - app/icon.png (512) e app/favicon.ico        só o oval (máscara elíptica, sem as pontas da fita)
 *  - public/og-image.png (1200x630)              logo centralizada sobre creme
 *  - .image-previews/logo-*.png                  para conferência visual
 * Nunca recolore, distorce, gira nem aplica sombra.
 */

import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import sharp from "sharp";

const ROOT = resolve(import.meta.dirname, "..");
const origem = process.argv[2] && resolve(ROOT, process.argv[2]);
if (!origem || !existsSync(origem)) {
  console.error("Uso: npm run images:logo -- <arquivo da logo>  (arquivo não encontrado)");
  process.exit(1);
}

/**
 * Oval da marca, em fração da ÁREA ÚTIL recortada (cx, cy, rx, ry).
 * Medido na logo de 2000x1414: oval de x≈562–1431 e y≈475–937, sem as pontas da fita.
 */
const OVAL = { cx: 0.495, cy: 0.508, rx: 0.4, ry: 0.5 };
const CREME = "#FBF7EE"; // --alianca-offwhite

const out = (p: string) => join(ROOT, p);
for (const d of ["assets/source", "public/brand", ".image-previews"]) mkdirSync(out(d), { recursive: true });

// 1. cópia do original, fora do site
const copia = `assets/source/logo-alianca-original${extname(origem).toLowerCase()}`;
copyFileSync(origem, out(copia));

// 2. verificação de alfa real
const meta = await sharp(origem).metadata();
const { data, info } = await sharp(origem).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width, H = info.height;
const alfa = (x: number, y: number) => data[(y * W + x) * 4 + 3];
const cantos = [alfa(0, 0), alfa(W - 1, 0), alfa(0, H - 1), alfa(W - 1, H - 1)];
console.log(`${meta.format} ${W}x${H}, canal alfa: ${meta.hasAlpha ? "sim" : "não"}, alfa nos cantos: ${cantos.join(",")}`);
if (!meta.hasAlpha || cantos.some((a) => a !== 0)) {
  console.error("Fundo não é transparente — parar e avisar (não remover fundo por conta própria).");
  process.exit(1);
}

// 3. trim com ~2% de margem
let x0 = W, y0 = H, x1 = -1, y1 = -1;
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++)
    if (alfa(x, y) > 8) {
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
const cw = x1 - x0 + 1, ch = y1 - y0 + 1;
const m = Math.ceil(Math.max(cw, ch) * 0.02);
const left = Math.max(0, x0 - m), top = Math.max(0, y0 - m);
const lw = Math.min(W, x1 + m + 1) - left, lh = Math.min(H, y1 + m + 1) - top;
const logo = await sharp(origem).extract({ left, top, width: lw, height: lh }).png().toBuffer();
console.log(`área útil ${cw}x${ch} em (${x0},${y0}); recorte com margem ${m}px → ${lw}x${lh}`);
if (lw < 1200) console.log("⚠ largura < 1200px — registrar pendência de logo em maior resolução/vetorial");

await sharp(logo).png({ compressionLevel: 9 }).toFile(out("public/brand/logo-alianca.png"));
await sharp(logo).webp({ quality: 90, alphaQuality: 100, effort: 6 }).toFile(out("public/brand/logo-alianca.webp"));
const header = await sharp(logo).resize({ width: 400 }).webp({ quality: 90, alphaQuality: 100, effort: 6 }).toBuffer();
writeFileSync(out("public/brand/logo-alianca-header.webp"), header);
const hm = await sharp(header).metadata();

// 4. favicon: só o oval (máscara elíptica sobre a área útil), com padding
const ox = Math.round(x0 - left + OVAL.cx * cw), oy = Math.round(y0 - top + OVAL.cy * ch);
const rx = Math.round(OVAL.rx * cw * 1.0), ry = Math.round(OVAL.ry * ch * 1.0);
const mascara = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${lw}" height="${lh}"><ellipse cx="${ox}" cy="${oy}" rx="${rx}" ry="${ry}" fill="#fff"/></svg>`,
);
// composite e extract em pipelines separados (o sharp aplica extract antes do composite)
const mascarado = await sharp(logo).composite([{ input: mascara, blend: "dest-in" }]).png().toBuffer();
const oval = await sharp(mascarado)
  .extract({ left: ox - rx, top: Math.max(0, oy - ry), width: 2 * rx, height: Math.min(lh - Math.max(0, oy - ry), 2 * ry) })
  .png()
  .toBuffer();
const icone = async (lado: number) =>
  sharp(oval)
    .resize({ width: Math.round(lado * 0.92), height: Math.round(lado * 0.92), fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .resize({ width: lado, height: lado, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toBuffer();
writeFileSync(out("app/icon.png"), await icone(512));

// ICO com entradas PNG (16, 32, 48)
const tamanhos = [16, 32, 48];
const pngs = await Promise.all(tamanhos.map(icone));
const cab = Buffer.alloc(6 + 16 * pngs.length);
cab.writeUInt16LE(0, 0);
cab.writeUInt16LE(1, 2);
cab.writeUInt16LE(pngs.length, 4);
let off = cab.length;
pngs.forEach((png, i) => {
  const e = 6 + 16 * i;
  cab.writeUInt8(tamanhos[i], e);
  cab.writeUInt8(tamanhos[i], e + 1);
  cab.writeUInt16LE(1, e + 4);
  cab.writeUInt16LE(32, e + 6);
  cab.writeUInt32LE(png.length, e + 8);
  cab.writeUInt32LE(off, e + 12);
  off += png.length;
});
writeFileSync(out("app/favicon.ico"), Buffer.concat([cab, ...pngs]));

// 5. og:image 1200x630 — logo centralizada sobre creme, com respiro
const ogLogo = await sharp(logo).resize({ width: 820, height: 440, fit: "inside" }).toBuffer();
const om = await sharp(ogLogo).metadata();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: CREME } })
  .composite([{ input: ogLogo, left: Math.round((1200 - om.width!) / 2), top: Math.round((630 - om.height!) / 2) }])
  .png({ compressionLevel: 9 })
  .toFile(out("public/og-image.png"));

// 6. pré-visualizações (logo sobre creme e sobre grafite; favicon ampliado)
for (const [nome, fundo] of [["creme", CREME], ["grafite", "#1E1B1C"]] as const) {
  await sharp({ create: { width: lw + 80, height: lh + 80, channels: 4, background: fundo } })
    .composite([{ input: logo, left: 40, top: 40 }])
    .png()
    .toFile(out(`.image-previews/logo-sobre-${nome}.png`));
}
await sharp({ create: { width: 640, height: 640, channels: 4, background: CREME } })
  .composite([{ input: await sharp(await icone(512)).toBuffer(), left: 64, top: 64 }])
  .png()
  .toFile(out(".image-previews/logo-favicon.png"));

console.log(`cópia: ${copia}`);
console.log(`public/brand/logo-alianca.{png,webp} ${lw}x${lh}; header ${hm.width}x${hm.height}`);
console.log("app/icon.png 512x512, app/favicon.ico (16/32/48), public/og-image.png 1200x630");
console.log(`HEADER_WIDTH=${hm.width} HEADER_HEIGHT=${hm.height}`);
