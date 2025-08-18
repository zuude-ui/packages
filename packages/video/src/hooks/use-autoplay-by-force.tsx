import React from "react";
import { VideoRef } from "../types.js";

export const useAutoplayByForce = (
  ref: VideoRef | null,
  enabled: boolean,
  setError?: (error: string | null) => void
) => {
  React.useEffect(() => {
    if (!ref?.current || !enabled) return;

    const playVideo = async () => {
      try {
        await ref.current?.play();
      } catch (error) {
        // If autoplay fails, try muting and playing again
        if (error instanceof Error && error.name === "NotAllowedError") {
          setError?.("NotAllowedError");
          console.error("NotAllowedError");
          if (ref?.current) {
            ref.current.muted = true;
            try {
              await ref.current.play();
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
  }, [enabled, ref?.current]);
};
