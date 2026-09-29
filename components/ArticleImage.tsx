import Image from "next/image";

export function ArticleImage({
  src,
  alt,
  priority = false,
  sizes,
  className = "",
  caption,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes: string;
  className?: string;
  caption?: string;
}) {
  return (
    <figure className={className}>
      <div className="relative aspect-video w-full overflow-hidden border border-ink bg-paper">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover object-center"
          priority={priority}
        />
      </div>
      {caption ? (
        <figcaption className="mt-2 font-sans text-sm leading-5 text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
