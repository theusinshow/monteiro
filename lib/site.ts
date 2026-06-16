/**
 * Estúdio Monteiro — site configuration.
 * Fictitious studio for a portfolio demo; all values are invented but coherent.
 */

export const site = {
  name: "Monteiro",
  fullName: "Estúdio Monteiro",
  tagline: "Arquitetura autoral",
  /** Canonical production origin — single source for metadata, robots, sitemap. */
  url: "https://estudiomonteiro.com",
  foundedYear: 2009,
  email: "contato@estudiomonteiro.com",
  whatsapp: "+55 11 99421-0380",
  whatsappUrl: "https://wa.me/5511994210380",
  instagram: "https://instagram.com/estudiomonteiro",
  location: "São Paulo, Brasil",
} as const;

export const nav = [
  { label: "Projetos", href: "/projetos" },
  { label: "Estúdio", href: "/estudio" },
  { label: "Contato", href: "/contato" },
] as const;
