import mongoose from 'mongoose';
import { CompanyDoc, CompanyModel } from '../interfaces/company.interface';

const addressSchema = new mongoose.Schema({
  addr_line1: { type: String, required: true },
  addr_line2: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
});

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: [addressSchema],
  contact: [String],
  email: { type: String, require: true },
  logo: String,
});

const Company = mongoose.model<CompanyDoc, CompanyModel>(
  'Company',
  companySchema
);

export default Company;
