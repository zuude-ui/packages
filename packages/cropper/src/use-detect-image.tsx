import { useEffect, useState } from "react";

export function useDetectImage(
  containerRef: React.RefObject<HTMLDivElement>,
  imageRef: React.RefObject<HTMLImageElement>
) {
  const [isHeightLarger, setIsHeightLarger] = useState<null | boolean>(null);

  useEffect(() => {
    const image = imageRef.current;
    const container = containerRef.current;

    if (image && container) {
      const handleLoad = async () => {
        /**
         * Adding this fake delay to have the fading in transition work
         * This is a hack to make the fading in transition work
         */
        await new Promise((resolve) => setTimeout(resolve, 0));

        if (image.naturalWidth && image.naturalHeight) {
          const imageAspectRatio = image.naturalWidth / image.naturalHeight;
          const containerAspectRatio =
            container.offsetWidth / container.offsetHeight;

          // If image is wider relative to container
          if (imageAspectRatio > containerAspectRatio) {
            setIsHeightLarger(false);
          } else {
            setIsHeightLarger(true);
          }
        }
      };

      if (image.complete) {
        handleLoad();
      } else {
        image.addEventListener("load", handleLoad);
        return () => image.removeEventListener("load", handleLoad);
      }
    }
  }, [containerRef.current, imageRef.current]);

  return { isHeightLarger };
}
