import mongoose, { Schema, models } from 'mongoose';

const notificationSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Notification = models.Notification || mongoose.model('Notification', notificationSchema);

export default Notification;
