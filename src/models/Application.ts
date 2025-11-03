import mongoose, { Schema, Document } from "mongoose";

export interface IApplication extends Document {
  applicationId: string;
  status: "In Review" | "In Progress" | "Interview Round" | "Approved" | "Rejected";
  message: string;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    applicationId: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["In Review", "In Progress", "Interview Round", "Approved", "Rejected"],
      default: "In Review",
    },
    message: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Application ||
  mongoose.model<IApplication>("Application", ApplicationSchema);
