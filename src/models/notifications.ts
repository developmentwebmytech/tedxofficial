import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  effectiveDate: { type: Date, required: true },
  isLive: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Notification ||
  mongoose.model('Notification', NotificationSchema);
