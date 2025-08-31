"use client";

import { useParams } from "fumadocs-core/framework";

import { videoVariants } from "@/__registry__";

interface Props {
  name: string;
}

export const Preview = ({ name }: Props) => {
  const params = useParams();

  const packageName = params.slug?.[0] as PackagesName;

  let Component = null;

  if (packageName === "video") {
    Component = videoVariants[name];
  }

  if (!Component) {
    return <div>Component not found</div>;
  }

  return <>{Component.component()}</>;
};
