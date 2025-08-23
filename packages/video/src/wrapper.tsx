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
      const videoWrapper = videoWrapperRef.current;
      if (videoWrapper) {
        const controls = videoWrapper.querySelectorAll(
          "[data-zuude-hide-elements]"
        );
        const video = videoWrapper.querySelector(
          "[data-zuude-video]"
        ) as HTMLVideoElement;

        if (controls) {
          let hideTimeout: ReturnType<typeof setTimeout> | null = null;
          const hideDelay = 3000; // 3 seconds delay
          let isMouseOver = false;

          const resetTimer = () => {
            // Clear any pending hide timeout
            if (hideTimeout) {
              clearTimeout(hideTimeout);
              hideTimeout = null;
            }

            // Start new timer to hide controls after delay
            hideTimeout = setTimeout(() => {
              if (isMouseOver) {
                // Check if video is paused - don't hide controls if paused
                if (video && !video.paused) {
                  controls.forEach((control) => {
                    control.setAttribute("data-hidden", "true");
                  });
                }
              }
              hideTimeout = null;
            }, hideDelay);
          };

          const showControls = () => {
            isMouseOver = true;
            controls.forEach((control) => {
              control.removeAttribute("data-hidden");
            });
            resetTimer();
          };

          const hideControls = () => {
            isMouseOver = false;
            // Clear any pending hide timeout
            if (hideTimeout) {
              clearTimeout(hideTimeout);
              hideTimeout = null;
            }
            // Hide controls immediately when mouse leaves
            if (video && !video.paused) {
              controls.forEach((control) => {
                control.setAttribute("data-hidden", "true");
              });
            }
          };

          const handleMouseMove = () => {
            if (isMouseOver) {
              // If controls are hidden, show them
              controls.forEach((control) => {
                if (control.hasAttribute("data-hidden")) {
                  control.removeAttribute("data-hidden");
                }
              });
              resetTimer();
            }
          };

          const handlePlay = () => {
            // Hide controls when video starts playing (autoplay)
            if (!isMouseOver) {
              controls.forEach((control) => {
                control.setAttribute("data-hidden", "true");
              });
            }
          };

          videoWrapper.addEventListener("mouseenter", showControls);
          videoWrapper.addEventListener("mouseleave", hideControls);
          videoWrapper.addEventListener("mousemove", handleMouseMove);
          video.addEventListener("pause", showControls);
          video.addEventListener("play", handlePlay);

          // Cleanup function
          return () => {
            if (hideTimeout) {
              clearTimeout(hideTimeout);
            }
            videoWrapper.removeEventListener("mouseenter", showControls);
            videoWrapper.removeEventListener("mouseleave", hideControls);
            videoWrapper.removeEventListener("mousemove", handleMouseMove);
            video.removeEventListener("pause", showControls);
            video.removeEventListener("play", handlePlay);
          };
        }
      }
    }, []);

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
