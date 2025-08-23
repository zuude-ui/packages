import { useEffect } from "react";

export const useHotKeys = (
  key: string,
  func: (event: KeyboardEvent) => void,
  enabled = true
) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    event.preventDefault();
    if (event.key === key) {
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
