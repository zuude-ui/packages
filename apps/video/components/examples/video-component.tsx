import { useRef } from "react";
import {
  VideoProvider,
  Video,
  Controls,
  Play,
  Pause,
  Mute,
  Unmute,
  SeekForward,
  SeekBackward,
  Fullscreen,
  ExitFullscreen,
  type VideoRef,
} from "@zuude-ui/video";
import {
  useCurrentTime,
  useGetDuration,
  useSpeed,
  useVideoState,
  useVolume,
} from "@zuude-ui/video/hooks";
import {
  PlayIcon,
  PauseIcon,
  FastForward,
  Rewind,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
} from "lucide-react";
import { formatTime, timeRemaining } from "@zuude-ui/video/utils";
import { Button } from "@workspace/ui/components/button";
import { Slider } from "@workspace/ui/components/slider";

const CompleteVideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const { isPlaying, isMuted, isFullscreen } = useVideoState(videoRef);
  const { volume, onChangeVolume } = useVolume(videoRef);
  const { speed, onChangeSpeed } = useSpeed(videoRef);

  return (
    <VideoProvider
      onError={(error) => console.log(error)}
      className="relative rounded-xl overflow-hidden bg-background"
    >
      <Video
        ref={videoRef}
        src="https://personal-work-ali.s3.us-west-2.amazonaws.com/Transform+Your+Drone+Footage+%23OsmoAction5Pro+%2B+FPV+Cinematic+Editing+%E2%9C%A8%F0%9F%9A%80.mp4"
        className="aspect-video max-w-full h-full object-cover"
        controls
        muted
        loop
      />
      {/* Controls */}
      <Controls className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent duration-300 text-white p-4 data-[hidden]:opacity-0">
        <VideoTimeline videoRef={videoRef} />
        <div className="flex items-center justify-between">
          {/* Left Controls */}
          <div className="flex items-center gap-2">
            {isPlaying ? (
              <Pause asChild>
                <Button variant="ghost" size="icon">
                  <PauseIcon />
                </Button>
              </Pause>
            ) : (
              <Play asChild>
                <Button variant="ghost" size="icon">
                  <PlayIcon />
                </Button>
              </Play>
            )}

            <SeekBackward asChild>
              <Button variant="ghost" size="icon">
                <Rewind />
              </Button>
            </SeekBackward>

            <SeekForward asChild>
              <Button variant="ghost" size="icon">
                <FastForward />
              </Button>
            </SeekForward>

            {isMuted ? (
              <Unmute asChild>
                <Button variant="ghost" size="icon">
                  <VolumeX />
                </Button>
              </Unmute>
            ) : (
              <Mute asChild>
                <Button variant="ghost" size="icon">
                  <Volume2 />
                </Button>
              </Mute>
            )}

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <Slider
                min={0}
                max={100}
                step={0.1}
                value={[volume]}
                onValueChange={(value) => onChangeVolume(value[0] ?? 0)}
                className="w-20"
              />
              <span className="text-xs">{Math.round(volume)}%</span>
            </div>

            {/* Speed Control */}
            <select
              value={speed}
              onChange={(e) => onChangeSpeed(Number(e.target.value))}
              className="px-2 py-1 bg-white/10 rounded text-sm"
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Fullscreen */}
            {isFullscreen ? (
              <ExitFullscreen asChild>
                <Button variant="ghost" size="icon">
                  <Minimize />
                </Button>
              </ExitFullscreen>
            ) : (
              <Fullscreen asChild>
                <Button variant="ghost" size="icon">
                  <Maximize />
                </Button>
              </Fullscreen>
            )}
          </div>
        </div>
      </Controls>
    </VideoProvider>
  );
};

const VideoTimeline = ({ videoRef }: { videoRef: VideoRef }) => {
  const { currentTime, onTimeUpdate } = useCurrentTime(videoRef);
  const { duration } = useGetDuration(videoRef);

  return (
    <div className="w-full mb-2 space-y-2">
      <Slider
        min={0}
        max={duration ?? 0}
        value={[currentTime]}
        onValueChange={(value) => onTimeUpdate(value[0] ?? 0)}
        className="w-full"
      />
      <div className="flex items-center justify-between">
        <span className="text-xs">{formatTime(currentTime)}</span>
        <span className="text-xs">
          -{timeRemaining(currentTime, duration ?? 0)}
        </span>
      </div>
    </div>
  );
};

export default CompleteVideoPlayer;
