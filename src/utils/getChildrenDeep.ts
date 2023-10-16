import { DeptDoc } from '../interfaces/dept.interface';
import Dept from '../models/dept.model';

export async function getChildrenDeep(deptRoot: DeptDoc): Promise<string[]> {
  let queue: DeptDoc[] = [deptRoot];
  let childIds: string[] = [];

  while (queue.length > 0) {
    const child = queue.shift();
    childIds.push(child?._id);
    let childs = await Dept.find({ parent: child?._id });
    queue = queue.concat(childs);
  }
  return childIds;
}
