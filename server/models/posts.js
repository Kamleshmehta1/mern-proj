import mongoose from 'mongoose';

const postsSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  description: { type: String, required: true },
  img: { data: Buffer, type: String },
});

export default mongoose.model('posts', postsSchema);
