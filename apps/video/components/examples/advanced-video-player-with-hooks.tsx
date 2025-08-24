import { useRef } from "react";
import {
  useVideoState,
  usePlayPause,
  useCurrentTime,
  useGetDuration,
  useVolume,
  useMuteUnmute,
  useSeek,
  useSpeed,
  useFullscreen,
  usePictureInPicture,
  useBuffer,
  useAutoplayOnVisible,
  useStartAt,
} from "@zuude-ui/video/hooks";

const AdvancedVideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // All hooks
  const { isPlaying, isMuted, isFullscreen } = useVideoState(videoRef);
  const { togglePlay } = usePlayPause(videoRef);
  const { currentTime } = useCurrentTime(videoRef);
  const { duration } = useGetDuration(videoRef);
  const { volume, onChangeVolume } = useVolume(videoRef);
  const { toggleMute } = useMuteUnmute(videoRef);
  const { seekForward, seekBackward } = useSeek(videoRef, 10);
  const { speed, onChangeSpeed } = useSpeed(videoRef);
  const { toggleFullscreen } = useFullscreen(videoRef);
  const { togglePictureInPicture } = usePictureInPicture(videoRef);
  const { bufferedPercentage } = useBuffer(videoRef, duration || 0);

  // Autoplay when visible
  useAutoplayOnVisible(videoRef, 0.5);

  // Start at specific time
  useStartAt(videoRef, 30);

  return (
    <div data-zuude-video-wrapper>
      <video
        ref={videoRef}
        src="https://personal-work-ali.s3.us-west-2.amazonaws.com/Transform+Your+Drone+Footage+%23OsmoAction5Pro+%2B+FPV+Cinematic+Editing+%E2%9C%A8%F0%9F%9A%80.mp4"
        className="!aspect-[16/9] w-full object-cover rounded-lg"
      />

      {/* Progress bar */}
      <div className="progress">
        <div
          className="progress-bar"
          style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
        />
        <div
          className="buffer-bar"
          style={{ width: `${bufferedPercentage}%` }}
        />
      </div>

      {/* Controls */}
      <div className="controls">
        <button onClick={togglePlay}>{isPlaying ? "⏸️" : "▶️"}</button>
        <button onClick={seekBackward}>⏪</button>
        <button onClick={seekForward}>⏩</button>
        <button onClick={toggleMute}>{isMuted ? "🔇" : "🔊"}</button>
        <input
          type="range"
          value={volume}
          onChange={(e) => onChangeVolume(Number(e.target.value))}
        />
        <select
          value={speed}
          onChange={(e) => onChangeSpeed(Number(e.target.value))}
        >
          <option value={0.5}>0.5x</option>
          <option value={1}>1x</option>
          <option value={1.5}>1.5x</option>
          <option value={2}>2x</option>
        </select>
        <button onClick={toggleFullscreen}>{isFullscreen ? "⛶" : "⛶"}</button>
        <button onClick={togglePictureInPicture}>📺</button>
      </div>
    </div>
  );
};

export default AdvancedVideoPlayer;
