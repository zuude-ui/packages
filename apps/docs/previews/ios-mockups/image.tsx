import { testImage } from "@workspace/ui/lib/utils";
import { Iphone } from "@zuude-ui/ios-mockups";

export default function Image() {
  return (
    <Iphone>
      <img src={testImage} className="h-full w-full object-cover" />
    </Iphone>
  );
}
