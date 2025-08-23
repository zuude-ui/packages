import React from "react";
import type { VideoRef } from "../types";

export const useAutoplayByForce = (
  videoRef: VideoRef,
  enabled: boolean,
  setError?: (error: string | null) => void
) => {
  React.useEffect(() => {
    if (!videoRef?.current || !enabled) return;

    const playVideo = async () => {
      try {
        await videoRef.current?.play();
      } catch (error) {
        // If autoplay fails, try muting and playing again
        if (error instanceof Error && error.name === "NotAllowedError") {
          setError?.("NotAllowedError");
          console.error("NotAllowedError");
          if (videoRef?.current) {
            videoRef.current.muted = true;
            try {
              await videoRef.current.play();
            } catch (retryError) {
              console.error(retryError);
            }
          }
        } else {
          console.error(error);
        }
      }
    };

    playVideo();
  }, [enabled, videoRef?.current]);
};
