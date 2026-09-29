import { pullQuote } from "@/lib/reading";

export function ArticleBody({ paragraphs }: { paragraphs: string[] }) {
  const quote = pullQuote(paragraphs);
  const [first, ...rest] = paragraphs;

  return (
    <div className="article-body mt-8 max-w-[42rem] font-serif text-[1.0625rem] leading-8 text-ink sm:text-lg sm:leading-9">
      {first ? <p>{first}</p> : null}
      {quote ? <blockquote className="pull-quote">“{quote}”</blockquote> : null}
      {rest.map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
      ))}
    </div>
  );
}
