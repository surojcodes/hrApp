import mongoose from 'mongoose';
import { IUser, UserDoc, UserModel } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    eid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'manager', 'employee'],
      default: 'employee',
    },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    isActive: { type: Boolean, default: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 6 },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.password;
      },
    },
  }
);

userSchema.statics.build = (user: IUser) => {
  return new User(user);
};

userSchema.pre('save', async function () {
  //No need to do next since we are using async await
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  }
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export default User;
