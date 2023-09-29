import { Request, Response } from 'express';
import { IUser } from '../interfaces/user.interface';
import User from '../models/user.model';

export const signIn = async (req: Request<{}, {}, IUser>, res: Response) => {
  //prevalidated
  const { name, role, email, password, eid } = req.body;
  const user = User.build({ name, role, email, password, eid });
  await user.save();
  res.status(201).json({
    success: true,
    date: user,
  });
};
