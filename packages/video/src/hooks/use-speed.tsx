import React from "react";
import type { VideoRef } from "../types";

export const useSpeed = (videoRef: VideoRef) => {
  const [speed, setSpeed] = React.useState(1);

  const onChangeSpeed = (speed: number) => {
    setSpeed(speed);
  };

  // Get the speed from the video element
  React.useEffect(() => {
    if (!videoRef?.current) return;
    setSpeed(videoRef.current.playbackRate);
  }, [videoRef?.current]);

  React.useEffect(() => {
    if (!videoRef?.current) return;

    videoRef.current.playbackRate = speed;
  }, [speed, videoRef?.current]);

  return { speed, onChangeSpeed };
};
