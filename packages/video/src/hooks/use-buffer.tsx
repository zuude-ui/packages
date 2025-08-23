import React from "react";
import type { VideoRef } from "../types.js";

export const useBuffer = (videoRef: VideoRef, duration?: number) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [buffered, setBuffered] = React.useState(0);

  React.useEffect(() => {
    if (videoRef?.current && isPlaying) {
      const intervalId = setInterval(() => {
        if (videoRef.current?.buffered.length) {
          setBuffered(
            videoRef.current.buffered.end(videoRef.current.buffered.length - 1)
          );
        }
      }, 10);

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
  }, []);

  return {
    buffered,
    bufferedPercentage: (buffered / (duration || 0)) * 100 || 0,
  };
};
