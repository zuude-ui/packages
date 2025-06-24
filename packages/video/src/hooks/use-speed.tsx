import React from "react";
import type { VideoRef } from "../types";

export const useSpeed = (ref: VideoRef, enabled: boolean) => {
  const [speed, setSpeed] = React.useState(1);

  const onChangeSpeed = (speed: number) => {
    setSpeed(speed);
  };

  // Get the speed from the video element
  React.useEffect(() => {
    if (!ref?.current) return;
    setSpeed(ref.current.playbackRate);
  }, [ref?.current]);

  React.useEffect(() => {
    if (!enabled || !ref?.current) return;

    ref.current.playbackRate = speed;
  }, [speed, enabled, ref?.current]);

  return { speed, onChangeSpeed };
};
