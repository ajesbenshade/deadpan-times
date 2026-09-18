export function ArticleBody({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="article-body mt-8 max-w-[42rem] font-serif text-[1.0625rem] leading-8 text-ink sm:text-lg sm:leading-9">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
      ))}
    </div>
  );
}
