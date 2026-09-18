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
    <div className="flex min-h-full w-full flex-col">
      <a href="#content" className="skip-link">
        Skip to stories
      </a>
      <SiteHeader home={home} />
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 sm:px-6">
        <main id="content" className="flex-1 py-8">
          {children}
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
