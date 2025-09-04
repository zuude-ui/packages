import React from "react";
import type { VideoRef } from "../types";

const useFullscreen = (videoRef: VideoRef) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const previousStylesRef = React.useRef<{
    objectFit: string;
    borderRadius: string;
    width: string;
    height: string;
    maxWidth: string;
    maxHeight: string;
    margin: string;
  } | null>(null);

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isCurrentlyFullscreen);

      // Apply styles based on fullscreen state
      const video = videoRef?.current;
      if (video) {
        if (isCurrentlyFullscreen) {
          // Store previous styles before entering fullscreen
          previousStylesRef.current = {
            objectFit: video.style.objectFit || "cover",
            borderRadius: video.style.borderRadius || "",
            width: video.style.width || "",
            height: video.style.height || "",
            maxWidth: video.style.maxWidth || "",
            maxHeight: video.style.maxHeight || "",
            margin: video.style.margin || "",
          };
          // Apply fullscreen styles
          video.style.objectFit = "contain";
          video.style.borderRadius = "0";
          video.style.width = "100%";
          video.style.height = "100%";
          video.style.maxWidth = "none";
          video.style.maxHeight = "none";
          video.style.margin = "0";
        } else {
          // Restore previous styles when exiting fullscreen
          if (previousStylesRef.current) {
            video.style.objectFit = previousStylesRef.current.objectFit;
            video.style.borderRadius = previousStylesRef.current.borderRadius;
            video.style.width = previousStylesRef.current.width;
            video.style.height = previousStylesRef.current.height;
            video.style.maxWidth = previousStylesRef.current.maxWidth;
            video.style.maxHeight = previousStylesRef.current.maxHeight;
            video.style.margin = previousStylesRef.current.margin;
            previousStylesRef.current = null;
          }
        }
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [videoRef]);

  const toggleFullscreen = () => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const video = videoRef?.current;

    if (video && isSafari) {
      if ((video as any).webkitEnterFullscreen) {
        (video as any).webkitEnterFullscreen();
        return;
      } else if (video.requestFullscreen) {
        video.requestFullscreen();
        return;
      }
    }

    const videoContainer = video?.closest(
      "[data-zuude-video-wrapper]"
    ) as HTMLElement;

    if (videoContainer) {
      if (!isFullscreen) {
        videoContainer.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  return { isFullscreen: isFullscreen ?? false, toggleFullscreen };
};

export { useFullscreen };
