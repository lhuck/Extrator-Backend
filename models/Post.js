// Modelo recomendado (Post.js)
/*
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  postUrl: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  thumb: String,
  tags: [String],
  videos: [{
    url: { type: String, required: true },
    title: String,
    order: Number
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Post', PostSchema);
*/
