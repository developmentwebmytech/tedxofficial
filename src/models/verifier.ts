import mongoose from 'mongoose';

const VerifierSchema = new mongoose.Schema(
  {
    ID: {
      type: String,
      required: true,
      // Do not set `unique: true`
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    status: {
    type: String,
    enum: ['Verified', 'Not Verified', 'Rejected'],
    default: 'Not Verified',
  },
  },
  { timestamps: true }
);

if (mongoose.models.Verifier) {
  delete mongoose.models.Verifier;
}

// Prevent model overwrite issues
export const Verifier =
  mongoose.models.Verifier || mongoose.model("Verifier", VerifierSchema);
