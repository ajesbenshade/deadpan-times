import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export function SiteShell({
  children,
  home = false,
}: {
  children: ReactNode;
  home?: boolean;
}) {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col px-4 py-6 sm:px-6 sm:py-8">
      <a href="#content" className="skip-link">
        Skip to stories
      </a>
      <SiteHeader home={home} />
      <main id="content" className="flex-1 py-8">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
