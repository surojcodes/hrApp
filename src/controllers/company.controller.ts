import { Request, Response } from 'express';
import Company from '../models/company.model';
import User from '../models/user.model';
import { NotFoundError } from '../errors/HRAPIError';
import { randomBytes } from 'crypto';

export async function getCompany(req: Request, res: Response) {
  //TODO: Make this take company id
  const company = await Company.findById(req.params.id);
  if (!company) {
    throw new NotFoundError('Company Not Found', 'Get company details');
  }
  res.status(200).json({
    success: true,
    data: company,
  });
}

export async function storeCompany(req: Request, res: Response) {
  const company = Company.build(req.body);
  await company.save();
  //create admin for company
  const password = randomBytes(8).toString('hex');
  const user = User.build({
    eid: '0',
    email: company.email,
    name: company.name,
    role: 'admin',
    company: company._id,
    password,
  });
  await user.save();

  //TODO: send password in email
  console.log('Password:', password);

  res.status(201).json({
    success: true,
    data: {
      company,
      message: `Company registered successfully. An email has been sent to ${company.email} with password.`,
    },
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
      data: { company, message: 'Company details updated!' },
    });
  }
  throw new NotFoundError('Company Not Found', 'Update Company');
}
