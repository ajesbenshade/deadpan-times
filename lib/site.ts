export const SITE = {
  name: "The Deadpan Times",
  tagline: "Satirical news for people who know better. Updates as warranted.",
  kicker: "Vol. I  ·  Published as warranted",
  origin: "https://www.deadpantimes.com",
  logo: "/brand/logo-dt.png",
  ogImage: "/og/default.jpg",
} as const;

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return new URL(path, SITE.origin).toString();
}
