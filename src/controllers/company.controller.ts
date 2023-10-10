import { Request, Response } from 'express';
import Company from '../models/company.model';

export function createCompany(req: Request, res: Response) {
  res.send('Company Info');
}
//later SAAS App
export async function storeCompany(req: Request, res: Response) {
  const company = Company.build(req.body);
  await company.save();
  res.status(201).json({
    success: true,
    data: company,
  });
}
export function updateCompany(req: Request, res: Response) {
  res.send('Company Update');
}
