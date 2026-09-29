import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { SiteShell } from "@/components/SiteShell";
import { getArticles, getSeriesIds, seriesTitle } from "@/lib/articles";
import { pageShareMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { getSections, sectionSlug } from "@/lib/sections";

export const metadata = pageShareMetadata(
  "Archive",
  `Every dispatch in ${SITE.name}, filed by section.`,
  "/archive",
);

export default function ArchivePage() {
  const articles = getArticles();
  const sections = getSections();
  const series = getSeriesIds();
  const detail =
    articles.length === 1
      ? "1 dispatch, filed by section."
      : `${articles.length} dispatches, filed by section.`;

  return (
    <SiteShell current="archive">
      <PageIntro kicker="Index" title="The Archive" detail={detail} />
      <div className="grid gap-12">
        {sections.map((section) => {
          const items = articles.filter(
            (article) => sectionSlug(article.section) === section.slug,
          );

          return (
            <section key={section.slug} aria-labelledby={`${section.slug}-heading`}>
              <h2
                id={`${section.slug}-heading`}
                className="border-b border-ink pb-2 font-sans text-xs font-semibold tracking-[0.22em] text-accent uppercase"
              >
                <Link
                  href={`/sections/${section.slug}`}
                  className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {section.name}
                </Link>
              </h2>
              <ul className="mt-2">
                {items.map((article) => (
                  <li key={article.slug} className="border-b border-ink/15">
                    <Link
                      href={`/articles/${article.slug}`}
                      className="group grid gap-1 py-3 sm:grid-cols-[8rem_1fr] sm:items-baseline sm:gap-6"
                    >
                      <span className="font-sans text-[0.7rem] font-semibold tracking-[0.14em] text-muted uppercase">
                        {article.dateline}
                      </span>
                      <span className="font-display text-xl leading-snug font-bold tracking-tight group-hover:underline">
                        {article.headline}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      {series.length > 0 ? (
        <section aria-labelledby="series-index-heading" className="mt-14">
          <h2
            id="series-index-heading"
            className="font-sans text-xs font-semibold tracking-[0.22em] text-ink uppercase"
          >
            Series
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {series.map((seriesId) => (
              <li key={seriesId}>
                <Link
                  href={`/series/${seriesId}`}
                  className="font-display text-2xl font-bold tracking-tight italic underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {seriesTitle(seriesId)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </SiteShell>
  );
}
