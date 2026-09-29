import { z } from 'zod';
import { USER_ROLES } from '../config/constants';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid business email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  companyName: z.string().min(2, 'Company name is required'),
  phone: z.string().optional(),
  role: z.enum([USER_ROLES.CUSTOMER, USER_ROLES.ADMIN, USER_ROLES.OPERATIONS]).optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
