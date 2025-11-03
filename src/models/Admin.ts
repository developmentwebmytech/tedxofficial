import mongoose, { Schema, model, models } from 'mongoose';
import bcrypt from 'bcrypt';

interface AdminDocument extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
}

const adminSchema = new Schema<AdminDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash password before save
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
adminSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

const Admin = models.Admin || model<AdminDocument>('Admin', adminSchema);
export default Admin;
