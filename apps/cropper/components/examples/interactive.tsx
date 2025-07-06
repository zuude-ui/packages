import { useState } from "react";
import { type Crop, Cropper, useCropper } from "@zuude-ui/cropper/index";
import { Button } from "@workspace/ui/components/button";
import { testImage } from "@workspace/ui/lib/utils";
import {
  Check,
  RotateCcw,
  Download,
  Move,
  ZoomIn,
  Target,
  Sparkles,
  Eye,
} from "lucide-react";

export default function InteractiveCropper() {
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
          <h2 className="text-2xl font-semibold">Interactive Cropper</h2>
          <p className="text-muted-foreground">
            Watch the overlay elements respond to your interactions
          </p>
        </div>

        {/* Cropper with Interactive Overlay */}
        <div className="relative">
          <Cropper
            ref={ref}
            src={testImage}
            crop={crop}
            onCropChange={setCrop}
            className="aspect-square w-full max-w-lg mx-auto overflow-hidden rounded-xl bg-muted"
            config={{
              showBehindImage: {
                position: "fixed",
                opacity: 0.05,
              },
            }}
          >
            {({ isDragging, isPinching }) => (
              <>
                {/* Status Indicator */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="flex items-center gap-2 bg-black/80 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                    {isDragging ? (
                      <>
                        <Move className="w-4 h-4 animate-pulse" />
                        <span>Dragging</span>
                      </>
                    ) : isPinching ? (
                      <>
                        <ZoomIn className="w-4 h-4 animate-pulse" />
                        <span>Zooming</span>
                      </>
                    ) : (
                      <>
                        <Target className="w-4 h-4" />
                        <span>Ready</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Interactive Guide */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <Eye className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">Live Preview</span>
                    </div>
                    <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                      <div>X: {crop.x.toFixed(1)}</div>
                      <div>Y: {crop.y.toFixed(1)}</div>
                      <div>Scale: {crop.scale.toFixed(2)}</div>
                    </div>
                  </div>
                </div>

                {/* Floating Action Button */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={handleReset}
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant={"outline"}
                      onClick={handleCrop}
                      disabled={isCropping || isProcessing}
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Corner Indicators */}
                <div className="absolute top-2 left-2 w-3 h-3 border-2 border-white rounded-full opacity-60" />
                <div className="absolute top-2 right-2 w-3 h-3 border-2 border-white rounded-full opacity-60" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-2 border-white rounded-full opacity-60" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-2 border-white rounded-full opacity-60" />

                {/* Animated Border */}
                <div className="absolute inset-0 pointer-events-none">
                  <div
                    className={`absolute inset-0 border-2 border-white/50 rounded-xl transition-all duration-300 ${
                      isDragging
                        ? "border-blue-400 scale-105"
                        : isPinching
                          ? "border-green-400 scale-110"
                          : "border-white/50"
                    }`}
                  />
                </div>

                {/* Center Crosshair */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <div className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-white rounded-full" />
                  </div>
                </div>
              </>
            )}
          </Cropper>
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

        {/* Instructions */}
        <div className="text-center">
          <div className="inline-flex items-center gap-6 text-sm text-muted-foreground bg-muted px-4 py-2 rounded-full">
            <span className="flex items-center gap-1">
              <Move className="w-3 h-3" />
              Drag to move
            </span>
            <span className="flex items-center gap-1">
              <ZoomIn className="w-3 h-3" />
              Scroll to zoom
            </span>
            <span className="flex items-center gap-1">
              <Target className="w-3 h-3" />
              Watch overlay
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
