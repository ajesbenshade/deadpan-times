import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/ArticleBody";
import { ArticleImage } from "@/components/ArticleImage";
import { ArticleMeta } from "@/components/ArticleMeta";
import { ArticlePager } from "@/components/ArticlePager";
import { ArticleTeaser } from "@/components/ArticleTeaser";
import { SectionLabel } from "@/components/SectionLabel";
import { SeriesLinks } from "@/components/SeriesLinks";
import { SiteShell } from "@/components/SiteShell";
import {
  getArticle,
  getArticles,
  getSeriesCompanions,
} from "@/lib/articles";
import { readingMinutes } from "@/lib/reading";
import { articleShareMetadata } from "@/lib/seo";
import { sectionSlug } from "@/lib/sections";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getArticles().map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    return { title: "Story not found" };
  }

  return articleShareMetadata(article);
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  const articles = getArticles();
  const index = articles.findIndex((item) => item.slug === article.slug);
  const previous = index > 0 ? articles[index - 1] : undefined;
  const next =
    index >= 0 && index < articles.length - 1 ? articles[index + 1] : undefined;
  const companions = article.series ? getSeriesCompanions(article) : [];
  const skip = new Set(
    [article.slug, previous?.slug, next?.slug, ...companions.map((item) => item.slug)].filter(
      (value): value is string => Boolean(value),
    ),
  );
  const fromSection = articles
    .filter(
      (item) => item.section === article.section && !skip.has(item.slug),
    )
    .slice(0, 3);
  const moreStories = articles
    .filter(
      (item) => item.section !== article.section && !skip.has(item.slug),
    )
    .slice(0, 4);
  const caption =
    article.imageAlt && article.imageAlt !== article.headline
      ? article.imageAlt
      : undefined;

  return (
    <SiteShell current={sectionSlug(article.section)}>
      <article>
        <SectionLabel section={article.section} />
        <h1 className="font-display mt-3 max-w-4xl text-4xl leading-tight font-bold tracking-tight text-balance sm:text-5xl">
          {article.headline}
        </h1>
        <ArticleMeta
          dateline={article.dateline}
          minutes={readingMinutes(article.paragraphs)}
        />
        {article.image ? (
          <ArticleImage
            src={article.image}
            alt={article.imageAlt ?? article.headline}
            caption={caption}
            className="mt-6"
            sizes="(max-width: 1024px) 100vw, 72rem"
            priority
          />
        ) : null}
        <ArticleBody paragraphs={article.paragraphs} />
        {article.series ? (
          <SeriesLinks series={article.series} articles={companions} />
        ) : null}
      </article>

      <ArticlePager previous={previous} next={next} />

      {fromSection.length > 0 ? (
        <section
          aria-labelledby="section-stories-heading"
          className="no-print mt-14 border-t-2 border-ink pt-8"
        >
          <h2
            id="section-stories-heading"
            className="font-sans text-xs font-semibold tracking-[0.22em] text-ink uppercase"
          >
            More in {article.section}
          </h2>
          <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
            {fromSection.map((item) => (
              <ArticleTeaser key={item.slug} article={item} />
            ))}
          </div>
        </section>
      ) : null}

      {moreStories.length > 0 ? (
        <section
          aria-labelledby="more-stories-heading"
          className="no-print mt-14 border-t-2 border-ink pt-8"
        >
          <h2
            id="more-stories-heading"
            className="font-sans text-xs font-semibold tracking-[0.22em] text-ink uppercase"
          >
            More stories
          </h2>
          <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-10">
            {moreStories.map((item) => (
              <ArticleTeaser key={item.slug} article={item} />
            ))}
          </div>
        </section>
      ) : null}
    </SiteShell>
  );
}
