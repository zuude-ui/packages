"use client";

import React, {
  useRef,
  useState,
  forwardRef,
  useEffect,
  type RefObject,
} from "react";
import { useGesture } from "@use-gesture/react";
import {
  motion,
  useMotionValue,
  animate,
  type MotionValue,
} from "motion/react";

import { cn } from "./utils";
import { dampen } from "./dampen";
import { Grid } from "./grid";
import { useDetectImage } from "./use-detect-image";
import { maybeAdjustImage } from "./maybe-adjust-image";

import type { Crop } from "./types";

interface CropperProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  crop?: Crop;
  onCropChange?: (crop: Crop) => void;
  className?: string;
  showGrid?: boolean;
  style?: React.CSSProperties;
  showBehindImage?: {
    className?: string;
    position: "absolute" | "fixed";
  };
  showSlider?: boolean;
  scaleMotion?: MotionValue<number>;
}

const Cropper = forwardRef<HTMLDivElement, CropperProps>(
  (
    {
      src,
      crop = { x: 0, y: 0, scale: 1 },
      onCropChange,
      className,
      showGrid = false,
      style,
      showBehindImage,
      showSlider,
      scaleMotion,
      ...props
    },
    ref
  ) => {
    const [isPinching, setIsPinching] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    // Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    // Hooks
    const { isHeightLarger } = useDetectImage(
      containerRef as RefObject<HTMLDivElement>,
      imageRef as RefObject<HTMLImageElement>
    );

    const currentCropPositionRef = useRef<{
      top: number;
      left: number;
      width: number;
      height: number;
    }>({ top: 0, left: 0, width: 0, height: 0 });

    // State
    const x = useMotionValue(crop.x);
    const y = useMotionValue(crop.y);
    const scale = scaleMotion || useMotionValue(crop.scale);

    useEffect(() => {
      const unsubscribe = scale.on("change", (latest) => {
        onCropChange?.({ ...crop, scale: latest });
      });
      return () => unsubscribe();
    }, [scale]);

    useEffect(() => {
      const timeout = setTimeout(() => {
        utilsEnd();
      }, 200);
      return () => clearTimeout(timeout);
    }, [crop.scale]);

    useGesture(
      {
        onDrag: ({ dragging, offset: [dx, dy] }) => {
          currentCropPositionRef.current = {
            top: containerRef.current?.getBoundingClientRect().top || 0,
            left: containerRef.current?.getBoundingClientRect().left || 0,
            width: containerRef.current?.getBoundingClientRect().width || 0,
            height: containerRef.current?.getBoundingClientRect().height || 0,
          };
          setIsDragging(dragging || false);

          y.stop();
          x.stop();

          /**
           * If the user is pinching, we don't want to update the crop
           */
          if (isPinching) return;

          if (
            !imageRef ||
            !containerRef ||
            !imageRef.current ||
            !containerRef.current
          )
            return;

          /**
           * Get the bounds of the container and the image
           */
          const containerBounds = containerRef.current?.getBoundingClientRect();
          const imageBounds = imageRef.current?.getBoundingClientRect();

          const originalWidth = imageRef.current?.clientWidth || 0;

          // Calculate the center offset when image is larger than container, taking scale into account
          const scaledWidth = originalWidth * (scale.get() || 1);
          const widthOffset = (scaledWidth - containerBounds.width) / 2;

          // Y axis - adjust based on scaled image dimensions and bounding rects
          const heightOffset = Math.round(
            (imageBounds.height - containerBounds.height) / 2
          );

          const maxX = widthOffset;
          const minX = -widthOffset;

          const maxY = heightOffset;
          const minY = -heightOffset;

          x.set(dampen(dx, [minX, maxX]));
          y.set(dampen(dy, [minY, maxY]));
        },
        onPinch: ({
          pinching,
          memo,
          origin: [pinchOriginX, pinchOriginY],
          offset: [d],
        }) => {
          y.stop();
          x.stop();

          setIsPinching(true);

          memo ??= {
            bounds: imageRef.current?.getBoundingClientRect(),
            crop: { x: x.get(), y: y.get(), scale: scale.get() },
          };

          const transformOriginX = memo.bounds.x + memo.bounds.width / 2;
          const transformOriginY = memo.bounds.y + memo.bounds.height / 2;

          const displacementX =
            (transformOriginX - pinchOriginX) / memo.crop.scale;
          const displacementY =
            (transformOriginY - pinchOriginY) / memo.crop.scale;

          const initialOffsetDistance = memo.crop.scale;
          const movementDistance = d - initialOffsetDistance;

          scale.set(memo.crop.scale + movementDistance);
          x.set(memo.crop.x + displacementX * movementDistance);
          y.set(memo.crop.y + displacementY * movementDistance);

          return memo;
        },
        onDragEnd: utilsEnd,
        onPinchEnd: utilsEnd,
      },
      {
        drag: {
          from: () => [x.get(), y.get()],
          preventDefault: true,
        },
        pinch: {
          from: () => [scale.get(), 0],
          preventDefault: true,
          scaleBounds: {
            min: 1,
            max: 6,
          },
        },
        eventOptions: {
          passive: false,
        },
        target: imageRef,
      }
    );

    function utilsEnd() {
      const newCrop = { x: x.get(), y: y.get(), scale: scale.get() };

      setTimeout(() => {
        setIsPinching(false);
      }, 200);

      /**
       * Update the crop
       * x and y axis if they are out of bounds
       */
      maybeAdjustImage({
        imageRef: imageRef as RefObject<HTMLImageElement>,
        containerRef: containerRef as RefObject<HTMLDivElement>,
        newCrop,
      });

      animate(x, newCrop.x, {
        type: "tween",
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1],
      });
      animate(y, newCrop.y, {
        type: "tween",
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1],
      });
      onCropChange?.(newCrop);
    }

    return (
      <div>
        <div
          ref={ref}
          className={cn(
            "bg-loading relative aspect-square shadow-[0px_0px_0px_3px_white] md:shadow-none",
            className
          )}
          style={style}
          {...props}
        >
          <div
            ref={containerRef}
            className="relative flex h-full w-full items-center justify-center overflow-hidden"
          >
            <motion.img
              ref={imageRef}
              src={src}
              alt="crop"
              className={cn(
                "relative mx-auto max-h-none max-w-none",
                isHeightLarger ? "h-auto w-full" : "h-full w-auto",

                // When the image is not loaded, we want to hide it
                "transition-opacity duration-200",
                isHeightLarger === null && "opacity-0"
              )}
              style={{
                x,
                y,
                scale,
                touchAction: "none",
                userSelect: "none",
                MozUserSelect: "none",
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                WebkitUserDrag: "none",
              }}
            />
            {showGrid && <Grid active={isPinching || isDragging} />}
          </div>
          {showBehindImage && (
            <motion.div
              className={cn(
                "pointer-events-none -z-10 mx-auto flex h-full max-h-none w-full max-w-none items-center justify-center transition-opacity duration-300",
                isPinching || isDragging ? "opacity-15" : "opacity-0",
                showBehindImage.className
              )}
              style={{
                x,
                y,
                scale,
                top:
                  showBehindImage.position === "fixed"
                    ? currentCropPositionRef.current.top
                    : 0,
                left:
                  showBehindImage.position === "fixed"
                    ? currentCropPositionRef.current.left
                    : 0,
                width:
                  showBehindImage.position === "fixed"
                    ? currentCropPositionRef.current.width
                    : undefined,
                height:
                  showBehindImage.position === "fixed"
                    ? currentCropPositionRef.current.height
                    : undefined,
                touchAction: "none",
                userSelect: "none",
                MozUserSelect: "none",
                position: showBehindImage?.position,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                WebkitUserDrag: "none",
              }}
            >
              <motion.img
                src={src}
                alt="crop"
                className={cn(
                  "relative mx-auto max-h-none max-w-none",
                  isHeightLarger ? "h-auto w-full" : "h-full w-auto",

                  // When the image is not loaded, we want to hide it
                  "transition-opacity duration-200",
                  isHeightLarger === null && "opacity-0"
                )}
              />
            </motion.div>
          )}

          <button
            data-reset-crop-button
            className="sr-only"
            style={{
              color: "red",
            }}
            onClick={() => {
              animate(x, 0, {
                type: "tween",
                duration: 0.4,
                ease: [0.25, 1, 0.5, 1],
              });
              animate(y, 0, {
                type: "tween",
                duration: 0.4,
                ease: [0.25, 1, 0.5, 1],
              });
              animate(scale, 1, {
                type: "tween",
                duration: 0.4,
                ease: [0.25, 1, 0.5, 1],
              });
              onCropChange?.({ x: 0, y: 0, scale: 1 });
            }}
          >
            Reset
          </button>
        </div>

        {showSlider && (
          <div className="mx-auto mt-[26px] hidden max-w-[280px] items-center gap-2 md:flex"></div>
        )}
      </div>
    );
  }
);

Cropper.displayName = "Cropper";

export { Cropper };
