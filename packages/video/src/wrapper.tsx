import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { VideoRef } from "./types";

interface VideoConfig {
  config?: Partial<{
    clickToPlay: boolean;
  }>;
}

interface VideoContextType extends VideoConfig {
  videoRef: VideoRef;
  setVideoRef: (video: VideoRef) => void;
  error: string | null;
  setError: (error: string | null) => void;
  isFocused: boolean;
  setIsFocused: (isFocused: boolean) => void;
}

export const VideoContext = createContext<VideoContextType | null>(null);

type VideoProviderProps = Omit<React.ComponentProps<"div">, "onError"> &
  VideoConfig & {
    children: React.ReactNode;
    onError?: (error: string | null) => void;
  };

export const VideoProvider = React.memo(
  ({ children, config, onError, ...props }: VideoProviderProps) => {
    const [videoRef, setVideoRef] = useState<VideoRef>({ current: null });
    const [error, setError] = useState<string | null>(null);
    const [isFocused, setIsFocused] = useState(false);

    const videoWrapperRef = useRef<HTMLDivElement>(null);

    // Sending error to user if it exists
    useEffect(() => {
      onError?.(error);
    }, [error]);

    useEffect(() => {
      if (isFocused) {
        const handleClick = (event: MouseEvent) => {
          if (!videoWrapperRef.current?.contains(event.target as Node)) {
            setIsFocused(false);
          }
        };
        document.addEventListener("click", handleClick);

        return () => {
          document.removeEventListener("click", handleClick);
        };
      }
    }, [isFocused]);

    console.log("VideoProvider");

    return (
      <VideoContext.Provider
        value={{
          videoRef,
          setVideoRef,
          config: { clickToPlay: true, ...config },
          error,
          setError,
          isFocused,
          setIsFocused,
        }}
      >
        <div
          ref={videoWrapperRef}
          data-zuude-video-wrapper
          onClick={() => setIsFocused(true)}
          {...props}
        >
          {children}
        </div>
      </VideoContext.Provider>
    );
  }
);

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideo must be used within a VideoProvider");
  }
  return context;
};
