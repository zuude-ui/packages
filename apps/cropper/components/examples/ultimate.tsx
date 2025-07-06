import { useState, useEffect } from "react";
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
      setIsProcessing(false);
    },
  });

  // Achievement system
  const unlockAchievement = (achievement: string) => {
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
    happy: <Heart className="w-4 h-4 text-primary" />,
    excited: <Zap className="w-4 h-4 text-accent" />,
    focused: <Target className="w-4 h-4 text-secondary" />,
    zen: <Star className="w-4 h-4 text-muted-foreground" />,
  };

  const moodMessages = {
    happy: "Ready to create!",
    excited: "You're on fire!",
    focused: "Deep in the zone...",
    zen: "Finding your center...",
  };

  return (
    <div className="min-h-screen p-8">
      <div className="w-full mx-auto">
        {/* Floating Achievements */}
        {achievements.length > 0 && (
          <div className="fixed top-4 right-4 z-50 space-y-2">
            {achievements.map((achievement, index) => (
              <div
                key={achievement}
                className="bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-success animate-in slide-in-from-right"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-2 text-sm font-medium text-success">
                  <Trophy className="w-4 h-4 text-success" />
                  <span>Achievement Unlocked!</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Header with Mood System */}
        <div className="text-center mb-8">
          <p className="text-lg text-muted-foreground mb-2">
            {moodMessages[mood]}
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Camera className="w-4 h-4 text-muted-foreground" />
              Interactions: {interactionCount}
            </span>
            <span className="flex items-center gap-1">
              <Palette className="w-4 h-4 text-muted-foreground" />
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
                      <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-20">
                        <div className="bg-card rounded-xl p-6 max-w-sm text-center">
                          <Lightbulb className="w-8 h-8 text-accent mx-auto mb-3" />
                          <h3 className="font-semibold mb-2 text-primary">
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
                      <div className="bg-background/90 backdrop-blur-sm text-primary px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 border border-border">
                        {isDragging ? (
                          <>
                            <Move className="w-4 h-4 animate-pulse text-primary" />
                            <span>Moving Masterpiece</span>
                          </>
                        ) : isPinching ? (
                          <>
                            <ZoomIn className="w-4 h-4 animate-pulse text-accent" />
                            <span>Zooming to Perfection</span>
                          </>
                        ) : (
                          <>
                            <Target className="w-4 h-4 text-muted-foreground" />
                            <span>Ready to Create</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Live Stats Panel */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-card/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-border">
                        <div className="flex items-center gap-2 text-sm mb-3">
                          <Eye className="w-4 h-4 text-primary" />
                          <span className="font-medium text-primary">
                            Live Stats
                          </span>
                        </div>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">X:</span>
                            <span className="font-mono text-primary">
                              {crop.x.toFixed(1)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Y:</span>
                            <span className="font-mono text-primary">
                              {crop.y.toFixed(1)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Scale:
                            </span>
                            <span className="font-mono text-primary">
                              {crop.scale.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Mood:</span>
                            <span className="capitalize text-primary">
                              {mood}
                            </span>
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
                          <RotateCcw className="w-4 h-4 text-primary" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleCrop}
                          disabled={isCropping || isProcessing}
                          className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-secondary text-secondary-foreground"
                        >
                          {isCropping || isProcessing ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
                          ) : (
                            <Check className="w-4 h-4 text-secondary-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Animated Corner Decorations */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-2 border-border rounded-full opacity-60 animate-pulse" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-2 border-border rounded-full opacity-60 animate-pulse delay-150" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-2 border-border rounded-full opacity-60 animate-pulse delay-300" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-2 border-border rounded-full opacity-60 animate-pulse delay-450" />

                    {/* Dynamic Border */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div
                        className={`absolute inset-0 border-2 rounded-2xl transition-all duration-500 ${
                          isDragging
                            ? "border-primary scale-105 shadow-lg shadow-primary/30"
                            : isPinching
                              ? "border-accent scale-110 shadow-lg shadow-accent/30"
                              : "border-border"
                        }`}
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
                              top: `${20 + i * 15}%`,
                              left: `${15 + i * 12}%`,
                              animationDelay: `${i * 200}ms`,
                              animationDuration: "1.5s",
                            }}
                          >
                            <Sparkles className="w-3 h-3 text-accent" />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Center Focus Point */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                      <div className="w-12 h-12 border border-border rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      </div>
                    </div>

                    {/* Floating Icons */}
                    <div className="absolute top-1/4 left-1/4 pointer-events-none">
                      <Diamond className="w-3 h-3 text-primary opacity-60" />
                    </div>
                    <div className="absolute top-3/4 right-1/4 pointer-events-none">
                      <Star className="w-3 h-3 text-accent opacity-60" />
                    </div>
                    <div className="absolute bottom-1/4 left-1/2 pointer-events-none">
                      <Rocket className="w-3 h-3 text-secondary opacity-60" />
                    </div>
                  </>
                )}
              </Cropper>
            </div>

            {/* Progress Bar */}
            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-primary">
                  Creation Progress
                </span>
                <span className="text-sm text-muted-foreground">
                  {interactionCount} interactions
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(interactionCount * 5, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Result Section */}
          <div className="space-y-6">
            {/* Result Preview */}
            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg text-primary">
                  Your Masterpiece
                </h3>
                {result && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadImage}
                    className="bg-gradient-to-r from-primary to-secondary text-secondary-foreground border-0 hover:from-primary/80 hover:to-secondary/80"
                  >
                    <Download className="w-4 h-4 mr-2 text-secondary-foreground" />
                    Download
                  </Button>
                )}
              </div>
              <div className="aspect-square w-full max-w-lg mx-auto overflow-hidden rounded-xl bg-muted border-2 border-dashed border-border flex items-center justify-center">
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
            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-primary">
                <Trophy className="w-5 h-5 text-accent" />
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
                    className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                      achievements.includes(achievement.id)
                        ? "border-success bg-success/10"
                        : "border-border bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{achievement.icon}</span>
                      <span
                        className={`text-sm font-medium ${
                          achievements.includes(achievement.id)
                            ? "text-success"
                            : "text-muted-foreground"
                        }`}
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
            <div className="bg-gradient-to-r from-muted to-secondary rounded-xl p-6 border border-border">
              <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-accent" />
                Pro Tips
              </h3>
              <ul className="text-sm text-muted-foreground space-y-2">
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
