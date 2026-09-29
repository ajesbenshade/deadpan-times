"use client";

import { useState } from "react";

export function CopyLink() {
  const [copied, setCopied] = useState(false);

  async function onClick() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="no-print font-sans text-[0.7rem] font-semibold tracking-[0.16em] text-ink uppercase underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      {copied ? "Link copied" : "Copy link"}
    </button>
  );
}
