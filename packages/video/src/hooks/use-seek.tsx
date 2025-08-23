import React from "react";
import type { VideoRef } from "../types";

export const useSeek = (videoRef: VideoRef, value = 10) => {
  const seekForward = React.useCallback(() => {
    if (videoRef?.current) {
      videoRef.current.currentTime += value;
    }
  }, [videoRef?.current]);

  const seekBackward = React.useCallback(() => {
    if (videoRef?.current) {
      videoRef.current.currentTime -= value;
    }
  }, [videoRef?.current]);

  return { seekForward, seekBackward };
};
