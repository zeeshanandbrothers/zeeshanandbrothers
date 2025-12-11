import multer from "multer";

const storage = multer.memoryStorage(); // storing in memory → good for cloudinary

export const upload = multer({ storage });
