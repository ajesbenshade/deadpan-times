import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export function SiteShell({
  children,
  home = false,
  current,
  query,
}: {
  children: ReactNode;
  home?: boolean;
  current?: string;
  query?: string;
}) {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col px-4 py-6 sm:px-6 sm:py-8">
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      <SiteHeader home={home} current={current} query={query} />
      <main id="content" className="flex-1 py-8">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
