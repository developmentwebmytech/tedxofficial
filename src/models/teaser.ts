import mongoose from 'mongoose';

const TeaserSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoLink: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Teaser || mongoose.model('Teaser', TeaserSchema);
