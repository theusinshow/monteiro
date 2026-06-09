# Claude Project Instructions

Before making changes, read in order:

1. `/docs/ai/MASTER_CONTEXT.md`
2. `/docs/ai/PROJECT.md`
3. `/docs/ai/SITE_ARCHITECTURE.md`
4. `/docs/ai/PAGE_BLUEPRINTS.md`
5. `/docs/ai/DESIGN_SYSTEM.md`
6. `/docs/ai/MOTION_DIRECTION.md`
7. `/docs/ai/EXECUTION_PLAN.md`
8. `/docs/ai/QA_CHECKLIST.md`
9. `/docs/ai/DECISIONS_LOG.md`

## Project
Estúdio Monteiro — premium architecture portfolio. Authority-first, editorial, with an exposed 1px hairline grid as the signature system. Conversion via direct contact (WhatsApp/form). Content structured from scratch with placeholders.

## Stack
Next.js (App Router) + TypeScript + Tailwind CSS + GSAP/Framer Motion + Lenis. Deploy on Vercel.

## Rules
- Do not implement before reading the architecture docs.
- Do not change visual direction without checking the design system.
- Treat hairlines as structure, not decoration; keep photography the protagonist.
- Do not invent client facts (names, metrics, awards, testimonials) — use placeholders (`CONTENT_PENDING.md`).
- Preserve documented decisions unless the developer approves a change.
- Motion stays silent/precise, honors `prefers-reduced-motion`, and protects Core Web Vitals.
- Report changed files and pending issues after each phase.
