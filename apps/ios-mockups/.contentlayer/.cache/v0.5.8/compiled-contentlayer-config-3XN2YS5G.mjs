// ../../packages/ui/src/contentlayer.config.js
import { defineDocumentType } from "contentlayer2/source-files";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
var computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/")
  },
  headings: {
    type: "list",
    of: { type: "string" },
    resolve: (doc) => {
      const content = doc.body.raw;
      const headingMatches = [];
      const lines = content.split("\n");
      let inCodeBlock = false;
      const slugify = (text) => {
        return text.toLowerCase().trim().replace(/[\s+]/g, "-").replace(/[^\w\-]+/g, "");
      };
      lines.forEach((line) => {
        if (line.trim().startsWith("```")) {
          inCodeBlock = !inCodeBlock;
        }
        if (!inCodeBlock) {
          const match = line.match(/^(#{1,3})\s(.+)$/);
          if (match) {
            const [_, hashes, text] = match;
            const id = slugify(text);
            headingMatches.push({
              level: hashes.length,
              text,
              id
            });
          }
        }
      });
      return headingMatches;
    }
  }
};
var Docs = defineDocumentType(() => ({
  name: "Docs",
  filePathPattern: "**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    },
    description: {
      type: "string",
      required: true
    },
    date: {
      type: "date",
      required: true
    }
  },
  computedFields
}));
var mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypePrettyCode,
      {
        theme: { light: "github-light-default", dark: "github-dark-dimmed" },
        keepBackground: false
      }
    ],
    [
      rehypeAutolinkHeadings,
      {
        behavior: "wrap",
        content: (node) => node.children,
        properties: {
          className: ["subheading-anchor"],
          ariaLabel: "Link to section"
        }
      }
    ]
  ]
};

// contentlayer.config.ts
import { makeSource } from "contentlayer2/source-files";
var contentlayer_config_default = makeSource({
  contentDirPath: "./docs",
  documentTypes: [Docs],
  mdx: mdxOptions
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-3XN2YS5G.mjs.map
