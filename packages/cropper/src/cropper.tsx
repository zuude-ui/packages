"use client";

import React, {
  useRef,
  useState,
  forwardRef,
  useEffect,
  type RefObject,
} from "react";
import { useGesture } from "@use-gesture/react";
import { motion, useMotionValue, animate } from "motion/react";

import { dampen } from "./dampen";
import { Grid } from "./grid";
import { useDetectImage } from "./use-detect-image";
import { maybeAdjustImage } from "./maybe-adjust-image";

import type { Crop } from "./types";

interface CropperProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  crop?: Crop;
  disabled?: boolean;
  onCropChange?: (crop: Crop) => void;
  config?: {
    showGrid?: boolean;
    showBehindImage?: {
      position: "absolute" | "fixed";
      style?: React.CSSProperties;
      opacity?: number;
      className?: string;
    };
  };
}

const Cropper = forwardRef<HTMLDivElement, CropperProps>(
  (
    {
      src,
      crop,
      disabled = false,
      onCropChange,
      config = {
        showGrid: false,
        showBehindImage: undefined,
      },
      ...props
    },
    ref
  ) => {
    const [cropValue, setCropValue] = useState(
      crop || { x: 0, y: 0, scale: 1 }
    );

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
    const x = useMotionValue(crop?.x || cropValue.x);
    const y = useMotionValue(crop?.y || cropValue.y);
    const scale = useMotionValue(crop?.scale || cropValue.scale);

    useEffect(() => {
      if (!isPinching) {
        scale.set(crop?.scale || 1);
      }
    }, [crop?.scale]);
    useEffect(() => {
      if (!isPinching) {
        x.set(crop?.x || 0);
      }
    }, [crop?.x]);
    useEffect(() => {
      if (!isPinching) {
        y.set(crop?.y || 0);
      }
    }, [crop?.y]);

    useEffect(() => {
      const unsubscribe = scale.on("change", (latest) => {
        if (crop) {
          onCropChange?.({ ...crop, scale: latest });
        } else {
          setCropValue({ ...cropValue, scale: latest });
        }
      });
      return () => unsubscribe();
    }, [scale]);

    useEffect(() => {
      const timeout = setTimeout(() => {
        utilsEnd();
      }, 200);
      return () => clearTimeout(timeout);
    }, [crop?.scale]);

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
          currentCropPositionRef.current = {
            top: containerRef.current?.getBoundingClientRect().top || 0,
            left: containerRef.current?.getBoundingClientRect().left || 0,
            width: containerRef.current?.getBoundingClientRect().width || 0,
            height: containerRef.current?.getBoundingClientRect().height || 0,
          };

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
        enabled: !disabled && (!!onCropChange || !crop),
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
      setCropValue(newCrop);
    }

    return (
      <div data-zuude-ui-cropper>
        <div
          ref={ref}
          data-zuude-cropper-container
          data-cropper-x={crop?.x || cropValue.x}
          data-cropper-y={crop?.y || cropValue.y}
          data-cropper-scale={crop?.scale || cropValue.scale}
          data-cropper-src={src}
          {...props}
        >
          <div ref={containerRef} data-zuude-cropper-inner>
            <motion.img
              data-zuude-cropper-image
              ref={imageRef}
              src={src}
              alt="crop"
              className="animate-fade-in"
              style={{
                x,
                y,
                scale,
                height: isHeightLarger ? undefined : "100%",
                width: isHeightLarger ? "100%" : undefined,
                opacity: isHeightLarger === null ? 0 : 1,
                touchAction: "none",
                userSelect: "none",
                MozUserSelect: "none",
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                WebkitUserDrag: "none",
              }}
            />
            {config.showGrid && <Grid active={isPinching || isDragging} />}
          </div>
          {config.showBehindImage && (
            <motion.div
              data-zuude-cropper-behind-image
              className={config.showBehindImage?.className}
              style={{
                x,
                y,
                scale,
                opacity:
                  isPinching || isDragging
                    ? config.showBehindImage.opacity || 0.2
                    : 0,
                top:
                  config.showBehindImage.position === "fixed"
                    ? currentCropPositionRef.current.top
                    : 0,
                left:
                  config.showBehindImage.position === "fixed"
                    ? currentCropPositionRef.current.left
                    : 0,
                width:
                  config.showBehindImage.position === "fixed"
                    ? currentCropPositionRef.current.width
                    : undefined,
                height:
                  config.showBehindImage.position === "fixed"
                    ? currentCropPositionRef.current.height
                    : undefined,
                ...config.showBehindImage?.style,
                position: config.showBehindImage?.position,
                touchAction: "none",
                userSelect: "none",
                MozUserSelect: "none",
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                WebkitUserDrag: "none",
              }}
            >
              <motion.img
                data-zuude-cropper-image
                src={src}
                alt="crop"
                style={{
                  height: isHeightLarger ? undefined : "100%",
                  width: isHeightLarger ? "100%" : undefined,
                  opacity: isHeightLarger === null ? 0 : 1,
                }}
              />
            </motion.div>
          )}

          <button
            data-reset-crop-button
            className="sr-only"
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
      </div>
    );
  }
);

Cropper.displayName = "Cropper";

export { Cropper };
