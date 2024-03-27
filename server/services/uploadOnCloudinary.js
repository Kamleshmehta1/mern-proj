import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });

    // file has been uploaded successfully
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
  }
};
