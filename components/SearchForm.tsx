export function SearchForm({
  defaultQuery = "",
  id = "site-search",
  wide = false,
}: {
  defaultQuery?: string;
  id?: string;
  wide?: boolean;
}) {
  return (
    <form
      action="/search"
      method="get"
      role="search"
      className={wide ? "flex w-full max-w-xl items-end gap-3" : "flex w-full items-end gap-3 sm:w-auto"}
    >
      <label htmlFor={id} className="sr-only">
        Search stories
      </label>
      <input
        id={id}
        name="q"
        type="search"
        defaultValue={defaultQuery}
        placeholder="Search the edition"
        enterKeyHint="search"
        className={`border-b border-ink bg-transparent px-0 py-1 font-sans text-ink placeholder:text-muted focus:border-accent focus:outline-none ${
          wide ? "w-full text-lg" : "w-full text-base sm:w-44 sm:text-sm"
        }`}
      />
      <button
        type="submit"
        className="shrink-0 font-sans text-[0.7rem] font-semibold tracking-[0.16em] text-ink uppercase underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        Search
      </button>
    </form>
  );
}
