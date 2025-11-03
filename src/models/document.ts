import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
  docNumber: { type: String, required: true, unique: true },
  issuedTo: String,
  designation: String,
  issuedBy: String,
  issuedOn: String,
  documentType: String,
  status: String,
  signedBy: String,
});

export default mongoose.models.Document || mongoose.model('Document', DocumentSchema);
