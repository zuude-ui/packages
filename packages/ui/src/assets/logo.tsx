import { cn } from "../lib/utils";

interface Props {
  className?: string;
}

export function Logo({ className, ...props }: Props) {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("rounded-sm", className)}
      {...props}
    >
      <rect width="100" height="100" fill="var(--foreground)" />
      <path
        d="M15.5 31.9708C15.5 25.8956 20.4249 20.9708 26.5 20.9708H73.5C79.5751 20.9708 84.5 25.8956 84.5 31.9708V31.9708H15.5V31.9708Z"
        fill="var(--background)"
      />
      <path
        d="M15.5 68.0292H84.5V68.0292C84.5 74.1044 79.5751 79.0292 73.5 79.0292H26.5C20.4249 79.0292 15.5 74.1044 15.5 68.0292V68.0292Z"
        fill="var(--background)"
      />
      <path
        d="M84.5 31.9708C86.8461 39.8692 82.3451 48.1741 74.4466 50.5202L15.5005 68.0292V68.0292C13.1544 60.1308 17.6554 51.8259 25.5539 49.4798L84.5 31.9708V31.9708Z"
        fill="var(--background)"
      />
    </svg>
  );
}
