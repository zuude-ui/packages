"use client";

import { PageComp } from "@workspace/ui/components/page-comps";
import { Cropper } from "@workspace/cropper";
import { CodeSyntax } from "@workspace/ui/components/syntax-highlighter";

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

        <Cropper
          src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1hbnxlbnwwfHwwfHx8MA%3D%3D"
          crop={{ x: 0, y: 0, scale: 1 }}
          onCropChange={() => {}}
          className="max-w-96 mt-12 aspect-square rounded-full overflow-hidden mx-auto bg-muted"
          showGrid={true}
          showBehindImage={{ position: "fixed" }}
        />
      </PageComp.Presentation>

      <PageComp.Wrapper>
        <PageComp.Section>
          <PageComp.Heading2>Installation</PageComp.Heading2>
          <CodeSyntax code="npm install @zuude-ui/cropper" language="bash" />
        </PageComp.Section>
        <PageComp.Section>
          <PageComp.Heading2>Usage</PageComp.Heading2>
          <CodeSyntax code={usage} language="tsx" />
          <PageComp.CustomArrow className="absolute top-0 right-0 translate-x-[80%] translate-y-1/2" />
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

const usage = `<Cropper
  src=""
  crop={{ x: 0, y: 0, scale: 1 }}
  onCropChange={() => {}}
/>
`;
