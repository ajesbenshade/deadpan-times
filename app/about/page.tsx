import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { SiteShell } from "@/components/SiteShell";
import { pageShareMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { getSections } from "@/lib/sections";

export const metadata = pageShareMetadata(
  "About",
  `${SITE.name} is a satirical newspaper. The reporting is invented.`,
  "/about",
);

export default function AboutPage() {
  const sections = getSections();

  return (
    <SiteShell current="about">
      <PageIntro kicker="Masthead" title="About the paper" />
      <div className="max-w-[42rem] space-y-5 font-serif text-lg leading-8 text-ink">
        <p>
          {SITE.name} is a satirical newspaper. Stories, names, studies, and
          quotations are fictional. This is not a news organization, and nothing
          published here should be read as fact.
        </p>
        <p>New dispatches are added as warranted.</p>
      </div>
      <section aria-labelledby="sections-heading" className="mt-12 max-w-[42rem]">
        <h2
          id="sections-heading"
          className="font-sans text-xs font-semibold tracking-[0.22em] text-ink uppercase"
        >
          Sections
        </h2>
        <ul className="mt-4 border-t border-ink">
          {sections.map((section) => (
            <li key={section.slug} className="border-b border-ink/15">
              <Link
                href={`/sections/${section.slug}`}
                className="flex items-baseline justify-between gap-4 py-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <span className="font-display text-2xl font-bold tracking-tight underline-offset-4 hover:underline">
                  {section.name}
                </span>
                <span className="font-sans text-xs tracking-wide text-muted">
                  {section.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </SiteShell>
  );
}
