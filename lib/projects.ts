/**
 * Project content source. Photography is licensed stock composed for a
 * fictitious studio; titles, locations, years, areas and summaries are
 * editorial placeholders (see /docs/ai/CONTENT_PENDING.md, CNT-002/003).
 * Assets live in /public/projetos/<slug>/ (capa.webp + 01..04.webp), emitted
 * by scripts/optimize-images.mjs from /assets/imgs/projetos.
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

const gallery = (slug: string) =>
  ["01", "02", "03", "04"].map((n) => `/projetos/${slug}/${n}.webp`);

export const projects: Project[] = [
  {
    slug: "casa-mirante",
    title: "Casa Mirante",
    year: 2024,
    location: "Garopaba, SC",
    type: "Residencial",
    area: 520,
    summary: "Residência suspensa sobre o mar, entre o vidro e o horizonte.", // PLACEHOLDER
    cover: "/projetos/casa-mirante/capa.webp",
    gallery: gallery("casa-mirante"),
  },
  {
    slug: "pavilhao-pomar",
    title: "Pavilhão Pomar",
    year: 2023,
    location: "Holambra, SP",
    type: "Corporativo",
    area: 240,
    summary:
      "Café-pavilhão de concreto organizado ao redor de uma única árvore.", // PLACEHOLDER
    cover: "/projetos/pavilhao-pomar/capa.webp",
    gallery: gallery("pavilhao-pomar"),
  },
  {
    slug: "casa-horizonte",
    title: "Casa Horizonte",
    year: 2024,
    location: "Goiânia, GO",
    type: "Residencial",
    area: 680,
    summary: "Residência de linhas longas em diálogo com a paisagem.", // PLACEHOLDER
    cover: "/projetos/casa-horizonte/capa.webp",
    gallery: gallery("casa-horizonte"),
  },
  {
    slug: "casa-bosque",
    title: "Casa Bosque",
    year: 2022,
    location: "Campos do Jordão, SP",
    type: "Residencial",
    area: 180,
    summary: "Refúgio de madeira que se abre para a mata.", // PLACEHOLDER
    cover: "/projetos/casa-bosque/capa.webp",
    gallery: gallery("casa-bosque"),
  },
  {
    slug: "casa-vertice",
    title: "Casa Vértice",
    year: 2023,
    location: "Ubatuba, SP",
    type: "Residencial",
    area: 310,
    summary: "Casa-frontão em tijolo, geometria pura sob o céu tropical.", // PLACEHOLDER
    cover: "/projetos/casa-vertice/capa.webp",
    gallery: gallery("casa-vertice"),
  },
  {
    slug: "atelier-norte",
    title: "Atelier Norte",
    year: 2022,
    location: "São Paulo, SP",
    type: "Corporativo",
    area: 420,
    summary: "Volume escuro de uso misto na esquina urbana.", // PLACEHOLDER
    cover: "/projetos/atelier-norte/capa.webp",
    gallery: gallery("atelier-norte"),
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
