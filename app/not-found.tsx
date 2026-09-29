import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";

export default function NotFound() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-xl py-8 text-center">
        <p className="font-serif text-xs font-semibold tracking-[0.28em] text-accent uppercase">
          Correction
        </p>
        <h1 className="font-display mt-3 text-4xl font-bold tracking-tight italic sm:text-5xl">
          This story could not be confirmed.
        </h1>
        <p className="mt-4 font-serif text-lg leading-8 text-muted">
          The item requested does not appear in today’s edition, and the facts
          remain unavailable at press time.
        </p>
        <p className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <Link
            href="/"
            className="font-sans text-sm font-semibold tracking-[0.16em] text-ink uppercase underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Front page
          </Link>
          <Link
            href="/archive"
            className="font-sans text-sm font-semibold tracking-[0.16em] text-ink uppercase underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Archive
          </Link>
        </p>
      </div>
    </SiteShell>
  );
}
