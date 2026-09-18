import { ArticleTeaser } from "@/components/ArticleTeaser";
import { SiteShell } from "@/components/SiteShell";
import { getArticles } from "@/lib/articles";

export default function HomePage() {
  const articles = getArticles();
  const [lead, ...rest] = articles;

  return (
    <SiteShell home>
      <section aria-labelledby="top-stories-heading">
        <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-ink pb-2">
          <h2
            id="top-stories-heading"
            className="font-serif text-xs font-semibold tracking-[0.28em] text-ink uppercase"
          >
            Top Stories
          </h2>
          <p className="font-serif text-xs tracking-wide text-muted">
            {articles.length} dispatches
          </p>
        </div>

        {lead ? <ArticleTeaser article={lead} featured /> : null}

        {rest.length > 0 ? (
          <div className="mt-8 grid gap-8 border-t border-ink pt-8 md:grid-cols-2 md:gap-10">
            {rest.map((article) => (
              <ArticleTeaser key={article.slug} article={article} />
            ))}
          </div>
        ) : null}
      </section>
    </SiteShell>
  );
}
