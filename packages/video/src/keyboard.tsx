import { useVideo } from "./wrapper";
import { useHotKeys } from "./hooks/use-hot-keys";
import { useSeek } from "./hooks/use-seek";
import { usePlayPause } from "./hooks/use-play-pause";
import { useMuteUnmute } from "./hooks/use-mute-unmute";
import { useFullscreen } from "./hooks/use-fullscreen";
import { usePictureInPicture } from "./hooks/use-picture-in-picture";

export const Keyboards = () => {
  const { videoRef } = useVideo();

  const { seekForward, seekBackward } = useSeek(videoRef);
  const { togglePlay } = usePlayPause(videoRef);
  const { toggleMute } = useMuteUnmute(videoRef);
  const { toggleFullscreen } = useFullscreen(videoRef);
  const { togglePictureInPicture } = usePictureInPicture(videoRef);

  useHotKeys("ArrowRight", () => {
    seekForward();
  });
  useHotKeys("ArrowLeft", () => {
    seekBackward();
  });
  useHotKeys(" ", () => {
    togglePlay();
  });
  useHotKeys("m", () => {
    toggleMute();
  });
  useHotKeys("f", () => {
    toggleFullscreen();
  });
  useHotKeys("p", () => {
    togglePictureInPicture();
  });

  return null;
};
