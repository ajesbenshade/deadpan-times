import type { Metadata } from "next";
import { Playfair_Display, Source_Serif_4 } from "next/font/google";
import { homeShareMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display-face",
  style: ["normal", "italic"],
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: SITE.name,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.tagline,
  applicationName: SITE.name,
  robots: {
    index: true,
    follow: true,
  },
  ...homeShareMetadata(),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${sourceSerif.variable} h-full`}
    >
      <body className="min-h-full bg-paper font-serif text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
