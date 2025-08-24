import { useRef } from "react";
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
                width: `${duration ? (currentTime / duration) * 100 : 0}%`,
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
