import { RefObject, useEffect, useState } from "react";

const useVideoState = (videoRef: RefObject<HTMLVideoElement | null>) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.addEventListener("play", () => setIsPlaying(true));
      video.addEventListener("pause", () => setIsPlaying(false));

      return () => {
        video.removeEventListener("play", () => setIsPlaying(true));
        video.removeEventListener("pause", () => setIsPlaying(false));
      };
    }
  }, [videoRef]);

  return { isPlaying };
};

export { useVideoState };
