export function PageIntro({
  kicker,
  title,
  detail,
}: {
  kicker: string;
  title: string;
  detail?: string;
}) {
  return (
    <header className="mb-8 border-b border-ink pb-4">
      <p className="font-sans text-[0.7rem] font-semibold tracking-[0.22em] text-muted uppercase">
        {kicker}
      </p>
      <h1 className="font-display mt-2 text-4xl leading-tight font-bold tracking-tight text-balance italic sm:text-5xl">
        {title}
      </h1>
      {detail ? (
        <p className="mt-3 max-w-2xl font-serif text-base leading-7 text-muted">
          {detail}
        </p>
      ) : null}
    </header>
  );
}
