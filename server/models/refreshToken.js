import mongoose from 'mongoose';

const refreshTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  email: { type: String, required: true },
});

export default mongoose.model('refreshTokens', refreshTokenSchema);
