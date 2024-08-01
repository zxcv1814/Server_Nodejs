import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
}

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  createdAt: String,
  updateAt: String
});
export const User = mongoose.model<IUser>('User', userSchema);