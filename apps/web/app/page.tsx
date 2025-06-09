"use client";

import { PageComp } from "@workspace/ui/components/page-comps";
import { CodeSyntax } from "@workspace/ui/components/syntax-highlighter";
import { Default } from "@/components/examples/default";
import { Demo } from "./demo";

export default function Page() {
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

      <PageComp.Wrapper>
        <PageComp.Section>
          <PageComp.Heading2>Installation</PageComp.Heading2>
          <CodeSyntax code="npm install @zuude-ui/cropper" language="bash" />
        </PageComp.Section>
        <PageComp.Section>
          <PageComp.Heading2>Usage</PageComp.Heading2>
          <CodeSyntax code={usage} language="tsx" />
          <PageComp.CustomArrow className="absolute top-0 right-0 translate-x-[80%] translate-y-[70px]" />
          <PageComp.ExampleWrapper>
            <div className="max-w-sm">
              <Default />
            </div>
          </PageComp.ExampleWrapper>
        </PageComp.Section>

        <PageComp.Section>
          <PageComp.Heading2>Props</PageComp.Heading2>
          <PageComp.Table
            columns={[
              {
                body: ["Prop", "Type"],
                values: [
                  ["size", `"sm" | "md" | "lg"`],
                  ["crop", "object"],
                  ["onCropChange", "function"],
                  ["className", "string"],
                  ["showGrid", "boolean"],
                  ["showBehindImage", "object"],
                ],
              },
            ]}
          />
        </PageComp.Section>
      </PageComp.Wrapper>
    </PageComp>
  );
}

const usage = `<Cropper src="" />`;
