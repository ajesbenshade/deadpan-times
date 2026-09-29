import type { Article } from "@/lib/articles";

export function searchArticles(articles: Article[], query: string): Article[] {
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter((term) => term.length > 0);

  if (terms.length === 0) {
    return [];
  }

  const ranked = articles.flatMap((article) => {
    const headline = article.headline.toLowerCase();
    const section = article.section.toLowerCase();
    const dateline = article.dateline.toLowerCase();
    const body = article.paragraphs.join("\n").toLowerCase();
    const haystack = `${headline}\n${section}\n${dateline}\n${body}`;

    if (!terms.every((term) => haystack.includes(term))) {
      return [];
    }

    let score = 0;
    for (const term of terms) {
      if (headline.includes(term)) score += 5;
      if (section.includes(term)) score += 3;
      if (dateline.includes(term)) score += 2;
      if (body.includes(term)) score += 1;
    }

    return [{ article, score }];
  });

  ranked.sort(
    (a, b) => b.score - a.score || a.article.order - b.article.order,
  );

  return ranked.map((item) => item.article);
}
