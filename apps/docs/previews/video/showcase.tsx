import * as SliderPrimitive from "@radix-ui/react-slider";

import {
  Video,
  VideoProvider,
  Pause,
  Play,
  Mute,
  Unmute,
  SeekForward,
  SeekBackward,
  Controls,
  Fullscreen,
  ExitFullscreen,
  Loading,
  PictureInPicture,
  Download,
} from "@zuude-ui/video";
import {
  useGetDuration,
  useCurrentTime,
  useVideoState,
  useSpeed,
} from "@zuude-ui/video/hooks";
import { formatTime } from "@zuude-ui/video/utils";
import { useRef, memo } from "react";
import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import {
  Play as PlayIcon,
  Pause as PauseIcon,
  Volume2,
  VolumeX,
  SkipForward,
  SkipBack,
  Maximize,
  Minimize,
  PictureInPicture as PipIcon,
  Download as DownloadIcon,
  Clock,
  Zap,
  Sparkles,
} from "lucide-react";
import { VideoRef } from "@zuude-ui/video";

const Showcase = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { duration } = useGetDuration(videoRef);
  const { currentTime } = useCurrentTime(videoRef);
  const { isPlaying, isMuted, isFullscreen } = useVideoState(videoRef);
  const { speed } = useSpeed(videoRef);

  return (
    <div>
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center !mt-0 gap-2 text-lg font-semibold">
            Video Player
          </h3>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              {speed}x
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatTime(currentTime)} / {formatTime(duration || 0)}
            </Badge>
          </div>
        </div>
      </div>
      <div className="p-0">
        <VideoProvider
          onError={(error) => console.log(error)}
          className="relative w-full flex justify-center items-center"
        >
          <Video
            ref={videoRef}
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            className="aspect-[16/9] w-full object-cover !my-0  max-w-[800px] rounded-3xl"
            controls
            loop
          />

          {/* Overlay content */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Top overlay */}
            <div
              data-zuude-hide-elements
              className={cn(
                "absolute top-0 isolate left-0 text-white py-4 right-0 p-4 gap-4",
                "data-[hidden=true]:opacity-0 data-[hidden=true]:pointer-events-none data-[hidden=true]:-translate-y-full duration-300"
              )}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 to-transparent -z-10"></div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white">Big Buck Bunny</h3>
                  <p className="text-sm opacity-80">A short animated film</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-white/20 text-white border-white/20"
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    Demo
                  </Badge>
                </div>
              </div>
            </div>

            {/* Controls */}
            <Controls className="absolute pointer-events-auto px-4 isolate bottom-0 left-0 text-white flex-wrap py-4 items-center right-0 flex justify-center gap-2 data-[hidden=true]:opacity-0 data-[hidden=true]:pointer-events-none data-[hidden=true]:translate-y-full duration-300">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent -z-10"></div>
              <Timeline videoRef={videoRef} />

              {/* Control buttons */}
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" asChild>
                  <SeekBackward>
                    <SkipBack className="w-4 h-4" />
                  </SeekBackward>
                </Button>

                <Button variant="ghost" size="icon" asChild>
                  {isPlaying ? (
                    <Pause>
                      <PauseIcon className="w-4 h-4" />
                    </Pause>
                  ) : (
                    <Play>
                      <PlayIcon className="w-4 h-4" />
                    </Play>
                  )}
                </Button>

                <Button variant="ghost" size="icon" asChild>
                  <SeekForward>
                    <SkipForward className="w-4 h-4" />
                  </SeekForward>
                </Button>
              </div>

              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" asChild>
                  {isMuted ? (
                    <Unmute>
                      <VolumeX className="w-4 h-4" />
                    </Unmute>
                  ) : (
                    <Mute>
                      <Volume2 className="w-4 h-4" />
                    </Mute>
                  )}
                </Button>

                <Button variant="ghost" size="icon" asChild>
                  <PictureInPicture>
                    <PipIcon className="w-4 h-4" />
                  </PictureInPicture>
                </Button>

                <Button variant="ghost" size="icon" asChild>
                  <Download>
                    <DownloadIcon className="w-4 h-4" />
                  </Download>
                </Button>

                <Button variant="ghost" size="icon" asChild>
                  {isFullscreen ? (
                    <ExitFullscreen>
                      <Minimize className="w-4 h-4" />
                    </ExitFullscreen>
                  ) : (
                    <Fullscreen>
                      <Maximize className="w-4 h-4" />
                    </Fullscreen>
                  )}
                </Button>
              </div>
            </Controls>

            {/* Loading state */}
            <Loading className="absolute top-0 left-0 w-full h-full duration-300 bg-black/50 flex items-center opacity-0 justify-center data-[loading=true]:opacity-100">
              <div className="flex items-center gap-2 text-white">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                Loading...
              </div>
            </Loading>
          </div>
        </VideoProvider>
      </div>
    </div>
  );
};

interface TimelineProps {
  videoRef: VideoRef;
}

const Timeline = memo(({ videoRef }: TimelineProps) => {
  const { currentTime, onTimeUpdate } = useCurrentTime(videoRef);
  const { duration } = useGetDuration(videoRef);

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      value={[currentTime]}
      min={0}
      max={duration || 0}
      className="relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col"
      onValueChange={(value) => {
        onTimeUpdate(value[0] || 0);
      }}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "bg-white/30 relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "bg-white absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: 1 }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="border-primary bg-background ring-ring/50 block h-4 w-1.5 shrink-0 rounded-[2px] shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
});

export default Showcase;
