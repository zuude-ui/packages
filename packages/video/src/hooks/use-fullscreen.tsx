import React from "react";
import type { VideoRef } from "../types";

const useFullscreen = (videoRef: VideoRef) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  React.useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    const videoContainer = video.closest(
      "[data-zuude-video-wrapper]"
    ) as HTMLElement | null;

    // Helper to get fullscreen element with vendor prefix support
    const getFullscreenElement = (): Element | null => {
      return (
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement ||
        null
      );
    };

    const checkFullscreenState = () => {
      // Check if the container element is the fullscreen element
      const fullscreenElement = getFullscreenElement();
      const isCurrentlyFullscreen =
        !!fullscreenElement &&
        (fullscreenElement === videoContainer || fullscreenElement === video);

      setIsFullscreen(isCurrentlyFullscreen);

      // Apply styles based on fullscreen state
      if (video) {
        console.log({ isCurrentlyFullscreen });
        if (isCurrentlyFullscreen) {
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
          video.style.objectFit = "";
          video.style.borderRadius = "";
          video.style.width = "";
          video.style.height = "";
          video.style.maxWidth = "";
          video.style.maxHeight = "";
          video.style.margin = "";
        }
      }
    };

    // Check initial state
    checkFullscreenState();

    // Listen for fullscreen changes
    document.addEventListener("fullscreenchange", checkFullscreenState);

    // Also listen for vendor-prefixed events for better browser support
    document.addEventListener("webkitfullscreenchange", checkFullscreenState);
    document.addEventListener("mozfullscreenchange", checkFullscreenState);
    document.addEventListener("MSFullscreenChange", checkFullscreenState);

    return () => {
      document.removeEventListener("fullscreenchange", checkFullscreenState);
      document.removeEventListener(
        "webkitfullscreenchange",
        checkFullscreenState
      );
      document.removeEventListener("mozfullscreenchange", checkFullscreenState);
      document.removeEventListener("MSFullscreenChange", checkFullscreenState);
    };
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
        console.log({ objectFit: video?.style.objectFit });
        console.log({ objectFit: video?.style });
        videoContainer.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  return { isFullscreen: isFullscreen ?? false, toggleFullscreen };
};

export { useFullscreen };
