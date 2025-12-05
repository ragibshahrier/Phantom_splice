/**
 * Image utility functions for resizing and validation
 */

// Maximum dimensions for images (optimized for extension popup)
const MAX_WIDTH = 800;   // Fits extension popup width
const MAX_HEIGHT = 800;  // Fits extension popup height
const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB

/**
 * Resize an image file if it exceeds maximum dimensions
 */
export const resizeImage = async (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    // Check file size first
    if (file.size > MAX_FILE_SIZE) {
      console.warn(`Image size ${(file.size / 1024 / 1024).toFixed(2)}MB exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB, resizing...`);
    }

    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    img.onload = () => {
      let { width, height } = img;

      // Calculate new dimensions if image is too large
      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
        width = Math.floor(width * ratio);
        height = Math.floor(height * ratio);
        console.log(`Resizing image from ${img.width}x${img.height} to ${width}x${height}`);
      } else {
        // Image is within limits, return original
        resolve(file);
        return;
      }

      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;

      // Draw resized image
      ctx.drawImage(img, 0, 0, width, height);

      // Convert to blob
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to create blob'));
            return;
          }

          // Create new file from blob
          const resizedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });

          console.log(`Image resized: ${(file.size / 1024).toFixed(2)}KB → ${(resizedFile.size / 1024).toFixed(2)}KB`);
          resolve(resizedFile);
        },
        file.type,
        0.9 // Quality (0.9 = 90%)
      );
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    // Load the image
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Validate image file
 */
export const validateImage = (file: File): { valid: boolean; error?: string } => {
  // Check if it's an image
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'File must be an image' };
  }

  // Check file size (before processing)
  const maxSize = 10 * 1024 * 1024; // 10MB max upload
  if (file.size > maxSize) {
    return { valid: false, error: `File too large (max ${maxSize / 1024 / 1024}MB)` };
  }

  return { valid: true };
};

/**
 * Get image dimensions
 */
export const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};
