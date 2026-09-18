import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t-2 border-ink pt-6 pb-10 text-center">
      <p className="font-display text-xl font-bold tracking-tight italic sm:text-2xl">
        {SITE.name}
      </p>
      <p className="mt-2 font-serif text-sm text-muted">{SITE.tagline}</p>
    </footer>
  );
}
