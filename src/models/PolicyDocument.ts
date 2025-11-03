import mongoose, { Schema, Document } from 'mongoose';

export interface IPolicyDocument extends Document {
  title: string;
  fileUrl: string; // Path or full URL to the PDF
  uploadedAt: Date;
  uploadedBy?: string; // optional: who uploaded
}

const PolicyDocumentSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  uploadedBy: {
    type: String,
    default: 'TEDxThaltej Youth',
  },
});

export default mongoose.models.PolicyDocument ||
  mongoose.model<IPolicyDocument>('PolicyDocument', PolicyDocumentSchema);
