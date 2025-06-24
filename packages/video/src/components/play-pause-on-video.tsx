import { useVideo } from "../context";
import { usePlayPause } from "../hooks/use-play-pause";

export const PlayPauseOnVideo = () => {
  const { videoRef } = useVideo();

  const { togglePlay } = usePlayPause(videoRef, true);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={togglePlay}
    ></div>
  );
};
