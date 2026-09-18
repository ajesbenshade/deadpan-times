import Link from "next/link";
import { Masthead } from "@/components/Masthead";

export function SiteHeader({ home = false }: { home?: boolean }) {
  return (
    <header className="flex w-full flex-col">
      <Masthead home={home} />
      <nav aria-label="Primary" className="border-b border-ink bg-paper">
        <ul className="mx-auto flex max-w-5xl items-center justify-center gap-8 px-4 py-3 sm:px-6">
          <li>
            <Link
              href="/"
              className="font-serif text-xs font-semibold tracking-[0.22em] text-ink uppercase underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Home
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
