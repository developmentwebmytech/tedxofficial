import mongoose, { Schema } from 'mongoose';

const speakerSchema = new Schema(
  {
    name: { type: String, required: true },
    about: { type: String, required: true },
    videoLink: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Speaker || mongoose.model('Speaker', speakerSchema);
