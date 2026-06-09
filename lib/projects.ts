/**
 * Project content source — PLACEHOLDER data (see /docs/ai/CONTENT_PENDING.md, CNT-002/003).
 * Real projects, metadata and photography are pending. Cover/gallery are null
 * until assets arrive; the UI renders a neutral placeholder in the meantime.
 */

export type ProjectType = "Residencial" | "Corporativo";

export type Project = {
  slug: string;
  title: string;
  year: number;
  location: string;
  type: ProjectType;
  /** Built area in m² (number for tabular formatting). */
  area: number;
  /** Short editorial line. */
  summary: string;
  cover: string | null;
  gallery: string[];
};

export const projects: Project[] = [
  {
    slug: "casa-horizonte",
    title: "Casa Horizonte",
    year: 2024,
    location: "São Paulo, SP",
    type: "Residencial",
    area: 420,
    summary:
      "Residência de linhas longas em diálogo com a paisagem.", // PLACEHOLDER
    cover: null,
    gallery: [],
  },
  {
    slug: "pavilhao-aurora",
    title: "Pavilhão Aurora",
    year: 2023,
    location: "Campinas, SP",
    type: "Corporativo",
    area: 1180,
    summary: "Sede corporativa em concreto, luz e silêncio.", // PLACEHOLDER
    cover: null,
    gallery: [],
  },
  {
    slug: "casa-ribeira",
    title: "Casa Ribeira",
    year: 2023,
    location: "Florianópolis, SC",
    type: "Residencial",
    area: 310,
    summary: "Casa de praia entre madeira e mar.", // PLACEHOLDER
    cover: null,
    gallery: [],
  },
  {
    slug: "atrio-monte",
    title: "Átrio Monte",
    year: 2022,
    location: "Belo Horizonte, MG",
    type: "Corporativo",
    area: 860,
    summary: "Edifício de uso misto com átrio central.", // PLACEHOLDER
    cover: null,
    gallery: [],
  },
];

export const projectTypes: ProjectType[] = ["Residencial", "Corporativo"];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
