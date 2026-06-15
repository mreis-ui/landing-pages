import type { MetadataRoute } from "next";
import { modules, company } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${company.domain}`;
  const staticRoutes = [
    "",
    "/werkstatt-software",
    "/funktionen",
    "/loesungen",
    "/preise",
    "/referenzen",
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
  ];
}
