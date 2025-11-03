import mongoose from 'mongoose';

const TalkSchema = new mongoose.Schema({
  title: String,
  description: String,
  speaker: { type: mongoose.Schema.Types.ObjectId, ref: 'Speaker' },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
});

export const Talk = mongoose.models.Talk || mongoose.model('Talk', TalkSchema);
