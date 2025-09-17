import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import { Card, CardContent } from "@/components/ui/card";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // tema syntax highlighting

export const metadata = {
  title: "About - Cuy My Anime List",
  description: "Tentang website MyAnimeList versi Next.js + Jikan API",
};

export default function AboutPage() {
  const filePath = path.join(process.cwd(), "content", "about.md");
  const fileContent = fs.readFileSync(filePath, "utf-8");

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card>
        <CardContent className="p-6">
          <article className="prose dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
            >
              {fileContent}
            </ReactMarkdown>
          </article>
        </CardContent>
      </Card>
    </div>
  );
}
