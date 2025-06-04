import type { RefObject } from "react";
import { Crop } from "./types";

export const maybeAdjustImage = ({
  imageRef,
  containerRef,
  newCrop,
}: {
  imageRef: RefObject<HTMLImageElement> | undefined;
  containerRef: RefObject<HTMLDivElement> | undefined;
  newCrop: Crop;
}) => {
  if (!imageRef || !containerRef || !imageRef.current || !containerRef.current)
    return;

  /**
   * Get the bounds of the container and the image
   */
  const containerBounds = containerRef.current?.getBoundingClientRect();
  const imageBounds = imageRef.current?.getBoundingClientRect();

  const originalWidth = imageRef.current?.clientWidth || 0;

  // Calculate the center offset when image is larger than container, taking scale into account
  const scaledWidth = originalWidth * (newCrop.scale || 1);
  const widthOffset = (scaledWidth - containerBounds.width) / 2;

  // Y axis - adjust based on scaled image dimensions and bounding rects
  const heightOffset = Math.round(
    (imageBounds.height - containerBounds.height) / 2
  );

  // X axis - adjust based on scaled image dimensions
  if (imageBounds.left > containerBounds.left) {
    newCrop.x = widthOffset;
  } else if (imageBounds.right < containerBounds.right) {
    newCrop.x = -widthOffset;
  }

  // Y axis - adjust based on scaled image dimensions
  if (imageBounds.top > containerBounds.top) {
    newCrop.y = heightOffset;
  } else if (imageBounds.bottom < containerBounds.bottom) {
    newCrop.y = -heightOffset;
  }

  if (newCrop.scale < 1) {
    newCrop.scale = 1;
  }
};
