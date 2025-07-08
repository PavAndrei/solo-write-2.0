import { z } from 'zod';

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, 'Username should not be shorter than 3')
    .max(20, 'Username should not be longer than 20')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Only English letters, numbers and _ are allowed to use'
    ),
  email: z
    .string()
    .email('Invalid email')
    .max(50, 'Email should not be longer than 50'),
  password: z
    .string()
    .min(6, 'Password should not be shorter than 6')
    .max(20, 'Password should not be longer than 20'),
  avatarUrl: z.string().optional(),
});

export const signinSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signinSchema> & { imageUrl?: string };
