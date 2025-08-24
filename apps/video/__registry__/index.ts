import dynamic from "next/dynamic";
import type { GenericComponent } from "@workspace/ui/types";

export const variants: Record<string, GenericComponent> = {
  "advanced-video-player-with-hooks": {
    name: "advanced-video-player-with-hooks",
    component: dynamic(
      () => import("@/components/examples/advanced-video-player-with-hooks"),
      {
        ssr: false,
      },
    ),
    code: `import { useRef } from "react";
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
          style={{ width: \`\${(currentTime / (duration || 1)) * 100}%\` }}
        />
        <div
          className="buffer-bar"
          style={{ width: \`\${bufferedPercentage}%\` }}
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
`,
  },
  "format-duration": {
    name: "format-duration",
    component: dynamic(() => import("@/components/examples/format-duration"), {
      ssr: false,
    }),
    code: `import { useRef } from "react";
import {
  formatTime,
  humanizeTime,
  compactTime,
  detailedTime,
  parseTime,
  timeRemaining,
  formatTimeWithPercentage,
  getTimeSegments,
  formatTimeForAccessibility,
} from "@zuude-ui/video/utils";
import {
  usePlayPause,
  useCurrentTime,
  useGetDuration,
} from "@zuude-ui/video/hooks";

const FormatDuration = () => {
  // Video player refs and state
  const videoRef = useRef<HTMLVideoElement>(null);
  const { togglePlay } = usePlayPause(videoRef);
  const { currentTime } = useCurrentTime(videoRef);
  const { duration } = useGetDuration(videoRef);

  return (
    <div className="space-y-6">
      {/* Video Player with Live Data */}
      <h3 className="text-lg font-semibold mb-4">Live Video Player</h3>
      <div className="space-y-4">
        {/* Video Player */}
        <video
          ref={videoRef}
          src="https://personal-work-ali.s3.us-west-2.amazonaws.com/Transform+Your+Drone+Footage+%23OsmoAction5Pro+%2B+FPV+Cinematic+Editing+%E2%9C%A8%F0%9F%9A%80.mp4"
          className="w-full aspect-video object-cover rounded"
          muted
          onClick={togglePlay}
          loop
        />

        {/* Live Time Display */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 bg-muted rounded">
          <div className="text-center">
            <p className="text-xs ">Current</p>
            <p className="font-mono text-muted-foreground text-sm">
              {formatTime(currentTime)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs ">Duration</p>
            <p className="font-mono text-muted-foreground text-sm">
              {formatTime(duration || 0)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs ">Remaining</p>
            <p className="font-mono text-muted-foreground text-sm">
              {timeRemaining(currentTime, duration || 0)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs ">Progress</p>
            <p className="font-mono text-muted-foreground text-sm">
              {formatTimeWithPercentage(currentTime, duration || 0)}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration || 0)}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1">
            <div
              className="bg-primary h-1 rounded-full transition-all duration-100"
              style={{
                width: \`\${duration ? (currentTime / duration) * 100 : 0}%\`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Utility Functions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Basic Formatting */}
        <div className="p-3 bg-background rounded-lg shadow">
          <h4 className="font-medium mb-2 text-sm">Basic Formatting</h4>
          <div className="space-y-1 text-xs">
            <div>
              <span className="">Default:</span>
              <span className="font-mono text-muted-foreground ml-1">
                {formatTime(currentTime)}
              </span>
            </div>
            <div>
              <span className="">Hours:</span>
              <span className="font-mono text-muted-foreground ml-1">
                {formatTime(currentTime, "h:mm:ss")}
              </span>
            </div>
            <div>
              <span className="">Seconds:</span>
              <span className="font-mono text-muted-foreground ml-1">
                {formatTime(currentTime, "ss")}
              </span>
            </div>
            <div>
              <span className="">Human:</span>
              <span className="font-mono text-muted-foreground ml-1">
                {formatTime(currentTime, "human")}
              </span>
            </div>
          </div>
        </div>

        {/* Human Readable */}
        <div className="p-3 bg-background rounded-lg shadow">
          <h4 className="font-medium mb-2 text-sm">Human Readable</h4>
          <div className="space-y-1 text-xs">
            <div>
              <span className="">Full:</span>
              <span className="font-mono text-muted-foreground ml-1">
                {humanizeTime(currentTime)}
              </span>
            </div>
            <div>
              <span className="">Compact:</span>
              <span className="font-mono text-muted-foreground ml-1">
                {humanizeTime(currentTime, { compact: true })}
              </span>
            </div>
            <div>
              <span className="">Accessibility:</span>
              <span className="font-mono text-muted-foreground ml-1">
                {formatTimeForAccessibility(currentTime)}
              </span>
            </div>
          </div>
        </div>

        {/* Compact & Detailed */}
        <div className="p-3 bg-background rounded-lg shadow">
          <h4 className="font-medium mb-2 text-sm">Compact & Detailed</h4>
          <div className="space-y-1 text-xs">
            <div>
              <span className="">Compact:</span>
              <span className="font-mono text-muted-foreground ml-1">
                {compactTime(currentTime)}
              </span>
            </div>
            <div>
              <span className="">Detailed:</span>
              <span className="font-mono text-muted-foreground ml-1">
                {detailedTime(currentTime)}
              </span>
            </div>
            <div>
              <span className="">With ms:</span>
              <span className="font-mono text-muted-foreground ml-1">
                {detailedTime(currentTime, { showMilliseconds: true })}
              </span>
            </div>
          </div>
        </div>

        {/* Time Calculations */}
        <div className="p-3 bg-background rounded-lg shadow">
          <h4 className="font-medium mb-2 text-sm">Time Calculations</h4>
          <div className="space-y-1 text-xs">
            <div>
              <span className="">Remaining:</span>
              <span className="font-mono text-muted-foreground ml-1">
                {timeRemaining(currentTime, duration || 0)}
              </span>
            </div>
            <div>
              <span className="">Remaining (human):</span>
              <span className="font-mono text-muted-foreground ml-1">
                {timeRemaining(currentTime, duration || 0, "human")}
              </span>
            </div>
            <div>
              <span className="">Progress:</span>
              <span className="font-mono text-muted-foreground ml-1">
                {formatTimeWithPercentage(currentTime, duration || 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Time Parsing Examples */}
        <div className="p-3 bg-background rounded-lg shadow">
          <h4 className="font-medium mb-2 text-sm">Time Parsing</h4>
          <div className="space-y-1 text-xs">
            <div>
              <span className="">"2:30":</span>
              <span className="font-mono text-muted-foreground ml-1">
                {parseTime("2:30")}s
              </span>
            </div>
            <div>
              <span className="">"1:23:45":</span>
              <span className="font-mono text-muted-foreground ml-1">
                {parseTime("1:23:45")}s
              </span>
            </div>
            <div>
              <span className="">"90s":</span>
              <span className="font-mono text-muted-foreground ml-1">
                {parseTime("90s")}s
              </span>
            </div>
            <div>
              <span className="">"1.5m":</span>
              <span className="font-mono text-muted-foreground ml-1">
                {parseTime("1.5m")}s
              </span>
            </div>
          </div>
        </div>

        {/* Time Segments */}
        <div className="p-3 bg-background rounded-lg shadow">
          <h4 className="font-medium mb-2 text-sm">Time Segments</h4>
          <div className="space-y-2">
            <p className="text-xs ">5 segments for current duration:</p>
            <div className="flex flex-wrap gap-1">
              {getTimeSegments(duration || 0, 5).map((time, i) => (
                <span
                  key={i}
                  className="px-1 py-0.5 bg-muted rounded text-xs font-mono text-muted-foreground"
                >
                  {formatTime(time, "mm:ss")}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Static Examples for Reference */}
      <div className="p-3 bg-muted rounded-lg">
        <h4 className="font-medium mb-2 text-sm">
          Static Examples (for reference)
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="">125.5s:</span>
            <span className="font-mono text-muted-foreground ml-1">
              {formatTime(125.5)}
            </span>
          </div>
          <div>
            <span className="">3600s:</span>
            <span className="font-mono text-muted-foreground ml-1">
              {formatTime(3600)}
            </span>
          </div>
          <div>
            <span className="">7325s:</span>
            <span className="font-mono text-muted-foreground ml-1">
              {formatTime(7325)}
            </span>
          </div>
          <div>
            <span className="">Human 125.5s:</span>
            <span className="font-mono text-muted-foreground ml-1">
              {humanizeTime(125.5)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormatDuration;
`,
  },
  "video-component": {
    name: "video-component",
    component: dynamic(() => import("@/components/examples/video-component"), {
      ssr: false,
    }),
    code: `import { useRef } from "react";
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
  Shadow,
} from "@zuude-ui/video";
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
  useHotKeys,
} from "@zuude-ui/video/hooks";
import { formatTime, timeRemaining } from "@zuude-ui/video/utils";

const CompleteVideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Hooks for state management
  const { isPlaying, isMuted, isFullscreen } = useVideoState(videoRef);
  const { togglePlay } = usePlayPause(videoRef);
  const { currentTime } = useCurrentTime(videoRef);
  const { duration } = useGetDuration(videoRef);
  const { volume, onChangeVolume } = useVolume(videoRef);
  const { toggleMute } = useMuteUnmute(videoRef);
  const { seekForward, seekBackward } = useSeek(videoRef, 10);
  const { speed, onChangeSpeed } = useSpeed(videoRef);
  const { toggleFullscreen } = useFullscreen(videoRef);

  // Keyboard shortcuts
  useHotKeys(" ", (e) => {
    e.preventDefault();
    togglePlay();
  });

  return (
    <VideoProvider onError={(error) => console.log(error)}>
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Main Video */}
        <div className="relative w-full aspect-[16/9] bg-black rounded-lg overflow-hidden">
          <Video
            ref={videoRef}
            src="https://personal-work-ali.s3.us-west-2.amazonaws.com/Transform+Your+Drone+Footage+%23OsmoAction5Pro+%2B+FPV+Cinematic+Editing+%E2%9C%A8%F0%9F%9A%80.mp4"
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            onClick={togglePlay}
          />

          {/* Play/Pause Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <button
                onClick={togglePlay}
                className="p-4 bg-white/20 rounded-full backdrop-blur-sm"
              >
                ▶️
              </button>
            </div>
          )}

          {/* Controls */}
          <Controls
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4"
            data-zuude-hide-elements
          >
            <div className="flex items-center justify-between">
              {/* Left Controls */}
              <div className="flex items-center gap-2">
                {isPlaying ? (
                  <Pause className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm transition-colors">
                    ⏸️
                  </Pause>
                ) : (
                  <Play className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm transition-colors">
                    ▶️
                  </Play>
                )}

                <SeekBackward className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm transition-colors">
                  ⏪ 10s
                </SeekBackward>

                <SeekForward className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm transition-colors">
                  ⏩ 10s
                </SeekForward>

                {isMuted ? (
                  <Unmute className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm transition-colors">
                    🔇
                  </Unmute>
                ) : (
                  <Mute className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm transition-colors">
                    🔊
                  </Mute>
                )}

                {/* Volume Control */}
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => onChangeVolume(Number(e.target.value))}
                    className="w-20"
                  />
                  <span className="text-xs">{Math.round(volume * 100)}%</span>
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
                {/* Time Display */}
                <div className="text-xs">
                  {formatTime(currentTime)} / {formatTime(duration || 0)}
                </div>

                {/* Fullscreen */}
                {isFullscreen ? (
                  <ExitFullscreen className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm transition-colors">
                    ⛶
                  </ExitFullscreen>
                ) : (
                  <Fullscreen className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm transition-colors">
                    ⛶
                  </Fullscreen>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span>{formatTime(currentTime)}</span>
                <span>
                  {timeRemaining(currentTime, duration || 0)} remaining
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-1">
                <div
                  className="bg-white h-1 rounded-full transition-all duration-100"
                  style={{
                    width: \`\${duration ? (currentTime / duration) * 100 : 0}%\`,
                  }}
                />
              </div>
            </div>
          </Controls>
        </div>

        {/* Shadow Video */}
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Preview</h4>
          <Shadow className="w-48 h-32 object-cover rounded-lg" />
        </div>
      </div>
    </VideoProvider>
  );
};

export default CompleteVideoPlayer;
`,
  },
};
