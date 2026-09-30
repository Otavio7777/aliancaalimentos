# Pesquisa de referências

> **Limitação desta rodada:** o ambiente de desenvolvimento bloqueou o acesso de rede a `redbull.com`, `totvs.com`, `sankhya.com.br` e `boldsnacks.com.br` (política de egress). A análise abaixo foi feita a partir do briefing e do conhecimento geral dos padrões desses sites — **não** a partir de navegação ao vivo desktop/mobile nesta sessão. Recomenda-se revisar cada item navegando nos sites (ver checklist no fim) e ajustar o que divergir.
>
> Nenhum texto, imagem ou código das referências foi copiado; elas orientam apenas estrutura e linguagem visual.

---

## 1. Red Bull (redbull.com/br-pt) — imersão e ritmo visual

| Aspecto | Observação | Como aplicamos na Aliança |
| --- | --- | --- |
| Estrutura | Home como sequência de blocos editoriais full-bleed, alternando destaques grandes e trilhos/grades de cards | Home em blocos full-bleed alternando cor (vermelho → creme → grafite → dourado → marinho → vermelho) |
| Tipografia | Títulos grandes, condensados e em caixa alta; muito contraste de escala entre título e texto | Anton (condensada) para Krisp's/Checkmate e títulos de impacto; escala 5xl–8xl no hero |
| Cor | Fundo escuro dominante; a cor vem das imagens | Adaptado: aqui a cor da **embalagem** é o fundo (regra Bold) |
| Imagem | Foto/vídeo como protagonista, sangrando até as bordas | Embalagem como herói no hero, cards de linha e páginas de linha |
| Movimento | Transições suaves, hover com zoom, sensação de profundidade | Parallax leve no hero, entrada em fade/subida, hover com leve rotação/zoom das embalagens |
| CTAs | Poucos e discretos; conteúdo conduz | CTAs pontuais por bloco; sem poluição |

## 2. TOTVS (totvs.com) — institucional B2B e confiança

| Aspecto | Observação | Como aplicamos |
| --- | --- | --- |
| Estrutura | Navegação por soluções/segmentos, hero com proposta de valor + CTA comercial, blocos de prova social, rodapé extenso com mapa do site | Menu enxuto (Produtos, Food Service, Sobre, Contato) + rodapé completo com linhas, institucional e contatos |
| Tipografia | Sans limpa, hierarquia clara, títulos curtos e objetivos | DM Sans no corpo; títulos curtos e diretos |
| Cor | Paleta corporativa contida, cor de marca em CTAs | Vermelho Aliança como cor de ação; dourado como acento |
| Confiança | Números, logos de clientes, cases | **Não usado**: não temos dados verificados. Em vez disso, clareza de portfólio (tabela comercial com un/cx) — números só após confirmação (ver pendências) |
| CTAs | CTA comercial fixo no header ("fale com um especialista"/similar) | Botão fixo **"Seja um revendedor"** no header, sempre visível |

## 3. Sankhya (sankhya.com.br) — soluções por segmento e captação de lead

| Aspecto | Observação | Como aplicamos |
| --- | --- | --- |
| Estrutura | Seções por segmento/solução com cards; páginas de solução com benefícios e CTA para contato | Páginas por **linha** (`/produtos/[linha]`) com SKUs agrupados, tabela comercial e CTA de cotação; `/revenda` com perfis (Varejo, Atacado, Food Service) |
| Captação | Formulários com dados da empresa (nome, e-mail, telefone, empresa, segmento), consentimento | Formulário B2B: nome, empresa, CNPJ (validado), e-mail, telefone, cidade/UF, tipo de negócio, linhas de interesse, mensagem, consentimento LGPD |
| Tipografia/Cor | Corporativa, clara, CTAs contrastantes | CTAs em pílula com alto contraste e área de toque ≥ 48px |

## 4. Bold Snacks (boldsnacks.com.br) — **principal referência de identidade**

| Aspecto | Observação | Como aplicamos |
| --- | --- | --- |
| Lógica de cor | A cor da embalagem de cada produto define o tema da seção/página | `corTema` por SKU e `cor` por linha em `data/products.ts`; `data-theme` + `ThemeSync` trocam `--theme` ao rolar; páginas de linha inteiras na cor da linha |
| Tipografia | Grande, expressiva, tom jovem | Pacifico (script, pontual: "Batata Palha", chamadas), DM Serif Display (títulos Aliança), Anton (Krisp's/Checkmate) |
| Produto como herói | Embalagem grande, em fundo sólido | PackShot grande em fundo da própria cor, com textura de juta |
| Tom de voz | Curto, direto, bem-humorado | "Escolha o seu crocante.", "Xeque-mate na fome.", "Ondulada ou de trigo? Os dois." — sem alegações de saúde |

---

## Síntese aplicada

**Layout e conteúdo institucional/B2B (TOTVS/Sankhya)** — navegação clara, CTA comercial fixo, páginas por linha com dados de caixa, formulário B2B qualificado, rodapé completo, páginas legais.

**+ Energia e tematização por produto (Bold/Red Bull)** — blocos full-bleed coloridos pela embalagem, tipografia expressiva, produto como herói, parallax e entradas suaves (respeitando `prefers-reduced-motion`).

## Checklist para validação ao vivo (pendente)
- [ ] Navegar cada referência em desktop (1440px) e mobile (390px) e registrar: ordem das seções, tamanhos de título, comportamento do header, animações.
- [ ] Confirmar se a Bold troca o tema por rolagem, por página de produto, ou ambos — ajustar `ThemeSync` se necessário.
- [ ] Anotar padrões de formulário da Sankhya/TOTVS (campos obrigatórios, etapas) e comparar com `/revenda`.
