import {
  Pause,
  Play,
  Video,
  VideoProvider,
  useVideoState,
} from "@zuude-ui/video/new";
import { VolumeOff } from "lucide-react";
import { useRef } from "react";

export const NewDemo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const { isPlaying } = useVideoState(videoRef);

  return (
    <VideoProvider onError={(error) => console.log(error)} className="relative">
      <Video
        src="https://personal-work-ali.s3.us-west-2.amazonaws.com/Transform+Your+Drone+Footage+%23OsmoAction5Pro+%2B+FPV+Cinematic+Editing+%E2%9C%A8%F0%9F%9A%80.mp4"
        className="aspect-video object-cover"
        autoPlay="force"
        ref={videoRef}
        muteFallback={(onMute) => (
          <button
            onClick={onMute}
            className="absolute inset-0 flex items-center justify-center bg-black/50 text-white"
          >
            <VolumeOff />
          </button>
        )}
      />
      {JSON.stringify({ isPlaying })}
      <Play>Play</Play>
      <Pause>Pause</Pause>
    </VideoProvider>
  );
};
