import mongoose from 'mongoose';

export interface IDept {
  name: string;
  parent: string | null;
}
export interface DeptDoc extends mongoose.Document, IDept {
  createdAt: Date;
  updatedAt: Date;
}
export interface DeptModel extends mongoose.Model<DeptDoc> {
  build: (dept: IDept) => DeptDoc;
}
