import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Iphone } from "@zuude-ui/ios-mockups";
import { AnimatePresence, motion } from "motion/react";

export default function Dialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Iphone className="shrink-0 ![--screen-color:var(--background)]">
      <div className="flex h-full items-center justify-center">
        <Button onClick={() => setIsOpen(true)} className="bg-red-500">
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
                  <Button
                    size={"lg"}
                    className="text-background"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-red-500"
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
