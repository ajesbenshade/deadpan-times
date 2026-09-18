import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

export function Masthead({ home = false }: { home?: boolean }) {
  const banner = (
    <Image
      src={SITE.banner}
      alt={
        home
          ? ""
          : `${SITE.name} — ${SITE.byline}`
      }
      width={SITE.bannerWidth}
      height={SITE.bannerHeight}
      className={
        home
          ? "h-auto w-full object-contain object-center"
          : "mx-auto h-auto max-h-24 w-auto max-w-full object-contain object-center sm:max-h-32"
      }
      sizes={home ? "100vw" : "(max-width: 640px) 92vw, 36rem"}
      preload={home}
      fetchPriority={home ? "high" : "auto"}
    />
  );

  return (
    <div className="bg-newsprint">
      <div className={home ? "w-full" : "px-4 py-3 sm:px-6 sm:py-4"}>
        {home ? (
          <h1 className="m-0">
            <span className="sr-only">{SITE.name}</span>
            {banner}
          </h1>
        ) : (
          <p className="m-0">
            <Link
              href="/"
              className="mx-auto block w-fit rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {banner}
            </Link>
          </p>
        )}
      </div>
      {home ? (
        <div className="border-y border-ink bg-paper px-4 py-3 text-center sm:px-6">
          <p className="font-serif text-[0.7rem] font-semibold tracking-[0.28em] text-ink uppercase sm:text-xs">
            {SITE.kicker}
          </p>
          <p className="mx-auto mt-1 max-w-xl font-serif text-sm leading-6 text-muted sm:text-base">
            {SITE.tagline}
          </p>
        </div>
      ) : null}
    </div>
  );
}
