import { cn } from "./utils";

interface GridProps {
  active: boolean;
}

export function Grid({ active }: GridProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 duration-300",
        active ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="absolute inset-0 flex flex-col">
        <div className="flex-1 self-stretch border-b-[0.5px] border-white/90"></div>
        <div className="flex-1 self-stretch border-b-[0.5px] border-white/90"></div>
        <div className="flex-1 self-stretch"></div>
      </div>
      <div className="absolute inset-0 flex">
        <div className="flex-1 self-stretch border-r-[0.5px] border-white/90"></div>
        <div className="flex-1 self-stretch border-r-[0.5px] border-white/90"></div>
        <div className="flex-1 self-stretch"></div>
      </div>
    </div>
  );
}
