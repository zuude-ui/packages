// Video Time Formatting Utilities - Similar to date-fns but for video durations

export type TimeFormat =
  | "h:mm:ss"
  | "mm:ss"
  | "ss"
  | "human"
  | "compact"
  | "detailed";

export interface TimeFormatOptions {
  format?: TimeFormat;
  showHours?: boolean;
  showLeadingZeros?: boolean;
  showMilliseconds?: boolean;
  humanize?: boolean;
  compact?: boolean;
}

/**
 * Format time in seconds to various formats
 */
function formatTime(
  time: number,
  options: TimeFormatOptions | TimeFormat = "mm:ss"
): string {
  const opts = typeof options === "string" ? { format: options } : options;
  const {
    format = "mm:ss",
    showHours = true,
    showLeadingZeros = true,
    showMilliseconds = false,
    humanize = false,
    compact = false,
  } = opts;

  if (humanize) {
    return humanizeTime(time, { compact });
  }

  const totalSeconds = Math.floor(time);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((time % 1) * 1000);

  const pad = (num: number, size: number = 2) =>
    showLeadingZeros ? num.toString().padStart(size, "0") : num.toString();

  switch (format) {
    case "h:mm:ss":
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    case "mm:ss":
      return showHours && hours > 0
        ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
        : `${pad(minutes)}:${pad(seconds)}`;
    case "ss":
      return `${totalSeconds}s`;
    case "compact":
      return compactTime(time);
    case "detailed":
      return detailedTime(time, { showMilliseconds });
    default:
      return `${pad(minutes)}:${pad(seconds)}`;
  }
}

/**
 * Humanize time duration (e.g., "2 minutes 30 seconds")
 */
function humanizeTime(
  time: number,
  options: { compact?: boolean } = {}
): string {
  const { compact = false } = options;
  const totalSeconds = Math.floor(time);

  if (totalSeconds < 60) {
    return `${totalSeconds} second${totalSeconds !== 1 ? "s" : ""}`;
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts: string[] = [];

  if (hours > 0) {
    parts.push(`${hours} hour${hours !== 1 ? "s" : ""}`);
  }

  if (minutes > 0) {
    parts.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);
  }

  if (seconds > 0 && !compact) {
    parts.push(`${seconds} second${seconds !== 1 ? "s" : ""}`);
  }

  return parts.join(" ");
}

/**
 * Compact time format (e.g., "2:30" for 2 minutes 30 seconds)
 */
function compactTime(time: number): string {
  const totalSeconds = Math.floor(time);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * Detailed time format with milliseconds
 */
function detailedTime(
  time: number,
  options: { showMilliseconds?: boolean } = {}
): string {
  const { showMilliseconds = false } = options;
  const totalSeconds = Math.floor(time);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((time % 1) * 1000);

  let result = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  if (showMilliseconds) {
    result += `.${milliseconds.toString().padStart(3, "0")}`;
  }

  return result;
}

/**
 * Parse time string to seconds
 */
function parseTime(timeString: string): number {
  // Handle formats like "2:30", "1:23:45", "90s", "1.5m"
  const timeStringLower = timeString.toLowerCase().trim();

  // Handle seconds format "90s"
  if (timeStringLower.endsWith("s")) {
    return parseFloat(timeStringLower.slice(0, -1));
  }

  // Handle minutes format "1.5m"
  if (timeStringLower.endsWith("m")) {
    return parseFloat(timeStringLower.slice(0, -1)) * 60;
  }

  // Handle hours format "1.5h"
  if (timeStringLower.endsWith("h")) {
    return parseFloat(timeStringLower.slice(0, -1)) * 3600;
  }

  // Handle HH:MM:SS or MM:SS format
  const parts = timeString.split(":").map(Number);

  if (parts.length === 2) {
    // MM:SS format
    return (parts[0] || 0) * 60 + (parts[1] || 0);
  } else if (parts.length === 3) {
    // HH:MM:SS format
    return (parts[0] || 0) * 3600 + (parts[1] || 0) * 60 + (parts[2] || 0);
  }

  // Fallback to parsing as seconds
  return parseFloat(timeString) || 0;
}

/**
 * Calculate time remaining
 */
function timeRemaining(
  current: number,
  total: number,
  format: TimeFormat = "mm:ss"
): string {
  const remaining = Math.max(0, total - current);
  return formatTime(remaining, format);
}

/**
 * Format time with percentage
 */
function formatTimeWithPercentage(
  current: number,
  total: number,
  format: TimeFormat = "mm:ss"
): string {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  return `${formatTime(current, format)} (${percentage}%)`;
}

/**
 * Get time segments for timeline
 */
function getTimeSegments(duration: number, segments: number = 10): number[] {
  return Array.from(
    { length: segments + 1 },
    (_, i) => (duration / segments) * i
  );
}

/**
 * Format time for accessibility (screen readers)
 */
function formatTimeForAccessibility(time: number): string {
  const totalSeconds = Math.floor(time);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  } else if (minutes > 0) {
    return `${minutes} minutes, ${seconds} seconds`;
  } else {
    return `${seconds} seconds`;
  }
}

export {
  formatTime,
  humanizeTime,
  compactTime,
  detailedTime,
  parseTime,
  timeRemaining,
  formatTimeWithPercentage,
  getTimeSegments,
  formatTimeForAccessibility,
};
