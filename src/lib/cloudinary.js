import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Helper to delete image from Cloudinary
export const deleteFromCloudinary = async (imageUrl) => {
  try {
    if (!imageUrl) return;
    
    // Extract public_id from URL
    // URL format: https://res.cloudinary.com/[cloud_name]/image/upload/v[version]/[folder]/[id].[ext]
    const regex = /\/v\d+\/(.+)\.[a-z]+$/;
    const match = imageUrl.match(regex);
    
    if (match && match[1]) {
      const publicId = match[1];
      await cloudinary.uploader.destroy(publicId);
      console.log(`Deleted from Cloudinary: ${publicId}`);
    }
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
  }
};

export default cloudinary;
