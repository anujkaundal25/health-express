import type { MetadataRoute } from "next";
import { servicePages, site } from "@/components/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/about", "/services", "/ambuletteService", "/southBrooklyn", "/faq", "/contact", "/schedule", "/driverForm"];
  return [
    ...pages.map((p) => ({ url: site.url + p, lastModified: now, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...servicePages.map((s) => ({ url: `${site.url}/services/${s.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 })),
  ];
}
