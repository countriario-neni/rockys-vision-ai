import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { SERVICES } from "@/content/services";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    { path: "/", priority: 1 },
    { path: "/services/", priority: 0.9 },
    ...SERVICES.map((s) => ({ path: `/services/${s.slug}/`, priority: 0.8 })),
    { path: "/about/", priority: 0.6 },
    { path: "/contact/", priority: 0.7 },
  ];

  return paths.map(({ path, priority }) => ({
    url: `${SITE.domain}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
