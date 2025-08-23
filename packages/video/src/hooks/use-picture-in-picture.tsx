import type { VideoRef } from "../types";

export const usePictureInPicture = (videoRef: VideoRef) => {
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

  const requestPictureInPicture = async () => {
    const video = videoRef?.current;
    if (!video) return;
    await video.requestPictureInPicture();
  };

  const exitPictureInPicture = async () => {
    const video = videoRef?.current;
    if (!video) return;
    await document.exitPictureInPicture();
  };

  return {
    togglePictureInPicture,
    requestPictureInPicture,
    exitPictureInPicture,
  };
};
