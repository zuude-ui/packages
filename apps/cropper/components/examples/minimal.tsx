import { useState } from "react";
import { type Crop, Cropper, useCropper } from "@zuude-ui/cropper/index";
import { Button } from "@workspace/ui/components/button";
import { testImage } from "@workspace/ui/lib/utils";
import { Check, RotateCcw, Download } from "lucide-react";

export default function MinimalCropper() {
  const [crop, setCrop] = useState<Crop>({ x: 0, y: 0, scale: 1 });
  const [result, setResult] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [ref, { cropIt, reset, isCropping }] = useCropper({
    quality: 0.9,
    onSuccess: (image) => {
      setResult(image);
      setIsProcessing(false);
    },
    onError: (error) => {
      console.error("Cropping error:", error);
      setIsProcessing(false);
    },
  });

  const handleCrop = async () => {
    setIsProcessing(true);
    await cropIt();
  };

  const handleReset = () => {
    setCrop({ x: 0, y: 0, scale: 1 });
    setResult(null);
    reset();
  };

  const downloadImage = () => {
    if (!result) return;

    const link = document.createElement("a");
    link.href = result;
    link.download = "cropped-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] p-8">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">Simple Image Cropper</h2>
          <p className="text-muted-foreground">
            Drag to move, scroll to zoom, and crop your image with precision
          </p>
        </div>

        {/* Cropper */}
        <div className="relative">
          <Cropper
            ref={ref}
            src={testImage}
            crop={crop}
            onCropChange={setCrop}
            className="aspect-square w-full max-w-lg mx-auto overflow-hidden rounded-xl bg-muted"
            config={{
              showGrid: true,
              showBehindImage: {
                position: "fixed",
                className: "blur-sm opacity-30",
              },
            }}
          />

          {/* Floating controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            <Button size="icon" variant="secondary" onClick={handleReset}>
              <RotateCcw className="w-4 h-4" />
            </Button>

            <Button
              size="icon"
              variant="outline"
              onClick={handleCrop}
              disabled={isCropping || isProcessing}
            >
              {isCropping || isProcessing ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Check className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Cropped Result</h3>
              <Button variant="outline" size="sm" onClick={downloadImage}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>

            <div className="aspect-square w-full max-w-lg mx-auto overflow-hidden rounded-xl bg-muted">
              <img
                src={result}
                alt="Cropped result"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Crop info */}
        <div className="flex justify-center">
          <div className="flex gap-6 text-sm text-muted-foreground">
            <span>X: {crop.x.toFixed(1)}</span>
            <span>Y: {crop.y.toFixed(1)}</span>
            <span>Scale: {crop.scale.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
