# Persistent Global Grid — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the per-section bordered-box grid with one persistent global vertical grid that the whole site aligns to, with element-bound horizontals and crosshairs, matching the approved spec (`docs/superpowers/specs/2026-06-13-persistent-grid-design.md`).

**Architecture:** A single fixed, full-height **GridField** (responsive 4/6/8 vertical hairlines) is mounted once at the app root inside a centered band capped at `--container-max`. All layout uses the **same** band + column count via a refactored `Container`/grid context, so content snaps to the field lines. Horizontal hairlines come only from element primitives (`Rule`, `Frame`, buttons, sheet rows), each emitting crosshairs (`Plus`) where it crosses a column line. Photography stays clean inside a traced margin frame.

**Tech Stack:** Next.js 16 (App Router) · React 19 · Tailwind v4 (CSS-first `@theme`) · Motion · Lenis. No unit-test runner in repo → verification is `tsc --noEmit`, `next build`, and Playwright screenshot review (light + `prefers-reduced-motion`), console-error checks.

**Verification harness (reused every task):** dev server runs on `http://localhost:3001`. Screenshot script: `C:\Users\Matheus\AppData\Local\Temp\shot_monteiro.py` (routes `/`, `/projetos`, `/projetos/casa-mirante`, `/estudio`, `/contato`; scroll-through to trigger lazy/reveal; logs console errors). Each visual task: rebuild not required in dev (HMR), but run `npx tsc --noEmit` before commit and re-screenshot.

---

## Grid math (single source of truth)

- **Band:** centered, `width: min(100vw, var(--grid-max))`. `--grid-max = --container-max` (90rem/1440px).
- **Columns:** `--grid-cols` = 4 (`<768px`), 6 (`768–1023px`), 8 (`≥1024px`). Column width = `band / cols`.
- **Lines:** `cols + 1` vertical hairlines at `i * (100/cols)%` of the band, `i = 0..cols`. Outermost lines sit on the band edges (full-bleed within the band).
- **Content inset:** text/blocks get internal padding (`--cell-pad`) for legibility but their *edges* land on column boundaries.
- A CSS var `--col` = `calc(min(100vw, var(--grid-max)) / var(--grid-cols))` is exposed for any element that needs to reason in column units.

---

## File structure

- `app/globals.css` — add grid tokens (`--grid-max`, `--grid-cols` via media queries, `--col`, `--cell-pad`).
- `components/ui/GridField.tsx` (new) — global persistent vertical field. **Replaces** `BlueprintFrame`.
- `components/ui/BlueprintFrame.tsx` — **delete** (folded into GridField).
- `components/ui/Plus.tsx` — extend with a `MarksAtColumns` helper that places `+` at every interior column line of a band-width row.
- `components/ui/Rule.tsx` (new) — element-bound horizontal hairline; optional crosshairs at column intersections.
- `components/ui/Container.tsx` — refactor to the band + expose grid context (`cols`).
- `components/ui/Cell.tsx` — refactor: `CellGroup`/`Cell` stop drawing box borders; become grid placement on the global columns using `Rule` for edges.
- `components/ui/Figure.tsx` — add traced margin frame (inner hairline + paper margin).
- `components/layout/Header.tsx`, `components/layout/Footer.tsx` — align to band/columns; edges via `Rule`.
- `app/layout.tsx` — mount `GridField` instead of `BlueprintFrame`.
- `app/page.tsx`, `app/projetos/page.tsx`, `components/projects/ProjectsView.tsx`, `app/projetos/[slug]/page.tsx`, `app/estudio/page.tsx`, `app/contato/page.tsx` — migrate sections onto the grid.

---

## Task 1: Grid tokens

**Files:** Modify `app/globals.css` (inside `@theme` and `@layer base`).

- [ ] **Step 1: Add tokens.** In `@theme` add:

```css
  /* Persistent grid */
  --grid-max: 90rem;        /* == --container-max */
  --grid-cols: 4;           /* mobile default; overridden below */
  --cell-pad: clamp(1rem, 0.5rem + 1.5vw, 2rem);
```

In `@layer base`, after `:root`, add the responsive column count + derived column width:

```css
  :root { --col: calc(min(100vw, var(--grid-max)) / var(--grid-cols)); }
  @media (min-width: 768px)  { :root { --grid-cols: 6; } }
  @media (min-width: 1024px) { :root { --grid-cols: 8; } }
```

- [ ] **Step 2: Verify.** Run `npx tsc --noEmit` (Expected: clean — CSS only, no TS impact). Visually unaffected yet.
- [ ] **Step 3: Commit.**

```bash
git add app/globals.css
git commit -m "feat(grid): add persistent grid tokens"
```

---

## Task 2: GridField (replace BlueprintFrame)

**Files:** Create `components/ui/GridField.tsx`; modify `app/layout.tsx`; delete `components/ui/BlueprintFrame.tsx`.

- [ ] **Step 1: Create `GridField.tsx`.** Fixed, full-height, centered band; `--grid-cols + 1` vertical lines via a repeating gradient sized to one column; outer lines on band edges. `aria-hidden`, `pointer-events-none`, `z-0`.

```tsx
/**
 * The persistent global grid: a fixed, full-height centered band of vertical
 * hairlines (responsive 4/6/8 columns). Mounted once at the app root; identical
 * on every route. Structure, never decoration — sits behind all content.
 */
export function GridField() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 flex justify-center"
    >
      <div
        className="relative h-full w-full"
        style={{
          maxWidth: "var(--grid-max)",
          // vertical hairlines every (100/cols)% — includes left edge; right
          // edge line is added by the inset ring below to avoid a doubled line.
          backgroundImage:
            "repeating-linear-gradient(to right, var(--color-line) 0, var(--color-line) 1px, transparent 1px, transparent var(--col))",
        }}
      >
        {/* right edge line (the repeat starts at left edge) */}
        <span className="absolute inset-y-0 right-0 w-px bg-line" />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Swap in layout.** In `app/layout.tsx`: replace the `BlueprintFrame` import with `GridField` and the `<BlueprintFrame />` element with `<GridField />`.
- [ ] **Step 3: Delete** `components/ui/BlueprintFrame.tsx`.
- [ ] **Step 4: Verify.** `npx tsc --noEmit` (Expected: clean). Screenshot `/` at 1440 and 800 and 375 widths. Expected: continuous vertical lines spanning full height — 8 columns ≥1024px, 6 at 768–1023, 4 at <768. Confirm lines run behind content unbroken on scroll.
- [ ] **Step 5: Commit.**

```bash
git add components/ui/GridField.tsx app/layout.tsx
git rm components/ui/BlueprintFrame.tsx
git commit -m "feat(grid): persistent GridField replaces BlueprintFrame"
```

---

## Task 3: Rule primitive (element-bound horizontals + crosshairs)

**Files:** Modify `components/ui/Plus.tsx`; create `components/ui/Rule.tsx`.

- [ ] **Step 1: Add `MarksAtColumns` to `Plus.tsx`.** Renders a `+` at each interior column boundary across a band-width, full-bleed row. Reuses `Plus` visuals.

```tsx
/**
 * Crosshairs at every interior column boundary of the global grid, centered on
 * the band. Place inside a relatively-positioned, band-width row (e.g. a Rule).
 */
export function MarksAtColumns({ className }: { className?: string }) {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      <span
        className="mx-auto block h-full"
        style={{ maxWidth: "var(--grid-max)", position: "relative" }}
      >
        {Array.from({ length: 11 }).map((_, i) => (
          // up to 8 cols → 7 interior marks; extras sit off-grid and are hidden
          // by overflow when fewer columns are active.
          <span
            key={i}
            className={cn("absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2", className)}
            style={{ left: `calc(var(--col) * ${i + 1})` }}
          >
            <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink/40" />
            <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-ink/40" />
          </span>
        ))}
      </span>
    </span>
  );
}
```

- [ ] **Step 2: Create `Rule.tsx`.** A horizontal hairline that is the edge of a section/element, full-bleed band width, with optional crosshairs.

```tsx
import { cn } from "@/lib/cn";
import { MarksAtColumns } from "@/components/ui/Plus";

/**
 * Element-bound horizontal hairline. Spans the grid band. Optional crosshairs
 * mark where it crosses the vertical column lines. There is no horizontal grid
 * field — horizontals exist only as element edges via this primitive.
 */
export function Rule({
  marks = false,
  strong = false,
  className,
}: {
  marks?: boolean;
  strong?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative h-px w-full", className)}>
      <span
        className={cn(
          "mx-auto block h-px w-full",
          strong ? "bg-line-strong" : "bg-line",
        )}
        style={{ maxWidth: "var(--grid-max)" }}
      />
      {marks && <MarksAtColumns />}
    </div>
  );
}
```

- [ ] **Step 3: Verify.** `npx tsc --noEmit` (clean). Add a throwaway `<Rule marks />` to `/` temporarily, screenshot, confirm crosshairs land exactly on the active column lines at 1440/800/375, then remove it.
- [ ] **Step 4: Commit.**

```bash
git add components/ui/Plus.tsx components/ui/Rule.tsx
git commit -m "feat(grid): Rule + column crosshairs primitives"
```

---

## Task 4: Container band + grid context

**Files:** Modify `components/ui/Container.tsx`.

- [ ] **Step 1: Refactor `Container`.** Keep the centered band (`max-w-[var(--grid-max)]`) but drop side gutters as outer padding (the grid band edges ARE the content edges now). Replace the `framed` rails (now handled by `GridField`) with a no-op/removed prop. Provide an `as` passthrough as today.

```tsx
import { cn } from "@/lib/cn";

type ContainerProps = {
  as?: "div" | "section" | "header" | "footer" | "main" | "article";
  children: React.ReactNode;
  className?: string;
};

/** Centered content band, aligned to the global GridField. */
export function Container({ as: Tag = "div", children, className }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[var(--grid-max)]", className)}>
      {children}
    </Tag>
  );
}
```

- [ ] **Step 2: Fix callers of removed `framed` prop.** Grep `framed` usage: `git grep -n "framed" -- '*.tsx'`. Remove the prop from any caller (none expected outside Container; if present, delete the attribute).
- [ ] **Step 3: Verify.** `npx tsc --noEmit` (Expected: clean; if a `framed` caller remains it errors → fix). Screenshot all routes; layout shifts toward band edges are expected and fine. Header/Footer/pages still readable (polish in later tasks).
- [ ] **Step 4: Commit.**

```bash
git add components/ui/Container.tsx
git commit -m "refactor(grid): Container becomes the grid band"
```

---

## Task 5: Cell / CellGroup → grid placement (no box borders)

**Files:** Modify `components/ui/Cell.tsx`.

- [ ] **Step 1: Refactor.** `CellGroup` becomes a CSS grid using the active column count (no `bg-line`/`border` box). `Cell` drops its `border`/`bg-paper` box; its header divider and any separators become `Rule`s; corner `marks` still available via existing `CornerMarks`. Children align to columns through `span` utilities that map to the grid.

```tsx
import { cn } from "@/lib/cn";
import { CornerMarks } from "@/components/ui/Plus";
import { Rule } from "@/components/ui/Rule";

/** A run of cells laid out on the global column grid (no boxed border). */
export function CellGroup({
  children,
  className,
  cols = "grid-cols-4 md:grid-cols-6 lg:grid-cols-8",
}: {
  children: React.ReactNode;
  className?: string;
  cols?: string;
}) {
  return <div className={cn("grid", cols, className)}>{children}</div>;
}

type CellProps = {
  children?: React.ReactNode;
  className?: string;
  index?: string;
  annotation?: string;
  label?: string;
  span?: string;
  marks?: boolean;
};

/** A content block placed on the grid. Header sits above an element Rule. */
export function Cell({
  children, className, index, annotation, label, span, marks = false,
}: CellProps) {
  const hasHeader = index || annotation || label;
  return (
    <div className={cn("relative", span)}>
      {marks && <CornerMarks />}
      {hasHeader && (
        <>
          <div className="flex items-center justify-between px-[var(--cell-pad)] py-3">
            <span className="label">
              {index && <span className="text-ink">{index} /</span>}
              {label && <span className={cn(index && "ml-2")}>{label}</span>}
            </span>
            {annotation && <span className="label tabular">{annotation}</span>}
          </div>
          <Rule />
        </>
      )}
      {children && <div className={cn("p-[var(--cell-pad)]", className)}>{children}</div>}
    </div>
  );
}
```

- [ ] **Step 2: Verify.** `npx tsc --noEmit` (clean). Screenshot `/` and `/projetos`. Expect: section content aligned to columns, headers separated by element Rules, no boxed borders. Some vertical rhythm will look raw until pages are migrated (Task 7).
- [ ] **Step 3: Commit.**

```bash
git add components/ui/Cell.tsx
git commit -m "refactor(grid): Cell/CellGroup place on global grid, drop box borders"
```

---

## Task 6: Figure traced margin frame

**Files:** Modify `components/ui/Figure.tsx`.

- [ ] **Step 1: Wrap the image in a traced margin.** Add a paper margin + inner hairline border around the media; keep aspect-ratio, `next/image fill`, and the neutral placeholder unchanged.

```tsx
// inside Figure return: wrap existing <figure> contents
//   <figure ... style={{aspectRatio}}>   ← keep
//     <div className="absolute inset-0 p-[clamp(6px,0.6vw,12px)]">
//       <div className="relative h-full w-full border border-line overflow-hidden bg-paper-deep">
//         {src ? <Image .../> : <placeholder/>}
//       </div>
//     </div>
//   </figure>
```

Concretely, change the `figure` body so the `Image`/placeholder live inside `div.p-[...] > div.border.border-line.overflow-hidden`. Move `overflow-hidden bg-paper-deep` from `figure` to the inner div; `figure` keeps only `relative` + `aspectRatio`.

- [ ] **Step 2: Verify.** `npx tsc --noEmit` (clean). Screenshot `/projetos/casa-mirante`. Expect: each photo sits inside a thin paper margin with a hairline tracing its border; grid lines stop at the frame; no CLS.
- [ ] **Step 3: Commit.**

```bash
git add components/ui/Figure.tsx
git commit -m "feat(grid): traced margin frame around photography"
```

---

## Task 7: Migrate pages section-by-section

**Files:** Modify `app/page.tsx`, `app/projetos/page.tsx`, `components/projects/ProjectsView.tsx`, `app/projetos/[slug]/page.tsx`, `app/estudio/page.tsx`, `app/contato/page.tsx`.

For EACH page, do one sub-commit. Pattern per section:
- Replace boxed `CellGroup`/`-mt-px` stacking with `Container` + grid placement on `grid-cols-4 md:grid-cols-6 lg:grid-cols-8`.
- Section boundaries use `<Rule marks />` (top) and `<Rule />` (bottom) — horizontals only where a section/element needs an edge.
- Column placements: headlines span left columns, media spans right columns (e.g. home hero text `lg:col-span-4`, hero/feature media `lg:col-span-4`), so edges land on lines.
- Remove the old contiguous-border look (`border border-line bg-line`).

- [ ] **Step 1: Home (`app/page.tsx`).** Hero (text cols 1–4, optional media 5–8), meta strip as 4/8 cells split by `Rule`, selected-projects row (3 covers) aligned to columns with framed figures, manifesto full-band between two `Rule`s, contact block with element-bound button outlines. Verify (screenshot `/`, scroll-through). Commit `feat(grid): migrate home to global grid`.
- [ ] **Step 2: Projects index (`app/projetos/page.tsx` + `components/projects/ProjectsView.tsx`).** Intro block, filter tabs row on a `Rule`, 6 covers on `lg:grid-cols-8` (e.g. each card spans ~2–3 cols, 3 per row) with framed figures and `Rule` separators. Verify (screenshot `/projetos`). Commit `feat(grid): migrate projects index to global grid`.
- [ ] **Step 3: Project detail (`app/projetos/[slug]/page.tsx`).** Title block, cover (framed) spanning band, technical sheet as columns separated by vertical alignment + a `Rule` per row, summary, gallery on the grid (keep 3/2 + 4/5 ratios), next-project row on a `Rule`. Verify (screenshot `/projetos/casa-mirante`). Commit `feat(grid): migrate project detail to global grid`.
- [ ] **Step 4: Estudio (`app/estudio/page.tsx`).** Intro (text cols 1–4 / portrait frame cols 5–8), approach as 3 cells split by `Rule`s, CTA. Verify (screenshot `/estudio`). Commit `feat(grid): migrate estudio to global grid`.
- [ ] **Step 5: Contato (`app/contato/page.tsx`).** Two-column layout on the grid (info cols 1–4, form cols 5–8), fields underlined by element `Rule`s, submit button outlined. Verify (screenshot `/contato`). Commit `feat(grid): migrate contato to global grid`.

---

## Task 8: Header & Footer alignment

**Files:** Modify `components/layout/Header.tsx`, `components/layout/Footer.tsx`.

- [ ] **Step 1: Header.** Keep sticky; bottom edge becomes `<Rule />` (with `marks` optional) so the header baseline reads as a grid horizontal. Logo aligns to column 1, nav to the right columns. Verify screenshot `/` top.
- [ ] **Step 2: Footer.** Replace `border-t`/`border-line` section borders with `Rule`s; align the index columns to the grid. Verify screenshot `/` bottom.
- [ ] **Step 3: Commit.**

```bash
git add components/layout/Header.tsx components/layout/Footer.tsx
git commit -m "feat(grid): align header and footer to global grid"
```

---

## Task 9: Motion — grid draw-in + crosshair fade

**Files:** Create `components/motion/GridFieldMotion.tsx` (or extend `GridField` to a client component); reuse `DrawHairline` semantics for crosshairs.

- [ ] **Step 1: First-load draw-in.** Make `GridField` (or a thin client wrapper) animate vertical lines from `scaleY: 0` (origin top) to `1` once on mount, staggered subtly; gate on hydration + `useReducedMotion` (instant final state when reduced) — same hydration-safe pattern as `app/template.tsx`.
- [ ] **Step 2: Crosshair fade.** `MarksAtColumns`/`Rule marks` fade/scale in with their section reveal; reduced-motion → instant.
- [ ] **Step 3: Verify.** Screenshot `/` (normal) shows final grid. Run the reduced-motion + hydration check (`verify_hydration.py` pattern): 0 hydration warnings, 0 console errors. Confirm grid fully visible under `reduced_motion=reduce`.
- [ ] **Step 4: Commit.**

```bash
git add components/ui/GridField.tsx components/motion/GridFieldMotion.tsx
git commit -m "feat(grid): subtle grid draw-in, reduced-motion safe"
```

---

## Task 10: QA gate

- [ ] **Step 1:** `npx tsc --noEmit` → clean.
- [ ] **Step 2:** `npm run build` → green; all routes prerender; no errors/warnings beyond known.
- [ ] **Step 3:** Playwright screenshots all 5 routes at 1440 / 800 / 375, normal + `reduced_motion`. Confirm: vertical grid continuous & identical across routes; content aligns to lines; no horizontal line without an element; photos clean inside traced margins; no overflow at any width; 0 console errors; 0 hydration warnings.
- [ ] **Step 4: Commit** any QA fixes. Final message: report changed files, decisions, risks, pending items, suggested next step (per project CLAUDE.md reporting format).

---

## Self-review notes

- **Spec coverage:** §4.1 field → T1/T2; §4.2 alignment → T1/T4/T5/T7; §4.3 horizontals → T3/T5/T7/T8; §4.4 crosshairs → T3; §4.5 photo → T6; §5 components → T2–T8; §6 a11y/perf → built into aria-hidden/pointer-events/fixed layer, checked T10; §7 motion → T9; §8 non-goals respected (no palette/content change); §10 success criteria → T10.
- **Open question #1 (full-bleed vs centered):** resolved → centered band capped at `--grid-max`, lines on band edges (full-bleed feel ≤1440px). Documented in "Grid math".
- **Open question #2 (draw-in in v1):** included → Task 9, subtle, reduced-motion safe.
- **Type consistency:** `GridField`, `Rule({marks,strong})`, `MarksAtColumns`, `CellGroup({cols})`, `Cell({span,marks,...})`, `Container({as})`, `--col`/`--grid-cols`/`--grid-max`/`--cell-pad` used consistently across tasks.
