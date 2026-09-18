import Link from "next/link";
import { ArticleImage } from "@/components/ArticleImage";
import type { Article } from "@/lib/articles";

export function ArticleTeaser({
  article,
  featured = false,
}: {
  article: Article;
  featured?: boolean;
}) {
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
            : "(max-width: 768px) 100vw, 32rem"
        }
      />
    </Link>
  ) : null;

  return (
    <article className={featured ? "border-b border-ink pb-8" : "flex flex-col"}>
      <p className="font-serif text-[0.7rem] font-semibold tracking-[0.22em] text-accent uppercase">
        {article.section}
      </p>
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
      <p className="mt-2 font-serif text-xs font-semibold tracking-[0.18em] text-muted uppercase">
        {article.dateline}
      </p>
      {image}
      <p
        className={`mt-3 font-serif text-muted ${
          featured ? "text-lg leading-8 sm:text-xl sm:leading-9" : "text-base leading-7"
        }`}
      >
        {article.excerpt}
      </p>
    </article>
  );
}
