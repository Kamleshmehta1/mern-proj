import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
  email: { type: String, required: true },
  productsImage: { type: String, required: true },
});

export default mongoose.model('products', productsSchema);
