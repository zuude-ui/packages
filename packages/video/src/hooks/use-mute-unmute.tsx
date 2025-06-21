import React from "react";
import type { VideoRef } from "../types";

export const useMuteUnmute = (ref: VideoRef, enabled: boolean) => {
  const [isMuted, setIsMuted] = React.useState(false);

  const toggleMute = React.useCallback(() => {
    if (ref?.current) {
      ref.current.muted = !ref.current.muted;
    }
  }, [ref.current]);

  React.useEffect(() => {
    if (!enabled || !ref.current) return;

    // Set the initial state
    setIsMuted(ref.current.muted);

    const handleVolumeChange = () => {
      if (ref.current) {
        setIsMuted(ref.current.muted);
      }
    };

    ref.current.addEventListener("volumechange", handleVolumeChange);

    return () => {
      ref.current?.removeEventListener("volumechange", handleVolumeChange);
    };
  }, [ref.current, enabled]);

  return { toggleMute, isMuted };
};
