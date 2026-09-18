import fs from "node:fs";
import path from "node:path";
import { cache } from "react";

export type Article = {
  slug: string;
  headline: string;
  dateline: string;
  section: string;
  order: number;
  paragraphs: string[];
  excerpt: string;
  image?: string;
  imageAlt?: string;
  ogImage?: string;
};

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

function parseFrontmatter(raw: string, filename: string): {
  meta: Record<string, string>;
  body: string;
} {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    throw new Error(`Missing frontmatter in ${filename}`);
  }

  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(": ");
    if (separator === -1) continue;
    meta[line.slice(0, separator)] = line.slice(separator + 2);
  }

  return { meta, body: match[2].trim() };
}

function excerptFrom(firstParagraph: string, dateline: string): string {
  const prefixes = [`${dateline}— `, `${dateline} — `];
  for (const prefix of prefixes) {
    if (firstParagraph.startsWith(prefix)) {
      return firstParagraph.slice(prefix.length);
    }
  }
  return firstParagraph;
}

function parseArticle(filename: string, raw: string): Article {
  const { meta, body } = parseFrontmatter(raw, filename);
  const required = ["slug", "headline", "dateline", "section", "order"] as const;
  for (const key of required) {
    if (!meta[key]) {
      throw new Error(`Missing ${key} in ${filename}`);
    }
  }

  const paragraphs = body.split(/\n\n+/).map((paragraph) => paragraph.trim());
  if (paragraphs.length === 0 || !paragraphs[0]) {
    throw new Error(`Empty body in ${filename}`);
  }

  return {
    slug: meta.slug,
    headline: meta.headline,
    dateline: meta.dateline,
    section: meta.section,
    order: Number.parseInt(meta.order, 10),
    paragraphs,
    excerpt: excerptFrom(paragraphs[0], meta.dateline),
    ...(meta.image
      ? {
          image: meta.image,
          imageAlt: meta.imageAlt ?? meta.headline,
        }
      : {}),
    ...(meta.ogImage ? { ogImage: meta.ogImage } : {}),
  };
}

export const getArticles = cache((): Article[] => {
  const files = fs
    .readdirSync(ARTICLES_DIR)
    .filter((filename) => filename.endsWith(".md"))
    .sort();

  return files
    .map((filename) => {
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, filename), "utf8");
      return parseArticle(filename, raw);
    })
    .sort((a, b) => a.order - b.order);
});

export function getArticle(slug: string): Article | undefined {
  return getArticles().find((article) => article.slug === slug);
}
