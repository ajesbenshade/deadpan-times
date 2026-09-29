import Link from "next/link";
import { ArticleImage } from "@/components/ArticleImage";
import { ArticleTeaser } from "@/components/ArticleTeaser";
import { SectionLabel } from "@/components/SectionLabel";
import type { Article } from "@/lib/articles";
import { deck } from "@/lib/reading";

export function FrontPage({ articles }: { articles: Article[] }) {
  const [lead, ...rest] = articles;

  if (!lead) {
    return (
      <p className="font-serif text-lg text-muted">
        No dispatches in this edition.
      </p>
    );
  }

  const photo = rest.find((article) => article.image);
  const placePhotoInRail = Boolean(photo) && !lead.image;
  const railPool = rest.filter((article) => article.slug !== photo?.slug);
  const rail = railPool.slice(0, placePhotoInRail ? 3 : 4);
  const railSlugs = new Set(rail.map((article) => article.slug));
  const more = railPool.filter((article) => !railSlugs.has(article.slug));
  const grid = more.slice(0, 6);
  const index = more.slice(6);
  const dispatchLabel =
    articles.length === 1 ? "1 dispatch" : `${articles.length} dispatches`;

  return (
    <div>
      <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-ink pb-2">
        <h2 className="font-sans text-xs font-semibold tracking-[0.28em] text-ink uppercase">
          Front Page
        </h2>
        <p className="font-sans text-xs tracking-wide text-muted">{dispatchLabel}</p>
      </div>

      <div
        className={`grid gap-8 lg:gap-10 ${
          rail.length > 0 || placePhotoInRail ? "lg:grid-cols-12" : ""
        }`}
      >
        <article
          className={
            rail.length > 0 || placePhotoInRail ? "lg:col-span-8" : undefined
          }
        >
          <SectionLabel section={lead.section} />
          <h3 className="font-display mt-3 text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl lg:text-[3.35rem]">
            <Link
              href={`/articles/${lead.slug}`}
              className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {lead.headline}
            </Link>
          </h3>
          <p className="mt-3 font-sans text-[0.7rem] font-semibold tracking-[0.16em] text-muted uppercase">
            {lead.dateline}
          </p>
          <p className="mt-4 max-w-2xl font-serif text-lg leading-8 text-muted sm:text-xl sm:leading-9">
            {deck(lead.excerpt, 320)}
          </p>
          {lead.image ? (
            <Link
              href={`/articles/${lead.slug}`}
              className="mt-6 block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <ArticleImage
                src={lead.image}
                alt={lead.imageAlt ?? lead.headline}
                sizes="(max-width: 1024px) 100vw, 48rem"
                priority
              />
            </Link>
          ) : null}
        </article>

        {rail.length > 0 || placePhotoInRail ? (
          <div className="lg:col-span-4 lg:border-l lg:border-ink lg:pl-8">
            {placePhotoInRail && photo?.image ? (
              <article className="mb-8">
                <Link
                  href={`/articles/${photo.slug}`}
                  className="block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <ArticleImage
                    src={photo.image}
                    alt={photo.imageAlt ?? photo.headline}
                    sizes="(max-width: 1024px) 100vw, 22rem"
                  />
                </Link>
                <div className="mt-3">
                  <SectionLabel section={photo.section} />
                  <h3 className="font-display mt-1 text-2xl leading-snug font-bold tracking-tight text-balance">
                    <Link
                      href={`/articles/${photo.slug}`}
                      className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    >
                      {photo.headline}
                    </Link>
                  </h3>
                </div>
              </article>
            ) : null}
            {rail.length > 0 ? (
              <aside aria-labelledby="edition-rail-heading">
                <h2
                  id="edition-rail-heading"
                  className="font-sans text-xs font-semibold tracking-[0.22em] text-ink uppercase"
                >
                  In this edition
                </h2>
                <div className="mt-1">
                  {rail.map((article) => (
                    <ArticleTeaser key={article.slug} article={article} compact />
                  ))}
                </div>
              </aside>
            ) : null}
          </div>
        ) : null}
      </div>

      {photo && !placePhotoInRail ? (
        <article className="mt-10 grid items-center gap-6 border-t border-ink pt-8 lg:grid-cols-2 lg:gap-10">
          <Link
            href={`/articles/${photo.slug}`}
            className="block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <ArticleImage
              src={photo.image ?? ""}
              alt={photo.imageAlt ?? photo.headline}
              sizes="(max-width: 1024px) 100vw, 36rem"
            />
          </Link>
          <div>
            <SectionLabel section={photo.section} />
            <h3 className="font-display mt-2 text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
              <Link
                href={`/articles/${photo.slug}`}
                className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {photo.headline}
              </Link>
            </h3>
            <p className="mt-3 font-sans text-[0.7rem] font-semibold tracking-[0.16em] text-muted uppercase">
              {photo.dateline}
            </p>
            <p className="mt-3 font-serif text-lg leading-8 text-muted">
              {deck(photo.excerpt, 240)}
            </p>
          </div>
        </article>
      ) : null}

      {grid.length > 0 ? (
        <div className="mt-10 grid gap-x-8 gap-y-10 border-t border-ink pt-8 md:grid-cols-2 lg:grid-cols-3">
          {grid.map((article) => (
            <ArticleTeaser key={article.slug} article={article} />
          ))}
        </div>
      ) : null}

      {index.length > 0 ? (
        <section aria-labelledby="also-heading" className="mt-10 border-t-2 border-ink pt-6">
          <h2
            id="also-heading"
            className="font-sans text-xs font-semibold tracking-[0.22em] text-ink uppercase"
          >
            Also in this edition
          </h2>
          <div className="mt-1 grid md:grid-cols-2 md:gap-x-10">
            {index.map((article) => (
              <ArticleTeaser key={article.slug} article={article} compact />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
