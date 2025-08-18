import { Button } from "@workspace/ui/components/button";
import React, { useEffect, useRef, useState } from "react";

import {
  Video,
  useVolume,
  useTimeline,
  useVideo,
  formatTime,
} from "@zuude-ui/video/index";

import { Video as NewVideo } from "@zuude-ui/video/new";

import { useShowVideoPaused } from "@zuude-ui/video/plugins";
import { Slider } from "@workspace/ui/components/slider";
import { VolumeOff } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

export const Demo = () => {
  const [reset, setReset] = useState(0);
  const [isSafari, setIsSafari] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
    }
  }, []);

  useShowVideoPaused(ref, isSafari);

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = 0.1;
      ref.current.playbackRate = 5;
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      {/* <Button onClick={() => setReset(reset + 1)}>Reset</Button> */}
      <Video
        key={reset}
        ref={ref}
        src="https://cdn.crosspost.app/crosspost-long-videos/7cca4c855e3943b59f3db96bb2059a5e.mp4"
        className="max-h-64"
        poster="https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8b2NlYW58ZW58MHx8MHx8fDA%3D"
        autoPlay
        muted
        // ratio="16/9"
        config={{
          muteFallback: (toggleMute) => (
            <div
              className="absolute inset-0 bg-black/50 flex items-center justify-center"
              onClick={toggleMute}
            >
              <VolumeOff className="size-4" />
            </div>
          ),
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
          showHidingElement,
        }) => (
          <>
            <Video.HidingElement
              className={cn(
                "absolute top-0 left-0 bg-black/50 flex items-center duration-200 justify-center",
                showHidingElement ? "opacity-100" : "opacity-0"
              )}
            >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa
              optio nihil possimus cum, maiores debitis sed dolor porro, eum
              soluta mollitia libero atque iure blanditiis enim vero sunt
              accusantium ducimus.
            </Video.HidingElement>
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
              <div className="flex gap-2 flex-wrap">
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
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quaerat
      quibusdam, fugit voluptas ab facere maiores a, mollitia cumque veritatis
      illum! Velit aspernatur ipsum mollitia assumenda rem! Vel, vitae quo?
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
  const { videoRef } = useVideo();

  return (
    <div>
      <Slider
        min={0}
        max={duration ?? 0}
        onValueChange={(value) => {
          if (videoRef.current) {
            setCurrentTime(value[0] ?? 0);
            videoRef.current.currentTime = value[0] ?? 0;
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
