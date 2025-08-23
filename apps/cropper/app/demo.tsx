import { useState } from "react";
import { type Crop, Cropper, useCropper } from "@zuude-ui/cropper/index";

import { Button } from "@workspace/ui/components/button";
import { cn, testImage } from "@workspace/ui/lib/utils";
import { useQueryClient } from "@tanstack/react-query";

export const Demo = () => {
  const [crop, setCrop] = useState<Crop>({ x: 0, y: 0, scale: 1 });
  const [image, setImage] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const [ref, { cropIt, reset, isCropping }] = useCropper({
    quality: 10,
    queryClient,
    onSuccess: (image) => {
      console.log("onSuccess", image);
      setImage(image);
    },
    onError: (error) => {
      window.alert(error.message);
    },
  });

  return (
    <div className="space-y-8">
      <div
        className={cn(
          "gap-4 flex mt-12 w-full items-center justify-center",
          image && "grid grid-cols-2"
        )}
      >
        <Cropper
          ref={ref}
          src={"/A_meteor_hit_the_earth.webp"}
          crop={crop}
          onCropChange={setCrop}
          className="aspect-square w-full !max-w-96 overflow-hidden bg-muted"
          config={{
            showGrid: true,
            showBehindImage: {
              position: "fixed",
            },
          }}
        />
        {image && (
          <img
            key={image}
            src={image}
            alt="Cropped image"
            className="max-w-96 aspect-square w-full h-full object-cover motion-opacity-in-0"
          />
        )}
      </div>

      <div className="flex gap-4 justify-center">
        <Button variant={"outline"} onClick={reset}>
          Reset
        </Button>
        <Button onClick={cropIt}>{isCropping ? "Cropping..." : "Crop"}</Button>
      </div>
    </div>
  );
};
