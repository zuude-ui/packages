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
  fileName,
}: {
  imageSrc: string;
  cropWidth: number;
  cropHeight: number;
  scaleTheImage?: number;
  x: number;
  y: number;
  scale: number;
  fileName?: string;
}) => {
  // Create a promise to handle image loading
  const loadImage = () => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "";
      img.src = imageSrc;

      img.onload = () => resolve(img);
      img.onerror = (error) => {
        console.error("Image loading failed:", error);
        reject(
          new Error(
            `Failed to load image: ${imageSrc}. This might be due to CORS policy restrictions.`
          )
        );
      };
      // img.onerror = (error) => {
      //   console.error("Image loading failed:", error);
      //   // Try without crossOrigin if CORS fails
      //   if (img.crossOrigin === "anonymous") {
      //     console.log("Retrying without crossOrigin...");
      //     img.crossOrigin = "";
      //     img.src = imageSrc;
      //   } else {
      //     console.log("✅", error);
      //     reject(
      //       new Error(
      //         `Failed to load image: ${imageSrc}. This might be due to CORS policy restrictions.`
      //       )
      //     );
      //   }
      // };
    });
  };

  try {
    const img = await loadImage();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Failed to get canvas context");
    }

    // Set canvas dimensions
    canvas.width = cropWidth * scaleTheImage;
    canvas.height = cropHeight * scaleTheImage;

    // Fill the canvas with transparent background
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

    if (!blob) {
      throw new Error("Failed to create image blob");
    }

    // Create a File from the Blob with a name
    const defaultFileName = `cropped-image-${Date.now()}.png`;
    return new File([blob], fileName || defaultFileName, { type: blob.type });
  } catch (error) {
    console.error("Error loading or processing image:", error);
    throw new Error("Failed to load image"); // Re-throw to allow proper error handling upstream
  }
};
