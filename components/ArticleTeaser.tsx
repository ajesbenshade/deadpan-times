import Link from "next/link";
import { ArticleImage } from "@/components/ArticleImage";
import { SectionLabel } from "@/components/SectionLabel";
import type { Article } from "@/lib/articles";
import { deck } from "@/lib/reading";

export function ArticleTeaser({
  article,
  featured = false,
  compact = false,
}: {
  article: Article;
  featured?: boolean;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <article className="border-b border-ink/15 py-3.5 last:border-b-0">
        <SectionLabel section={article.section} />
        <h3 className="font-display mt-1 text-lg leading-snug font-bold tracking-tight">
          <Link
            href={`/articles/${article.slug}`}
            className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {article.headline}
          </Link>
        </h3>
      </article>
    );
  }

  const image = article.image ? (
    <Link
      href={`/articles/${article.slug}`}
      className="mt-4 block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <ArticleImage
        src={article.image}
        alt={article.imageAlt ?? article.headline}
        sizes={
          featured
            ? "(max-width: 1024px) 100vw, 64rem"
            : "(max-width: 768px) 100vw, 24rem"
        }
      />
    </Link>
  ) : null;

  return (
    <article className={featured ? "border-b border-ink pb-8" : "flex flex-col"}>
      <SectionLabel section={article.section} />
      <h3
        className={`font-display mt-2 font-bold tracking-tight text-balance ${
          featured
            ? "text-3xl leading-tight sm:text-5xl"
            : "text-2xl leading-snug sm:text-[1.65rem]"
        }`}
      >
        <Link
          href={`/articles/${article.slug}`}
          className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {article.headline}
        </Link>
      </h3>
      <p className="mt-2 font-sans text-[0.7rem] font-semibold tracking-[0.16em] text-muted uppercase">
        {article.dateline}
      </p>
      {image}
      <p
        className={`mt-3 font-serif text-muted ${
          featured ? "text-lg leading-8 sm:text-xl sm:leading-9" : "text-base leading-7"
        }`}
      >
        {deck(article.excerpt, featured ? 280 : 170)}
      </p>
    </article>
  );
}
