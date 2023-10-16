import mongoose from 'mongoose';
import { DeptDoc, DeptModel, IDept } from '../interfaces/dept.interface';

const deptSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    parent: { type: mongoose.Schema.Types.ObjectId, default: null },
  },
  { timestamps: true }
);

deptSchema.statics.build = (dept: IDept) => {
  return new Dept(dept);
};

const Dept = mongoose.model<DeptDoc, DeptModel>('Dept', deptSchema);

export default Dept;
