import React from "react";
import type { VideoRef } from "../types";

const useFullscreen = (videoRef: VideoRef) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen?.(!!document.fullscreenElement);
      toggleFullscreen();
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [isFullscreen]);

  const toggleFullscreen = () => {
    console.log("toggleFullscreen");
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
        if (video) {
          video.style.objectFit = "contain";
        }
      } else {
        document.exitFullscreen();
        if (video) {
          video.style.objectFit = "cover";
        }
      }
    }
  };

  return { isFullscreen: isFullscreen ?? false, toggleFullscreen };
};

export { useFullscreen };
