import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: String,
  url: { type: String, unique: true },
  thumb: String,
  tags: [String],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  images: [String],
  createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

export default Post;
