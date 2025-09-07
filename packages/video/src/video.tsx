import React, { forwardRef, RefObject, useEffect, useRef } from "react";
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
      ...props
    },
    ref
  ) => {
    const { videoRef, setVideoRef, config, setError, error, isFocused } =
      useVideo();

    const refVideo = useRef<HTMLVideoElement>(null);

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
    }, [src]);

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

    const onPlay = () => {
      if (videoRef?.current?.paused) {
        videoRef.current?.play();
      } else {
        videoRef?.current?.pause();
      }
    };

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
          onTimeUpdate={(e) => {
            if (
              ranges?.[0] !== undefined &&
              ranges?.[1] !== undefined &&
              !videoRef?.current?.paused
            ) {
              const currentTime = e.currentTarget.currentTime;
              if (currentTime >= ranges[1]) {
                e.currentTarget.currentTime = ranges[0];
              } else if (currentTime <= ranges[0]) {
                e.currentTarget.currentTime = ranges[0];
              }
            }
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
