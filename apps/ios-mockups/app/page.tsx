"use client";

import { PageComp } from "@workspace/ui/components/page-comps";
import { Demo } from "./demo";
import { allDocs } from "@/.contentlayer/generated";
import { Mdx } from "../components/mdx";
import { PackageVideoPresentation } from "@workspace/ui/components/package-video-presentation";
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
          <PageComp.Heading1>IOS Mockups</PageComp.Heading1>

          <Demo />
        </PageComp.Presentation>

        <Mdx code={homeDocs?.body.code ?? ""} />

        <PackageVideoPresentation videoUrl="https://vztpjn0djt.ufs.sh/f/RAHCy45jEyblVabyXQzjU8tdNXCo2MJWkyADsLcS0RvTq6mf" />
      </PageComp>
      <TableOfContents headings={homeDocs?.headings ?? []} />
    </PageComp.PageWrapper>
  );
}
