import {
  createContext,
  RefObject,
  useContext,
  useEffect,
  useState,
} from "react";
import { VideoRef } from "./types";

interface VideoConfig {
  config?: Partial<{
    clickToPlay: boolean;
  }>;
}

interface VideoContextType extends VideoConfig {
  videoRef: VideoRef | null;
  setVideoRef: (video: VideoRef | null) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export const VideoContext = createContext<VideoContextType | undefined>(
  undefined
);

type VideoProviderProps = React.ComponentProps<"div"> &
  VideoConfig & {
    children: React.ReactNode;
    onError?: (error: string | null) => void;
  };

export const VideoProvider = ({
  children,
  config,
  onError,
  ...props
}: VideoProviderProps) => {
  const [videoRef, setVideoRef] = useState<VideoRef | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Sending error to user if it exists
  useEffect(() => {
    onError?.(error);
  }, [error]);

  return (
    <VideoContext.Provider
      value={{
        videoRef,
        setVideoRef,
        config: { clickToPlay: true, ...config },
        error,
        setError,
      }}
    >
      <div {...props}>{children}</div>
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideo must be used within a VideoProvider");
  }
  return context;
};
