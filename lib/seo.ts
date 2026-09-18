import type { Metadata } from "next";
import type { Article } from "@/lib/articles";
import { SITE, absoluteUrl } from "@/lib/site";

const OG_SIZE = { width: 1200, height: 630 } as const;

export function shareImage(article?: Pick<Article, "headline" | "image" | "imageAlt" | "ogImage">): {
  url: string;
  width: number;
  height: number;
  alt: string;
} {
  const path = article?.ogImage ?? article?.image ?? SITE.ogImage;
  return {
    url: absoluteUrl(path),
    width: OG_SIZE.width,
    height: OG_SIZE.height,
    alt: article?.imageAlt ?? article?.headline ?? SITE.name,
  };
}

export function articleShareMetadata(article: Article): Metadata {
  const url = absoluteUrl(`/articles/${article.slug}`);
  const image = shareImage(article);

  return {
    title: article.headline,
    description: article.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      siteName: SITE.name,
      title: article.headline,
      description: article.excerpt,
      url,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: article.headline,
      description: article.excerpt,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}

export function homeShareMetadata(): Pick<
  Metadata,
  "metadataBase" | "alternates" | "openGraph" | "twitter"
> {
  const image = shareImage();

  return {
    metadataBase: new URL(SITE.origin),
    alternates: {
      canonical: SITE.origin,
    },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title: SITE.name,
      description: SITE.tagline,
      url: SITE.origin,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE.name,
      description: SITE.tagline,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}
