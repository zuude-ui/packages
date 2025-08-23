import React from "react";
import type { VideoRef } from "../types.js";

export const useCurrentTime = (videoRef: VideoRef, interval = 10) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);

  React.useEffect(() => {
    if (videoRef?.current && isPlaying) {
      const intervalId = setInterval(() => {
        setCurrentTime(videoRef.current?.currentTime || 0);
      }, interval);

      return () => clearInterval(intervalId);
    }
  }, [videoRef?.current, isPlaying]);

  React.useEffect(() => {
    if (!videoRef?.current) return;

    videoRef.current.addEventListener("play", () => setIsPlaying(true));
    videoRef.current.addEventListener("pause", () => setIsPlaying(false));

    return () => {
      videoRef.current?.removeEventListener("play", () => setIsPlaying(true));
      videoRef.current?.removeEventListener("pause", () => setIsPlaying(false));
    };
  }, [videoRef?.current]);

  const onTimeUpdate = (time: number) => {
    if (videoRef?.current) {
      setCurrentTime(time);
      videoRef.current.currentTime = time;
    }
  };

  return {
    currentTime,
    onTimeUpdate,
  };
};
