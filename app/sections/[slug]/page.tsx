import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleTeaser } from "@/components/ArticleTeaser";
import { PageIntro } from "@/components/PageIntro";
import { SiteShell } from "@/components/SiteShell";
import { pageShareMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import {
  getArticlesInSection,
  getSection,
  getSections,
} from "@/lib/sections";

type SectionPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getSections().map((section) => ({ slug: section.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: SectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const section = getSection(slug);
  if (!section) {
    return { title: "Section not found" };
  }

  const description = `${section.name} dispatches from ${SITE.name}.`;
  return pageShareMetadata(section.name, description, `/sections/${section.slug}`);
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { slug } = await params;
  const section = getSection(slug);

  if (!section) {
    notFound();
  }

  const articles = getArticlesInSection(slug);
  const [lead, ...rest] = articles;
  const detail =
    section.count === 1 ? "1 dispatch" : `${section.count} dispatches`;

  return (
    <SiteShell current={section.slug}>
      <PageIntro kicker="Section" title={section.name} detail={detail} />
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
