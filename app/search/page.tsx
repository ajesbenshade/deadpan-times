import type { Metadata } from "next";
import { ArticleTeaser } from "@/components/ArticleTeaser";
import { PageIntro } from "@/components/PageIntro";
import { SearchForm } from "@/components/SearchForm";
import { SiteShell } from "@/components/SiteShell";
import { getArticles } from "@/lib/articles";
import { searchArticles } from "@/lib/search";

export const metadata: Metadata = {
  title: "Search",
  robots: {
    index: false,
    follow: true,
  },
};

type SearchPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

function readQuery(value: string | string[] | undefined): string {
  const raw = Array.isArray(value) ? value[0] : value;
  return (raw ?? "").trim().slice(0, 120);
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = readQuery((await searchParams).q);
  const results = query ? searchArticles(getArticles(), query) : [];
  const resultLabel =
    results.length === 1 ? "1 dispatch" : `${results.length} dispatches`;

  return (
    <SiteShell current="search" query={query}>
      <PageIntro
        kicker="Search"
        title={query ? `“${query}”` : "Search the edition"}
        detail={
          query
            ? resultLabel
            : "Search headlines, datelines, sections, and copy."
        }
      />
      <SearchForm wide defaultQuery={query} id="edition-search" />
      {query && results.length === 0 ? (
        <p className="mt-8 max-w-xl font-serif text-lg leading-8 text-muted">
          Nothing in this edition matches that search.
        </p>
      ) : null}
      {results.length > 0 ? (
        <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-10">
          {results.map((article) => (
            <ArticleTeaser key={article.slug} article={article} />
          ))}
        </div>
      ) : null}
    </SiteShell>
  );
}
