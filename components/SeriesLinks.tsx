import Link from "next/link";
import { seriesTitle, type Article } from "@/lib/articles";

export function SeriesLinks({
  series,
  articles,
}: {
  series: string;
  articles: Article[];
}) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="series-links-heading"
      className="mt-12 max-w-[42rem] border-t border-ink pt-6"
    >
      <h2
        id="series-links-heading"
        className="font-sans text-xs font-semibold tracking-[0.22em] text-ink uppercase"
      >
        <Link
          href={`/series/${series}`}
          className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          More from the {seriesTitle(series)}
        </Link>
      </h2>
      <ul className="mt-4 border-t border-ink">
        {articles.map((article) => (
          <li key={article.slug} className="border-b border-ink">
            <Link
              href={`/articles/${article.slug}`}
              className="block py-3 font-display text-xl leading-snug font-bold tracking-tight underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {article.headline}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
