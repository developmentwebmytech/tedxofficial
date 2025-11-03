import mongoose, { Schema, Document } from "mongoose";

export interface IAuditReport extends Document {
  title: string;
  filename: string;
  createdAt: Date;
  uploader: string;
}

const AuditReportSchema = new Schema<IAuditReport>(
  {
    title: { type: String, required: true },
    filename: { type: String, required: true },
    uploader: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.AuditReport || mongoose.model<IAuditReport>("AuditReport", AuditReportSchema);
