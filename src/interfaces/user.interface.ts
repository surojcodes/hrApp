import mongoose from 'mongoose';

// Interface for a user creation
interface IUser {
  eid: string;
  name: string;
  role: string;
  email: string;
  password: string;
}

// Properties of user model (contains statics)
interface UserModel extends mongoose.Model<UserDoc> {
  build(user: IUser): UserDoc;
}

//Properties of User Document in MongoDB (contains methods)
interface UserDoc extends IUser, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

interface ILogin {
  email: string;
  password: string;
}

export { IUser, UserModel, UserDoc, ILogin };
