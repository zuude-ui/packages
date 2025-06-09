import { useRef, useState } from "react";
import { type Crop, Cropper, exportImage } from "@workspace/cropper";

import { Button } from "@workspace/ui/components/button";
import { testImage } from "@workspace/ui/lib/utils";

export const Demo = () => {
  const [crop, setCrop] = useState<Crop>({ x: 0, y: 0, scale: 1 });
  const [image, setImage] = useState<string | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!ref.current) return;

    const image = await exportImage({
      imageSrc: testImage,
      cropWidth: ref.current.getBoundingClientRect().width,
      cropHeight: ref.current.getBoundingClientRect().height,
      x: crop.x,
      y: crop.y,
      scale: crop.scale,
      scaleTheImage: 3,
    });

    if (image) {
      setImage(image);
    }
  };

  return (
    <>
      <div className="gap-8 flex mt-12 w-full items-center justify-center">
        <Cropper
          ref={ref}
          src={testImage}
          crop={crop}
          onCropChange={setCrop}
          className="aspect-square w-full max-w-96 overflow-hidden bg-muted"
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
      <Button className="mt-4" onClick={handleExport}>
        Export
      </Button>
    </>
  );
};
