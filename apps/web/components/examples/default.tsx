import { Cropper } from "@workspace/cropper";
import { testImage } from "@workspace/ui/lib/utils";

export default function Default() {
  return <Cropper src={testImage} />;
}
