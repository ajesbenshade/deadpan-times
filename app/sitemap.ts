import type { MetadataRoute } from "next";
import { getArticles, getSeriesIds } from "@/lib/articles";
import { getSections } from "@/lib/sections";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/archive", "/about"].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.6,
  }));

  const sections = getSections().map((section) => ({
    url: absoluteUrl(`/sections/${section.slug}`),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const series = getSeriesIds().map((seriesId) => ({
    url: absoluteUrl(`/series/${seriesId}`),
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  const articles = getArticles().map((article) => ({
    url: absoluteUrl(`/articles/${article.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...sections, ...series, ...articles];
}
