# Spec — Persistent global grid system

**Project:** Estúdio Monteiro (premium architecture portfolio)
**Date:** 2026-06-13
**Status:** Approved direction (brainstorm) — pending implementation plan

## 1. Intent

Evolve the hairline grid from per-section bordered boxes (`CellGroup`) into a **single persistent global grid** that runs across the entire site, like an architect's drawing sheet. Reference: <https://eliankent.framer.website/>.

The signature shifts from "each section is a framed module" to "the whole site is drawn on one continuous structure."

## 2. Decisions locked during brainstorm

Confirmed visually with the user, one decision at a time:

1. **Model — full-bleed global grid (Option A).** Lines span the full viewport width and the full document height, edge to edge. Content floats on top and aligns to the lines. (Rejected: container-confined grid; rejected: keeping modular boxes.)
2. **Density — 8 columns** on desktop. Responsive step-down on narrower viewports.
3. **Photography — grid stops at the photo.** Images stay clean and protagonist; the grid lines live in the negative space around them. Each image carries a **thin margin with a hairline tracing its border** inside its cell. (Rejected: hairlines overlaying the photo.)
4. **Vertical = the only persistent field.** Vertical column lines are continuous and global.
5. **Horizontal = element-bound only.** There is **no** horizontal grid field. Horizontal hairlines appear *only* as part of a real element: section top/bottom dividers, photo frame, button outline, technical-sheet rows. This matches the reference exactly (nav baseline, card edges, PREV/NEXT row).
6. **Crosshairs (+)** render automatically where an element's horizontal edge crosses a vertical grid line.

Palette and type are unchanged — this is a structural/layout change, not a visual-language change. The site stays light (`--color-paper` / `--color-ink`), near-monochrome, photography-led.

## 3. Design principles

- **One grid, everywhere.** The vertical field is mounted once at the app root and is identical on every route. It does not reset or restart per section.
- **Lines are structure, never decoration.** Faint by default (`--color-line`, ~14% ink); they must never compete with photography.
- **Horizontals earn their place.** A horizontal hairline only exists because an element needs an edge. No free-floating horizontal rules.
- **Alignment is the point.** Headlines, images, buttons, and section markers snap to the 8-column rhythm so the grid reads as load-bearing, not ornamental.
- **Photography protected.** Images never get lines drawn over them; they sit within a traced margin frame.

## 4. The grid system

### 4.1 Vertical field (persistent, global)

- A single full-viewport-width layer (`100vw`), full document height, rendering the vertical column hairlines.
- **Responsive column count:**
  - mobile (`< 768px`): **4** columns
  - tablet (`768–1023px`): **6** columns
  - desktop (`≥ 1024px`): **8** columns
- Rendered as 1px hairlines in `--color-line`. `aria-hidden`, `pointer-events: none`, no layout cost (it is a background layer, not a flow element).
- The outermost columns act as page margins (as in the reference, where wide outer columns frame a denser center).

### 4.2 Layout alignment

All page content is laid out on the **same 8-column system** as the global field, so elements land on the lines rather than near them. The current `Container` (max-width `--container-max`, `--gutter`) and `Cell`/`CellGroup` primitives are refactored so their columns map onto the global grid columns. Sections place content into column ranges (e.g., headline in cols 1–4, hero image in cols 5–8).

> Implementation detail (how the full-bleed field and the centered content column reconcile on ultra-wide screens) is deferred to the implementation plan. Principle: content columns and grid columns share one definition so they cannot drift.

### 4.3 Horizontal rules (element-bound)

- Provided by a small primitive (working name `Rule`) that draws a horizontal hairline as the top or bottom edge of a section/element.
- Used for: section dividers, the technical-sheet row separators, button outlines, the photo frame.
- Never rendered as a repeating field.

### 4.4 Crosshairs

- Where an element's horizontal edge meets the vertical grid lines, a crosshair (+) is drawn at the intersection.
- Implemented as a marker the `Rule`/section primitive emits at the x-positions of the active grid columns (reuse/extend the existing `Plus` / `CornerMarks` primitive).
- Subtle, slightly stronger than the field lines (`--color-line-strong`) so intersections read as deliberate registration marks.

### 4.5 Photography treatment

- Image cell = outer hairline frame + inner margin (a few px of paper) + the image.
- The traced hairline border sits in the margin, separating the photo from the grid field.
- `Figure` keeps its fixed aspect ratio (no CLS) and the neutral placeholder behavior.

## 5. Components

| Component | Change |
|-----------|--------|
| `GridField` (new) | Global persistent vertical field; mounted in `app/layout.tsx`. Responsive column count. |
| `GridLines` (existing) | Superseded by / folded into `GridField`. Remove the per-cell usage in the hero. |
| `Container` | Refactor to define the shared 8-column system and align to `GridField`. |
| `Cell` / `CellGroup` | Refactor away from "bordered box per section" toward placement on the global grid; horizontals become element-bound `Rule`s, not box borders. |
| `Rule` (new) | Horizontal element edge + optional crosshairs at column intersections. |
| `Plus` / `CornerMarks` (existing) | Reused/extended for crosshairs at grid intersections. |
| `Figure` (existing) | Add the traced margin frame; keep ratio + placeholder. |

Page files (`/`, `/projetos`, `/projetos/[slug]`, `/estudio`, `/contato`) are migrated section by section onto the new system. Header and Footer align to the same grid.

## 6. Accessibility & performance

- Grid layers are `aria-hidden` and `pointer-events: none`.
- No Cumulative Layout Shift: the field is a non-flow background; image ratios are fixed.
- Hairlines are CSS (gradients/borders), GPU-cheap, no per-line DOM explosion.
- Respects `prefers-reduced-motion` (see Motion).

## 7. Motion

- Optional, quiet: vertical lines may **draw in** once on first load (scale/clip), and crosshairs may fade in with their section (reuse `DrawHairline` / existing reveals).
- Strictly silent and precise; fully disabled under `prefers-reduced-motion` (renders final state instantly). Must not regress Core Web Vitals.

## 8. Non-goals (YAGNI)

- No palette/theme change (stays light). No dark mode.
- No horizontal grid field.
- No new content, projects, or copy.
- No change to the photography set or the image pipeline.
- No interactive/draggable grid, no column toggles.

## 9. Open questions

- Exact reconciliation of full-bleed field vs centered content on screens wider than `--container-max` — resolve in the plan (two candidate techniques: field clamped to container width with margin columns, or field at `100vw` with content grid mapped to the central columns).
- Whether the first-load draw-in motion is included in v1 or deferred. Default: include, subtle.

## 10. Success criteria

- The same vertical grid is visibly continuous across all five routes and through scroll.
- Headlines, images, buttons, and section markers visibly align to the grid lines.
- No horizontal line exists without an element attached to it.
- Photography is clean (no lines over images) and framed by a traced margin.
- Light palette, type, content, and Core Web Vitals unchanged; build stays green; `prefers-reduced-motion` honored.
