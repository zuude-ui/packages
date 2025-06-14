"use client";

import { PageComp } from "@workspace/ui/components/page-comps";
import { CodeSyntax } from "@workspace/ui/components/syntax-highlighter";
import { Demo } from "./demo";

export default function Page() {
  return (
    <PageComp>
      <PageComp.Presentation>
        <PageComp.Heading1>IOS Mockups</PageComp.Heading1>

        <Demo />
      </PageComp.Presentation>

      {/* <div className="grid md:grid-cols-2 gap-4">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis placeat
          iure, totam inventore dolores, ut minus odit error sit unde nisi?
          Perspiciatis, modi tenetur. Eligendi nisi tempore velit sunt totam?
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis placeat
          iure, totam inventore dolores, ut minus odit error sit unde nisi?
          Perspiciatis, modi tenetur. Eligendi nisi tempore velit sunt totam?
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis placeat
          iure, totam inventore dolores, ut minus odit error sit unde nisi?
          Perspiciatis, modi tenetur. Eligendi nisi tempore velit sunt totam?
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis placeat
          iure, totam inventore dolores, ut minus odit error sit unde nisi?
          Perspiciatis, modi tenetur. Eligendi nisi tempore velit sunt totam?
        </div>
      </div> */}

      <PageComp.Wrapper>
        <PageComp.Section>
          <PageComp.Heading2>Installation</PageComp.Heading2>
          <CodeSyntax
            code="npm install @zuude-ui/ios-mockups"
            language="bash"
          />
        </PageComp.Section>
        <PageComp.Section>
          <PageComp.Heading2>Usage</PageComp.Heading2>
          <CodeSyntax code={usage} language="tsx" />
        </PageComp.Section>

        <PageComp.Section>
          <PageComp.Heading2>Props</PageComp.Heading2>
          <PageComp.Table
            columns={[
              {
                body: ["Prop", "Type"],
                values: [
                  ["size", `"sm" | "md" | "lg"`],
                  [
                    "color",
                    `"natural-titanium" | "blue-titanium" | "white-titanium" | "black-titanium" | "blue" | "pink" | "yellow" | "green" | "black"`,
                  ],
                  ["className", "string"],
                  ["buttonHandlers", "IphoneMockupButtonsAction"],
                ],
              },
            ]}
          />
        </PageComp.Section>

        <PageComp.Section>
          <PageComp.Heading2>CSS Variables</PageComp.Heading2>
          <PageComp.Table
            columns={[
              {
                body: ["Prop", "Type", "Description", "Example"],
                values: [
                  [
                    "--canvas-color",
                    "transparent",
                    "Sets the background color of the content area",
                    "[--canvas-color:white] or [--canvas-color:var(--background)]",
                  ],
                  [
                    "--dynamic-island-color",
                    "black",
                    "Sets the color of the dynamic island and home indicator",
                    "[--dynamic-island-color:white]",
                  ],
                  [
                    "--top-safe-area",
                    "varies by size",
                    "	Height of the top safe area (automatically set based on size)",
                    "46px for small size, 60px for medium size, 70px for large size",
                  ],
                  [
                    "--bottom-safe-area",
                    "varies by size",
                    "Height of the bottom safe area (automatically set based on size)",
                    "15px for all sizes",
                  ],
                ],
              },
            ]}
          />
        </PageComp.Section>
      </PageComp.Wrapper>
    </PageComp>
  );
}

const usage = `import { IphoneMockup } from "@/components/device-mockups";
 
export default function MyComponent() {
  return (
    <IphoneMockup size="md" color="natural-titanium">
      {/* Your content here */}
    </IphoneMockup>
  );
}`;
