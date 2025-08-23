import React from "react";
import type { VideoRef } from "../types";

export const useStartAt = (videoRef: VideoRef, startAt: number) => {
  React.useEffect(() => {
    if (!videoRef?.current || !startAt) return;

    const video = videoRef?.current;
    if (video && startAt) {
      video.currentTime = startAt;
    }
  }, [startAt, videoRef?.current]);
};
