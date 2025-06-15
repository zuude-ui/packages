import { Docs, mdxOptions } from "@workspace/ui/contentlayer.config";
import { makeSource } from "contentlayer2/source-files";

export default makeSource({
  contentDirPath: "./docs",
  documentTypes: [Docs],
  mdx: mdxOptions as any,
});

// You must install
// pnpm add contentlayer2 remark-gfm  rehype-slug  rehype-pretty-code  rehype-autolink-headings
