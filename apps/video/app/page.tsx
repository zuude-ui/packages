"use client";

import { PageComp } from "@workspace/ui/components/page-comps";
import { Demo } from "./demo";
import { allDocs } from "@/.contentlayer/generated";
import { Mdx } from "@/components/mdx";
import { NewDemo } from "./demo copy";

export default function Page() {
  const homeDocs = allDocs.find((doc) => doc.slug === "/");

  return (
    <PageComp>
      <PageComp.Presentation>
        <PageComp.Heading1>Video</PageComp.Heading1>
        <PageComp.Paragraph className="mb-8">
          Controlling your video did not get easier than this.
        </PageComp.Paragraph>

        <NewDemo />
        <Demo />
      </PageComp.Presentation>

      <Mdx code={homeDocs?.body.code ?? ""} />
    </PageComp>
  );
}
