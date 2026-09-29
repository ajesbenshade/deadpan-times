import Link from "next/link";
import { sectionSlug } from "@/lib/sections";

export function SectionLabel({ section }: { section: string }) {
  return (
    <Link
      href={`/sections/${sectionSlug(section)}`}
      className="font-sans text-[0.7rem] font-semibold tracking-[0.2em] text-accent uppercase underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      {section}
    </Link>
  );
}
