import { Request, Response } from 'express';
import Dept from '../models/dept.model';
import { BadRequestError, NotFoundError } from '../errors/HRAPIError';
import { isValidMongoID } from '../utils/isValidMongoId';

async function checkValidDept(deptId: string) {
  if (!isValidMongoID(deptId))
    throw new BadRequestError('Invalid Dept ID', 'updateDept');
  const dept = await Dept.findById(deptId);
  if (!dept) throw new NotFoundError('Dept Not Found', 'updateDept');
  return dept;
}
async function checkValidParent(parentId: string) {
  if (!isValidMongoID(parentId))
    throw new BadRequestError('Invalid Parent ID', 'updateDept');
  const prnt = await Dept.findById(parentId);
  if (!prnt) throw new NotFoundError('Parent Dept  Not Found', 'updateDept');
}

export async function storeDept(req: Request, res: Response) {
  const { parent, name } = req.body;
  if (parent) checkValidParent(parent);

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
  const dept = checkValidDept(req.params.id);
  res.status(200).json({
    success: true,
    data: dept,
  });
}
export async function updateDept(req: Request, res: Response) {
  const { parent, name } = req.body;
  checkValidDept(req.params.id);
  if (parent) checkValidParent(parent);

  const newDept = await Dept.findByIdAndUpdate(
    req.params.id,
    { parent, name },
    { new: true }
  );
  return res.status(200).json({
    success: true,
    data: {
      dept: newDept,
      message: 'Dept Updated!',
    },
  });
}
export function deleteDept(req: Request, res: Response) {
  //will delete all the child depts (deep delete)
  const dept = checkValidDept(req.params.id);
}
export function getDeptUsers(req: Request, res: Response) {
  const dept = checkValidDept(req.params.id);
}
