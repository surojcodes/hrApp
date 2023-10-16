import { Request, Response } from 'express';
import Dept from '../models/dept.model';
import { BadRequestError, NotFoundError } from '../errors/HRAPIError';
import { isValidMongoID } from '../utils/isValidMongoId';

export async function storeDept(req: Request, res: Response) {
  const { parent, name } = req.body;
  if (parent) {
    if (!isValidMongoID(parent)) {
      throw new BadRequestError('Invalid Parent Id', 'storeDept');
    }
    const par = await Dept.findById(parent);
    if (!par) throw new NotFoundError('Invalid Parent ID', 'storeDept');
  }
  const dept = Dept.build({ name, parent });
  await dept.save();
  res.status(201).json({
    success: true,
    data: {
      dept,
      message: 'Department created',
    },
  });
}
export async function getDepts(req: Request, res: Response) {
  const depts = await Dept.find({});
  res.status(200).json({
    success: true,
    data: {
      depts,
    },
  });
}
export async function getDept(req: Request, res: Response) {
  if (!isValidMongoID(req.params.id))
    throw new BadRequestError('Invalid Dept ID', 'dept id');
  const dept = await Dept.findById(req.params.id);
  if (!dept) throw new NotFoundError('Dept Not Found', 'getDept');
  res.status(200).json({
    success: true,
    data: dept,
  });
}
export async function updateDept(req: Request, res: Response) {}
export function deleteDept(req: Request, res: Response) {
  res.send('delete dept');
}
export function getDeptUsers(req: Request, res: Response) {
  res.send('dept users');
}
