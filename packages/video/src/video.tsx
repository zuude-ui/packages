import React from "react";

// 📦 Types
import type { VideoProps } from "./types";

// 🔍 Context
import { VideoProvider } from "./context";

// 🔗 Hooks
import { useAutoplayByForce } from "./hooks/use-autoplay-by-force";
import { useStartAt } from "./hooks/use-start-at";
import { useAutoplayOnVisible } from "./hooks/use-autoplay-on-visible";

// 🔧 Components
import { PlayPauseOnVideo } from "./components/play-pause-on-video";
import { FunctionChildren } from "./function-children";
import { HidingElement, HidingElementProps } from "./components/hiding-element";

/**
 * Main Video component structure
 * @param {VideoProps} props - Video component props
 */

const VideoComponent = React.forwardRef<
  HTMLVideoElement,
  VideoProps & { pause?: boolean }
>(
  (
    { children, autoPlay, className, ratio, config, controls, pause, ...props },
    ref
  ) => {
    const [duration, setDuration] = React.useState<number | null>(null);

    const videoRef =
      (ref as React.RefObject<HTMLVideoElement>) ||
      React.useRef<HTMLVideoElement>(null);

    const [showHidingElement, setShowHidingElement] = React.useState(false);
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>(null);
    const handleMouseEnter = () => {
      if (videoRef.current?.paused) return;

      setShowHidingElement(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    const handleMouseLeave = () => {
      if (videoRef.current?.paused) return;

      setShowHidingElement(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    const handleMouseMove = () => {
      if (videoRef.current?.paused) return;

      setShowHidingElement(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setShowHidingElement(false);
      }, 3000);
    };

    React.useEffect(() => {
      if (pause !== undefined) {
        if (pause) {
          videoRef.current?.pause();
        } else {
          videoRef.current?.play();
        }
      }
    }, [pause, videoRef.current]);

    useAutoplayByForce(
      videoRef,
      autoPlay === "force" &&
        props.muted === undefined &&
        !config?.autoplayOnVisible
    );
    useStartAt(videoRef, config?.startAt);
    useAutoplayOnVisible(
      videoRef,
      typeof config?.autoplayOnVisible === "number"
        ? config.autoplayOnVisible
        : undefined,
      config?.autoplayOnVisible
    );

    return (
      <VideoProvider
        ref={videoRef}
        duration={duration}
        showHidingElement={showHidingElement}
        setShowHidingElement={setShowHidingElement}
      >
        <div
          data-zuude-video-wrapper
          style={{
            aspectRatio: ratio,
          }}
          className={className}
        >
          <video
            data-zuude-video
            ref={videoRef}
            autoPlay={
              config?.autoplayOnVisible
                ? false
                : autoPlay === "force"
                  ? true
                  : autoPlay
            }
            playsInline
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onLoadedMetadata={(e) => {
              setDuration((e.target as HTMLVideoElement).duration);
            }}
            onTimeUpdate={(e) => {
              /**
               * If the current time is less than the start time, set the current time to the start time
               * If the current time is greater than the end time, set the current time to the start time
               */
              if (config?.range) {
                const [start, end] = config.range;

                if (videoRef.current.currentTime < start) {
                  videoRef.current.currentTime = start;
                }

                if (videoRef.current.currentTime > end) {
                  videoRef.current.currentTime = start;
                }
              }
            }}
            {...props}
          />
          {typeof children === "function" ? (
            <FunctionChildren ref={videoRef} children={children} />
          ) : (
            children
          )}
        </div>
      </VideoProvider>
    );
  }
);

VideoComponent.displayName = "Video";

/**
 * Using compound components pattern
 */
export const Video = Object.assign(VideoComponent, {
  PlayPauseOnVideo,
  HidingElement: HidingElement as React.ComponentType<HidingElementProps>,
});
