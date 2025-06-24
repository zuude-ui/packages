import React from "react";
import type { VideoRef } from "../types";

export const useShowVideoPaused = (ref: VideoRef, enabled: boolean) => {
  const playCountRef = React.useRef(0);

  React.useEffect(() => {
    const video = ref?.current;

    if (!enabled || !video || video.autoplay !== false) return;

    if (video && playCountRef.current === 0) {
      playCountRef.current++;
      video.muted = true;
      video.play();
      setTimeout(() => {
        video.pause();
      }, 200);
    }
  }, [playCountRef, ref?.current, enabled]);
};
