import { Request, Response, NextFunction } from 'express';
import log from './logger';
const asyncWrapper =
  (controller: Function) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res);
    } catch (err) {
      next(err);
    }
  };
export default asyncWrapper;
