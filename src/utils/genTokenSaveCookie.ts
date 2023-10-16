import { Response } from 'express';
import jwt from 'jsonwebtoken';

export function generateTokenAndSaveCookie(
  res: Response,
  payload: { id: string; email: string; company: string }
) {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY as string);
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY as string);

  //create cookie
  const oneDay = 1000 * 60 * 60;
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
