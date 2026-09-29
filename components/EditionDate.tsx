"use client";

export function EditionDate({ className }: { className?: string }) {
  const label = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  }).format(new Date());

  return (
    <p
      suppressHydrationWarning
      className={
        className ??
        "mt-2 font-sans text-[0.7rem] font-semibold tracking-[0.22em] text-muted uppercase"
      }
    >
      {label}
    </p>
  );
}
