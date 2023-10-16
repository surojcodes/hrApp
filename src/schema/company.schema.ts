import z from 'zod';

const createBody = {
  body: z.object({
    name: z.string({ required_error: 'Company name is required' }),
    address: z.array(
      z.object({
        addr_line1: z.string({ required_error: 'Addess Line 1 is required' }),
        addr_line2: z.string({ required_error: 'Addess Line 2 is required' }),
        city: z.string({ required_error: 'City is required' }),
        zip: z.string({ required_error: 'Zip is required' }),
        state: z.string({ required_error: 'State is required' }),
        country: z.string({ required_error: 'Country is required' }),
      })
    ),
    contact: z.array(z.string()),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email'),
    logo: z.string(),
  }),
};
const updateBody = {
  body: z
    .object({
      name: z.string({ required_error: 'Company name is required' }).optional(),
      logo: z.string().optional(),
    })
    .strict(),
};

// const params = {
//   params: z.object({
//     id: z.string({ required_error: 'Product Id is required' }),
//   }),
// };

export const createCompanySchema = z.object({
  ...createBody,
});
export const updateCompanySchema = z.object({
  ...updateBody,
});
