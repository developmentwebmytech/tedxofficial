import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Image = mongoose.models.Image || mongoose.model("Image", imageSchema);
