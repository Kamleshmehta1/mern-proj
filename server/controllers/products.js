import { uploadOnCloudinary } from '../services/cloudinary.js';
import products from '../models/products.js';

export async function addProducts(req, res) {
  let imageResponse;
  if (req.file.path) {
    try {
      imageResponse = await uploadOnCloudinary(req.file.path);
    } catch (error) {
      return res.status(200).send({ message: error?.message });
    }
  }

  try {
    const response = await products.create({
      email: req?.user?.email,
      productsImage: imageResponse?.url,
    });
    if (response?.productsImage) {
      return res.status(200).send({
        status: 200,
        message: 'Product added successfully!',
      });
    }
  } catch (error) {
    return res.status(400).send({
      message: error?.message,
    });
  }
}

export async function getAllProducts(req, res) {
  let response;

  try {
    response = await products.find({
      email: req?.user?.email,
    });
    return res.status(200).send({ data: response });
  } catch (error) {
    return res.status(400).send({ message: error?.message });
  }
}
