import mongoose, { Schema } from 'mongoose';

const speakerSchema = new Schema(
  {
    name: { type: String, required: true },
    about: { type: String, required: true },
    image: { type: String }, // stored as "/uploads/filename.jpg"
    social: {
      linkedin: { type: String, default: '' },
      twitter: { type: String, default: '' },
      instagram: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Speaker || mongoose.model('Speaker', speakerSchema);
