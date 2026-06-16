# Estúdio Monteiro — Redesign do sistema visual ("Monografia / prancha montada")

**Data:** 2026-06-15
**Status:** Aprovado (decisões validadas via companion visual)
**Escopo:** Sistema visual e layout. Não altera paleta, conteúdo/textos nem stack.

## Problema

A assinatura atual — uma **malha de hairlines de 1px onipresente** (linhas verticais persistentes do `GridField` + crosshairs nas interseções + filetes horizontais de borda a borda + técnica `knockout` para mascarar texto) — ficou **poluída e confusa**. Linhas demais competindo, sensação de ruído visual.

## Direção aprovada

Inverter o protagonismo: **a fotografia carrega a identidade** (intenção original do briefing: "a fotografia é a protagonista; a UI recua"). O sistema de linhas recua para um papel quieto e medido.

Decisões tomadas (cada uma validada visualmente):

1. **Grade:** "Estrutura silenciosa". Remover a malha vertical persistente. Manter apenas filetes horizontais como divisores de seção. Alinhamento de coluna continua rígido, porém **invisível** (via container + grid/gap no CSS, sem pintar linhas).
2. **Assinatura:** **Fotografia como heroína** — imagens maiores, com as **marcas de canto** (registro de "prancha montada") como motivo recorrente.
3. **Abertura da home:** **capa editorial** — título + intro + CTA à esquerda, fotografia alta (3/4) à direita com marcas de canto.
4. **Filetes horizontais:** **contidos na margem do conteúdo** (começam e terminam na borda do conteúdo, com respiro lateral). Nunca de borda a borda / contínuos pela tela.

## O que sai

- `components/ui/GridField.tsx` — deletado; remover montagem em `app/layout.tsx`.
- Crosshairs de interseção de coluna — remover `MarksAtColumns` (uso `<Rule marks />`) de `components/ui/Plus.tsx` e dos call sites.
- Técnica `.knockout` — remover a classe de `app/globals.css` e todos os usos (não há mais grade atrás do texto para mascarar). O knockout de fundo da `.label` também sai; mantêm-se só os estilos tipográficos do label.
- Variáveis de grade exclusivas do `GridField`: `--grid-cols`, `--col` (e o stepping em `@layer base`). Manter `--cell-pad` (é só um token de padding reutilizado).

## O que fica / vira assinatura

- **Fotografia** liderando, via `components/ui/Figure.tsx` (mantém `CornerMarks`, o frame hairline e o aspect-ratio sem CLS).
- **Filetes horizontais** via `components/ui/Rule.tsx` — agora o único sistema de linhas. Refatorar para renderizar **contido na largura do container** (inset, com margem lateral), sem a opção `marks`.
- Numeração de fólio (`00/`, `01/`) e o acento tijolo como detalhe editorial.
- **Mais ar:** padding de seção maior; ritmo de espaçamento mais generoso.
- Paleta dark "Drafting" (DEC-014) **inalterada**.

## Mudanças por página

- **Home (`app/page.tsx`):** capa editorial (título/intro/CTA à esquerda + foto 3/4 à direita com marcas). Projetos selecionados em layout editorial **variado** (1 destaque grande em 16/9 + 2 deslocados em 4/5), em vez de 3 cards idênticos. Manifesto e banda de contato com mais respiro.
- **Projetos índice (`app/projetos/page.tsx`, `components/projects/ProjectsView.tsx`):** sem malha; imagens maiores; tamanhos variados para quebrar a monotonia de cards iguais. Mantém filtro (`FilterTabs`) e semântica `<ul>/<li>` + headings já corrigidos.
- **Projeto detalhe (`app/projetos/[slug]/page.tsx`):** capa maior; ficha técnica e galeria com o frame de cantos; mais respiro. Mantém `<dl>`/`sr-only` headings já corrigidos.
- **Estúdio (`app/estudio/page.tsx`):** sem malha; mais ar; estrutura pelos filetes horizontais. Mantém headings/`<dl>` corrigidos.
- **Contato (`app/contato/page.tsx`):** sem malha; mais ar. Mantém form (estados/`aria-live`), `<dl>` e headings corrigidos.

## Componentes afetados (resumo)

| Componente | Ação |
|---|---|
| `GridField.tsx` | deletar + desmontar do layout |
| `Plus.tsx` | remover marcas de interseção; manter `CornerMarks` |
| `Rule.tsx` | refazer: filete inset ao container, sem `marks` |
| `globals.css` | remover `.knockout`, `--grid-cols`, `--col`; manter `--cell-pad`, paleta |
| `Figure.tsx` | manter; usado maior nas páginas |
| Páginas (5) | refazer layout: hero editorial, projetos variados, mais ar |

## Preservar (já entregue nesta sessão, não regredir)

- Acessibilidade: outline de headings, `<dl>/<dt>/<dd>`, `<ul>/<li>`, `aria-live` no form, alt text, tap targets 44px.
- Paleta dark "Drafting" (DEC-014), `color-scheme: dark`, `themeColor`.
- Reduced-motion consistente nos componentes de motion.

## Tokens e documentação

- Atualizar `docs/ai/DESIGN_SYSTEM.md` (seção de grade/assinatura) e adicionar **DEC-015** registrando a virada: de "malha exposta onipresente" para "fotografia-líder + filetes horizontais contidos + moldura de cantos". Revisa DEC-005 (mantém o espírito editorial/arquitetônico; muda o mecanismo da assinatura).

## Fora de escopo

- Paleta de cores (mantém Drafting).
- Conteúdo, textos, dados de projeto.
- Stack, dependências, infra.
- Refactors não relacionados.

## Critérios de sucesso

1. Nenhuma linha vertical persistente em nenhuma página; zero crosshairs de interseção ambientes.
2. Filetes horizontais contidos na margem do conteúdo (com respiro lateral), nunca de borda a borda.
3. Fotografia visivelmente maior e protagonista; marcas de canto presentes nas imagens.
4. Home abre em capa editorial (título à esquerda, foto alta à direita).
5. Projetos selecionados em arranjo variado (não 3 cards idênticos).
6. `tsc --noEmit` limpo; `next build` verde; a11y e paleta da sessão preservadas.
7. `DESIGN_SYSTEM.md` + DEC-015 atualizados.
