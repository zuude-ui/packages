import React from "react";
import { useVideo } from "../context";

export const usePictureInPicture = () => {
  const { videoRef, isPictureInPicture, setIsPictureInPicture } = useVideo();

  React.useEffect(() => {
    const handlePictureInPictureChange = () => {
      setIsPictureInPicture?.(!!document.pictureInPictureElement);
    };

    document.addEventListener(
      "pictureinpicturechange",
      handlePictureInPictureChange
    );
    return () =>
      document.removeEventListener(
        "pictureinpicturechange",
        handlePictureInPictureChange
      );
  }, []);

  const togglePictureInPicture = async () => {
    const video = videoRef?.current;
    if (!video) return;

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await video.requestPictureInPicture();
      }
    } catch (error) {
      // Fallback for browsers that don't support PiP
      const isSafari = /^((?!chrome|android).)*safari/i.test(
        navigator.userAgent
      );

      if (isSafari) {
        if ((video as any).webkitEnterFullscreen) {
          (video as any).webkitEnterFullscreen();
        } else if (video.requestFullscreen) {
          video.requestFullscreen();
        }
      } else {
        const videoContainer = video.closest(
          "[data-zuude-video-wrapper]"
        ) as HTMLElement;
        if (videoContainer) {
          if (!document.fullscreenElement) {
            await videoContainer.requestFullscreen();
          } else {
            await document.exitFullscreen();
          }
        }
      }
    }
  };

  return {
    isPictureInPicture: isPictureInPicture ?? false,
    togglePictureInPicture,
  };
};
