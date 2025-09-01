import defaultComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { createGenerator } from "fumadocs-typescript";
import { AutoTypeTable } from "fumadocs-typescript/ui";
import { Preview } from "./components/preview";
import { Step, Steps } from "fumadocs-ui/components/steps";

const generator = createGenerator();

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    AutoTypeTable: (props) => (
      <AutoTypeTable {...props} generator={generator} />
    ),
    Preview: (props) => (
      <Preview name={props.name} className={props.className} />
    ),
    Step,
    Steps,
    ...components,
  };
}
