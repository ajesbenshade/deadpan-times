# The Deadpan Times

Satirical news for people who know better. Updates as warranted.

A Next.js (App Router) newspaper site. Stories live as Markdown files in `content/articles/`, so a new piece is a new file.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm start
```

## Adding an article

Create `content/articles/your-slug.md`:

```md
---
headline: Your Deadpan Headline Here
dateline: CITY
slug: your-slug
section: World
order: 4
---

CITY — First paragraph of the story.

Second paragraph.
```

`slug` must match the filename (without `.md`). The homepage lists every article, ordered by `order`. Routes are generated at `/articles/[slug]`.
