import { Cropper } from "@zuude-ui/cropper";
import { testImage } from "@workspace/ui/lib/utils";

export default function Default() {
  return <Cropper src={testImage} className="max-w-sm" />;
}
