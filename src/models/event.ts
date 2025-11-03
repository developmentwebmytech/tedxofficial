import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: String,
  date: String,
  location: String,
  description: String,
});

export const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);
