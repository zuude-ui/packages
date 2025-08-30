import { useState } from "react";
import { Portal } from "@radix-ui/react-portal";
import { Video } from "@zuude-ui/video";
import { Play, Volume2, VolumeOff, X } from "lucide-react";

import { cn } from "../lib/utils";
import { Button } from "./button";

interface PackageVideoPresentationProps {
  videoUrl: string;
}

export const PackageVideoPresentation = ({
  videoUrl,
}: PackageVideoPresentationProps) => {
  const [show, setShow] = useState(true);
  const [expanded, setExpanded] = useState(false);

  if (!show) return null;

  return (
    <Portal className="fixed z-200 bottom-4 hidden md:block right-4 left-4 md:left-auto bg-muted rounded-md p-px border">
      <Button
        className="absolute top-2 size-7 rounded-sm right-2 z-1"
        onClick={() => setShow(false)}
        size="icon"
        variant="outline"
      >
        <X />
      </Button>
      <div
        className={cn(
          "md:w-48 transition-[width] duration-300",
          expanded && "md:w-150"
        )}
      >
        <Video
          src={videoUrl}
          ratio="4/3"
          className="rounded-sm overflow-hidden"
          pause={!expanded}
          loop
          onClick={() => setExpanded(!expanded)}
        >
          {({ isMuted, toggleMute, duration }) => (
            <>
              {!expanded ? (
                <div className="bg-muted-foreground/10 text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm rounded-full p-2">
                  <Play className="size-4" />
                </div>
              ) : (
                <Button
                  className="absolute bottom-2 size-7 rounded-sm left-2 z-1"
                  size="icon"
                  variant="outline"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeOff className="size-4" /> : <Volume2 />}
                </Button>
              )}
            </>
          )}
        </Video>
      </div>
    </Portal>
  );
};
