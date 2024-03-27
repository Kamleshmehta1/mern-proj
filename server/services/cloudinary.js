import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });

    if (response?.url) {
      fs.unlink(localFilePath, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }

    // file has been uploaded successfully
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    // locally saved temporary file as the upload operation got failed
    return null;
  }
};
