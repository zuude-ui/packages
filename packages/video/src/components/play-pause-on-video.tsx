import { useVideo } from "../context";
import { usePlayPause } from "../hooks/use-play-pause";

export const PlayPauseOnVideo = () => {
  const { ref } = useVideo();

  const { togglePlay } = usePlayPause(ref, true);

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
        backgroundColor: "rgba(255, 0, 0, 0.2)",
      }}
      onClick={togglePlay}
    ></div>
  );
};
