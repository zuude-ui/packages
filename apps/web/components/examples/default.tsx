import { Cropper } from "@workspace/cropper";
import { testImage } from "@workspace/ui/lib/utils";

export const Default = () => {
  return <Cropper src={testImage} />;
};
