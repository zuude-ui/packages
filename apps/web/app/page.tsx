import { Heading1, Paragraph } from "@workspace/ui/components/page-comps";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center py-48 text-center">
      <Heading1>Cropper</Heading1>
      <Paragraph>
        A modern, intuitive image cropping component that brings the familiar
        iOS photo editing experience to the web. Crop, rotate, and adjust your
        images with smooth gestures and precise controls.
      </Paragraph>
    </div>
  );
}
