import React from "react";
import { useVideo } from "../context";

export const useTimeline = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [buffered, setBuffered] = React.useState(0);

  const { ref, duration } = useVideo();

  React.useEffect(() => {
    if (ref.current && isPlaying) {
      const intervalId = setInterval(() => {
        setCurrentTime(ref.current?.currentTime || 0);

        if (ref.current?.buffered.length) {
          setBuffered(
            ref.current.buffered.end(ref.current.buffered.length - 1)
          );
        }
      }, 10);

      return () => clearInterval(intervalId);
    }
  }, [ref.current, isPlaying]);

  React.useEffect(() => {
    if (!ref.current) return;

    ref.current.addEventListener("play", () => setIsPlaying(true));
    ref.current.addEventListener("pause", () => setIsPlaying(false));

    return () => {
      ref.current?.removeEventListener("play", () => setIsPlaying(true));
      ref.current?.removeEventListener("pause", () => setIsPlaying(false));
    };
  }, []);

  return {
    currentTime,
    duration,
    buffered,
    setCurrentTime,
  };
};
