import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: String,
  url: { type: String, unique: true },
  thumb: String,
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  order: Number
}, { timestamps: true });

const Video = mongoose.model('Video', videoSchema);

export default Video;
