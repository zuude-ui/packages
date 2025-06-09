import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const resetCrop = () => {
  const button = document.querySelectorAll("[data-reset-crop-button]");
  if (!button) return;

  button.forEach((button) => {
    (button as HTMLButtonElement).click();
  });
};

export const exportImage = async ({
  imageSrc,
  cropWidth,
  cropHeight,
  scaleTheImage = 1,
  x,
  y,
  scale,
}: {
  imageSrc: string;
  cropWidth: number;
  cropHeight: number;
  scaleTheImage?: number;
  x: number;
  y: number;
  scale: number;
}) => {
  // Create a promise to handle image loading
  const loadImage = () => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = imageSrc;
    });
  };

  try {
    const img = await loadImage();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = cropWidth * scaleTheImage;
    canvas.height = cropHeight * scaleTheImage;

    // Fill the canvas with red background
    ctx.fillStyle = "transparent";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Calculate aspect ratios
    const canvasAspect = canvas.width / canvas.height;
    const imageAspect = img.naturalWidth / img.naturalHeight;

    // Calculate dimensions to cover the canvas while maintaining aspect ratio
    let drawWidth, drawHeight;
    if (imageAspect > canvasAspect) {
      // Image is wider than canvas
      drawHeight = canvas.height;
      drawWidth = drawHeight * imageAspect;
    } else {
      // Image is taller than canvas
      drawWidth = canvas.width;
      drawHeight = drawWidth / imageAspect;
    }

    // Apply scale
    const scaledWidth = drawWidth * scale;
    const scaledHeight = drawHeight * scale;

    // Center the scaled image and apply crop coordinates
    const xAxis = (canvas.width - scaledWidth) / 2 + x * scaleTheImage;
    const yAxis = (canvas.height - scaledHeight) / 2 + y * scaleTheImage;

    // Draw the image
    ctx.drawImage(img, xAxis, yAxis, scaledWidth, scaledHeight);

    // Convert to blob and create download link
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      });
    });

    if (!blob) return null;

    const url = URL.createObjectURL(blob);
    return url;
  } catch (error) {
    console.error("Error loading or processing image:", error);
  }
};
