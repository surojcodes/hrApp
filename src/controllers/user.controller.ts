import { NextFunction, Request, Response } from 'express';
import { IUser, ILogin } from '../interfaces/user.interface';
import User from '../models/user.model';
import { BadRequestError, UnAuthenticatedError } from '../errors/HRAPIError';
import { generateTokenAndSaveCookie } from '../utils/genTokenSaveCookie';

export const signUp = async (req: Request<{}, {}, IUser>, res: Response) => {
  const { name, role, email, password, eid } = req.body;
  const user = User.build({ name, role, email, password, eid });
  await user.save();

  //generate jwt
  const payload = { id: user._id as string, email: user.email };
  generateTokenAndSaveCookie(res, payload);
  //send response
  res.status(201).json({
    success: true,
    data: user,
  });
};

export const logIn = async (req: Request<{}, {}, ILogin>, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError('Invalid Credentials', 'Login');
  }
  const passwordMatch = await user.comparePassword(password);
  if (!passwordMatch) {
    throw new BadRequestError('Invalid Credentials', 'Login');
  }
  const payload = { id: user._id as string, email: user.email };
  generateTokenAndSaveCookie(res, payload);

  res.status(200).json({
    success: true,
    data: user,
  });
};

export const currentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findOne({ _id: res.locals.user });
  //very unlikely for below error
  if (!user) {
    throw new UnAuthenticatedError('Forbidden', 'login');
  }
  return res.status(200).json({
    success: true,
    data: user,
  });
};
