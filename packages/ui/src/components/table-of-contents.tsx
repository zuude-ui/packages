import { cn } from "../lib/utils";
import { useEffect, useState } from "react";

interface TableOfContentsProps {
  headings: {
    level: number;
    text: string;
    id: string;
  }[];
}

export const TableOfContents = ({ headings }: TableOfContentsProps) => {
  const [activeHeading, setActiveHeading] = useState<string | null>(null);

  useEffect(() => {
    const container = document.getElementById("mdx-container");
    if (container) {
      const headings = container.querySelectorAll("h1, h2, h3, h4");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveHeading(entry.target.id);
            }
          });
        },
        {
          rootMargin: "0px 0px -90% 0px",
        }
      );

      headings.forEach((heading) => {
        observer.observe(heading);
      });
    }
  }, []);

  return (
    <div className="sticky top-0 max-w-72 shrink-0 hidden md:flex pb-48 pt-4 flex-col items-end rounded-r-xl [scrollbar-width:none] h-dvh z-50 p-2 bg-background overflow-y-auto">
      {headings.map((heading, index) => (
        <a
          key={index}
          href={`#${heading.id}`}
          className={cn(
            "rounded-sm w-full inline-flex items-center gap-1 text-muted-foreground py-1.5 px-2 text-xs",
            heading.level === 1 && "font-medium text-foreground",
            heading.level === 2 && "w-[95%]",
            heading.level === 3 && "w-[90%]",
            activeHeading === heading.id
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted hover:text-foreground"
          )}
          data-heading-id={heading.id}
          onClick={() => {
            setActiveHeading(heading.id);
          }}
        >
          {heading.text}
        </a>
      ))}
    </div>
  );
};
