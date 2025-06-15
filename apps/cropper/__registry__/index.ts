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
    code: `import { Cropper } from "@workspace/cropper";
import { testImage } from "@workspace/ui/lib/utils";

export default function Default() {
  return <Cropper src={testImage} />;
}
`,
  },
  drawer: {
    name: "drawer",
    component: dynamic(() => import("@/components/examples/drawer"), {
      ssr: false,
    }),
    code: `import { Cropper } from "@workspace/cropper";
import { testImage } from "@workspace/ui/lib/utils";

import {
  Drawer as DrawerComponent,
  DrawerTrigger,
  DrawerContent,
} from "@workspace/ui/components/drawer";

export default function Drawer() {
  return (
    <DrawerComponent>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque error
        nisi ducimus laboriosam quae iste impedit enim voluptatum, repellendus
        autem. Autem nulla perferendis, quas vitae incidunt molestias voluptatum
        esse qui!
      </DrawerContent>
    </DrawerComponent>
  );
}
`,
  },
};
