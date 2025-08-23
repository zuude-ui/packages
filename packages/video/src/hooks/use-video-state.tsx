import { RefObject, useEffect, useState } from "react";

const useVideoState = (videoRef: RefObject<HTMLVideoElement | null>) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.addEventListener("play", () => setIsPlaying(true));
      video.addEventListener("pause", () => setIsPlaying(false));

      return () => {
        video.removeEventListener("play", () => setIsPlaying(true));
        video.removeEventListener("pause", () => setIsPlaying(false));
      };
    }
  }, [videoRef]);

  useEffect(() => {
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
  }, [videoRef]);

  useEffect(() => {
    if (!videoRef?.current) return;

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [videoRef]);

  return { isPlaying, isMuted, isFullscreen };
};

export { useVideoState };
