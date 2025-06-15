"use client";

import { PageComp } from "@workspace/ui/components/page-comps";
import { Demo } from "./demo";
import { allDocs } from "@/.contentlayer/generated";
import { Mdx } from "@/components/mdx";

export default function Page() {
  const homeDocs = allDocs.find((doc) => doc.slug === "/");

  return (
    <PageComp>
      <PageComp.Presentation>
        <PageComp.Heading1>Cropper</PageComp.Heading1>
        <PageComp.Paragraph>
          A modern, intuitive image cropping component that brings the familiar
          iOS photo editing experience to the web. Crop, rotate, and adjust your
          images with smooth gestures and precise controls.
        </PageComp.Paragraph>

        <Demo />
      </PageComp.Presentation>

      <Mdx code={homeDocs?.body.code ?? ""} />
    </PageComp>
  );
}
