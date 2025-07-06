import { useState } from "react";
import { type Crop, Cropper, useCropper } from "@zuude-ui/cropper/index";
import { Button } from "@workspace/ui/components/button";
import { Slider } from "@workspace/ui/components/slider";
import { testImage } from "@workspace/ui/lib/utils";
import {
  Download,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Grid3X3,
  Eye,
  EyeOff,
  Settings,
  Image as ImageIcon,
} from "lucide-react";

export default function AdvancedCropper() {
  const [crop, setCrop] = useState<Crop>({ x: 0, y: 0, scale: 1 });
  const [result, setResult] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [showBehindImage, setShowBehindImage] = useState(true);
  const [quality, setQuality] = useState(0.8);
  const [isProcessing, setIsProcessing] = useState(false);

  const [ref, { cropIt, reset, isCropping }] = useCropper({
    quality,
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
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Cropper Section */}
          <div className="space-y-6">
            {/* Controls */}
            <div className="rounded-xl p-6 shadow-300">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-5 h-5" />
                <h3 className="font-semibold">Controls</h3>
              </div>

              <div className="space-y-4">
                {/* Quality Slider */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Quality: {Math.round(quality * 100)}%
                  </label>
                  <Slider
                    value={[quality]}
                    onValueChange={([value]) => setQuality(value || 0.8)}
                    max={1}
                    min={0.1}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                {/* Toggle Controls */}
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowGrid(!showGrid)}
                    className="flex-1"
                  >
                    {showGrid ? (
                      <Grid3X3 className="w-4 h-4 mr-2" />
                    ) : (
                      <Grid3X3 className="w-4 h-4 mr-2 opacity-50" />
                    )}
                    Grid
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowBehindImage(!showBehindImage)}
                    className="flex-1"
                  >
                    {showBehindImage ? (
                      <Eye className="w-4 h-4 mr-2" />
                    ) : (
                      <EyeOff className="w-4 h-4 mr-2" />
                    )}
                    Background
                  </Button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={handleCrop}
                    disabled={isCropping || isProcessing}
                    className="flex-1"
                  >
                    {isCropping || isProcessing ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Crop Image
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="flex-1"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
            </div>

            {/* Cropper */}
            <div className="rounded-xl p-6 shadow-300">
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className="w-5 h-5" />
                <h3 className="font-semibold">Crop Area</h3>
              </div>

              <div className="relative">
                <Cropper
                  ref={ref}
                  src={testImage}
                  crop={crop}
                  onCropChange={setCrop}
                  className="aspect-square w-full max-w-md overflow-hidden mx-auto bg-muted rounded-lg"
                  config={{
                    showGrid,
                    showBehindImage: showBehindImage
                      ? {
                          position: "fixed",
                        }
                      : undefined,
                  }}
                />

                {/* Instructions */}
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  <p>Drag to move • Scroll to zoom • Use grid for precision</p>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            {/* Crop Info */}
            <div className="rounded-xl p-6 shadow-300">
              <h3 className="font-semibold mb-4">Crop Information</h3>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Position X:</span>
                  <span className="ml-2 font-mono">{crop.x.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Position Y:</span>
                  <span className="ml-2 font-mono">{crop.y.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Scale:</span>
                  <span className="ml-2 font-mono">
                    {crop.scale.toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Quality:</span>
                  <span className="ml-2 font-mono">
                    {Math.round(quality * 100)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Result Preview */}
            <div className="rounded-xl p-6 shadow-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Result Preview</h3>
                {result && (
                  <Button variant="outline" size="sm" onClick={downloadImage}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                )}
              </div>

              <div className="aspect-square w-full max-w-md mx-auto overflow-hidden rounded-lg bg-muted border-2 border-dashed flex items-center justify-center">
                {result ? (
                  <img
                    src={result}
                    alt="Cropped result"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center text-slate-400">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">
                      Crop an image to see the result here
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
