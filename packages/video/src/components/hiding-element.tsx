import React from "react";
import { useVideo } from "../context";
import { usePlayPause } from "../hooks/use-play-pause";

export interface HidingElementProps
  extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  className?: string;
}

export const HidingElement = React.forwardRef<
  HTMLDivElement,
  HidingElementProps
>(({ children, className, ...props }: HidingElementProps) => {
  const { videoRef } = useVideo();
  const { isPlaying } = usePlayPause(videoRef, true);
  const { showHidingElement, setShowHidingElement } = useVideo();

  return (
    <div
      data-zuude-hiding-element
      data-show={!isPlaying || showHidingElement}
      className={className}
      onMouseEnter={() => {
        setShowHidingElement?.(true);
      }}
      onMouseLeave={() => {
        setShowHidingElement?.(false);
      }}
      {...props}
    >
      {children}
    </div>
  );
});
