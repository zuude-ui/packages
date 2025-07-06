"use client";

import { variants } from "@/__registry__";
import { cn } from "@workspace/ui/lib/utils";
import { Badge } from "@workspace/ui/components/badge";

export default function ExamplesPage() {
  return (
    <div className="grid mt-16 md:grid-cols-2 border-t">
      {Object.entries(variants).map(([key, value], index) => (
        <Example key={key} index={index} {...value} />
      ))}
    </div>
  );
}

function Example({
  name,
  component,
  code,
  index,
}: {
  name: string;
  component: () => React.ReactNode;
  code: string;
  index: number;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 justify-center items-center border-b py-24 overflow-hidden relative",
        (index + 1) % 2 === 0 && "border-r",
        (name === "advanced" || name === "ultimate") && "col-span-2"
      )}
    >
      <Badge className="absolute top-4 left-4">{name}</Badge>
      {component()}
    </div>
  );
}
