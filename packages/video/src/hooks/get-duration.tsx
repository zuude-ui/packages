import React from "react";
import { useVideo } from "../context";

export const useGetDuration = (url: string) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [duration, setDuration] = React.useState<number | null>(null);

  const { ref } = useVideo();

  React.useEffect(() => {
    if (!ref.current) return;

    setIsLoading(true);

    const video = document.createElement("video");

    video.src = url;
    video.muted = true;

    video.addEventListener("loadedmetadata", () => {
      setDuration(video.duration);
      setIsLoading(false);
    });

    video.addEventListener("error", () => {
      setIsLoading(false);
    });

    return () => {
      video.remove();
    };
  }, [url]);

  return { duration, isLoading };
};
