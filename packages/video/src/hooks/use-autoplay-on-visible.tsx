import React from "react";
import type { VideoRef } from "../types";

export const useAutoplayOnVisible = (
  ref: VideoRef,
  threshold: number | undefined,
  enabled: boolean | number | null | undefined
) => {
  React.useEffect(() => {
    if (!enabled || !ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!ref.current) return;

          if (entry.isIntersecting) {
            ref.current.play().catch((error) => {
              if (!ref.current) return;

              ref.current.pause();
              ref.current.muted = true;
              ref.current.play();
              console.error(error);
            });
          } else {
            ref.current?.pause();
          }
        });
      },
      { threshold: threshold ?? 0.5 }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [enabled, ref.current]);
};
