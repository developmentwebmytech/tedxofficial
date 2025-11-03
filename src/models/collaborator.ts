import mongoose from 'mongoose';

const CollaboratorSchema = new mongoose.Schema({
  name: String,
  about: String,
  imageUrl: String,
  social: {
    linkedin: String,
    twitter: String,
    instagram: String,
  },
}, { timestamps: true });

export default mongoose.models.Collaborator || mongoose.model('Collaborator', CollaboratorSchema);
