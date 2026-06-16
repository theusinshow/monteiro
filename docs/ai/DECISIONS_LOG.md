# Decisions Log

## DEC-001 — Initial project architecture workflow
**Status:** Approved
**Decision:** Use Coded by M — Site Architecture System as the pre-production workflow.
**Impact:** Discovery, architecture docs and AI execution plan.

## DEC-002 — Project type and mode
**Status:** Approved
**Decision:** Premium / authority website for Estúdio Monteiro (architecture studio), structured from scratch with placeholders.
**Impact:** Editorial, authority-first architecture; minimal copy; photography-led proof.

## DEC-003 — Business, audience and conversion
**Status:** Approved
**Decision:** Focus on high-end residential + commercial/corporate; primary audience is high-end private clients; primary conversion is direct contact (WhatsApp/form). Primary proof = the projects themselves.
**Impact:** Drives sitemap, journey, and quiet-CTA strategy.

## DEC-004 — Site structure
**Status:** Approved
**Decision:** Multi-page editorial: Home, Projects index, Project detail, Studio/About, Contact.
**Impact:** Routing and `SITE_ARCHITECTURE.md` / `PAGE_BLUEPRINTS.md`.

## DEC-005 — Visual direction (signature)
**Status:** Approved
**Decision:** Minimalist/editorial/architectural with an exposed 1px hairline grid as the signature system; near-monochrome palette; editorial serif+grotesque pairing; generous whitespace; no template feel.
**Impact:** `DESIGN_SYSTEM.md`.

## DEC-006 — Motion direction
**Status:** Approved
**Decision:** Silent, precise motion — hairlines draw themselves, image mask reveals, smooth scroll; honor reduced motion; protect Core Web Vitals.
**Impact:** `MOTION_DIRECTION.md`.

## DEC-007 — Technical stack
**Status:** Approved
**Decision:** Next.js (App Router) + TypeScript + Tailwind CSS + GSAP/Framer Motion + Lenis; content in MDX/JSON; deploy on Vercel.
**Impact:** `EXECUTION_PLAN.md`, tooling and dependencies.

## DEC-008 — Secondary accent color (editorial brick)
**Status:** Approved (developer request)
**Decision:** Introduce one committed secondary accent — editorial brick red `--color-accent: oklch(0.47 0.155 32)` (≈ `#9f2c19`) — to relieve the near-monochrome palette. Depth tuned to clear WCAG AA 4.5:1 on paper (measured 6.53:1) at label sizes. Used sparingly and semantically only: signature display italic, wordmark mark, index/folio numerals, active filter state, link-hover underline, focus ring, text selection. Refines (does not revoke) DEC-005: hairlines + photography still lead; accent stays well under 10% of surface.
**Impact:** `DESIGN_SYSTEM.md`, `app/globals.css`.

## DEC-014 — Theme inversion to dark "Drafting"
**Status:** Approved (developer request, after live palette study)
**Decision:** Move the whole site from the light warm-paper theme to a dark "Drafting" palette: the surface becomes a dark warm drafting board (`--color-paper: oklch(0.205 0.009 62)`) and the 1px hairline grid reads as a luminous line drawn on it; photography reads as lit plates on a gallery wall. Token role-names are kept and only their values are remapped (`paper` = ground, `ink` = light line/text), so no component changes were needed. Accent brick brightened to `oklch(0.66 0.15 40)` to keep AA 4.5:1 at folio sizes; hairline alpha nudged to 16%/30%; `color-scheme: dark`. Chosen over a light-default + dark-toggle option. Revises DEC-005's "near-monochrome" (still monochrome, now dark) and supersedes the light values in DEC-008 (accent intent unchanged, depth re-tuned for the dark ground).
**Impact:** `app/globals.css`, `DESIGN_SYSTEM.md`. Concept validated via `palette-study.html` (scratch artifact; safe to delete).

## DEC-015 — Signature shift: photography-led, quiet contained rules
**Status:** Approved (developer request, after visual brainstorming)
**Decision:** Retire the omnipresent exposed hairline grid (persistent vertical field, intersection crosshairs, knockout masking) — it read as visual noise. New signature: photography leads (larger plates, corner registration marks), the only line system is quiet horizontal rules contained within the content margin (never edge-to-edge), and the home opens with an editorial cover (statement left, tall photograph right). Selected projects use a varied editorial rhythm (one feature + offset pair) instead of identical cards. Alignment stays disciplined via the content band but is no longer painted. Dark "Drafting" palette (DEC-014) unchanged; all session accessibility work preserved. Revises DEC-005 (keeps the editorial/architectural spirit; changes the signature mechanism); supersedes the grid-field portions of the design system.
**Impact:** removed `components/ui/GridField.tsx`; `components/ui/{Rule,Plus,Container}.tsx`, `app/layout.tsx`, `app/globals.css` (dropped `.knockout`, `--grid-cols`, `--col`), all five pages, `DESIGN_SYSTEM.md`. Spec/plan in `docs/superpowers/`.
