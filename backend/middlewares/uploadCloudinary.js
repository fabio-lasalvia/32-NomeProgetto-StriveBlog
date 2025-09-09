import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storageCloudinary = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "StriveBlog",
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    format: ['png', 'jpg', 'jpeg', 'svg', 'webp'],
    //timestamp+nome per non sovrascrivere file
  },
});

const uploadCloudinary = multer({ storage: storageCloudinary });

export default uploadCloudinary