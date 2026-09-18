import Link from "next/link";
import { Masthead } from "@/components/Masthead";

export function SiteHeader({ home = false }: { home?: boolean }) {
  return (
    <header className="flex flex-col gap-3">
      <Masthead home={home} />
      <nav aria-label="Primary" className="border-b border-ink pb-3">
        <ul className="flex items-center justify-center gap-8">
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
