import React from "react";
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

interface IphoneProps extends React.ComponentProps<"div"> {
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

const Iphone = React.forwardRef<HTMLDivElement, IphoneProps>(
  (
    {
      children,
      className = "",
      size = "md",
      color = "natural-titanium",
      buttonHandlers,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        data-iphone-mockup
        className={cn("reset-styles", className)}
        style={
          {
            width: sizes[size].width,
            "--top-safe-area": `${sizes[size].topSafeArea}px`,
            "--bottom-safe-area": `${sizes[size].bottomSafeArea}px`,
            "--dynamic-island-color": "black",
            "--screen-color": "transparent",
            ...colors,
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        <Buttons buttonHandlers={buttonHandlers} />
        <div
          data-iphone-mockup-body
          className="reset-styles"
          style={{
            background: `var(--${color})`,
            boxShadow:
              "0px 0px 2px 2px rgba(0, 0, 0, 0.20) inset, 0px 0px 3px 2px rgba(0, 0, 0, 0.40) inset",
            borderRadius: sizes[size].rounded,
          }}
        >
          <div
            data-iphone-mockup-body-inner
            className="reset-styles"
            style={{
              boxShadow:
                "0px 0px 3px 1px rgba(255, 255, 255, 0.25), 0px 0px 0.5px 2px #3C3C3C inset",
              borderRadius: sizes[size].rounded - 5,
            }}
          >
            <div
              data-screen
              data-iphone-mockup-screen
              className="reset-styles"
              style={{
                borderRadius: sizes[size].rounded - 16,
                background: "var(--screen-color)",
              }}
            >
              <div data-iphone-mockup-top-safe-area>
                <div
                  data-iphone-mockup-dynamic-island
                  style={{
                    width: sizes[size].islandWidth,
                    background: "var(--dynamic-island-color)",
                  }}
                ></div>
              </div>
              <div data-iphone-mockup-content>{children}</div>
              <div data-iphone-mockup-bottom-safe-area>
                <div
                  data-iphone-mockup-home-button
                  style={{
                    background: "var(--dynamic-island-color)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

interface ButtonsProps {
  buttonHandlers?: IphoneButtonsAction;
}

function Buttons({ buttonHandlers }: ButtonsProps) {
  return (
    <div data-iphone-mockup-buttons>
      <div data-iphone-mockup-buttons-left>
        <button
          data-iphone-mockup-action-button
          onClick={buttonHandlers?.action}
          disabled={!buttonHandlers?.action}
        >
          <div
            style={{
              height: 36,
              width: 4,
              borderRadius: "1.5px 0 0 1.5px",
              border: "1px solid #00000025",
              borderRight: "none",
              background:
                "linear-gradient(180deg, #E0DFDB 1.2%, #FFFFFB 3.2%, #FFFEFA 8.71%, #FCF9F5 12.35%, #E6E4DF 17.38%, #D1CECA 50.59%, #B5B2AD 89.25%, #83817D 92.68%, #A3A19D 95.31%, #D8D5D2 96.5%, #D1CEC9 97.65%, #878580 98.84%)",
              boxShadow:
                "-0.5px 0px 0.5px 0px rgba(0, 0, 0, 0.20) inset, -1px 0px 1px 0px rgba(0, 0, 0, 0.50) inset, 1px 0px 1px 0px rgba(255, 255, 255, 0.50) inset",
            }}
          />
        </button>
        <button
          data-iphone-mockup-volume-up-button
          onClick={buttonHandlers?.volumeUp}
          disabled={!buttonHandlers?.volumeUp}
        >
          <div
            style={{
              height: 68,
              width: 4,
              borderRadius: "1.5px 0 0 1.5px",
              border: "1px solid #00000025",
              borderRight: "none",
              background:
                "linear-gradient(180deg, #E0DFDB 1.2%, #FFFFFB 3.2%, #FFFEFA 8.71%, #FCF9F5 12.35%, #E6E4DF 17.38%, #D1CECA 50.59%, #B5B2AD 89.25%, #83817D 92.68%, #A3A19D 95.31%, #D8D5D2 96.5%, #D1CEC9 97.65%, #878580 98.84%)",
              boxShadow:
                "-0.5px 0px 0.5px 0px rgba(0, 0, 0, 0.20) inset, -1px 0px 1px 0px rgba(0, 0, 0, 0.50) inset, 1px 0px 1px 0px rgba(255, 255, 255, 0.50) inset",
            }}
          />
        </button>
        <button
          data-iphone-mockup-volume-down-button
          onClick={buttonHandlers?.volumeDown}
          disabled={!buttonHandlers?.volumeDown}
        >
          <div
            style={{
              height: 68,
              width: 4,
              borderRadius: "1.5px 0 0 1.5px",
              border: "1px solid #00000025",
              borderRight: "none",
              background:
                "linear-gradient(180deg, #E0DFDB 1.2%, #FFFFFB 3.2%, #FFFEFA 8.71%, #FCF9F5 12.35%, #E6E4DF 17.38%, #D1CECA 50.59%, #B5B2AD 89.25%, #83817D 92.68%, #A3A19D 95.31%, #D8D5D2 96.5%, #D1CEC9 97.65%, #878580 98.84%)",
              boxShadow:
                "-0.5px 0px 0.5px 0px rgba(0, 0, 0, 0.20) inset, -1px 0px 1px 0px rgba(0, 0, 0, 0.50) inset, 1px 0px 1px 0px rgba(255, 255, 255, 0.50) inset",
            }}
          />
        </button>
      </div>
      <div data-iphone-mockup-buttons-right>
        <button
          data-iphone-mockup-power-button
          onClick={buttonHandlers?.power}
          disabled={!buttonHandlers?.power}
        >
          <div
            style={{
              height: 104,
              width: 4,
              borderRadius: "0 1.5px 1.5px 0",
              border: "1px solid #00000025",
              borderLeft: "none",
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

Iphone.displayName = "Iphone";

export { Iphone };
