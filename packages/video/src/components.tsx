import React, { RefObject, useRef } from "react";

import { Slot } from "@radix-ui/react-slot";
import { useVideo } from "./wrapper";
import { useFullscreen } from "./hooks/use-fullscreen";
import { useSeek } from "./hooks/use-seek";
import { useMuteUnmute } from "./hooks/use-mute-unmute";
import { usePlayPause } from "./hooks/use-play-pause";
import { useCurrentTime } from "./hooks/use-current-time";

interface ControlsProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  asChild?: boolean;
}

const Controls = React.memo(
  ({ children, asChild, ...props }: ControlsProps) => {
    return (
      <div data-zuude-hide-elements {...props}>
        {children}
      </div>
    );
  }
);

interface Props extends React.ComponentProps<"button"> {
  children: React.ReactNode;
  asChild?: boolean;
}

const Play = React.memo(({ children, asChild, ...props }: Props) => {
  const Element = asChild ? Slot : "button";
  const { videoRef } = useVideo();

  const { play } = usePlayPause(videoRef as RefObject<HTMLVideoElement>);

  return (
    <Element {...props} onClick={play}>
      {children}
    </Element>
  );
});

const Pause = React.memo(({ children, asChild, ...props }: Props) => {
  const Element = asChild ? Slot : "button";
  const { videoRef } = useVideo();

  const { pause } = usePlayPause(videoRef as RefObject<HTMLVideoElement>);

  return (
    <Element {...props} onClick={pause}>
      {children}
    </Element>
  );
});

const Mute = React.memo(({ children, asChild, ...props }: Props) => {
  const Element = asChild ? Slot : "button";
  const { videoRef } = useVideo();

  const { mute } = useMuteUnmute(videoRef as RefObject<HTMLVideoElement>);

  return (
    <Element {...props} onClick={mute}>
      {children}
    </Element>
  );
});

const Unmute = React.memo(({ children, asChild, ...props }: Props) => {
  const Element = asChild ? Slot : "button";
  const { videoRef } = useVideo();

  const { unmute } = useMuteUnmute(videoRef as RefObject<HTMLVideoElement>);

  return (
    <Element {...props} onClick={unmute}>
      {children}
    </Element>
  );
});

const SeekForward = React.memo(({ children, asChild, ...props }: Props) => {
  const Element = asChild ? Slot : "button";
  const { videoRef } = useVideo();

  const { seekForward } = useSeek(videoRef as RefObject<HTMLVideoElement>, 10);

  return (
    <Element {...props} onClick={seekForward}>
      {children}
    </Element>
  );
});

const SeekBackward = React.memo(({ children, asChild, ...props }: Props) => {
  const Element = asChild ? Slot : "button";
  const { videoRef } = useVideo();

  const { seekBackward } = useSeek(videoRef as RefObject<HTMLVideoElement>, 10);

  return (
    <Element {...props} onClick={seekBackward}>
      {children}
    </Element>
  );
});

const Fullscreen = React.memo(({ children, asChild, ...props }: Props) => {
  const Element = asChild ? Slot : "button";
  const { videoRef } = useVideo();

  const { toggleFullscreen } = useFullscreen(videoRef);

  return (
    <Element {...props} onClick={toggleFullscreen}>
      {children}
    </Element>
  );
});

const ExitFullscreen = React.memo(({ children, asChild, ...props }: Props) => {
  const Element = asChild ? Slot : "button";
  const { videoRef } = useVideo();

  const { toggleFullscreen } = useFullscreen(videoRef);

  return (
    <Element {...props} onClick={toggleFullscreen}>
      {children}
    </Element>
  );
});

const Loading = () => {
  return <div>Loading</div>;
};

interface ShadowProps extends React.ComponentProps<"div"> {}

const Shadow = ({ ...props }: ShadowProps) => {
  const { videoRef } = useVideo();

  const shadowVideoRef = useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef?.current;
    if (shadowVideoRef.current && video) {
      let currentTime = 0;
      let isPlaying = false;
      let interval: ReturnType<typeof setInterval> | null = null;

      const startInterval = () => {
        if (interval) clearInterval(interval);
        interval = setInterval(() => {
          console.log("currentTime", video.currentTime);
          currentTime = video.currentTime;
          if (shadowVideoRef.current) {
            shadowVideoRef.current.currentTime = currentTime;
          }
        }, 100);
      };

      const stopInterval = () => {
        if (interval) {
          clearInterval(interval);
          interval = null;
        }
      };

      const handlePlay = () => {
        isPlaying = true;
        startInterval();
      };

      const handlePause = () => {
        isPlaying = false;
        stopInterval();
      };

      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);

      return () => {
        stopInterval();
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
      };
    }
  }, [videoRef?.current]);

  if (!videoRef?.current) return null;

  return (
    <div
      {...props}
      style={{
        ...props.style,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <video
        ref={shadowVideoRef}
        src={videoRef.current.src}
        muted
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export {
  Controls,
  Play,
  Pause,
  Mute,
  Unmute,
  SeekForward,
  SeekBackward,
  Fullscreen,
  ExitFullscreen,
  Loading,
  Shadow,
};
