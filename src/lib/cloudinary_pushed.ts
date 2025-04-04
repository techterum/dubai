// export const uploadImage = async (file: File): Promise<string> => {
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('upload_preset', 'ml_default'); // Make sure to create an unsigned upload preset in your Cloudinary settings
//   formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

//   const response = await fetch(
//     `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/`,
//     {
//       method: 'POST',
//       body: formData,
//     }
//   );

//   if (!response.ok) {
//     throw new Error('Failed to upload image');
//   }

//   const data = await response.json();
//   return data.secure_url;
// };

// export const uploadImage = async (file: File): Promise<string> => {
//   try {
//     const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
//     const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ml_default';

//     if (!CLOUDINARY_CLOUD_NAME) throw new Error("Cloudinary cloud name is missing.");
//     if (!UPLOAD_PRESET) throw new Error("Cloudinary upload preset is missing.");

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', UPLOAD_PRESET);

//     const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload/`, {
//       method: 'POST',
//       body: formData,
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(`Cloudinary Upload Failed: ${errorData.error?.message || 'Unknown error'}`);
//     }

//     const data = await response.json();

//     // Apply Cloudinary Optimizations
//     const optimizedUrl = data.secure_url.replace('/upload/', '/upload/f_auto,q_auto/');

//     return optimizedUrl;
//   } catch (error) {
//     console.error("Image Upload Error:", error);
//     throw error;
//   }
// };

// below i s api to generate forecly webp  format image using api of cloudnary  and also we can use f_auto,q_auto/ for auto format and quality

export const uploadImage = async (file: File): Promise<string> => {
  try {
    const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ml_default';

    if (!CLOUDINARY_CLOUD_NAME) throw new Error('Cloudinary cloud name is missing.');
    if (!UPLOAD_PRESET) throw new Error('Cloudinary upload preset is missing.');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload/`,
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

    // Force WebP format
    const optimizedUrl = data.secure_url.replace('/upload/', '/upload/f_webp,q_auto/');

    return optimizedUrl;
  } catch (error) {
    console.error('Image Upload Error:', error);
    throw error;
  }
};
