import React from "react";
import type { VideoRef } from "../types";

export const useRange = (videoRef: VideoRef, range: [number, number]) => {
  React.useEffect(() => {
    if (!videoRef?.current || !range) return;

    const video = videoRef.current;

    if (video) {
      const handleTimeUpdate = () => {
        if (video.currentTime >= range[1]) {
          video.currentTime = range[0];
        } else if (video.currentTime <= range[0]) {
          video.currentTime = range[0];
        }
      };

      video.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [range, videoRef?.current]);
};
