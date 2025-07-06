import { Cropper } from "@zuude-ui/cropper";
import { testImage } from "@workspace/ui/lib/utils";

export default function Blur() {
  return (
    <Cropper
      src={testImage}
      className="max-w-sm"
      config={{
        showBehindImage: {
          position: "absolute",
          className: "blur-sm",
        },
        showGrid: true,
      }}
    />
  );
}
