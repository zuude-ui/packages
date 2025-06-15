import { Crop, Cropper, useCropper } from "@zuude-ui/cropper";
import { testImage } from "@workspace/ui/lib/utils";
import { RefObject, useRef, useState } from "react";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
} from "@workspace/ui/components/drawer";
import { Button } from "@workspace/ui/components/button";

export default function DrawerExample() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<string>(testImage);
  const [crop, setCrop] = useState<Crop>({
    x: 0,
    y: 0,
    scale: 1,
  });

  const [ref, { cropIt }] = useCropper(image, crop, {
    onSuccess: (image) => {
      console.log("onSuccess", image);
      setImage(image);
      setOpen(false);
    },
  });

  return (
    <div>
      <img src={image} alt="test" className="w-full h-full object-cover" />
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button>Crop</Button>
        </DrawerTrigger>
        <DrawerContent className="!h-full">
          <Cropper
            ref={ref}
            data-vaul-no-drag
            src={image}
            crop={crop}
            onCropChange={setCrop}
            className="max-w-sm rounded-full mx-auto"
            showGrid={true}
            showBehindImage={{ position: "absolute" }}
          />
          <Button onClick={cropIt}>Crop</Button>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
