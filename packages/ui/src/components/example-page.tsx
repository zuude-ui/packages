import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import type { GenericComponent, ProjectName } from "../types";
import Link from "next/link";
import { Button, buttonVariants } from "./button";
import { useParams } from "next/navigation";
import { cn } from "../lib/utils";

interface Props {
  variants: GenericComponent[];
  children: React.ReactNode;
  packageName: ProjectName;
}

export const ExamplePage = ({ children, variants, packageName }: Props) => {
  const { slug } = useParams<{ slug: string[] }>();

  const currentIndex = variants.findIndex(
    (variant) => variant.name === slug?.[0]
  );

  const nextIndex = currentIndex + 1;
  const previousIndex = currentIndex - 1;

  if (!children)
    return (
      <div className="min-h-dvh flex flex-col justify-center-safe items-center-safe isolate gap-4">
        <a
          href={`https://github.com/zuudeui/packages/tree/main/apps/${packageName}/components/examples`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center relative space-y-4 bg-muted rounded-full size-20 shadow-sm justify-center"
        >
          <div className="absolute top-0 left-0 w-full h-full rounded-full -z-10 bg-muted-foreground/20 add-plus-animation"></div>
          <div
            className="absolute top-0 left-0 w-full h-full rounded-full -z-10 bg-muted-foreground/20 add-plus-animation"
            style={{
              animationDelay: "0.2s",
            }}
          ></div>
          <Plus className="size-10 text-muted-foreground" strokeWidth={1} />
        </a>
        <p className="text-sm text-muted-foreground max-w-xs text-center">
          You can add examples to the component by adding a new file in the
          examples folder.
        </p>
        <Button onClick={() => window.history.back()} variant={"link"}>
          Back
        </Button>
      </div>
    );

  return (
    <div className="min-h-dvh flex flex-col justify-center-safe py-16 items-center-safe">
      {children}

      <div className="fixed bottom-4 right-4 flex flex-col items-end space-y-2">
        <div className="flex gap-4">
          <Link
            href={`/examples/${variants[previousIndex]?.name}`}
            className={buttonVariants({
              variant: "outline",
              size: "icon",
              className: cn(
                "size-12 !rounded-full transition-opacity"
                // previousIndex === -1 && "opacity-50 pointer-events-none"
              ),
            })}
          >
            <ArrowLeft />
          </Link>
          <Link
            href={`/examples/${variants[nextIndex]?.name}`}
            className={buttonVariants({
              variant: "outline",
              size: "icon",
              className: cn(
                "size-12 !rounded-full transition-opacity"
                // nextIndex === variants.length &&
                //   "opacity-50 pointer-events-none"
              ),
            })}
          >
            <ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};
