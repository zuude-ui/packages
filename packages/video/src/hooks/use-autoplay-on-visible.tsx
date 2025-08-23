import React from "react";
import type { VideoRef } from "../types";

export const useAutoplayOnVisible = (
  videoRef: VideoRef,
  threshold: number | undefined,
  enabled: boolean | number | null | undefined
) => {
  React.useEffect(() => {
    if (!enabled || !videoRef?.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!videoRef?.current) return;

          if (entry.isIntersecting) {
            videoRef.current.play().catch((error) => {
              if (!videoRef.current) return;

              videoRef.current.pause();
              videoRef.current.muted = true;
              videoRef.current.play();
              console.error(error);
            });
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: threshold ?? 0.5 }
    );

    observer.observe(videoRef?.current);

    return () => {
      observer.disconnect();
    };
  }, [enabled, videoRef?.current]);
};
