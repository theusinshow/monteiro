import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/projetos", "/estudio", "/contato"].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${site.url}/projetos/${p.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...routes, ...projectRoutes];
}
