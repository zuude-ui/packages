import {
  Video,
  VideoProvider,
  Pause,
  Play,
  Mute,
  Unmute,
  SeekForward,
  SeekBackward,
  Controls,
  Fullscreen,
  ExitFullscreen,
  Loading,
  type VideoRef,
} from "@zuude-ui/video";
import {
  useGetDuration,
  useCurrentTime,
  useBuffer,
} from "@zuude-ui/video/hooks";
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
  type TimeFormat,
} from "@zuude-ui/video/utils";
import { useRef, useState, useCallback, memo } from "react";

// Example usage of the video time utilities
const TimeFormattingExamples = ({
  duration,
  videoRef,
}: {
  duration: number;
  videoRef: VideoRef;
}) => {
  const [timeString, setTimeString] = useState("2:30");
  const { currentTime, onTimeUpdate } = useCurrentTime(videoRef);
  const { buffered, bufferedPercentage } = useBuffer(videoRef, duration);

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold">Video Time Formatting Examples</h3>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <input
            type="range"
            min={0}
            max={duration}
            step={0.01}
            value={currentTime}
            onChange={(e) => {
              onTimeUpdate(Number(e.target.value));
            }}
          />
          <div>
            {buffered} / {duration}
          </div>
          <div>
            {bufferedPercentage} / {duration}
          </div>
        </div>
        <div>
          <strong>Basic formatting:</strong>
          <div>
            formatTime({currentTime}): {formatTime(currentTime)}
          </div>
          <div>
            formatTime({currentTime}, "h:mm:ss"):{" "}
            {formatTime(currentTime, "h:mm:ss")}
          </div>
          <div>
            formatTime({currentTime}, "ss"): {formatTime(currentTime, "ss")}
          </div>
        </div>

        <div>
          <strong>Human readable:</strong>
          <div>
            humanizeTime({currentTime}): {humanizeTime(currentTime)}
          </div>
          <div>
            humanizeTime({currentTime}, compact: true):{" "}
            {humanizeTime(currentTime, { compact: true })}
          </div>
        </div>

        <div>
          <strong>Compact & Detailed:</strong>
          <div>
            compactTime({currentTime}): {compactTime(currentTime)}
          </div>
          <div>
            detailedTime({currentTime}): {detailedTime(currentTime)}
          </div>
          <div>
            detailedTime({currentTime}, showMilliseconds: true):{" "}
            {detailedTime(currentTime, { showMilliseconds: true })}
          </div>
        </div>

        <div>
          <strong>Time calculations:</strong>
          <div className="tabular-nums">
            timeRemaining({currentTime}, {duration}):{" "}
            {timeRemaining(currentTime, duration)}
          </div>
          <div>
            formatTimeWithPercentage({currentTime}, {duration}):{" "}
            {formatTimeWithPercentage(currentTime, duration)}
          </div>
        </div>

        <div>
          <strong>Parsing:</strong>
          <div>parseTime("2:30"): {parseTime(timeString)}s</div>
          <div>parseTime("1:23:45"): {parseTime(timeString)}s</div>
          <div>parseTime("90s"): {parseTime(timeString)}s</div>
        </div>

        <div>
          <strong>Accessibility:</strong>
          <div>
            formatTimeForAccessibility({currentTime}):{" "}
            {formatTimeForAccessibility(currentTime)}
          </div>
        </div>
      </div>

      <div>
        <strong>Time segments:</strong>
        <div className="text-xs">
          {getTimeSegments(duration, 5).map((time, i) => (
            <span key={i} className="mr-2">
              {formatTime(time, "mm:ss")}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const VideoContent = memo(() => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { duration } = useGetDuration(videoRef);

  return (
    <>
      <VideoProvider
        onError={(error) => console.log(error)}
        className="relative w-full max-w-4xl mx-auto mb-8"
      >
        <Video
          ref={videoRef}
          src="https://personal-work-ali.s3.us-west-2.amazonaws.com/Transform+Your+Drone+Footage+%23OsmoAction5Pro+%2B+FPV+Cinematic+Editing+%E2%9C%A8%F0%9F%9A%80.mp4"
          className="aspect-[16/9] h-full object-cover"
          autoPlay
          controls
          loop
        />
        <Controls className="absolute bottom-0 left-0 text-white flex-wrap py-4 items-center right-0 flex justify-center gap-4">
          <Play>Play</Play>
          <Pause>Pause</Pause>
          <Mute>Mute</Mute>
          <Unmute>Unmute</Unmute>
          <SeekForward>SeekForward</SeekForward>
          <SeekBackward>SeekBackward</SeekBackward>
          <Fullscreen>Fullscreen</Fullscreen>
          <ExitFullscreen>ExitFullscreen</ExitFullscreen>
        </Controls>
      </VideoProvider>
      <TimeFormattingExamples duration={duration ?? 0} videoRef={videoRef} />
    </>
  );
});

export const NewDemo = () => {
  const [value, setValue] = useState("");
  // const videoRef = useRef<HTMLVideoElement>(null);

  // const { isPlaying, isMuted, isFullscreen } = useVideoState(videoRef);

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <VideoContent />
    </div>
  );
};
