import { cn } from "./utils";

import type { IphoneSize, IphoneColor, IphoneButtonsAction } from "./types";

export const colors = {
  // Titanium colors
  "--natural-titanium": "linear-gradient(180deg, #EEEAE1 0%, #D1CCC2 100%)",
  "--blue-titanium": "linear-gradient(180deg, #9BA7BD 0%, #5A657B 100%)",
  "--white-titanium": "linear-gradient(180deg, #F9F6F3 0%, #BBB7B3 100%)",
  "--black-titanium": "linear-gradient(180deg, #8B8B89 0%, #6B6B6B 100%)",
  // Custom colors
  "--blue": "linear-gradient(180deg, #DBEAF5 0%, #B1C3C9 100%)",
  "--pink": "linear-gradient(180deg, #FFE4E6 0%, #EEC8C9 100%)",
  "--yellow": "linear-gradient(180deg, #F5EFCD 0%, #EFE8CA 100%)",
  "--green": "linear-gradient(180deg, #DFEBDB 0%, #B7C8B6 100%)",
  "--black": "linear-gradient(180deg, #515558 0%, #3A3F42 100%)",
};

interface IphoneProps {
  children?: React.ReactNode;
  className?: string;
  size?: IphoneSize;
  color?: IphoneColor;
  buttonHandlers?: IphoneButtonsAction;
}

const sizes = {
  sm: {
    width: 300,
    islandWidth: 100,
    topSafeArea: 46,
    bottomSafeArea: 15,
    rounded: 52,
  },
  md: {
    width: 430,
    islandWidth: 125,
    topSafeArea: 60,
    bottomSafeArea: 15,
    rounded: 72,
  },
  lg: {
    width: 500,
    islandWidth: 150,
    topSafeArea: 70,
    bottomSafeArea: 15,
    rounded: 80,
  },
};

export function Iphone({
  children,
  className = "",
  size = "md",
  color = "natural-titanium",
  buttonHandlers,
}: IphoneProps) {
  return (
    <div
      data-zuude-ui-ios-mockup
      className={cn(
        "relative aspect-8/16 max-h-none text-start",
        "[--canvas-color:transparent] [--dynamic-island-color:black]",
        className
      )}
      style={
        {
          width: sizes[size].width,
          "--top-safe-area": `${sizes[size].topSafeArea}px`,
          "--bottom-safe-area": `${sizes[size].bottomSafeArea}px`,
          ...colors,
        } as React.CSSProperties
      }
    >
      <Buttons buttonHandlers={buttonHandlers} />
      <div
        className="relative aspect-8/16 overflow-hidden w-full p-[5.5px]"
        style={{
          background: `var(--${color})`,
          boxShadow:
            "0px 0px 2px 2px rgba(0, 0, 0, 0.20) inset, 0px 0px 3px 2px rgba(0, 0, 0, 0.40) inset",
          borderRadius: sizes[size].rounded,
        }}
      >
        <div
          className="h-full w-full rounded-[67px] border-2 border-black bg-black p-2.5"
          style={{
            boxShadow:
              "0px 0px 3px 1px rgba(255, 255, 255, 0.25), 0px 0px 0.5px 2px #3C3C3C inset",
            borderRadius: sizes[size].rounded - 5,
          }}
        >
          <div
            data-canvas
            className="relative h-full w-full overflow-hidden bg-[var(--canvas-color)]"
            style={{
              borderRadius: sizes[size].rounded - 16,
            }}
          >
            <div
              data-top-safe-area
              className={cn(
                "absolute top-0 right-0 left-0 z-30 flex h-[var(--top-safe-area)] items-center justify-center"
              )}
            >
              <div
                className="aspect-[6.7/2] rounded-full bg-[var(--dynamic-island-color)] transition-colors"
                style={{
                  width: sizes[size].islandWidth,
                }}
              ></div>
            </div>
            <div
              data-zuude-ui-ios-mockup-content
              className="no-scrollbar h-full overflow-auto"
            >
              {children}
            </div>
            <div
              data-bottom-safe-area
              className="absolute right-0 bottom-0 left-0 z-30 flex h-[var(--bottom-safe-area)] w-full items-center justify-center"
            >
              <div className="h-1 w-2/6 rounded-full bg-[var(--dynamic-island-color)] transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ButtonsProps {
  buttonHandlers?: IphoneButtonsAction;
}

function Buttons({ buttonHandlers }: ButtonsProps) {
  return (
    <div
      className={cn(
        "[&_button]:transition-transform [&_button]:duration-300 [&_button]:hover:scale-x-150 [&_button]:active:scale-x-80 [&_button]:active:duration-100",
        "[&_button]:disabled:pointer-events-none"
      )}
    >
      <div className="absolute top-[15%] left-0 z-20 -translate-x-[11.8px]">
        <button
          data-action-button
          className="relative mb-9 flex w-3 origin-right justify-end will-change-transform"
          onClick={buttonHandlers?.action}
          disabled={!buttonHandlers?.action}
        >
          <div
            className="h-9 w-1 rounded-l-[1.5px] border border-r-0 border-black/25"
            style={{
              background:
                "linear-gradient(180deg, #E0DFDB 1.2%, #FFFFFB 3.2%, #FFFEFA 8.71%, #FCF9F5 12.35%, #E6E4DF 17.38%, #D1CECA 50.59%, #B5B2AD 89.25%, #83817D 92.68%, #A3A19D 95.31%, #D8D5D2 96.5%, #D1CEC9 97.65%, #878580 98.84%)",
              boxShadow:
                "-0.5px 0px 0.5px 0px rgba(0, 0, 0, 0.20) inset, -1px 0px 1px 0px rgba(0, 0, 0, 0.50) inset, 1px 0px 1px 0px rgba(255, 255, 255, 0.50) inset",
            }}
          />
        </button>
        <button
          data-volume-up-button
          className="mb-5 flex w-3 origin-right justify-end will-change-transform"
          onClick={buttonHandlers?.volumeUp}
          disabled={!buttonHandlers?.volumeUp}
        >
          <div
            className="h-17 w-1 rounded-l-[1.5px] border border-r-0 border-black/25"
            style={{
              background:
                "linear-gradient(180deg, #E0DFDB 1.2%, #FFFFFB 3.2%, #FFFEFA 8.71%, #FCF9F5 12.35%, #E6E4DF 17.38%, #D1CECA 50.59%, #B5B2AD 89.25%, #83817D 92.68%, #A3A19D 95.31%, #D8D5D2 96.5%, #D1CEC9 97.65%, #878580 98.84%)",
              boxShadow:
                "-0.5px 0px 0.5px 0px rgba(0, 0, 0, 0.20) inset, -1px 0px 1px 0px rgba(0, 0, 0, 0.50) inset, 1px 0px 1px 0px rgba(255, 255, 255, 0.50) inset",
            }}
          />
        </button>
        <button
          data-volume-down-button
          className="flex w-3 origin-right justify-end will-change-transform"
          onClick={buttonHandlers?.volumeDown}
          disabled={!buttonHandlers?.volumeDown}
        >
          <div
            className="h-17 w-1 rounded-l-[1.5px] border border-r-0 border-black/25"
            style={{
              background:
                "linear-gradient(180deg, #E0DFDB 1.2%, #FFFFFB 3.2%, #FFFEFA 8.71%, #FCF9F5 12.35%, #E6E4DF 17.38%, #D1CECA 50.59%, #B5B2AD 89.25%, #83817D 92.68%, #A3A19D 95.31%, #D8D5D2 96.5%, #D1CEC9 97.65%, #878580 98.84%)",
              boxShadow:
                "-0.5px 0px 0.5px 0px rgba(0, 0, 0, 0.20) inset, -1px 0px 1px 0px rgba(0, 0, 0, 0.50) inset, 1px 0px 1px 0px rgba(255, 255, 255, 0.50) inset",
            }}
          />
        </button>
      </div>
      <div className="absolute top-[25%] right-0 z-20 translate-x-[16px]">
        <button
          data-power-button
          className="block w-4 origin-left will-change-transform"
          onClick={buttonHandlers?.power}
          disabled={!buttonHandlers?.power}
        >
          <div
            className="h-26 w-1 rounded-r-[1.5px] border border-l-0 border-black/25"
            style={{
              background:
                "linear-gradient(180deg, #E0DFDB 1.2%, #FFFFFB 3.2%, #FFFEFA 8.71%, #FCF9F5 12.35%, #E6E4DF 17.38%, #D1CECA 50.59%, #B5B2AD 89.25%, #83817D 92.68%, #A3A19D 95.31%, #D8D5D2 96.5%, #D1CEC9 97.65%, #878580 98.84%)",
              boxShadow:
                "-0.5px 0px 0.5px 0px rgba(0, 0, 0, 0.20) inset, -1px 0px 1px 0px rgba(0, 0, 0, 0.50) inset, 1px 0px 1px 0px rgba(255, 255, 255, 0.50) inset",
            }}
          />
        </button>
      </div>
    </div>
  );
}
