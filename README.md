# Site Aliança Alimentos

Next.js (App Router) + TypeScript + Tailwind 4. Catálogo B2B com 38 SKUs e cotação em caixas enviada pelo WhatsApp.

## Páginas
- `/` vitrine por linha (a cor da embalagem vira o tema)
- `/produtos` catálogo filtrável (linha, peso, canal, busca); aceita `?linha=<slug>`
- `/produtos/[linha]` itens e embalagens + tabela comercial, como no catálogo
- `/food-service` produtos por aplicação
- `/cotacao` cotação em caixas → WhatsApp comercial
- `/sobre`, `/contato`, `/privacidade`, `/termos`

## Dados
- Produtos e linhas: `data/catalogo.ts` (fonte: catálogo out/2026)
- WhatsApp e textos institucionais: `lib/site.ts`
- Fotos: `public/produtos/<id>.webp`; logo em `public/brand/`
- Fontes hospedadas em `app/fonts/` (DM Sans, Anton, Pacifico, licença OFL)

## Rodar
```bash
npm ci
npm run dev        # http://localhost:3000
npm run build && npm start
```

Pendências em `docs/pendencias.md`.
