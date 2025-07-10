import { z } from 'zod';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '../constants/fileValidationParams';

const commonFields = {
  email: z.string().email('Invalid email').max(50, 'Email should not be longer than 50'),
  password: z
    .string()
    .min(6, 'Password should not be shorter than 6')
    .max(20, 'Password should not be longer than 20'),
};

export const SignUpSchema = z
  .object({
    ...commonFields,
    username: z
      .string()
      .min(3, 'Username should not be shorter than 3')
      .max(20, 'Username should not be longer than 20')
      .regex(/^[a-zA-Z0-9_]+$/, 'Only English letters, numbers and _ are allowed to use'),
    repeatPassword: z.string().min(1, 'Please repeat your password'),
    terms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms',
    }),
    file: z
      .any()
      .refine(
        (files) => !files?.[0] || files[0]?.size <= MAX_FILE_SIZE,
        'The size can be maximum 5MB.'
      )
      .refine(
        (files) => !files?.[0] || ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
        'The image can be only .jpg, .jpeg, .png и .webp.'
      )
      .optional(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ['repeatPassword'],
  });

export const SignInSchema = z.object({
  ...commonFields,
});

export type SignUpData = z.infer<typeof SignUpSchema>;
export type SignInData = z.infer<typeof SignInSchema>;
export type FormData = SignUpData | SignInData;
