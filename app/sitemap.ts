import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

const BASE = "https://estudiomonteiro.com"; // PLACEHOLDER — final domain

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/projetos", "/estudio", "/contato"].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${BASE}/projetos/${p.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...routes, ...projectRoutes];
}
