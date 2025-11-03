import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
  name: String,
  position: String,
  about: String,
  image: String, // saved filename
  socials: {
    facebook: String,
    linkedin: String,
    twitter: String,
    youtube: String,
  }
}, { timestamps: true });

export const Team = mongoose.models.Team || mongoose.model("Team", TeamSchema);

