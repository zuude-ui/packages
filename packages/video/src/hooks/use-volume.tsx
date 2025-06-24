import React from "react";
import { useVideo } from "../context";

export const useVolume = () => {
  const [volume, setVolume] = React.useState(100);
  const { videoRef } = useVideo();

  const onChangeVolume = (volume: number) => {
    setVolume(volume);
  };

  // Get the volume from the video element
  React.useEffect(() => {
    if (!videoRef?.current) return;
    setVolume(videoRef.current.volume * 100);
  }, [videoRef?.current]);

  React.useEffect(() => {
    if (!videoRef?.current) return;

    videoRef.current.volume = volume / 100;
  }, [volume, videoRef?.current]);

  return { volume, onChangeVolume };
};
