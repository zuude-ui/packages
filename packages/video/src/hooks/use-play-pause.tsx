import React from "react";
import type { VideoRef } from "../types";

export const usePlayPause = (ref: VideoRef, enabled: boolean) => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  const togglePlay = React.useCallback(() => {
    console.log(ref?.current);
    if (ref?.current) {
      ref.current.paused ? ref.current.play() : ref.current.pause();
    }
  }, [ref?.current]);

  React.useEffect(() => {
    if (!enabled || !ref?.current) return;

    const handlePlay = () => {
      setIsPlaying(true);
    };
    const handlePause = () => {
      setIsPlaying(false);
    };

    setIsPlaying(!ref?.current.paused);

    if (ref?.current) {
      ref.current.addEventListener("play", handlePlay);
      ref.current.addEventListener("pause", handlePause);

      return () => {
        ref.current?.removeEventListener("play", handlePlay);
        ref.current?.removeEventListener("pause", handlePause);
      };
    }
  }, [ref?.current, enabled]);

  return { togglePlay, isPlaying };
};
