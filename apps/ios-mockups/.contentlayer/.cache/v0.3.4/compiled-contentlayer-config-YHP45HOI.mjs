// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
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
var Components = defineDocumentType(() => ({
  name: "Components",
  filePathPattern: "./ui/**/*.mdx",
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
    image: {
      type: "string",
      required: true
    },
    imageDark: {
      type: "string",
      required: false
    },
    video: {
      type: "string",
      required: false
    },
    videoDark: {
      type: "string",
      required: false
    },
    price: {
      type: "number",
      required: false
    },
    isFree: {
      type: "boolean",
      required: false,
      default: false
    },
    date: {
      type: "date",
      required: true
    },
    active: {
      type: "boolean",
      required: false,
      default: true
    },
    pageStyle: {
      type: "string",
      required: false
    }
  },
  computedFields
}));
var Docs = defineDocumentType(() => ({
  name: "Docs",
  filePathPattern: "./*.mdx",
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
var contentlayer_config_default = makeSource({
  contentDirPath: "./contents",
  documentTypes: [Components, Docs],
  mdx: {
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
  }
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-YHP45HOI.mjs.map
