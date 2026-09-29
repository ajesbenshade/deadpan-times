import { cache } from "react";
import { getArticles, type Article } from "@/lib/articles";

export type Section = {
  name: string;
  slug: string;
  count: number;
};

export function sectionSlug(section: string): string {
  return section
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const getSections = cache((): Section[] => {
  const grouped = new Map<string, Section & { first: number }>();

  for (const article of getArticles()) {
    const slug = sectionSlug(article.section);
    const existing = grouped.get(slug);
    if (!existing) {
      grouped.set(slug, {
        name: article.section,
        slug,
        count: 1,
        first: article.order,
      });
      continue;
    }

    existing.count += 1;
    existing.first = Math.min(existing.first, article.order);
  }

  return [...grouped.values()]
    .sort((a, b) => a.first - b.first)
    .map(({ name, slug, count }) => ({ name, slug, count }));
});

export function getSection(slug: string): Section | undefined {
  return getSections().find((section) => section.slug === slug);
}

export function getArticlesInSection(slug: string): Article[] {
  return getArticles().filter((article) => sectionSlug(article.section) === slug);
}
