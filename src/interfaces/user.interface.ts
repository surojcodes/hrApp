import mongoose from 'mongoose';

type Role = 'admin' | 'manager' | 'employee';

// Interface for a user creation
interface IUser {
  eid: string;
  name: string;
  role: Role;
  email: string;
  password: string;
  isActive?: boolean;
  company: string;
}

// Properties of user model (contains statics)
interface UserModel extends mongoose.Model<UserDoc> {
  build(user: IUser): UserDoc;
}

//Properties of User Document in MongoDB (contains methods)
interface UserDoc extends IUser, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

interface ILogin {
  email: string;
  password: string;
}

export { IUser, UserModel, UserDoc, ILogin };
