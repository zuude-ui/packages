import type {
  ComponentProps,
  ComponentPropsWithoutRef,
  ReactNode,
  RefObject,
} from "react";

type VideoAutoplay = boolean | "force";

export type VideoRef = RefObject<
  (Omit<HTMLVideoElement, "autoplay"> & { autoplay?: VideoAutoplay }) | null
>;

export type VideoChildren =
  | ReactNode
  | ((props: {
      // Play/Pause
      isPlaying: boolean;
      togglePlay: () => void;
      // Mute/Unmute
      isMuted: boolean;
      toggleMute: () => void;
      // Speed
      speed: number;
      onChangeSpeed: (speed: number) => void;
      // Duration
      duration: number | null;
      // Fullscreen
      isFullscreen: boolean;
      toggleFullscreen: () => void;
      // Picture in picture
      isPictureInPicture: boolean;
      togglePictureInPicture: () => void;
      // Hiding element
      showHidingElement: boolean;
    }) => ReactNode);

export type VideoConfig = {
  startAt?: number;
  range?: [number, number];
  autoplayOnVisible?: boolean | number;
};

interface VideoProps
  extends Omit<
    ComponentPropsWithoutRef<"video">,
    "children" | "autoPlay" | "controls"
  > {
  children?: VideoChildren;
  autoPlay?: VideoAutoplay;
  ratio?: string;
  config?: VideoConfig;
  controls?: boolean;
}

interface VideoContextType {
  ref: RefObject<HTMLVideoElement | null>;
  duration: number | null;
  isFullscreen?: boolean;
  setIsFullscreen?: (isFullscreen: boolean) => void;
  isPictureInPicture?: boolean;
  setIsPictureInPicture?: (isPictureInPicture: boolean) => void;
  showHidingElement?: boolean;
  setShowHidingElement?: (showHidingElement: boolean) => void;
}

export type { VideoProps, VideoContextType };
