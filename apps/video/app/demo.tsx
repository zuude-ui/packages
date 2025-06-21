import { Button } from "@workspace/ui/components/button";
import React, { useRef, useState } from "react";

import {
  Video,
  useVolume,
  useTimeline,
  useVideo,
  formatTime,
} from "@zuude-ui/video/index";
import { useShowVideoPaused } from "@zuude-ui/video/plugins";
import { Slider } from "@workspace/ui/components/slider";
import { cn } from "@workspace/ui/lib/utils";

export const Demo = () => {
  const [reset, setReset] = useState(0);
  const ref = useRef<HTMLVideoElement>(null);

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  useShowVideoPaused(ref, isSafari);

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      {/* <Button onClick={() => setReset(reset + 1)}>Reset</Button> */}
      <Video
        key={reset}
        ref={ref}
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        className="w-full object-cover max-w-3xl"
        poster="https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8b2NlYW58ZW58MHx8MHx8fDA%3D"
        ratio="16/9"
        // autoPlay="force"
        config={{
          range: [10, 20],
        }}
      >
        {({
          isPlaying,
          togglePlay,
          isMuted,
          toggleMute,
          duration,
          isFullscreen,
          toggleFullscreen,
          isPictureInPicture,
          togglePictureInPicture,
          speed,
          onChangeSpeed,
        }) => (
          <>
            <div className="w-full flex flex-col gap-2 p-4">
              <div className="flex gap-2 flex-wrap">
                <Button onClick={togglePlay}>
                  {isPlaying ? "Pause" : "Play"}
                </Button>
                <Button onClick={toggleMute}>
                  {isMuted ? "unmute" : "mute"}
                </Button>
                <Button onClick={toggleFullscreen}>
                  {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                </Button>
                <Button onClick={togglePictureInPicture}>
                  {isPictureInPicture
                    ? "Exit Picture in Picture"
                    : "Picture in Picture"}
                </Button>
              </div>
              <div className="flex gap-2">
                {Array.from({ length: 10 }).map((_, index) => (
                  <Button
                    key={index}
                    variant={speed === index + 1 ? "default" : "outline"}
                    onClick={() => onChangeSpeed(index + 1)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
              <Volume />
              <Timeline />
              <p>duration: {duration}</p>
              <RedTimeline />
              <Buffer />
            </div>
          </>
        )}
      </Video>
    </div>
  );
};

function Volume() {
  const { volume, onChangeVolume } = useVolume();

  return (
    <div>
      <Slider
        min={0}
        max={100}
        onValueChange={(value) => onChangeVolume(value[0] ?? 0)}
        value={[volume]}
      />
      <p>{volume}</p>
    </div>
  );
}

function Timeline() {
  const { currentTime, duration, setCurrentTime } = useTimeline();
  const { ref } = useVideo();

  return (
    <div>
      <Slider
        min={0}
        max={duration ?? 0}
        onValueChange={(value) => {
          if (ref.current) {
            setCurrentTime(value[0] ?? 0);
            ref.current.currentTime = value[0] ?? 0;
          }
        }}
        value={[currentTime]}
      />

      <div className="flex gap-2 justify-between">
        <p>{formatTime(currentTime)}</p>
        <p>-{formatTime((duration ?? 0) - currentTime)}</p>
      </div>
    </div>
  );
}

function RedTimeline() {
  const { currentTime, duration } = useTimeline();

  return (
    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
      <div
        className="h-full bg-red-500"
        style={{ width: `${(currentTime / (duration ?? 0)) * 100}%` }}
      ></div>
    </div>
  );
}

function Buffer() {
  const { buffered, duration } = useTimeline();

  return (
    <div>
      <p>Buffer</p>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500"
          style={{ width: `${(buffered / (duration ?? 0)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
