export function readingMinutes(paragraphs: string[]): number {
  const words = paragraphs
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  return Math.max(1, Math.round(words / 220));
}
