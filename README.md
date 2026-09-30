# Aliança Alimentos — site institucional + catálogo B2B

Site da **Aliança Alimentos** (batata palha e snacks) em pt-BR: institucional, catálogo com filtro, páginas de linha com tema de cor próprio e captação de leads B2B.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion · Zod · Vercel.

## Como rodar

```bash
npm install
cp .env.example .env.local   # opcional — sem configurar, os leads vão para o log (stub)
npm run dev                  # http://localhost:3000
npm run build && npm start   # produção local
npm run typecheck
```

Requer Node 20+.

## Estrutura

| Caminho | Conteúdo |
| --- | --- |
| `data/products.ts` | **Fonte de verdade do catálogo** (28 SKUs tipados: linha, sabor, gramatura, un/cx, canal, cor de tema, imagem) |
| `data/product-images.ts` | Manifesto de fotos recortadas (gerado por `npm run images`) |
| `lib/site.ts` | Dados institucionais — campos `[PREENCHER]` |
| `lib/lead.ts` | Schemas zod dos formulários (revenda e contato) + validação de CNPJ |
| `app/api/lead/route.ts` | Rota de leads com honeypot + tempo mínimo e entrega configurável |
| `app/globals.css` | Tokens de marca (`--alianca-red`, `--alianca-gold`, …) e tema ativo (`--theme`) |
| `components/PackShot.tsx` | Foto da embalagem ou placeholder vetorial na cor do tema (com selo "Alto em gordura saturada") |
| `components/ThemeSync.tsx` | Troca suave de `--theme` conforme a seção visível (`data-theme`) |
| `scripts/extract_catalog.py` | Recorte das embalagens do PDF → WebP em `public/products` |
| `docs/` | `referencias.md` (pesquisa) e `pendencias.md` (o que falta) |

### Páginas
`/` · `/produtos` (filtro por linha, gramatura e canal, sincronizado na URL) · `/produtos/[batata-palha|food-service|krisps|checkmate]` · `/sobre` · `/revenda` (formulário B2B; `?interesse=<linha>` pré-seleciona) · `/contato` · `/privacidade` · `/termos` · `/sitemap.xml` · `/robots.txt` · `/opengraph-image`

## Tema por linha (regra "cor da embalagem = tema")
Cada linha (`linhas` em `data/products.ts`) e cada SKU (`corTema`) tem `{ bg, ink }` com contraste AA. Seções com `data-theme="#hex"` atualizam `--theme`/`--theme-ink` no documento ao entrar na tela; o botão fixo "Seja um revendedor" acompanha a cor. As páginas de linha aplicam a cor da linha no hero, bordas de grupo e CTA de cotação.

## Imagens do catálogo
O PDF não estava disponível no repositório durante o desenvolvimento, então o site usa **embalagens ilustrativas em SVG** (nas cores de cada produto, com o selo frontal de alerta). Para usar as fotos reais:

```bash
pip install pymupdf pillow           # opcional: rembg (remoção de fundo)
# coloque o PDF em assets/catalogo.pdf
python3 scripts/extract_catalog.py --pages      # gera docs/catalogo-paginas/*.png
cp scripts/crops.example.json scripts/crops.json # ajuste página/caixa de cada SKU e pontos de cor
npm run images                                   # gera public/products/*.webp + data/product-images.ts
```
As cores amostradas são impressas no terminal — atualize `cores` em `data/products.ts` e os tokens em `app/globals.css`. **Confira que o selo "ALTO EM GORDURA SATURADA" ficou inteiro em cada recorte.**

## Leads (`/api/lead`)
Validação com zod (CNPJ com dígito verificador, UF, telefone, consentimento LGPD), honeypot (`website`) e descarte silencioso de envios válidos feitos em menos de 2,5 s.

| `LEAD_PROVIDER` | Variáveis | Comportamento |
| --- | --- | --- |
| `log` (padrão) | — | Stub: registra o lead no log do servidor (Vercel → Logs) |
| `resend` | `RESEND_API_KEY`, `LEAD_EMAIL_TO`, `LEAD_EMAIL_FROM` | E-mail HTML com todos os campos; `reply_to` = e-mail do lead |
| `supabase` | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_LEADS_TABLE` | Insere via REST (PostgREST) |

Tabela sugerida no Supabase:

```sql
create table public.leads (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  origem text not null check (origem in ('revenda','contato')),
  nome text not null,
  email text not null,
  telefone text,
  empresa text,
  cnpj text,
  cidade text,
  uf text,
  tipo_negocio text,
  interesse text[],
  assunto text,
  mensagem text
);
alter table public.leads enable row level security; -- sem policies: só a service_role grava/lê
```

## Deploy na Vercel
O projeto está conectado ao repositório GitHub `otavio7777/aliancaalimentos`; cada push gera um deploy.

1. Vercel → **Add New Project** → importe o repositório (framework: Next.js, padrões de build).
2. **Settings → Environment Variables**: defina `LEAD_PROVIDER` e as chaves do provedor escolhido (ver `.env.example`). Opcional: `NEXT_PUBLIC_SITE_URL` com o domínio final.
3. **Settings → Git → Production Branch**: aponte para a branch de produção (ex.: `main`).
4. **Settings → Domains**: adicione o domínio próprio quando houver.

Via CLI: `npx vercel` (preview) e `npx vercel --prod` (produção).

## Qualidade
- Lighthouse mobile (build de produção, local): Performance 95–98, Acessibilidade 100, Boas práticas 100, SEO 100.
- `prefers-reduced-motion` desliga parallax e animações de entrada.
- Foco visível, skip link, rótulos e mensagens de erro associadas (`aria-describedby`), navegação por teclado no menu móvel (Esc fecha).
