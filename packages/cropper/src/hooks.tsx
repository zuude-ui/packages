import { useRef, useState, RefObject } from "react";
import { type QueryClient } from "@tanstack/react-query";

import { exportImage } from "./utils";

export function useCropper(otherProps?: {
  quality?: number;
  queryClient?: QueryClient;
  onSuccess?: (image: string) => void;
  onError?: (error: Error) => void;
}): [
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
      let x = 0;
      let y = 0;
      let scale = 1;

      let src = null;

      if (!ref.current) return;

      if (!src) {
        src = ref.current.dataset.cropperSrc;
      }

      /**
       * Updating the crop from the data attributes
       */
      x = Number(ref.current.dataset.cropperX || 0);
      y = Number(ref.current.dataset.cropperY || 0);
      scale = Number(ref.current.dataset.cropperScale || 1);

      if (!src) {
        throw new Error("No src provided");
      }

      setIsCropping(true);

      let image: string | null | undefined = null;

      if (otherProps?.queryClient) {
        image = await otherProps?.queryClient.ensureQueryData({
          queryKey: ["crop-image", src, x, y, scale],
          queryFn: () =>
            exportImage({
              imageSrc: src,
              cropWidth: ref.current?.getBoundingClientRect().width || 0,
              cropHeight: ref.current?.getBoundingClientRect().height || 0,
              x,
              y,
              scale,
              scaleTheImage: otherProps?.quality || 1,
            }),
          staleTime: Infinity,
          gcTime: Infinity,
        });
      } else {
        image = await exportImage({
          imageSrc: src,
          cropWidth: ref.current.getBoundingClientRect().width,
          cropHeight: ref.current.getBoundingClientRect().height,
          x,
          y,
          scale,
          scaleTheImage: otherProps?.quality || 1,
        });
      }

      if (!image) {
        throw new Error("No image created");
      }

      if (image) {
        setResult(image);
        otherProps?.onSuccess?.(image);
      }

      setIsCropping(false);
    } catch (error) {
      otherProps?.onError?.(error as Error);
      console.log("❌", error);
      setIsCropping(false);
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
