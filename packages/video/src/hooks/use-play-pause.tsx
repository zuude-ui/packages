import React from "react";
import type { VideoRef } from "../types";

export const usePlayPause = (videoRef: VideoRef) => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  const togglePlay = React.useCallback(() => {
    if (videoRef?.current) {
      videoRef.current.paused
        ? videoRef.current.play()
        : videoRef.current.pause();
    }
  }, [videoRef?.current]);

  const play = React.useCallback(() => {
    if (videoRef?.current) {
      videoRef.current.play();
    }
  }, [videoRef?.current]);

  const pause = React.useCallback(() => {
    if (videoRef?.current) {
      videoRef.current.pause();
    }
  }, [videoRef?.current]);

  React.useEffect(() => {
    if (!videoRef?.current) return;

    const handlePlay = () => {
      setIsPlaying(true);
    };
    const handlePause = () => {
      setIsPlaying(false);
    };

    setIsPlaying(!videoRef?.current.paused);

    if (videoRef?.current) {
      videoRef.current.addEventListener("play", handlePlay);
      videoRef.current.addEventListener("pause", handlePause);

      return () => {
        videoRef.current?.removeEventListener("play", handlePlay);
        videoRef.current?.removeEventListener("pause", handlePause);
      };
    }
  }, [videoRef?.current]);

  return { togglePlay, isPlaying, play, pause };
};
