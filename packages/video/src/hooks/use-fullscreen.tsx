import React from "react";
import { useVideo } from "../context";

export const useFullscreen = () => {
  const { videoRef, isFullscreen, setIsFullscreen } = useVideo();

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen?.(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

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

    const videoContainer = videoRef?.current?.closest(
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
