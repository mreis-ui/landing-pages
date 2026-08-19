import type { MetadataRoute } from "next";
import { modules, company } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${company.domain}`;
  const staticRoutes = [
    "",
    "/werkstatt-software",
    "/funktionen",
    "/loesungen",
    "/preise",
    "/referenzen",
    "/blog",
    "/kostenlos-testen",
    "/vision",
    "/faq",
    "/kontakt",
    "/impressum",
    "/datenschutz",
    "/cookies",
  ];

  const now = new Date();

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...modules.map((m) => ({
      url: `${base}/funktionen/${m.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...getAllPosts().map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(`${p.date}T12:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
