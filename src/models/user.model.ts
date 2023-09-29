import mongoose from 'mongoose';
import { IUser, UserDoc, UserModel } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  eid: { type: String, required: true },
  name: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'manager', 'employee'],
    default: 'employee',
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.statics.build = (user: IUser) => {
  return new User(user);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export default User;
