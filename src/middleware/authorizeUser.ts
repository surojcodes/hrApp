import { NextFunction, Request, Response } from 'express';
import { UnAuthenticatedError, UnAuthorizedError } from '../errors/HRAPIError';
import User from '../models/user.model';

export default function authorizeUser(roles: String[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(res.locals.user);
    // need to do research for why next here??
    if (!user)
      return next(
        new UnAuthenticatedError('User not logged in', 'Authorize User')
      );
    if (!roles.includes(user.role)) {
      return next(
        new UnAuthorizedError(
          'Not Authorized to access this route',
          'Protected Route'
        )
      );
    }
    next();
  };
}
