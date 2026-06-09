import type { MetadataRoute } from "next";

const BASE = "https://estudiomonteiro.com"; // PLACEHOLDER — final domain

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
