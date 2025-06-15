"use client";

import { useParams } from "next/navigation";
import { variants } from "@/__registry__";
import { ExamplePage } from "@workspace/ui/components/example-page";

export default function EachExamples() {
  const { slug } = useParams<{ slug: string[] }>();
  const variant = variants[slug?.[0] as keyof typeof variants];

  return (
    <ExamplePage variants={Object.values(variants)} packageName="ios-mockups">
      {variant?.component()}
    </ExamplePage>
  );
}
