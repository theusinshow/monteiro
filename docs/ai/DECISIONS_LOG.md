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
