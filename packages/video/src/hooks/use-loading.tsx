import React from "react";
import type { VideoRef } from "../types";

export const useLoading = (videoRef: VideoRef) => {
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!videoRef?.current) return;

    const video = videoRef.current;

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    const handleLoadedMetadata = () => {
      // Metadata loaded but video might not be ready to play yet
      // Keep loading true until canplay
    };

    const handleLoadedData = () => {
      // First frame loaded, but might still be buffering
      // Keep loading true until canplay
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleCanPlayThrough = () => {
      setIsLoading(false);
    };

    const handleWaiting = () => {
      // Video is waiting for data (buffering)
      setIsLoading(true);
    };

    const handlePlaying = () => {
      // Video is playing, so it's not loading anymore
      setIsLoading(false);
    };

    const handleError = () => {
      setIsLoading(false);
    };

    const handleAbort = () => {
      setIsLoading(false);
    };

    const handleSuspend = () => {
      // Loading suspended (e.g., user paused)
      // Don't change loading state here
    };

    // Add event listeners
    video.addEventListener("loadstart", handleLoadStart);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("canplaythrough", handleCanPlayThrough);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("error", handleError);
    video.addEventListener("abort", handleAbort);
    video.addEventListener("suspend", handleSuspend);

    // Check initial state
    if (video.readyState >= 2) {
      setIsLoading(false);
    }

    return () => {
      // Remove event listeners
      video.removeEventListener("loadstart", handleLoadStart);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("canplaythrough", handleCanPlayThrough);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("error", handleError);
      video.removeEventListener("abort", handleAbort);
      video.removeEventListener("suspend", handleSuspend);
    };
  }, [videoRef]);

  return { isLoading };
};
