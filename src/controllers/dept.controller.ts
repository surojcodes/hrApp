import { Request, Response } from 'express';

export function storeDept(req: Request, res: Response) {
  res.send('add dept');
}
export function getDepts(req: Request, res: Response) {
  res.send('all depts');
}
export function getDept(req: Request, res: Response) {
  res.send('a dept');
}
export function updateDept(req: Request, res: Response) {
  res.send('update dept');
}
export function deleteDept(req: Request, res: Response) {
  res.send('delete dept');
}
export function getDeptUsers(req: Request, res: Response) {
  res.send('dept users');
}
