import { z } from 'zod';

const createUserSchema = z.object({
  body: z
    .object({
      name: z.string({ required_error: 'Name is required' }),
      eid: z.string({ required_error: 'Employee id is required' }),
      role: z
        .enum(['admin', 'manager', 'employee'], {
          invalid_type_error: 'Invalid Role',
        })
        .default('employee'),
      email: z
        .string({ required_error: 'Email is required' })
        .email('Not a valid Email'),
      password: z
        .string({ required_error: 'Password is required' })
        .min(6, 'Password must be at least 6 characters.'),
      passwordConfirmation: z.string({
        required_error: 'Password confirmation is required.',
      }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: 'Passwords do not match',
      path: ['passwordConfirmation'],
    }),
});

export { createUserSchema };
