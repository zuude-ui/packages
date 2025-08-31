"use client";

import { useParams } from "fumadocs-core/framework";

import { videoVariants } from "@/__registry__";
import { cn } from "@workspace/ui/lib/utils";

interface Props {
  name: string;
  className?: string;
}

export const Preview = ({ name, className }: Props) => {
  const params = useParams();

  const packageName = params.slug?.[0] as PackagesName;

  let Component = null;

  if (packageName === "video") {
    Component = videoVariants[name];
  }

  if (!Component) {
    return <div>Component not found</div>;
  }

  return (
    <div className={cn("border p-4 rounded-lg overflow-hidden", className)}>
      {Component.component()}
    </div>
  );
};
