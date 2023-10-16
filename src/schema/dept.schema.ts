import { z } from 'zod';

const createDeptSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Department name is required' }),
    parent: z.string().optional(),
  }),
});

const updateDeptSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    parent: z.string().optional(),
  }),
});

export { createDeptSchema, updateDeptSchema };
