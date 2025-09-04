"use client";

import { useParams } from "fumadocs-core/framework";

import {
  cropperVariants,
  iosmockupsVariants,
  videoVariants,
} from "@/__registry__";
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
  } else if (packageName === "ios-mockups") {
    Component = iosmockupsVariants[name];
  } else if (packageName === "cropper") {
    Component = cropperVariants[name];
  }

  if (!Component) {
    return <div>Component not found</div>;
  }

  return (
    <div
      className={cn(
        "border p-4 rounded-lg overflow-hidden not-prose",
        className
      )}
    >
      {Component.component()}
    </div>
  );
};
