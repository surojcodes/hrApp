import { NextFunction, Request, Response } from 'express';
import { UnAuthenticatedError, UnAuthorizedError } from '../errors/HRAPIError';
import User from '../models/user.model';

export default function authorizeUser(roles: String[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(res.locals.user.id);
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
    // //check if admin of same company
    // const companyId = req.params.id;
    // //1 admin for one company (assumption for now)
    // const admin = await User.findOne({ company: companyId, role: 'admin' });
    // //need more test here
    // if (admin?._id.toString() != user._id.toString()) {
    //   return next(
    //     new UnAuthorizedError(
    //       'Not Authorized to access other admin route',
    //       'Protected Route'
    //     )
    //   );
    // }
    next();
  };
}
