"use client";

import { PageComp } from "@workspace/ui/components/page-comps";
import { allDocs } from "@/.contentlayer/generated";
import { Mdx } from "@/components/mdx";
import { Demo } from "./demo";
import { Features } from "./features";
import { TableOfContents } from "@workspace/ui/components/table-of-contents";
import { Navbar } from "@workspace/ui/components/navbar";

export default function Page() {
  const homeDocs = allDocs.find((doc) => doc.slug === "/");

  return (
    <PageComp.PageWrapper>
      <div></div>
      <PageComp>
        <Navbar />
        <PageComp.Presentation>
          <PageComp.Heading1>Video Components</PageComp.Heading1>
          <PageComp.Paragraph className="mb-8">
            A comprehensive React video package with advanced controls, time
            utilities, and modern design. Built for developers who demand
            excellence.
          </PageComp.Paragraph>
          <Demo />
          <Features />
        </PageComp.Presentation>

        <Mdx code={homeDocs?.body.code ?? ""} />
      </PageComp>
      <TableOfContents headings={homeDocs?.headings ?? []} />
    </PageComp.PageWrapper>
  );
}
