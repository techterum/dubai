export const uploadImage = async (file: File): Promise<string> => {
  try {
    const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'ml_default';

    if (!CLOUDINARY_CLOUD_NAME) {
      throw new Error('Cloudinary cloud name is missing.');
    }
    if (!UPLOAD_PRESET) {
      throw new Error('Cloudinary upload preset is missing.');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Cloudinary Upload Failed: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();

    // Force WebP format with optimized compression
    const optimizedUrl = data.secure_url.replace('/upload/', '/upload/f_webp,q_auto:eco/');

    return optimizedUrl;
  } catch (error) {
    console.error('Image Upload Error:', error);
    throw error;
  }
};
