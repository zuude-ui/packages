"use client";

import { PageComp } from "@workspace/ui/components/page-comps";
import { CodeSyntax } from "@workspace/ui/components/syntax-highlighter";
import { Demo } from "./demo";
import { allDocs } from "@/.contentlayer/generated";
import { Mdx } from "@workspace/ui/components/mdx";

export default function Page() {
  const homeDocs = allDocs.find((doc) => doc.slug === "/");

  return (
    <PageComp>
      <PageComp.Presentation>
        <PageComp.Heading1>IOS Mockups</PageComp.Heading1>

        <Demo />
      </PageComp.Presentation>

      <Mdx code={homeDocs?.body.code ?? ""} />
    </PageComp>
  );
}
