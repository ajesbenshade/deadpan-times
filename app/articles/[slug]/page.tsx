import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/ArticleBody";
import { ArticleTeaser } from "@/components/ArticleTeaser";
import { SiteShell } from "@/components/SiteShell";
import { getArticle, getArticles } from "@/lib/articles";

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

  return {
    title: article.headline,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  const moreStories = getArticles().filter((item) => item.slug !== article.slug);

  return (
    <SiteShell>
      <article>
        <p className="font-serif text-[0.7rem] font-semibold tracking-[0.22em] text-accent uppercase">
          {article.section}
        </p>
        <h1 className="font-display mt-3 max-w-4xl text-4xl leading-tight font-bold tracking-tight text-balance sm:text-5xl">
          {article.headline}
        </h1>
        <p className="mt-4 font-serif text-xs font-semibold tracking-[0.18em] text-muted uppercase">
          {article.dateline}
        </p>
        <ArticleBody paragraphs={article.paragraphs} />
      </article>

      {moreStories.length > 0 ? (
        <section
          aria-labelledby="more-stories-heading"
          className="mt-14 border-t-2 border-ink pt-8"
        >
          <h2
            id="more-stories-heading"
            className="font-serif text-xs font-semibold tracking-[0.28em] text-ink uppercase"
          >
            More Stories
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
