import Link from "next/link";
import type { Article } from "@/lib/articles";

export function ArticlePager({
  previous,
  next,
}: {
  previous?: Article;
  next?: Article;
}) {
  if (!previous && !next) {
    return null;
  }

  return (
    <nav
      aria-label="Story navigation"
      className="no-print mt-12 grid gap-6 border-t-2 border-ink pt-6 sm:grid-cols-2"
    >
      {previous ? (
        <Link
          href={`/articles/${previous.slug}`}
          className="group rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <span className="font-sans text-[0.7rem] font-semibold tracking-[0.18em] text-muted uppercase">
            Previous
          </span>
          <span className="mt-1 block font-display text-xl leading-snug font-bold tracking-tight group-hover:underline">
            {previous.headline}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/articles/${next.slug}`}
          className="group rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-right"
        >
          <span className="font-sans text-[0.7rem] font-semibold tracking-[0.18em] text-muted uppercase">
            Next
          </span>
          <span className="mt-1 block font-display text-xl leading-snug font-bold tracking-tight group-hover:underline">
            {next.headline}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
