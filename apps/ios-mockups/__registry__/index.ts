import dynamic from "next/dynamic";
import type { GenericComponent } from "@workspace/ui/types";

export const variants: Record<string, GenericComponent> = {
  dialog: {
    name: "dialog",
    component: dynamic(() => import("@/components/examples/dialog"), {
      ssr: false,
    }),
    code: `import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Iphone } from "@zuude-ui/ios-mockups";
import { AnimatePresence, motion } from "motion/react";

export default function Dialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Iphone className="shrink-0 [--screen-color:var(--background)]">
      <div className="flex h-full items-center justify-center">
        <Button onClick={() => setIsOpen(true)} variant={"destructive"}>
          Delete profile
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="bg-background/50 absolute inset-0 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="absolute right-0 bottom-0 left-0 z-40 flex items-center justify-center p-4 pb-[calc(var(--bottom-safe-area)+0.5rem)]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.5, type: "spring", bounce: 0 }}
            >
              <div className="w-full rounded-4xl border bg-white p-8 pb-4 text-black">
                <h3 className="text-2xl font-bold">Delete profile</h3>
                <p className="mt-2">
                  Are you sure you want to delete your profile? This action
                  cannot be undone.
                </p>
                <div className="mt-7 grid grid-cols-2 gap-2">
                  <Button size={"lg"} onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant={"destructive"}
                    size={"lg"}
                    onClick={() => setIsOpen(false)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Iphone>
  );
}
`,
  },
  "gradient-canvas": {
    name: "gradient-canvas",
    component: dynamic(() => import("@/components/examples/gradient-canvas"), {
      ssr: false,
    }),
    code: `import { Iphone } from "@zuude-ui/ios-mockups";

export default function GradientCanvas() {
  return (
    <Iphone className="[--screen-color:linear-gradient(orange,var(--secondary))]">
      <div className="flex flex-col gap-4 text-black pt-[var(--top-safe-area)] px-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
      </div>
    </Iphone>
  );
}
`,
  },
  image: {
    name: "image",
    component: dynamic(() => import("@/components/examples/image"), {
      ssr: false,
    }),
    code: `import { testImage } from "@workspace/ui/lib/utils";
import { Iphone } from "@zuude-ui/ios-mockups";

export default function Image() {
  return (
    <Iphone>
      <img src={testImage} className="h-full w-full object-cover" />
    </Iphone>
  );
}
`,
  },
  texts: {
    name: "texts",
    component: dynamic(() => import("@/components/examples/texts"), {
      ssr: false,
    }),
    code: `import { Iphone } from "@zuude-ui/ios-mockups";

export default function Texts() {
  return (
    <Iphone className="[--screen-color:white]">
      <div className="flex flex-col gap-4 text-black pt-[var(--top-safe-area)] px-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <p className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem illum
          doloribus minus fuga. Iusto deleniti, eligendi non dolor minima
          ratione nam maxime cumque libero perferendis odio possimus
          exercitationem sed alias!
        </p>
      </div>
    </Iphone>
  );
}
`,
  },
};
