import { Request, Response } from 'express';
import Company from '../models/company.model';
import User from '../models/user.model';
import { NotFoundError } from '../errors/HRAPIError';
import { randomBytes } from 'crypto';

export async function getCompany(req: Request, res: Response) {
  const company = await Company.findById(res.locals.user.company);
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

export async function addContact(req: Request, res: Response) {
  const { contact } = req.body;
  const company = await Company.findByIdAndUpdate(
    res.locals.user.company,
    {
      $push: { contact: contact },
    },
    { new: true }
  );
  if (company) {
    return res.status(200).json({
      success: true,
      data: {
        company,
        message: 'Company contact details added!',
      },
    });
  }
}

export async function addAddress(req: Request, res: Response) {
  const { address } = req.body;
  const company = await Company.findByIdAndUpdate(
    res.locals.user.company,
    {
      $push: { address },
    },
    { new: true }
  );
  if (company) {
    return res.status(200).json({
      success: true,
      data: {
        company,
        message: 'Company address added!',
      },
    });
  }
}

export async function removeAddress(req: Request, res: Response) {
  const addrId = req.params.addrId;
  const compId = req.params.compId;

  await Company.findByIdAndUpdate();
}

export async function removePhone(req: Request, res: Response) {
  const compId = req.params.compId;
  const { phone } = req.body;
}

export async function updateCompany(req: Request, res: Response) {
  const { name, logo } = req.body;
  const company = await Company.findByIdAndUpdate(
    res.locals.user.company,
    { name, logo },
    {
      new: true,
    }
  );
  if (company) {
    return res.status(200).json({
      success: true,
      data: {
        company,
        message: 'Company details updated!',
      },
    });
  }
  throw new NotFoundError('Company Not Found', 'Update Company');
}
