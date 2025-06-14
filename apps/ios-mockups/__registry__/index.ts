import dynamic from "next/dynamic";

export const variants: Record<
  string,
  { name: string; component: any; code: string }
> = {
  default: {
    name: "default",
    component: dynamic(() => import("@/components/examples/default"), {
      ssr: false,
    }),
    code: `export default function Default() {
  return <div></div>;
}
`,
  },
};
