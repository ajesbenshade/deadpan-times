import Link from "next/link";
import type { ReactNode } from "react";
import { Masthead } from "@/components/Masthead";
import { SearchForm } from "@/components/SearchForm";
import { getSections } from "@/lib/sections";

function NavItem({
  href,
  current,
  children,
}: {
  href: string;
  current: boolean;
  children: ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        aria-current={current ? "page" : undefined}
        className={`font-sans text-[0.7rem] font-semibold tracking-[0.16em] whitespace-nowrap uppercase underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
          current
            ? "text-accent underline decoration-2"
            : "text-ink hover:underline"
        }`}
      >
        {children}
      </Link>
    </li>
  );
}

export function SiteHeader({
  home = false,
  current,
  query,
}: {
  home?: boolean;
  current?: string;
  query?: string;
}) {
  const sections = getSections();

  return (
    <header className="flex flex-col gap-3">
      <Masthead home={home} />
      <nav
        aria-label="Primary"
        className="no-print flex flex-col gap-3 border-b border-ink bg-paper pb-3 lg:sticky lg:top-0 lg:z-30 lg:flex-row lg:items-center lg:justify-between lg:py-3"
      >
        <ul className="nav-scroll -mx-4 flex items-center gap-x-5 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 lg:pb-0">
          <NavItem href="/" current={current === "home"}>
            Home
          </NavItem>
          {sections.map((section) => (
            <NavItem
              key={section.slug}
              href={`/sections/${section.slug}`}
              current={current === section.slug}
            >
              {section.name}
            </NavItem>
          ))}
          <NavItem href="/archive" current={current === "archive"}>
            Archive
          </NavItem>
          <NavItem href="/about" current={current === "about"}>
            About
          </NavItem>
        </ul>
        <SearchForm defaultQuery={query} />
      </nav>
    </header>
  );
}
