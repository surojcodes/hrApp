import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUser, ILogin } from '../interfaces/user.interface';
import User from '../models/user.model';
import { BadRequestError } from '../errors/HRAPIError';

function generateTokenAndSaveCookie(
  res: Response,
  payload: { id: string; email: string }
) {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY as string);
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY as string);

  //create cookie
  const oneDay = 1000 * 60 * 60 * 24;
  const oneMonth = 1000 * 60 * 60 * 24 * 30;

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    expires: new Date(Date.now() + oneDay),
  });
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    expires: new Date(Date.now() + oneMonth),
  });
}

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
