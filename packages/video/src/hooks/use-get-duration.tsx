import React from "react";
import { VideoRef } from "../types.js";

export const useGetDuration = (ref: VideoRef) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [duration, setDuration] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!ref?.current) return;
    setIsLoading(true);

    ref.current.addEventListener("loadedmetadata", () => {
      setDuration(ref.current?.duration ?? null);
      setIsLoading(false);
    });

    ref.current.addEventListener("error", () => {
      setIsLoading(false);
    });

    return () => {
      ref.current?.removeEventListener("loadedmetadata", () => {});
      ref.current?.removeEventListener("error", () => {});
    };
  }, [ref?.current]);

  return { duration, isLoading };
};
