import Link from "next/link";
import { SITE } from "@/lib/site";

export function Masthead({ home = false }: { home?: boolean }) {
  const TitleTag = home ? "h1" : "p";

  return (
    <div className="border-y-4 border-double border-ink py-5 text-center sm:py-7">
      <p className="font-serif text-[0.7rem] font-semibold tracking-[0.28em] text-ink uppercase sm:text-xs">
        {SITE.kicker}
      </p>
      <TitleTag className="font-display mt-2 text-[clamp(2.35rem,10vw,5.4rem)] leading-none font-black tracking-tight text-ink italic">
        {home ? (
          SITE.name
        ) : (
          <Link
            href="/"
            className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {SITE.name}
          </Link>
        )}
      </TitleTag>
      <p className="mx-auto mt-3 max-w-xl font-serif text-sm leading-6 text-muted sm:text-base">
        {SITE.tagline}
      </p>
    </div>
  );
}
