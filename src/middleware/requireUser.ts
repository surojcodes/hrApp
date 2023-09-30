import { NextFunction, Request, Response } from 'express';
import { UnAuthenticatedError } from '../errors/HRAPIError';
import { generateTokenAndSaveCookie } from '../utils/genTokenSaveCookie';
import jwt from 'jsonwebtoken';

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const { accessToken, refreshToken } = req.signedCookies;
  try {
    if (accessToken) {
      //access token is not expired
      const accessPayload: any = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_KEY as string
      );
      res.locals.user = accessPayload.id;
    } else {
      //access token is expired, check refresh token
      const refreshPayload: any = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_KEY as string
      );
      //generate fresh access and refresh token if refresh token is valid
      generateTokenAndSaveCookie(res, {
        id: refreshPayload.id,
        email: refreshPayload.email,
      });
      res.locals.user = refreshPayload.id;
    }
    next();
  } catch (e) {
    throw new UnAuthenticatedError('User Not Logged In', 'Log In');
  }
};

export default requireUser;
