#!/usr/bin/env python3
"""
Extrai as embalagens do catálogo (assets/catalogo.pdf) para /public/products.

Passos:
  1. pip install pymupdf pillow            (opcional: pip install rembg  → remoção de fundo)
  2. python3 scripts/extract_catalog.py --pages      # renderiza as páginas em docs/catalogo-paginas/ para medir os recortes
  3. cp scripts/crops.example.json scripts/crops.json e ajuste page/box de cada SKU
  4. python3 scripts/extract_catalog.py              # recorta, otimiza em WebP e gera data/product-images.ts

O selo frontal "ALTO EM GORDURA SATURADA" deve permanecer visível: o script NÃO
aplica nenhum corte além da caixa informada; confira cada imagem gerada.
"""
import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PDF = ROOT / "assets" / "catalogo.pdf"
OUT = ROOT / "public" / "products"
PAGES = ROOT / "docs" / "catalogo-paginas"
CROPS = ROOT / "scripts" / "crops.json"
MANIFEST = ROOT / "data" / "product-images.ts"


def render(doc, page_no: int, dpi: int):
    from PIL import Image

    page = doc[page_no - 1]
    pix = page.get_pixmap(dpi=dpi)
    return Image.frombytes("RGB", (pix.width, pix.height), pix.samples)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--pages", action="store_true", help="apenas renderiza as páginas para referência")
    ap.add_argument("--dpi", type=int, default=150)
    args = ap.parse_args()

    try:
        import fitz  # PyMuPDF
    except ImportError:
        sys.exit("Instale as dependências: pip install pymupdf pillow")

    if not PDF.exists():
        sys.exit(f"PDF não encontrado em {PDF}")
    doc = fitz.open(PDF)

    if args.pages:
        PAGES.mkdir(parents=True, exist_ok=True)
        for i in range(len(doc)):
            img = render(doc, i + 1, args.dpi)
            img.save(PAGES / f"pagina-{i + 1:02d}.png")
        print(f"{len(doc)} páginas salvas em {PAGES}")
        return

    if not CROPS.exists():
        sys.exit("Crie scripts/crops.json a partir de scripts/crops.example.json")
    cfg = json.loads(CROPS.read_text())
    dpi = cfg.get("dpi", 300)
    remove_bg = cfg.get("remover_fundo", False)
    OUT.mkdir(parents=True, exist_ok=True)

    cache = {}
    manifest = {}
    for pid, spec in cfg["produtos"].items():
        if pid.startswith("_"):
            continue
        page_img = cache.setdefault(spec["page"], render(doc, spec["page"], dpi))
        w, h = page_img.size
        x0, y0, x1, y1 = spec["box"]
        crop = page_img.crop((int(x0 * w), int(y0 * h), int(x1 * w), int(y1 * h)))
        if remove_bg:
            try:
                from rembg import remove

                crop = remove(crop)
            except ImportError:
                print("rembg não instalado — mantendo fundo", file=sys.stderr)
        crop.thumbnail((900, 1260))
        dest = OUT / f"{pid}.webp"
        crop.save(dest, "WEBP", quality=82, method=6)
        manifest[pid] = f"/products/{pid}.webp"
        print(f"✓ {dest.relative_to(ROOT)}")

    for nome, spec in cfg.get("cores", {}).items():
        if nome.startswith("_"):
            continue
        img = cache.setdefault(spec["page"], render(doc, spec["page"], dpi))
        w, h = img.size
        cx, cy = int(spec["point"][0] * w), int(spec["point"][1] * h)
        # média de uma janela 9x9 para evitar ruído de impressão
        px = [img.getpixel((x, y)) for x in range(cx - 4, cx + 5) for y in range(cy - 4, cy + 5)]
        r, g, b = (sum(c[i] for c in px) // len(px) for i in range(3))
        print(f"cor {nome}: #{r:02X}{g:02X}{b:02X}")

    lines = ",\n".join(f'  "{k}": "{v}"' for k, v in sorted(manifest.items()))
    MANIFEST.write_text(
        "/**\n * Gerado por `npm run images` (scripts/extract_catalog.py).\n"
        " * Mapeia id do produto → imagem recortada do catálogo em /public/products.\n */\n"
        f"export const imagensProdutos: Record<string, string> = {{\n{lines}\n}};\n"
    )
    print(f"Manifesto atualizado: {MANIFEST.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
