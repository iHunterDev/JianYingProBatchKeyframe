import { MDXRemote } from "next-mdx-remote/rsc";
// import "github-markdown-css/github-markdown.css";
import fs from "fs";
import path from "path";
import "@/styles/markdown-dark.css";
import matter from "gray-matter";

export default async function Changelog({ params: { locale } } : { params: { locale: string } }) {
  const postsDirectory = path.join(process.cwd(), "src/content");
  const fileContents = fs.readFileSync(
    path.join(postsDirectory, `roadmap_${locale}.mdx`),
    "utf8"
  );
  // 使用 gray-matter 解析 frontmatter 和内容
  const { data: frontmatter, content } = matter(fileContents);
  return (
    <>
      <section className="relative">
        <img
          src="https://uploads-ssl.webflow.com/646f65e37fe0275cfb808405/646f68133fc5cb4e29ed28fa_Get%20Started%20BG.svg"
          alt=""
          className="absolute -z-[1] h-full w-full object-cover"
        />
        <div className="mx-auto w-full max-w-7xl px-5 py-5 md:px-10 md:py-16 lg:py-24">
          
          <div className="markdown-body">
            <MDXRemote source={content} components={{}} />
          </div>
        </div>
      </section>
    </>
  );
}
