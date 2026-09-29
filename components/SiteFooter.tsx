import Link from "next/link";
import { getSeriesIds, seriesTitle } from "@/lib/articles";
import { getSections } from "@/lib/sections";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  const sections = getSections();
  const series = getSeriesIds();
  const year = new Date().getFullYear();

  return (
    <footer className="no-print mt-auto border-t-2 border-ink pt-6 pb-10 text-center">
      <p className="font-display text-2xl font-bold tracking-tight italic">
        {SITE.name}
      </p>
      <p className="mt-2 font-serif text-sm text-muted">{SITE.tagline}</p>
      <nav aria-label="Footer" className="mt-5">
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <li>
            <Link
              href="/"
              className="font-sans text-[0.7rem] font-semibold tracking-[0.16em] text-ink uppercase underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Home
            </Link>
          </li>
          {sections.map((section) => (
            <li key={section.slug}>
              <Link
                href={`/sections/${section.slug}`}
                className="font-sans text-[0.7rem] font-semibold tracking-[0.16em] text-ink uppercase underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {section.name}
              </Link>
            </li>
          ))}
          {series.map((seriesId) => (
            <li key={seriesId}>
              <Link
                href={`/series/${seriesId}`}
                className="font-sans text-[0.7rem] font-semibold tracking-[0.16em] text-ink uppercase underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {seriesTitle(seriesId)}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/archive"
              className="font-sans text-[0.7rem] font-semibold tracking-[0.16em] text-ink uppercase underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Archive
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="font-sans text-[0.7rem] font-semibold tracking-[0.16em] text-ink uppercase underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
      <p className="mt-5 font-sans text-xs tracking-wide text-muted">
        © {year} {SITE.name}. Satire. The people, studies, and quotations in
        this paper are invented.
      </p>
    </footer>
  );
}
