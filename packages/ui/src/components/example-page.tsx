import { ArrowLeft, ArrowRight } from "lucide-react";
import type { GenericComponent, ProjectName } from "../types";
import Link from "next/link";
import { buttonVariants } from "./button";
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
                "size-12 rounded-full transition-opacity",
                previousIndex === -1 && "opacity-50 pointer-events-none"
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
                "size-12 rounded-full transition-opacity",
                nextIndex === variants.length &&
                  "opacity-50 pointer-events-none"
              ),
            })}
          >
            <ArrowRight />
          </Link>
        </div>

        <p className="text-xs text-muted-foreground">
          Add more{" "}
          <a
            href={`https://github.com/zuudeui/packages/tree/main/apps/${packageName}/components/examples`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Examples
          </a>
        </p>
      </div>
    </div>
  );
};
