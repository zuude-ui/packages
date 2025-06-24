import React from "react";
import { useVideo } from "../context";

export const useTimeline = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [buffered, setBuffered] = React.useState(0);

  const { videoRef, duration } = useVideo();

  React.useEffect(() => {
    if (videoRef?.current && isPlaying) {
      const intervalId = setInterval(() => {
        setCurrentTime(videoRef.current?.currentTime || 0);

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
    currentTime,
    duration,
    buffered,
    setCurrentTime,
  };
};
