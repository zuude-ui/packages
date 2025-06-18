import { useState } from "react";
import { type Crop, Cropper, useCropper } from "@zuude-ui/cropper";

import { Button } from "@workspace/ui/components/button";
import { testImage } from "@workspace/ui/lib/utils";

export const Demo = () => {
  const [crop, setCrop] = useState<Crop>({ x: 0, y: 0, scale: 1 });
  const [image, setImage] = useState<string | null>(null);

  const [ref, { cropIt, reset }] = useCropper(testImage, crop, {
    quality: 3,
    onSuccess: (image) => {
      setImage(image);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <>
      <div className="gap-8 flex mt-12 w-full items-center justify-center">
        <Cropper
          ref={ref}
          src={testImage}
          crop={crop}
          onCropChange={setCrop}
          className="aspect-square w-full !max-w-96 overflow-hidden bg-muted"
          showGrid={true}
          showBehindImage={{ position: "fixed" }}
        />
        {image && (
          <img
            key={image}
            src={image}
            alt="Cropped image"
            className="max-w-96 aspect-square w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex gap-4 mt-8">
        <Button className="mt-4" variant={"outline"} onClick={reset}>
          Reset
        </Button>
        <Button className="mt-4" onClick={cropIt}>
          Export
        </Button>
      </div>
    </>
  );
};
