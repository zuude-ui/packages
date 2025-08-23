import React from "react";
import type { VideoRef } from "../types";

export const useGetDuration = (videoRef: VideoRef) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [duration, setDuration] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!videoRef?.current) return;

    setIsLoading(true);

    const getDuration = () => {
      setDuration(videoRef.current?.duration ?? null);
      setIsLoading(false);
    };

    const handleError = () => {
      setIsLoading(false);
    };

    const video = videoRef.current;

    // Check if duration is already available
    if (video.duration && !isNaN(video.duration)) {
      setDuration(video.duration);
      setIsLoading(false);
    } else {
      // Add event listeners
      video.addEventListener("loadedmetadata", getDuration);
      video.addEventListener("error", handleError);
      video.addEventListener("loadeddata", getDuration);

      return () => {
        video.removeEventListener("loadedmetadata", getDuration);
        video.removeEventListener("error", handleError);
        video.removeEventListener("loadeddata", getDuration);
      };
    }
  }, [videoRef]);

  return { duration, isLoading };
};
