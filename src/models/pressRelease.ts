import mongoose from 'mongoose';

const PressReleaseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    pdfUrl: { type: String, required: true }, 
    date: String,// Store URL or filename
  },
  { timestamps: true }
);

export default mongoose.models.PressRelease ||
  mongoose.model('PressRelease', PressReleaseSchema);
