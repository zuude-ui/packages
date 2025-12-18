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

    const video = videoRef.current;

    // Store handlers in variables for proper cleanup (critical for Safari memory safety)
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
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
