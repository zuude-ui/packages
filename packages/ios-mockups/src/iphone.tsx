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

const buttonColors = {
  // Titanium colors
  "--natural-titanium-button":
    "linear-gradient(180deg, #E0DFDB 1.2%, #FFFFFB 3.2%, #FFFEFA 8.71%, #FCF9F5 12.35%, #E6E4DF 17.38%, #D1CECA 50.59%, #B5B2AD 89.25%, #83817D 92.68%, #A3A19D 95.31%, #D8D5D2 96.5%, #D1CEC9 97.65%, #878580 98.84%)",
  "--blue-titanium-button":
    "linear-gradient(180deg, #A2A2A2 1.2%, #BFC1CB 3.2%, #BBC1C9 8.71%, #8A9199 12.35%, #6D737D 17.38%, #535C6B 50.59%, #545A6B 89.25%, #232B3A 92.68%, #424851 95.31%, #6C727A 96.5%, #7B8188 97.65%, #3E4348 98.84%)",
  "--white-titanium-button":
    "linear-gradient(180deg, #D3D4CF 1.2%, #F9FAF5 3.2%, #FFFEFA 8.71%, #FCF9F5 12.35%, #E3E4DF 17.38%, #E4E3DF 50.59%, #B1AEAB 89.25%, #878582 92.68%, #A6A4A1 95.31%, #D6D3D0 96.5%, #C6C3BF 97.65%, #898784 98.84%)",
  "--black-titanium-button":
    "linear-gradient(180deg, #A2A2A2 1.2%, #D2D2D2 3.2%, #D4D4D4 8.71%, #B7B7B7 12.35%, #868686 17.38%, #6F706B 50.59%, #6C6C6C 54.22%, #424242 89.25%, #1F1F1F 92.68%, #494949 95.31%, #8A8A8A 96.5%, #757575 97.65%, #444 98.84%)",
  // Custom colors
  "--blue-button":
    "linear-gradient(0deg, rgba(165, 178, 186, 0.50) 0%, rgba(165, 178, 186, 0.50) 100%), linear-gradient(180deg, #B7BEC0 1.2%, #F2F9FD 10.34%, #D6DEE1 48.18%, #CDD7DB 87.13%, #B4BFC6 89.84%, #7B8388 92.7%, #7B8588 94.56%, #B7BCBF 98.84%)",
  "--pink-button":
    "linear-gradient(180deg, #C4AEB1 1.2%, #F7DBDE 10.34%, #F7DBDE 48.18%, #F7DBDE 87.13%, #C1ACAE 89.84%, #8A7273 92.7%, #937679 94.56%, #C9B5B8 96.72%, #C1AAAD 98.84%)",
  "--yellow-button":
    "linear-gradient(0deg, rgba(227, 220, 191, 0.25) 0%, rgba(227, 220, 191, 0.25) 100%), linear-gradient(180deg, #C1BBA3 0.71%, #FCF5D8 5.06%, #D6CDB0 50.59%, #D2C9AC 80.21%, #D3CAAD 87.2%, #B3AA8D 89.92%, #958A6C 92.38%, #928769 94.85%, #D8D2BC 97.12%, #BCB392 99.28%)",
  "--green-button":
    "linear-gradient(180deg, #A9B5A5 1.2%, #D4DECF 10.34%, #D4E0CF 48.18%, #D4DECF 87.13%, #A9B7A6 89.84%, #8D998B 92.7%, #8D998B 94.56%, #9AA596 98.84%)",
  "--black-button":
    "linear-gradient(180deg, #333436 0.5%, #A2A6A7 6.47%, #42474A 14.76%, #373B3C 50.59%, #444547 83.69%, #353638 87.63%, #17181A 91.4%, #1D1E20 95.34%, #3F3F41 99.22%)",
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
            width: "100%",
            maxWidth: sizes[size].width,
            "--top-safe-area": `${sizes[size].topSafeArea}px`,
            "--bottom-safe-area": `${sizes[size].bottomSafeArea}px`,
            "--dynamic-island-color": "black",
            "--screen-color": "transparent",
            ...colors,
            ...buttonColors,
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <SmallParticles key={index} index={index} color={color} />
        ))}
        <Buttons color={color} buttonHandlers={buttonHandlers} />
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
  color: IphoneColor;
  buttonHandlers?: IphoneButtonsAction;
}

function Buttons({ color, buttonHandlers }: ButtonsProps) {
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
              background: `var(--${color}-button)`,
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
              background: `var(--${color}-button)`,
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
              background: `var(--${color}-button)`,
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
              background: `var(--${color}-button)`,
              boxShadow:
                "-0.5px 0px 0.5px 0px rgba(0, 0, 0, 0.20) inset, -1px 0px 1px 0px rgba(0, 0, 0, 0.50) inset, 1px 0px 1px 0px rgba(255, 255, 255, 0.50) inset",
            }}
          />
        </button>
      </div>
    </div>
  );
}

export const SmallParticles = ({
  index,
  color,
}: {
  index: number;
  color: IphoneColor;
}) => {
  return (
    <div
      data-iphone-mockup-small-particles
      style={{
        background:
          color === "blue-titanium" || color === "black-titanium"
            ? "rgba(0, 0, 0, 0.1)"
            : "rgba(255, 255, 255, 0.1)",
        top: index === 0 || index === 1 ? "10%" : "auto",
        bottom: index === 2 || index === 3 ? "10%" : "auto",
        left: index === 0 || index === 2 ? 0 : "auto",
        right: index === 1 || index === 3 ? 0 : "auto",
      }}
    ></div>
  );
};

Iphone.displayName = "Iphone";

export { Iphone };
