import mongoose from 'mongoose';
import { Address } from './utils.interface';

export interface ICompany {
  name: string;
  address: Address[];
  contact: string[];
  email: string;
  logo?: string;
}

export interface CompanyDoc extends mongoose.Document, ICompany {
  createdAt: Date;
  updatedAt: Date;
}

export interface CompanyModel extends mongoose.Model<CompanyDoc> {
  build: (company: ICompany) => CompanyDoc;
}
