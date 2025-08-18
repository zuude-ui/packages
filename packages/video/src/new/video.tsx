import React, { forwardRef, RefObject, useEffect, useRef } from "react";
import { useVideo } from "./wrapper";
import { VideoAutoplay } from "./types";
import { useAutoplayByForce } from "../hooks/use-autoplay-by-force";

interface Props extends Omit<React.ComponentProps<"video">, "autoPlay"> {
  src: string;
  autoPlay?: VideoAutoplay;
  muteFallback?: (onMute: () => void) => React.ReactNode;
}

export const Video = forwardRef<HTMLVideoElement, Props>(
  ({ src, autoPlay, muteFallback, ...props }, ref) => {
    const { videoRef, setVideoRef, config, setError, error } = useVideo();

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
          src={src}
          {...props}
          onClick={config?.clickToPlay ? onPlay : undefined}
        />

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
