# Estúdio Monteiro — Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the noisy omnipresent hairline grid with a photography-led "monografia / prancha montada" system: no persistent vertical lines, no intersection crosshairs, no knockout; quiet horizontal rules contained within the content margin; editorial cover hero; bigger, varied photography.

**Architecture:** Remove the grid foundation first (GridField, intersection marks, knockout, grid CSS vars), keeping the dark "Drafting" palette and all session a11y work intact. Then redesign each page around larger photography and generous whitespace. Alignment stays disciplined via the existing `Container` band + CSS grid/gap, just no longer painted.

**Tech Stack:** Next.js (App Router) + TypeScript + Tailwind v4 (`@theme` in `app/globals.css`) + motion/react + Lenis. No unit-test runner — verification is `npx tsc --noEmit`, `npx next build`, and visual screenshots via Playwright.

**Verification convention (every task):**
- Type/build gate: `npx tsc --noEmit` then `npx next build` must be clean/green.
- Visual gate (pages): dev server on `localhost:3003` + a Playwright screenshot, eyeball against the spec.
- Commit after each task. Branch note: repo is on `master`; create a branch `redesign/photography-led` before Task 1.

---

### Task 0: Branch

- [ ] **Step 1: Create the work branch**

Run:
```bash
git checkout -b redesign/photography-led
```
Expected: switched to a new branch. (Working tree keeps the session's uncommitted theme/a11y changes — that is intended; they ship together.)

---

### Task 1: Remove the persistent vertical grid (GridField)

**Files:**
- Delete: `components/ui/GridField.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Delete the GridField component**

Run:
```bash
git rm components/ui/GridField.tsx
```

- [ ] **Step 2: Unmount it from the layout**

In `app/layout.tsx` remove the import line `import { GridField } from "@/components/ui/GridField";` and remove the `<GridField />` element inside `<SmoothScroll>`. Result of that JSX block:

```tsx
      <body>
        <SmoothScroll>
          <Header />
          <main className="relative z-10">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
```

- [ ] **Step 3: Type + build gate**

Run: `npx tsc --noEmit && npx next build`
Expected: clean. (Any remaining `--col` reference would error at build only if used in TS; CSS leftovers handled in Task 3.)

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "refactor: remove persistent vertical grid field"
```

---

### Task 2: Simplify Rule + drop intersection crosshairs

**Files:**
- Modify: `components/ui/Rule.tsx`
- Modify: `components/ui/Plus.tsx`
- Modify call sites that pass `marks`: `app/page.tsx`, `app/projetos/page.tsx`, `app/projetos/[slug]/page.tsx`, `app/estudio/page.tsx`, `app/contato/page.tsx`, `components/ui/Stats.tsx`, `components/layout/Header.tsx`, `components/projects/ProjectsView.tsx`

- [ ] **Step 1: Rewrite `Rule.tsx`** (remove `marks`; keep band inset so the line ends at the content margin)

```tsx
import { cn } from "@/lib/cn";

/**
 * Element-bound horizontal hairline, contained within the content band
 * (centered, capped at --grid-max, inset by --gutter) so it ends at the content
 * margin with clean side margins — never edge-to-edge. The only line system in
 * the redesign; reads as an intentional section divider.
 */
export function Rule({
  strong = false,
  className,
}: {
  strong?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      <div className="mx-auto w-full max-w-(--grid-max) px-(--gutter)">
        <span
          className={cn(
            "block h-px w-full",
            strong ? "bg-line-strong" : "bg-line",
          )}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Strip the column-mark exports from `Plus.tsx`**

Remove `ColMark`, `PCTS`, and `MarksAtColumns` entirely. Keep only `Plus` and `CornerMarks` (lines 1–48 of the current file). The file ends after `CornerMarks`. Leave `Plus`/`CornerMarks` unchanged.

- [ ] **Step 3: Replace every `<Rule marks />` with `<Rule />`**

Run to find them:
```bash
grep -rn "Rule marks" app components
```
Edit each hit, changing `<Rule marks />` to `<Rule />`. (Pages are restructured later, but do the mechanical swap now so the build passes.)

- [ ] **Step 4: Type + build gate**

Run: `npx tsc --noEmit && npx next build`
Expected: clean. No remaining import of `MarksAtColumns`.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor: contain rules to content margin, drop intersection crosshairs"
```

---

### Task 3: Clean up grid CSS (knockout, grid vars, label)

**Files:**
- Modify: `app/globals.css`
- Modify: `components/ui/Container.tsx` (comment only)

- [ ] **Step 1: Remove the grid column vars from `@theme`**

In `app/globals.css`, delete these lines from the `@theme` block:
```css
  /* Persistent grid — single source of truth for the global vertical field */
  --grid-max: 90rem; /* == --container-max */
  --grid-cols: 4; /* mobile default; stepped up in @layer base */
  --cell-pad: clamp(1rem, 0.5rem + 1.5vw, 2rem);
```
Replace with (keep `--grid-max` — still used as the band width by Container/Rule; keep `--cell-pad` — used as padding token; drop only `--grid-cols`):
```css
  /* Content band width + reusable cell padding (grid is no longer painted) */
  --grid-max: 90rem; /* == --container-max */
  --cell-pad: clamp(1rem, 0.5rem + 1.5vw, 2rem);
```

- [ ] **Step 2: Remove the `--col` machinery and column breakpoints in `@layer base`**

Delete this whole block from `@layer base :root` and the two media queries that step `--grid-cols`:
```css
  :root {
    color-scheme: dark;
    /* width of one column of the content band ... */
    --col: calc(
      (min(100vw, var(--grid-max)) - 2 * var(--gutter)) / var(--grid-cols)
    );
  }
  @media (min-width: 768px) {
    :root {
      --grid-cols: 6;
    }
  }
  @media (min-width: 1024px) {
    :root {
      --grid-cols: 8;
    }
  }
```
Replace with just:
```css
  :root {
    color-scheme: dark;
  }
```

- [ ] **Step 3: Delete the `.knockout` component class**

Remove the entire `.knockout { ... }` rule (the block with `box-decoration-break`).

- [ ] **Step 4: Simplify `.label` (drop the paper knockout, keep typography)**

Replace the `.label` rule with:
```css
  .label {
    display: inline-block;
    font-family: var(--font-sans);
    font-size: 0.6875rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--color-graphite);
  }
```

- [ ] **Step 5: Update the `Container.tsx` doc comment**

Change the comment to not reference GridField:
```tsx
/**
 * Centered content band. Capped at --grid-max and inset by --gutter so its edges
 * are the clean outer margins. Section rules (see Rule) share this band width, so
 * lines and content end at the same margin.
 */
```

- [ ] **Step 6: Type + build gate**

Run: `npx tsc --noEmit && npx next build`
Expected: clean. CSS may still be referenced by `knockout` classNames in JSX — those become no-ops now and are removed in Task 4.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "refactor: drop knockout + grid CSS vars, keep palette and band"
```

---

### Task 4: Remove `knockout` className from shared components

**Files (shared, non-page):**
- `components/layout/Header.tsx`, `components/layout/Footer.tsx`, `components/ui/FilterTabs.tsx`, `components/ui/Stats.tsx`, `components/ui/Cell.tsx`, `components/ui/Figure.tsx`

(Page files get `knockout` removed during their redesign in Tasks 5–9.)

- [ ] **Step 1: Find shared-component usages**

Run:
```bash
grep -rln "knockout" components
```

- [ ] **Step 2: Delete the `knockout` token from each className**

In every hit, remove the word `knockout` (and a single adjoining space) from the `className` string, leaving the other classes intact. Example — `Header.tsx` logo:
`className="knockout font-display text-xl tracking-tight md:text-2xl"` → `className="font-display text-xl tracking-tight md:text-2xl"`.

Do the same in `Footer.tsx` (`li`/`span` knockouts), `FilterTabs.tsx` (button), `Stats.tsx` (value + desc), `Cell.tsx`, and `Figure.tsx` placeholder `span` (`className="label bg-transparent"` → `className="label"`).

- [ ] **Step 3: Type + build gate**

Run: `npx tsc --noEmit && npx next build`
Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "refactor: remove knockout class from shared components"
```

---

### Task 5: Home — editorial cover hero + varied selected projects

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace the eyebrow + hero + intro block with the editorial cover**

Keep the existing imports plus the `pad`/`selected`/`meta` setup. Replace the top of the returned JSX (from the first `<Rule marks />` down through the meta strip) with the cover hero: headline + intro + CTAs on the left, a tall `Figure` (3/4) of the first project on the right. Remove all `knockout` classes here. Code:

```tsx
  const cover = selected[0];

  return (
    <div className="pb-px">
      <Rule />
      <Container className="flex items-center justify-between py-3">
        <span className="label">
          <span className="text-accent">00 /</span>
          <span className="ml-2">Estúdio Monteiro</span>
        </span>
        <span className="label">{site.location}</span>
      </Container>
      <Rule />

      {/* Editorial cover: argument left, photograph right */}
      <Container className="grid items-center gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-24">
        <div>
          <Reveal>
            <h1 className="max-w-[12ch] font-display text-(length:--text-display) leading-(--text-display--line-height) tracking-(--text-display--letter-spacing)">
              Espaços que <em className="italic text-accent">permanecem</em>.
            </h1>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-8 max-w-md text-lg text-graphite">
              Estúdio Monteiro projeta residências de alto padrão e ambientes
              corporativos. O desenho como linguagem; a obra como argumento.
            </p>
          </Reveal>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/projetos" variant="line">Ver projetos</ButtonLink>
            <ButtonLink href="/contato" variant="ghost">Contato</ButtonLink>
          </div>
        </div>
        <MaskReveal>
          <Link href={`/projetos/${cover.slug}`} className="group block">
            <Figure
              src={cover.cover}
              alt={`${cover.title}, ${cover.location}`}
              ratio="3/4"
              priority
            />
            <div className="mt-4 flex items-baseline justify-between">
              <h2 className="font-display text-xl leading-none">{cover.title}</h2>
              <span className="label tabular">{cover.year}</span>
            </div>
          </Link>
        </MaskReveal>
      </Container>
```

- [ ] **Step 2: Convert the meta strip to a calmer inline `<dl>` (no grid columns)**

Right after the hero `Container`, add a contained meta row. Replace the previous grid-anchored meta with:

```tsx
      <Rule />
      <Container className="py-6">
        <dl className="flex flex-wrap gap-x-12 gap-y-4">
          {meta.map(([label, value], i) => (
            <div key={label} className="min-w-[8rem]">
              <dt className="label">
                <span className="text-accent">{pad(i + 1)} /</span>
                <span className="ml-2">{label}</span>
              </dt>
              <dd className="tabular mt-2 text-lg">{value}</dd>
            </div>
          ))}
        </dl>
      </Container>
```

- [ ] **Step 3: Rebuild "Projetos selecionados" as a varied editorial layout**

Replace the selected-projects section. One large feature (16/9) then two offset (4/5). The feature is `selected[1]` (since `selected[0]` is the cover); show three total below: indices 1,2 and reuse 0 only as cover. Use `projects.slice(1, 4)` for the body so the cover isn't repeated. Code:

```tsx
  const body = projects.slice(1, 4); // [feature, twoA, twoB]
```
(declare near `cover`), then the section:

```tsx
      <Rule />
      <Container className="flex items-center justify-between py-3">
        <h2 className="label">Projetos / Selecionados</h2>
        <span className="label tabular">{pad(projects.length)} no total</span>
      </Container>
      <Rule />
      <Container className="py-16 md:py-24">
        <ul className="space-y-16 md:space-y-24">
          <li>
            <Link href={`/projetos/${body[0].slug}`} className="group block">
              <MaskReveal>
                <Figure src={body[0].cover} alt={`${body[0].title}, ${body[0].location}`} ratio="16/9" />
              </MaskReveal>
              <div className="mt-5 flex items-baseline justify-between">
                <h3 className="font-display text-2xl leading-none">{body[0].title}</h3>
                <span className="label tabular">{body[0].location} · {body[0].year}</span>
              </div>
            </Link>
          </li>
          <li className="grid gap-12 md:grid-cols-2 md:gap-8">
            {body.slice(1).map((project, i) => (
              <div key={project.slug} className={i === 1 ? "md:mt-16" : ""}>
                <Link href={`/projetos/${project.slug}`} className="group block">
                  <MaskReveal>
                    <Figure src={project.cover} alt={`${project.title}, ${project.location}`} ratio="4/5" />
                  </MaskReveal>
                  <div className="mt-4 flex items-baseline justify-between">
                    <h3 className="font-display text-xl leading-none">{project.title}</h3>
                    <span className="label tabular">{project.year}</span>
                  </div>
                </Link>
              </div>
            ))}
          </li>
        </ul>
      </Container>
```

- [ ] **Step 4: Manifesto + contact band — remove knockout, add air**

In the manifesto `<blockquote>` and the contact band, delete `knockout` classes and bump section padding to `py-28 md:py-40` (manifesto) and `py-16` (contact band stays, drop grid-cols anchoring → simple `flex flex-col gap-8 md:flex-row md:items-center md:justify-between`). Keep the existing copy and the `ButtonLink` to `/contato`.

- [ ] **Step 5: Visual + build gate**

Run: `npx tsc --noEmit && npx next build`. Then with dev server up, screenshot `/` (desktop 1440 + mobile 390) and confirm: cover hero reads, no vertical lines, rules end at the margin, projects are varied with air.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(home): editorial cover hero + varied photography-led projects"
```

---

### Task 6: Projects index — larger, varied grid

**Files:**
- Modify: `app/projetos/page.tsx`, `components/projects/ProjectsView.tsx`

- [ ] **Step 1: Open the index with more air**

In `app/projetos/page.tsx`, remove `knockout` classes, drop the `grid-cols-4 md:grid-cols-6 lg:grid-cols-8` wrapper around the heading (use a plain `max-w` block), and bump intro padding to `py-20 md:py-28`.

- [ ] **Step 2: Restyle `ProjectsView` cards larger with a varied rhythm**

In `components/projects/ProjectsView.tsx`: keep the filter strip, `<ul>`/`<li>` semantics, the `sr-only` h2, and `<h3>` titles. Change the grid to a 2-up with a vertical offset on odd items and bigger images. Replace the grid `<ul>` className and add the offset:

```tsx
        <ul className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-24">
          {visible.map((project, i) => (
            <li key={project.slug} className={i % 2 === 1 ? "md:mt-16" : ""}>
```
Keep the inner `<Link>`, `MaskReveal`, `Figure` (ratio `4/5`), the caption hairline, `<h3>`, and location. Remove `knockout` classes. Keep `priority={i < 3}`.

- [ ] **Step 3: Visual + build gate**

Run: `npx tsc --noEmit && npx next build`. Screenshot `/projetos`; confirm larger varied cards, filter still works, no grid lines.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(projetos): larger varied photography grid"
```

---

### Task 7: Project detail — bigger cover, framed gallery, air

**Files:**
- Modify: `app/projetos/[slug]/page.tsx`

- [ ] **Step 1: Enlarge the cover and add air**

Keep the title block, the `<dl>` technical sheet + `sr-only` h2, the `<ul>` gallery + `sr-only` h2, and the next-project link (all from the a11y pass). Remove `knockout` classes throughout. Bump the title `Container` to `py-16 md:py-24` and the cover `Container` to `py-12 md:py-20`. Cover stays contained (no full-bleed) at `ratio="16/9"`, `sizes="100vw"`, `priority`.

- [ ] **Step 2: Relax the gallery rhythm**

In the gallery `<ul>` keep `grid-cols-1 md:grid-cols-12` and the `i % 3 === 0 ? "md:col-span-12" : "md:col-span-6"` rule, but increase the gap to `gap-8 md:gap-10` and the section padding to `py-16 md:py-24` for more breathing room. Keep `Figure` ratios.

- [ ] **Step 3: Visual + build gate**

Run: `npx tsc --noEmit && npx next build`. Screenshot `/projetos/casa-mirante`; confirm the photo dominates on the dark ground, framed with corner marks, rules contained, generous spacing.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(projeto): photography-led detail with more air"
```

---

### Task 8: Estúdio — remove grid anchoring, add air

**Files:**
- Modify: `app/estudio/page.tsx`

- [ ] **Step 1: Replace grid-column anchoring with simple bands**

Remove `knockout` classes. Change the intro `grid-cols-4 md:grid-cols-6 lg:grid-cols-8` wrapper to `grid gap-12 md:grid-cols-2 md:gap-16`, keeping the `<dl>` ficha (already converted) on the right. Keep the `Stats` band, the Abordagem `<h2>` + `<h3>` items, and the CTA. Bump section paddings up one step (e.g. `py-12` → `py-16`, `py-16` → `py-24`).

- [ ] **Step 2: Visual + build gate**

Run: `npx tsc --noEmit && npx next build`. Screenshot `/estudio`; confirm headings intact, no grid lines, comfortable spacing.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(estudio): remove grid anchoring, add whitespace"
```

---

### Task 9: Contato — remove knockout, add air

**Files:**
- Modify: `app/contato/page.tsx`

- [ ] **Step 1: De-grid and breathe**

Remove `knockout` classes. Keep the two `sr-only` h2s, the `<dl>` contact details, and the form (with its `aria-live` states). Change the outer `grid-cols-4 md:grid-cols-6 lg:grid-cols-8` to `grid gap-12 md:grid-cols-2 md:gap-16` (left = details, right = form with `md:border-l md:border-line md:pl-16`). Bump paddings to `py-16 md:py-24`.

- [ ] **Step 2: Visual + build gate**

Run: `npx tsc --noEmit && npx next build`. Screenshot `/contato`; confirm two clean columns, form labels/underlines intact, no grid lines.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(contato): de-grid, two-column with air"
```

---

### Task 10: Update design docs (DESIGN_SYSTEM + DEC-015)

**Files:**
- Modify: `docs/ai/DESIGN_SYSTEM.md`, `docs/ai/DECISIONS_LOG.md`

- [ ] **Step 1: Update the signature description in `DESIGN_SYSTEM.md`**

In the "Visual Direction" and "Containers and Grid" sections, replace the "exposed hairline grid as signature" language with: photography-led; the only line system is quiet horizontal rules contained within the content margin; photography carries identity via larger plates with corner registration marks; alignment stays disciplined via the content band but is no longer painted.

- [ ] **Step 2: Add DEC-015**

Append to `docs/ai/DECISIONS_LOG.md`:
```markdown
## DEC-015 — Signature shift: photography-led, quiet contained rules
**Status:** Approved (developer request, after visual brainstorming)
**Decision:** Retire the omnipresent exposed hairline grid (persistent vertical field, intersection crosshairs, knockout masking) — it read as visual noise. New signature: photography leads (larger plates, corner registration marks), the only line system is quiet horizontal rules contained within the content margin (never edge-to-edge), and the home opens with an editorial cover (argument left, tall photograph right). Alignment stays disciplined via the content band but is no longer painted. Dark "Drafting" palette (DEC-014) unchanged. Revises DEC-005 (keeps the editorial/architectural spirit; changes the signature mechanism); supersedes the grid-field portions of the design system.
**Impact:** `app/globals.css`, `components/ui/{GridField(removed),Rule,Plus,Container}.tsx`, `app/layout.tsx`, all five pages, `DESIGN_SYSTEM.md`.
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "docs: record DEC-015 photography-led signature shift"
```

---

### Task 11: Final verification sweep

- [ ] **Step 1: No leftovers**

Run:
```bash
grep -rn "knockout\|GridField\|MarksAtColumns\|--col\b\|grid-cols-4\|--grid-cols" app components
```
Expected: no results except intentional Tailwind grid utilities you kept (e.g. `md:grid-cols-2`, `md:grid-cols-12`). Zero `knockout`, zero `GridField`, zero `--grid-cols`/`--col`.

- [ ] **Step 2: Full gate**

Run: `npx tsc --noEmit && npx next build`
Expected: clean + 14 routes.

- [ ] **Step 3: Visual pass on all pages**

With dev server up, screenshot `/`, `/projetos`, `/projetos/casa-mirante`, `/estudio`, `/contato` at desktop + mobile. Confirm against spec success criteria: no vertical lines; no ambient crosshairs; rules contained to the margin; photography larger/leading; home is an editorial cover; projects varied; a11y + palette preserved.

- [ ] **Step 4: Final commit (if any cleanup)**

```bash
git add -A
git commit -m "chore: final redesign verification cleanup"
```

---

## Self-Review notes

- **Spec coverage:** grid removal (T1–T3), crosshairs (T2), knockout (T3/T4 + pages), contained rules (T2), photography-led + corner marks (T5–T7 via `Figure`), editorial cover hero (T5), varied projects (T5/T6), per-page air (T5–T9), palette preserved (untouched), a11y preserved (kept explicitly in each page task), docs/DEC-015 (T10). All spec sections map to a task.
- **Out of scope kept out:** palette, content, stack — untouched.
- **Naming consistency:** `Rule` (no `marks` prop after T2), `Plus`/`CornerMarks` retained, `MarksAtColumns` removed everywhere, `--cell-pad`/`--grid-max` retained, `--grid-cols`/`--col`/`.knockout` removed.
