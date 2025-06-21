function formatTime(time: number, type: "h:mm:ss" | "mm:ss" = "mm:ss"): string {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  if (type === "h:mm:ss") {
    const hours = Math.floor(minutes / 60);
    return `${hours}:${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export { formatTime };
