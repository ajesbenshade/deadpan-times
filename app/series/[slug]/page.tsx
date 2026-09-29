import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleTeaser } from "@/components/ArticleTeaser";
import { PageIntro } from "@/components/PageIntro";
import { SiteShell } from "@/components/SiteShell";
import {
  getSeriesArticles,
  getSeriesIds,
  seriesTitle,
} from "@/lib/articles";
import { pageShareMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

type SeriesPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getSeriesIds().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: SeriesPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!getSeriesIds().includes(slug)) {
    return { title: "Series not found" };
  }

  const title = seriesTitle(slug);
  return pageShareMetadata(
    title,
    `${title}, a series from ${SITE.name}.`,
    `/series/${slug}`,
  );
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { slug } = await params;
  const articles = getSeriesArticles(slug);

  if (articles.length === 0) {
    notFound();
  }

  const [lead, ...rest] = articles;
  const title = seriesTitle(slug);
  const detail =
    articles.length === 1 ? "1 dispatch" : `${articles.length} dispatches`;

  return (
    <SiteShell>
      <PageIntro kicker="Series" title={title} detail={detail} />
      {lead ? <ArticleTeaser article={lead} featured /> : null}
      {rest.length > 0 ? (
        <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-10">
          {rest.map((article) => (
            <ArticleTeaser key={article.slug} article={article} />
          ))}
        </div>
      ) : null}
    </SiteShell>
  );
}
