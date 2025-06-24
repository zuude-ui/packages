import React from "react";
import type { VideoConfig, VideoRef } from "../types";

export const useStartAt = (ref: VideoRef, startAt?: VideoConfig["startAt"]) => {
  React.useEffect(() => {
    if (!ref?.current || !startAt) return;

    const video = ref?.current;
    if (video && startAt) {
      video.currentTime = startAt;
    }
  }, [startAt, ref?.current]);
};
