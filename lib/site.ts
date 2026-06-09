/**
 * Estúdio Monteiro — site configuration.
 * Values marked PLACEHOLDER are pending real content (see /docs/ai/CONTENT_PENDING.md).
 */

export const site = {
  name: "Monteiro",
  // PLACEHOLDER — confirm signature/legal name (CNT-001)
  fullName: "Estúdio Monteiro",
  tagline: "Arquitetura autoral", // PLACEHOLDER (CNT-006)
  // PLACEHOLDER — real contact details (CNT-005)
  email: "contato@estudiomonteiro.com",
  whatsapp: "+55 00 00000-0000",
  whatsappUrl: "https://wa.me/000000000000",
  instagram: "https://instagram.com/",
  location: "Brasil", // PLACEHOLDER — service region
} as const;

export const nav = [
  { label: "Projetos", href: "/projetos" },
  { label: "Estúdio", href: "/estudio" },
  { label: "Contato", href: "/contato" },
] as const;
