import { MDXRemote } from "next-mdx-remote/rsc";
// import "github-markdown-css/github-markdown.css";
import fs from "fs";
import path from "path";
import "@/styles/markdown-dark.css";
import matter from "gray-matter";

export default async function Changelog({ params: { locale } } : { params: { locale: string } }) {
  const postsDirectory = path.join(process.cwd(), "src/content");
  const fileContents = fs.readFileSync(
    path.join(postsDirectory, `changelog_${locale}.mdx`),
    "utf8"
  );
  // 使用 gray-matter 解析 frontmatter 和内容
  const { data: frontmatter, content } = matter(fileContents);
  return (
    <main>
      {/* Header */}
      <section className="relative bg-grid-subtle overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0d0d0d] to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-px h-64 bg-gradient-to-b from-brand/40 to-transparent" />
        <div className="absolute top-0 right-0 w-64 h-px bg-gradient-to-l from-brand/40 to-transparent" />

        <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <div className="flex items-center gap-3 mb-8">
            <span className="block w-6 h-px bg-brand" />
            <span className="font-display text-brand text-xs font-bold uppercase tracking-[0.25em]">
              Changelog
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-extrabold text-white leading-[0.95] tracking-tight">
            {frontmatter.title ?? "Changelog"}
          </h1>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto w-full max-w-4xl px-6 md:px-10">
        <div className="markdown-body">
          <MDXRemote source={content} components={{}} />
        </div>
      </div>
    </main>
  );
}
