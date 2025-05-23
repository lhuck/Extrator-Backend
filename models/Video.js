import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: String,
  url: { type: String, unique: true },
  thumb: String,
  tags: [String],
}, { timestamps: true });

const Video = mongoose.model('Video', videoSchema);

export default Video;