import { useEffect } from "react";

export const useHotKeys = (
  key: string,
  func: (event: KeyboardEvent) => void,
  enabled = true
) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === key) {
      event.preventDefault();
      func(event);
    }
  };

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [key, func, enabled]);
};
