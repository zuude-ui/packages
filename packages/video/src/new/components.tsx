import React from "react";

import { Slot } from "@radix-ui/react-slot";
import { useVideo } from "./wrapper";

interface Props extends React.ComponentProps<"button"> {
  children: React.ReactNode;
  asChild?: boolean;
}

const Play = React.memo(({ children, asChild, ...props }: Props) => {
  const Element = asChild ? Slot : "button";
  const { videoRef } = useVideo();

  const handleClick = () => {
    if (videoRef?.current?.paused) {
      videoRef.current?.play();
    }
  };

  return (
    <Element {...props} onClick={handleClick}>
      {children}
    </Element>
  );
});

const Pause = React.memo(({ children, asChild, ...props }: Props) => {
  const Element = asChild ? Slot : "button";
  const { videoRef } = useVideo();

  const handleClick = () => {
    if (videoRef?.current) {
      videoRef.current?.pause();
    }
  };

  return (
    <Element {...props} onClick={handleClick}>
      {children}
    </Element>
  );
});

const Loading = () => {
  return <div>Loading</div>;
};

export { Play, Pause, Loading };
