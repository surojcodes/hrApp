import { NextFunction, Request, Response } from 'express';

export const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction //without this everything falls apart
) => {
  console.log('In custom error handler', error);
  res.status(500).json({
    success: false,
    reason: 'Internal Server Error',
  });
};
