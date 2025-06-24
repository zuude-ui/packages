import React from "react";

import type { VideoChildren, VideoRef } from "./types";
import { usePlayPause } from "./hooks/use-play-pause";
import { useMuteUnmute } from "./hooks/use-mute-unmute";
import { useVideo } from "./context";
import { useFullscreen } from "./hooks/use-fullscreen";
import { usePictureInPicture } from "./hooks/use-picture-in-picture";
import { useSpeed } from "./hooks/use-speed";

export const FunctionChildren = React.forwardRef<
  any,
  {
    children: VideoChildren;
  }
>(({ children }, ref) => {
  const { duration, showHidingElement } = useVideo();

  /**
   * Only use these hooks if the children is a function
   */
  const { togglePlay, isPlaying } = usePlayPause(
    ref as VideoRef,
    typeof children === "function"
  );
  const { speed, onChangeSpeed } = useSpeed(
    ref as VideoRef,
    typeof children === "function"
  );
  const { toggleMute, isMuted } = useMuteUnmute(
    ref as VideoRef,
    typeof children === "function"
  );
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const { isPictureInPicture, togglePictureInPicture } = usePictureInPicture();

  if (typeof children !== "function") return null;

  return children({
    isPlaying,
    togglePlay,
    isMuted,
    toggleMute,
    speed,
    onChangeSpeed,
    isFullscreen,
    toggleFullscreen,
    isPictureInPicture,
    togglePictureInPicture,
    duration,
    showHidingElement: showHidingElement ?? false,
  });
});
