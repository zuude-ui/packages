"use client";

import "./styles.css";

export { Video } from "./video";

// Types
export type { VideoProps, VideoContextType } from "./types";

// Context
export { useVideo } from "./context";

// Hooks
export { useVolume } from "./hooks/use-volume";
export { useTimeline } from "./hooks/use-timeline";
export { useGetDuration } from "./hooks/use-get-duration";
export { usePlayPause } from "./hooks/use-play-pause";
export { useMuteUnmute } from "./hooks/use-mute-unmute";
export { useStartAt } from "./hooks/use-start-at";
export { useFullscreen } from "./hooks/use-fullscreen";
export { useAutoplayByForce } from "./hooks/use-autoplay-by-force";

// Utils
export { formatTime } from "./utils";
