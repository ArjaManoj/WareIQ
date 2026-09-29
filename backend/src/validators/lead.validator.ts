import { z } from 'zod';
import { LEAD_STATUSES } from '../config/constants';

export const createLeadSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid business email address'),
  phone: z.string().min(10, 'Please enter a valid 10-digit phone number'),
  companyName: z.string().min(2, 'Company name is required'),
  operatingLocation: z.string().min(2, 'Operating location is required'),
  enquiryType: z.string().min(2, 'Please select an enquiry category'),
  challenges: z.string().optional(),
  monthlyOrders: z.string().optional(),
  warehouseCount: z.string().optional(),
  businessLocation: z.string().optional(),
  requirements: z.string().optional(),
  source: z.string().optional(),
});

export const updateLeadSchema = z.object({
  status: z.enum([
    LEAD_STATUSES.NEW,
    LEAD_STATUSES.CONTACTED,
    LEAD_STATUSES.QUALIFIED,
    LEAD_STATUSES.PROPOSAL,
    LEAD_STATUSES.CONVERTED,
    LEAD_STATUSES.CLOSED,
  ]).optional(),
  assignedTo: z.string().optional(),
  notes: z.string().optional(),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
