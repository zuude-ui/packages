import React, { RefObject } from "react";

import { Slot } from "@radix-ui/react-slot";
import { useVideo } from "./wrapper";
import { useFullscreen } from "./hooks/use-fullscreen";
import { useSeek } from "./hooks/use-seek";
import { useMuteUnmute } from "./hooks/use-mute-unmute";
import { usePlayPause } from "./hooks/use-play-pause";

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
};
