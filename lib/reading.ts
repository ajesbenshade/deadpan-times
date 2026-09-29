export function deck(text: string, max = 180): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) {
    return normalized;
  }

  const cut = normalized.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  const trimmed = (lastSpace > 60 ? cut.slice(0, lastSpace) : cut).replace(
    /[.,;:–—-]+$/,
    "",
  );

  return `${trimmed}…`;
}

export function pullQuote(paragraphs: string[]): string | undefined {
  const pattern = /[“"]([^”"]+)[”"]/g;

  for (const paragraph of paragraphs) {
    for (const match of paragraph.matchAll(pattern)) {
      const text = match[1].replace(/\s+/g, " ").trim();
      if (text.length >= 40 && text.length <= 180) {
        return text;
      }
    }
  }

  return undefined;
}

export function readingMinutes(paragraphs: string[]): number {
  const words = paragraphs
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  return Math.max(1, Math.round(words / 220));
}
