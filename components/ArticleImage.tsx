import Image from "next/image";

export function ArticleImage({
  src,
  alt,
  priority = false,
  sizes,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes: string;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-video w-full overflow-hidden border border-ink bg-paper ${className}`.trim()}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover object-center"
        priority={priority}
      />
    </div>
  );
}
