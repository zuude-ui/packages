import dynamic from "next/dynamic";
import type { GenericComponent } from "@workspace/ui/types";

export const variants: Record<string, GenericComponent> = {
  advanced: {
    name: "advanced",
    component: dynamic(() => import("@/components/examples/advanced"), {
      ssr: false,
    }),
    code: `import { useState } from "react";
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
`,
  },
  blur: {
    name: "blur",
    component: dynamic(() => import("@/components/examples/blur"), {
      ssr: false,
    }),
    code: `import { Cropper } from "@zuude-ui/cropper";
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
`,
  },
  default: {
    name: "default",
    component: dynamic(() => import("@/components/examples/default"), {
      ssr: false,
    }),
    code: `import { Cropper } from "@zuude-ui/cropper/index";
import { testImage } from "@workspace/ui/lib/utils";

export default function Default() {
  return <Cropper src={testImage} className="max-w-sm" />;
}
`,
  },
  drawer: {
    name: "drawer",
    component: dynamic(() => import("@/components/examples/drawer"), {
      ssr: false,
    }),
    code: `import { Crop, Cropper, useCropper } from "@zuude-ui/cropper";
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

  const [ref, { cropIt }] = useCropper({
    onSuccess: (image) => {
      console.log("onSuccess", image);
      setImage(image);
      setOpen(false);
    },
  });

  return (
    <div className="flex relative flex-col gap-4 justify-center items-center">
      <img
        src={image}
        alt="test"
        className="w-full h-full object-cover max-w-sm"
      />
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant={"outline"} className="absolute bottom-4 left-4">
            Crop
          </Button>
        </DrawerTrigger>
        <DrawerContent className="!h-full">
          <Cropper
            ref={ref}
            data-vaul-no-drag
            src={image}
            crop={crop}
            onCropChange={setCrop}
            className="max-w-sm rounded-full mx-auto"
            config={{
              showGrid: true,
              showBehindImage: { position: "absolute" },
            }}
          />
          <Button onClick={cropIt} className="w-fit mx-auto mt-4">
            Crop
          </Button>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
`,
  },
  interactive: {
    name: "interactive",
    component: dynamic(() => import("@/components/examples/interactive"), {
      ssr: false,
    }),
    code: `import { useState } from "react";
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
                    className={\`absolute inset-0 border-2 border-white/50 rounded-xl transition-all duration-300 \${
                      isDragging
                        ? "border-blue-400 scale-105"
                        : isPinching
                          ? "border-green-400 scale-110"
                          : "border-white/50"
                    }\`}
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
`,
  },
  minimal: {
    name: "minimal",
    component: dynamic(() => import("@/components/examples/minimal"), {
      ssr: false,
    }),
    code: `import { useState } from "react";
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
`,
  },
  ultimate: {
    name: "ultimate",
    component: dynamic(() => import("@/components/examples/ultimate"), {
      ssr: false,
    }),
    code: `import { useState, useEffect } from "react";
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
  Camera,
  Palette,
  Zap,
  Star,
  Heart,
  Crown,
  Trophy,
  Lightbulb,
  Music,
  Coffee,
  Rocket,
  Diamond,
} from "lucide-react";

export default function UltimateCropper() {
  const [crop, setCrop] = useState<Crop>({ x: 0, y: 0, scale: 1 });
  const [result, setResult] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [interactionCount, setInteractionCount] = useState(0);
  const [lastInteraction, setLastInteraction] = useState<Date>(new Date());
  const [mood, setMood] = useState<"happy" | "excited" | "focused" | "zen">(
    "happy"
  );

  const [ref, { cropIt, reset, isCropping }] = useCropper({
    quality: 0.95,
    onSuccess: (image) => {
      setResult(image);
      setIsProcessing(false);
      unlockAchievement("perfect_crop");
    },
    onError: (error) => {
      console.error("Cropping error:", error);
      setIsProcessing(false);
    },
  });

  // Achievement system
  const unlockAchievement = (achievement: string) => {
    const achievementsList = {
      first_move: { name: "First Steps", icon: "👣" },
      zoom_master: { name: "Zoom Master", icon: "🔍" },
      precision_artist: { name: "Precision Artist", icon: "🎨" },
      speed_demon: { name: "Speed Demon", icon: "⚡" },
      zen_master: { name: "Zen Master", icon: "🧘" },
      perfect_crop: { name: "Perfect Crop", icon: "👑" },
      interaction_pro: { name: "Interaction Pro", icon: "💫" },
      coordinate_wizard: { name: "Coordinate Wizard", icon: "🔮" },
    };

    if (!achievements.includes(achievement)) {
      setAchievements((prev) => [...prev, achievement]);
      setTimeout(() => {
        setAchievements((prev) => prev.filter((a) => a !== achievement));
      }, 3000);
    }
  };

  // Track interactions for achievements
  useEffect(() => {
    if (interactionCount > 0) {
      if (interactionCount === 1) unlockAchievement("first_move");
      if (interactionCount > 10) unlockAchievement("interaction_pro");
      if (interactionCount > 20) unlockAchievement("precision_artist");
    }
  }, [interactionCount]);

  // Mood system based on interaction speed
  useEffect(() => {
    const now = new Date();
    const timeDiff = now.getTime() - lastInteraction.getTime();

    if (timeDiff < 1000) setMood("excited");
    else if (timeDiff < 3000) setMood("focused");
    else setMood("zen");
  }, [lastInteraction]);

  const handleCrop = async () => {
    setIsProcessing(true);
    await cropIt();
  };

  const handleReset = () => {
    setCrop({ x: 0, y: 0, scale: 1 });
    setResult(null);
    reset();
    unlockAchievement("zen_master");
  };

  const downloadImage = () => {
    if (!result) return;

    const link = document.createElement("a");
    link.href = result;
    link.download = "masterpiece.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleInteraction = () => {
    setInteractionCount((prev) => prev + 1);
    setLastInteraction(new Date());
  };

  const moodIcons = {
    happy: <Heart className="w-4 h-4 text-pink-500" />,
    excited: <Zap className="w-4 h-4 text-yellow-500" />,
    focused: <Target className="w-4 h-4 text-blue-500" />,
    zen: <Star className="w-4 h-4 text-purple-500" />,
  };

  const moodMessages = {
    happy: "Ready to create!",
    excited: "You're on fire! 🔥",
    focused: "Deep in the zone...",
    zen: "Finding your center...",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Floating Achievements */}
        {achievements.length > 0 && (
          <div className="fixed top-4 right-4 z-50 space-y-2">
            {achievements.map((achievement, index) => (
              <div
                key={achievement}
                className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-green-200 animate-in slide-in-from-right"
                style={{ animationDelay: \`\${index * 100}ms\` }}
              >
                <div className="flex items-center gap-2 text-sm font-medium text-green-700">
                  <Trophy className="w-4 h-4" />
                  <span>Achievement Unlocked!</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Header with Mood System */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg">
              {moodIcons[mood]}
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Ultimate Cropper
            </h1>
            <div className="bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg">
              <Crown className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
          <p className="text-lg text-muted-foreground mb-2">
            {moodMessages[mood]}
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Camera className="w-4 h-4" />
              Interactions: {interactionCount}
            </span>
            <span className="flex items-center gap-1">
              <Palette className="w-4 h-4" />
              Quality: 95%
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Cropper Section */}
          <div className="space-y-6">
            {/* Enhanced Cropper */}
            <div className="relative">
              <Cropper
                ref={ref}
                src={testImage}
                crop={crop}
                onCropChange={(newCrop) => {
                  setCrop(newCrop);
                  handleInteraction();

                  // Achievement checks
                  if (Math.abs(newCrop.x) > 100 || Math.abs(newCrop.y) > 100) {
                    unlockAchievement("coordinate_wizard");
                  }
                  if (newCrop.scale > 2) {
                    unlockAchievement("zoom_master");
                  }
                }}
                className="aspect-square w-full max-w-lg mx-auto overflow-hidden rounded-2xl bg-muted shadow-2xl"
                config={{
                  showGrid: true,
                  showBehindImage: {
                    position: "fixed",
                    className: "blur-sm opacity-20",
                  },
                }}
              >
                {({ isDragging, isPinching }) => (
                  <>
                    {/* Tutorial Overlay */}
                    {showTutorial && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                        <div className="bg-white rounded-xl p-6 max-w-sm text-center">
                          <Lightbulb className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                          <h3 className="font-semibold mb-2">
                            Welcome to Ultimate Cropper!
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Drag to move, scroll to zoom, and unlock
                            achievements as you create your masterpiece.
                          </p>
                          <Button onClick={() => setShowTutorial(false)}>
                            Let's Start!
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Dynamic Status Bar */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                        {isDragging ? (
                          <>
                            <Move className="w-4 h-4 animate-pulse text-blue-400" />
                            <span>Moving Masterpiece</span>
                          </>
                        ) : isPinching ? (
                          <>
                            <ZoomIn className="w-4 h-4 animate-pulse text-green-400" />
                            <span>Zooming to Perfection</span>
                          </>
                        ) : (
                          <>
                            <Target className="w-4 h-4" />
                            <span>Ready to Create</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Live Stats Panel */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-purple-200">
                        <div className="flex items-center gap-2 text-sm mb-3">
                          <Eye className="w-4 h-4 text-purple-600" />
                          <span className="font-medium">Live Stats</span>
                        </div>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span>X:</span>
                            <span className="font-mono">
                              {crop.x.toFixed(1)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Y:</span>
                            <span className="font-mono">
                              {crop.y.toFixed(1)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Scale:</span>
                            <span className="font-mono">
                              {crop.scale.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Mood:</span>
                            <span className="capitalize">{mood}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating Action Buttons */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="flex gap-3">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={handleReset}
                          className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>

                        <Button
                          size="sm"
                          onClick={handleCrop}
                          disabled={isCropping || isProcessing}
                          className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        >
                          {isCropping || isProcessing ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          ) : (
                            <Check className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Animated Corner Decorations */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-2 border-white/60 rounded-full opacity-60 animate-pulse" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-2 border-white/60 rounded-full opacity-60 animate-pulse delay-150" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-2 border-white/60 rounded-full opacity-60 animate-pulse delay-300" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-2 border-white/60 rounded-full opacity-60 animate-pulse delay-450" />

                    {/* Dynamic Border */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div
                        className={\`absolute inset-0 border-2 rounded-2xl transition-all duration-500 \${
                          isDragging
                            ? "border-blue-400 scale-105 shadow-lg shadow-blue-400/50"
                            : isPinching
                              ? "border-green-400 scale-110 shadow-lg shadow-green-400/50"
                              : "border-white/50"
                        }\`}
                      />
                    </div>

                    {/* Particle Effects */}
                    {(isDragging || isPinching) && (
                      <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute animate-ping"
                            style={{
                              top: \`\${20 + i * 15}%\`,
                              left: \`\${15 + i * 12}%\`,
                              animationDelay: \`\${i * 200}ms\`,
                              animationDuration: "1.5s",
                            }}
                          >
                            <Sparkles className="w-3 h-3 text-yellow-400" />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Center Focus Point */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                      <div className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    </div>

                    {/* Floating Icons */}
                    <div className="absolute top-1/4 left-1/4 pointer-events-none">
                      <Diamond className="w-3 h-3 text-purple-400 opacity-60" />
                    </div>
                    <div className="absolute top-3/4 right-1/4 pointer-events-none">
                      <Star className="w-3 h-3 text-yellow-400 opacity-60" />
                    </div>
                    <div className="absolute bottom-1/4 left-1/2 pointer-events-none">
                      <Rocket className="w-3 h-3 text-pink-400 opacity-60" />
                    </div>
                  </>
                )}
              </Cropper>
            </div>

            {/* Progress Bar */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Creation Progress</span>
                <span className="text-sm text-muted-foreground">
                  {interactionCount} interactions
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: \`\${Math.min(interactionCount * 5, 100)}%\` }}
                />
              </div>
            </div>
          </div>

          {/* Result Section */}
          <div className="space-y-6">
            {/* Result Preview */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Your Masterpiece</h3>
                {result && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadImage}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                )}
              </div>

              <div className="aspect-square w-full max-w-lg mx-auto overflow-hidden rounded-xl bg-muted border-2 border-dashed border-purple-200 flex items-center justify-center">
                {result ? (
                  <img
                    src={result}
                    alt="Cropped result"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Your masterpiece will appear here</p>
                  </div>
                )}
              </div>
            </div>

            {/* Achievement Gallery */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Achievement Gallery
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    id: "first_move",
                    name: "First Steps",
                    icon: "👣",
                    desc: "Make your first move",
                  },
                  {
                    id: "zoom_master",
                    name: "Zoom Master",
                    icon: "🔍",
                    desc: "Zoom beyond 2x scale",
                  },
                  {
                    id: "precision_artist",
                    name: "Precision Artist",
                    icon: "🎨",
                    desc: "Make 20+ interactions",
                  },
                  {
                    id: "speed_demon",
                    name: "Speed Demon",
                    icon: "⚡",
                    desc: "Quick interactions",
                  },
                  {
                    id: "zen_master",
                    name: "Zen Master",
                    icon: "🧘",
                    desc: "Reset your creation",
                  },
                  {
                    id: "perfect_crop",
                    name: "Perfect Crop",
                    icon: "👑",
                    desc: "Complete a crop",
                  },
                  {
                    id: "interaction_pro",
                    name: "Interaction Pro",
                    icon: "💫",
                    desc: "10+ interactions",
                  },
                  {
                    id: "coordinate_wizard",
                    name: "Coordinate Wizard",
                    icon: "🔮",
                    desc: "Move 100+ units",
                  },
                ].map((achievement) => (
                  <div
                    key={achievement.id}
                    className={\`p-3 rounded-lg border-2 transition-all duration-300 \${
                      achievements.includes(achievement.id)
                        ? "border-green-300 bg-green-50"
                        : "border-gray-200 bg-gray-50"
                    }\`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{achievement.icon}</span>
                      <span
                        className={\`text-sm font-medium \${
                          achievements.includes(achievement.id)
                            ? "text-green-700"
                            : "text-gray-500"
                        }\`}
                      >
                        {achievement.name}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {achievement.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-blue-600" />
                Pro Tips
              </h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>
                  • Unlock achievements by exploring different interactions
                </li>
                <li>• Watch your mood change based on interaction speed</li>
                <li>
                  • Try extreme zoom levels for the Zoom Master achievement
                </li>
                <li>• Move far distances to become a Coordinate Wizard</li>
                <li>• Reset often to achieve Zen Master status</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`,
  },
};
