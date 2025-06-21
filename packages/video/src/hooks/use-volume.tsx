import React from "react";
import { useVideo } from "../context";

export const useVolume = () => {
  const [volume, setVolume] = React.useState(100);
  const { ref } = useVideo();

  const onChangeVolume = (volume: number) => {
    setVolume(volume);
  };

  React.useEffect(() => {
    if (!ref.current) return;

    ref.current.volume = volume / 100;
  }, [volume]);

  return { volume, onChangeVolume };
};
