import React from "react";
import type { VideoContextType } from "./types.js";

const VideoContext = React.createContext<VideoContextType | undefined>(
  undefined
);

const useVideo = () => {
  const context = React.useContext(VideoContext);
  if (!context) {
    throw new Error("useVideo must be used within a VideoProvider");
  }
  return context;
};

interface VideoProviderProps extends VideoContextType {
  children: React.ReactNode;
}

const VideoProvider = ({
  children,
  videoRef,
  duration,
  showHidingElement,
  setShowHidingElement,
}: VideoProviderProps) => {
  const [fullscreen, setFullscreen] = React.useState(false);

  return (
    <VideoContext.Provider
      value={{
        videoRef,
        duration,
        isFullscreen: fullscreen,
        setIsFullscreen: setFullscreen,
        showHidingElement,
        setShowHidingElement,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export { useVideo, VideoProvider };
