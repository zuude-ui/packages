import React from "react";
import type { VideoRef } from "../types";

export const useMuteUnmute = (videoRef: VideoRef) => {
  const [isMuted, setIsMuted] = React.useState(false);

  const toggleMute = React.useCallback(() => {
    if (videoRef?.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  }, [videoRef?.current]);

  const mute = React.useCallback(() => {
    if (videoRef?.current) {
      videoRef.current.muted = true;
    }
  }, [videoRef?.current]);

  const unmute = React.useCallback(() => {
    if (videoRef?.current) {
      videoRef.current.muted = false;
    }
  }, [videoRef?.current]);

  React.useEffect(() => {
    if (!videoRef?.current) return;

    // Set the initial state
    setIsMuted(videoRef.current.muted);

    const handleVolumeChange = () => {
      if (videoRef.current) {
        setIsMuted(videoRef.current.muted);
      }
    };

    videoRef.current.addEventListener("volumechange", handleVolumeChange);

    return () => {
      videoRef.current?.removeEventListener("volumechange", handleVolumeChange);
    };
  }, [videoRef?.current]);

  return { toggleMute, isMuted, mute, unmute };
};
