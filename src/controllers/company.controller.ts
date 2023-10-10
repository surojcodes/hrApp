import { Request, Response } from 'express';

export function createCompany(req: Request, res: Response) {
  res.send('Company Info');
}
export function updateCompany(req: Request, res: Response) {
  res.send('Company Update');
}
