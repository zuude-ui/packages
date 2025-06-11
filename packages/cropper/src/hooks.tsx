import { useRef, useState, RefObject } from "react";

import { exportImage } from "./utils";
import { Crop } from "./types";

export function useCropper(
  src: string,
  crop: Crop,
  otherProps?: {
    quality?: number;
    onSuccess?: (image: string) => void;
    onError?: (error: Error) => void;
  }
): [
  RefObject<HTMLDivElement | null>,
  {
    result: string | null;
    isCropping: boolean;
    cropIt: () => Promise<void>;
    reset: () => void;
  },
] {
  const [result, setResult] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const cropIt = async () => {
    try {
      if (!ref.current) return;

      setIsCropping(true);

      const image = await exportImage({
        imageSrc: src,
        cropWidth: ref.current.getBoundingClientRect().width,
        cropHeight: ref.current.getBoundingClientRect().height,
        x: crop.x,
        y: crop.y,
        scale: crop.scale,
        scaleTheImage: otherProps?.quality || 1,
      });

      if (image) {
        setResult(image);
        otherProps?.onSuccess?.(image);
      }

      setIsCropping(false);
    } catch (error) {
      otherProps?.onError?.(error as Error);
    }
  };

  const reset = () => {
    const resetButton = ref.current?.querySelector(
      "[data-reset-crop-button]"
    ) as HTMLButtonElement;

    if (resetButton) {
      resetButton.click();
    }
  };

  return [
    ref,
    {
      result,
      isCropping,
      cropIt,
      reset,
    },
  ];
}
