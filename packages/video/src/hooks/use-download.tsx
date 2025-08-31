import { useEffect, useState, useCallback } from "react";
import type { VideoRef } from "../types";

export const useDownload = (videoRef: VideoRef) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const downloadVideo = useCallback(
    async (filename?: string) => {
      if (!videoRef?.current) {
        setError("Video element not found");
        return;
      }

      const video = videoRef.current;
      const videoSrc = video.src || video.currentSrc;

      if (!videoSrc) {
        setError("No video source found");
        return;
      }

      try {
        setIsDownloading(true);
        setError(null);
        setDownloadProgress(0);

        // Fetch the video file
        const response = await fetch(videoSrc);

        if (!response.ok) {
          throw new Error(`Failed to fetch video: ${response.statusText}`);
        }

        // Get the content length for progress tracking
        const contentLength = response.headers.get("content-length");
        const total = contentLength ? parseInt(contentLength, 10) : 0;

        // Create a readable stream to track progress
        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error("Failed to create download stream");
        }

        const chunks: BlobPart[] = [];
        let receivedLength = 0;

        while (true) {
          const { done, value } = await reader.read();

          if (done) break;

          chunks.push(value);
          receivedLength += value.length;

          if (total > 0) {
            const progress = (receivedLength / total) * 100;
            setDownloadProgress(Math.round(progress));
          }
        }

        // Combine chunks into a single blob
        const blob = new Blob(chunks, {
          type: response.headers.get("content-type") || "video/mp4",
        });

        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;

        // Generate filename if not provided
        const defaultFilename = filename || `video-${Date.now()}.mp4`;
        link.download = defaultFilename;

        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up
        URL.revokeObjectURL(url);

        setDownloadProgress(100);
        setIsDownloading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Download failed");
        setIsDownloading(false);
        setDownloadProgress(0);
      }
    },
    [videoRef]
  );

  // Alternative simple download method for direct video URLs
  const downloadDirect = useCallback(
    (filename?: string) => {
      if (!videoRef?.current) {
        setError("Video element not found");
        return;
      }

      const video = videoRef.current;
      const videoSrc = video.src || video.currentSrc;

      if (!videoSrc) {
        setError("No video source found");
        return;
      }

      try {
        setIsDownloading(true);
        setError(null);
        setDownloadProgress(0);

        const link = document.createElement("a");
        link.href = videoSrc;
        link.download = filename || `video-${Date.now()}.mp4`;
        link.target = "_blank";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setIsDownloading(false);
        setDownloadProgress(100);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Download failed");
        setIsDownloading(false);
        setDownloadProgress(0);
      }
    },
    [videoRef]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setIsDownloading(false);
      setDownloadProgress(0);
      setError(null);
    };
  }, []);

  return {
    downloadVideo,
    downloadDirect,
    isDownloading,
    downloadProgress,
    error,
    resetError: () => setError(null),
  };
};
