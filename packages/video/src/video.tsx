import React, {
  forwardRef,
  RefObject,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useVideo } from "./wrapper";
import { VideoAutoplay } from "./types";
import { useAutoplayByForce } from "./hooks/use-autoplay-by-force";
import { Keyboards } from "./keyboard";
import { useAutoplayOnVisible } from "./hooks";

interface Props
  extends Omit<React.ComponentProps<"video">, "autoPlay" | "preload"> {
  src: string;
  autoPlay?: VideoAutoplay;
  controls?: boolean;
  preload?: "none" | "metadata" | "auto";
  muteFallback?: (onMute: () => void) => React.ReactNode;
  autoPlayOnVisible?: boolean | number;
  ranges?: number[];
  getDuration?: (duration: number) => void;
}

export const Video = forwardRef<HTMLVideoElement, Props>(
  (
    {
      src,
      autoPlay,
      muteFallback,
      controls,
      preload = "metadata",
      autoPlayOnVisible,
      ranges,
      getDuration,
      ...props
    },
    ref
  ) => {
    const { videoRef, setVideoRef, config, setError, error, isFocused } =
      useVideo();

    const refVideo = useRef<HTMLVideoElement>(null);
    const isAdjustingRef = useRef(false);
    const rafIdRef = useRef<number | null>(null);
    const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Validate ranges: ensure they're valid and start < end
    const isValidRange =
      ranges &&
      ranges.length >= 2 &&
      typeof ranges[0] === "number" &&
      typeof ranges[1] === "number" &&
      ranges[0] >= 0 &&
      ranges[1] > ranges[0] &&
      isFinite(ranges[0]) &&
      isFinite(ranges[1]);

    // Safely get range values (only use when isValidRange is true)
    const rangeStart = isValidRange ? ranges[0] : undefined;
    const rangeEnd = isValidRange ? ranges[1] : undefined;

    useEffect(() => {
      const video = refVideo.current;
      const thirdPartyRef = ref;

      if (thirdPartyRef) {
        setVideoRef(thirdPartyRef as RefObject<HTMLVideoElement>);
      } else {
        if (video) {
          setVideoRef({ current: video });
        }
      }

      // Safari: Reset adjustment flags when src changes to prevent stale state
      return () => {
        isAdjustingRef.current = false;
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
        if (timeoutIdRef.current !== null) {
          clearTimeout(timeoutIdRef.current);
          timeoutIdRef.current = null;
        }
      };
    }, [src, ref, setVideoRef]);

    // Cleanup requestAnimationFrame and setTimeout on unmount (critical for Safari)
    useEffect(() => {
      return () => {
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
        if (timeoutIdRef.current !== null) {
          clearTimeout(timeoutIdRef.current);
          timeoutIdRef.current = null;
        }
      };
    }, []);

    // Get duration
    useEffect(() => {
      if (getDuration) {
        getDuration(refVideo.current?.duration ?? 0);
      }
    }, [getDuration, refVideo.current?.duration]);

    useAutoplayByForce(
      videoRef,
      autoPlay === "force" && props.muted === undefined,
      setError
    );

    useAutoplayOnVisible(
      videoRef,
      typeof autoPlayOnVisible === "number"
        ? autoPlayOnVisible
        : !autoPlayOnVisible
          ? 0.5
          : undefined,
      !!autoPlayOnVisible
    );

    const onPlay = useCallback(() => {
      if (videoRef?.current?.paused) {
        videoRef.current?.play();
      } else {
        videoRef?.current?.pause();
      }
    }, [videoRef]);

    return (
      <>
        <video
          ref={ref || refVideo}
          data-zuude-video
          src={src}
          onClick={config?.clickToPlay ? onPlay : undefined}
          autoPlay={autoPlay === "force" ? true : autoPlay}
          preload={preload}
          playsInline
          onLoadedMetadata={(e) => {
            // Set initial position as early as possible when metadata loads
            // This ensures video starts at rangeStart even with autoplay
            // Only set if video is at the beginning (not if user has already seeked)
            const video = e.currentTarget;
            if (
              isValidRange &&
              rangeStart !== undefined &&
              rangeEnd !== undefined &&
              video.currentTime < 0.1
            ) {
              // Only set to rangeStart on initial load (when currentTime is near 0)
              video.currentTime = rangeStart;
            }
            props.onLoadedMetadata?.(e);
          }}
          onCanPlay={(e) => {
            // Only set initial position when video first loads (not during seeking)
            const video = e.currentTarget;
            if (
              isValidRange &&
              rangeStart !== undefined &&
              rangeEnd !== undefined &&
              !video.seeking
            ) {
              const currentTime = video.currentTime;
              // Only adjust on initial load (when currentTime is 0 or very close to it)
              // Don't adjust if user has manually seeked to a different position
              if (currentTime < 0.1 && currentTime < rangeStart) {
                video.currentTime = rangeStart;
              }
            }
            props.onCanPlay?.(e);
          }}
          onSeeked={(e) => {
            // Don't enforce ranges on seek - allow free seeking for trimming
            // Ranges are only enforced during playback (in onTimeUpdate)
            isAdjustingRef.current = false;
            props.onSeeked?.(e);
          }}
          onTimeUpdate={(e) => {
            const video = e.currentTarget;

            // Only enforce ranges during active playback
            // Completely skip range enforcement when paused (allows free seeking for trimming)
            if (
              isValidRange &&
              rangeStart !== undefined &&
              rangeEnd !== undefined &&
              !isAdjustingRef.current &&
              !video.paused &&
              !video.seeking &&
              video.readyState >= 2 // Ensure video has loaded enough data
            ) {
              const currentTime = video.currentTime;

              // During playback: loop back when reaching or exceeding the end boundary
              if (currentTime >= rangeEnd) {
                isAdjustingRef.current = true;
                video.currentTime = rangeStart;
                // Reset flag after seek completes (onSeeked will handle this)
                // But add a fallback timeout in case onSeeked doesn't fire
                // Cleanup existing timeout before setting new one (Safari memory safety)
                if (timeoutIdRef.current !== null) {
                  clearTimeout(timeoutIdRef.current);
                }
                rafIdRef.current = requestAnimationFrame(() => {
                  timeoutIdRef.current = setTimeout(() => {
                    if (isAdjustingRef.current) {
                      isAdjustingRef.current = false;
                    }
                    timeoutIdRef.current = null;
                  }, 100);
                  rafIdRef.current = null;
                });
              }
            }

            props.onTimeUpdate?.(e);
          }}
          {...props}
        />

        {controls && isFocused && <Keyboards />}

        {error === "NotAllowedError" &&
          typeof muteFallback === "function" &&
          muteFallback(() => {
            if (videoRef?.current) {
              videoRef.current.muted = !videoRef.current.muted;
            }
            setError(null);
          })}
      </>
    );
  }
);

Video.displayName = "Video";
