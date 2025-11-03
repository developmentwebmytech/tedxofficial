import  { Schema, model, models } from 'mongoose';

const contactQuerySchema = new Schema(
  {
    name: String,
    email: String,
    message: String,
  },
  { timestamps: true }
);

const ContactQuery = models.ContactQuery || model('ContactQuery', contactQuerySchema);
export default ContactQuery;
