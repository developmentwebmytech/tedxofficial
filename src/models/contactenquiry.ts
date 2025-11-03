import mongoose from 'mongoose';

const contactEnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
}, {
  timestamps: true,
});

export default mongoose.models.ContactEnquiry || mongoose.model('ContactEnquiry', contactEnquirySchema);
