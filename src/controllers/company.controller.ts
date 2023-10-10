import { Request, Response } from 'express';
import Company from '../models/company.model';
import { NotFoundError } from '../errors/HRAPIError';

export async function createCompany(req: Request, res: Response) {
  //Assumtion that for now its for one company only
  const company = await Company.find({});
  res.status(200).json({
    success: true,
    data: company[0],
  });
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
export async function updateCompany(req: Request, res: Response) {
  const company = await Company.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  if (company) {
    return res.status(200).json({
      success: true,
      data: company,
    });
  }
  throw new NotFoundError('Company Not Found', 'Update Company');
}
