import { CopyLink } from "@/components/CopyLink";

export function ArticleMeta({
  dateline,
  minutes,
}: {
  dateline: string;
  minutes: number;
}) {
  const readLabel = minutes === 1 ? "1 min read" : `${minutes} min read`;

  return (
    <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-y border-ink/15 py-3">
      <p className="font-sans text-[0.7rem] font-semibold tracking-[0.16em] text-muted uppercase">
        {dateline}
        <span className="px-2 text-ink/30" aria-hidden="true">
          ·
        </span>
        Deadpan Times Staff
        <span className="px-2 text-ink/30" aria-hidden="true">
          ·
        </span>
        {readLabel}
      </p>
      <CopyLink />
    </div>
  );
}
