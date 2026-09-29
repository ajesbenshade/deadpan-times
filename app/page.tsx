import { FrontPage } from "@/components/FrontPage";
import { SiteShell } from "@/components/SiteShell";
import { getArticles } from "@/lib/articles";

export default function HomePage() {
  return (
    <SiteShell home current="home">
      <FrontPage articles={getArticles()} />
    </SiteShell>
  );
}
