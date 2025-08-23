import { RefObject } from "react";

export type VideoAutoplay = boolean | "force";

export type CustomVideoRef = RefObject<
  (Omit<HTMLVideoElement, "autoplay"> & { autoplay?: VideoAutoplay }) | null
>;
export type VideoRef = RefObject<HTMLVideoElement | null> | null;
