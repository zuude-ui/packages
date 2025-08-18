import { RefObject } from "react";

export type VideoAutoplay = boolean | "force";

export type VideoRef = RefObject<
  (Omit<HTMLVideoElement, "autoplay"> & { autoplay?: VideoAutoplay }) | null
>;
