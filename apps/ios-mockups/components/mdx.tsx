import { CompPreview } from "@workspace/ui/components/comp-preview";
import { componentsConfig, MdxUI } from "@workspace/ui/components/mdx";

import { variants } from "@/__registry__";

export const Preview = ({ name }: { name: string }) => {
  const variant = variants[name];

  if (!variant) {
    return <CompPreview>Variant not found</CompPreview>;
  }

  return <CompPreview>{variant.component()}</CompPreview>;
};

const components = { ...componentsConfig, Preview };

export const Mdx = ({ code }: { code: string }) => {
  return <MdxUI code={code} components={components} />;
};
