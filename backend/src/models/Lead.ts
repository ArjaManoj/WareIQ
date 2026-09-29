import mongoose, { Schema, Document } from 'mongoose';
import { LEAD_STATUSES, LeadStatus } from '../config/constants';

export interface ILead extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  operatingLocation: string;
  enquiryType: string;
  challenges?: string;
  monthlyOrders?: string;
  warehouseCount?: string;
  businessLocation?: string;
  requirements?: string;
  source?: string;
  status: LeadStatus;
  assignedTo?: mongoose.Types.ObjectId;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    operatingLocation: { type: String, required: true, default: 'India' },
    enquiryType: { type: String, required: true, default: 'D2C Fulfillment' },
    challenges: { type: String, trim: true },
    monthlyOrders: { type: String, trim: true, default: '500 - 2,000 orders/mo' },
    warehouseCount: { type: String, trim: true, default: '1 - 2 locations' },
    businessLocation: { type: String, trim: true },
    requirements: { type: String, trim: true },
    source: { type: String, trim: true, default: 'Website Direct Demo Request' },
    status: {
      type: String,
      enum: Object.values(LEAD_STATUSES),
      default: LEAD_STATUSES.NEW,
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

export const Lead = mongoose.model<ILead>('Lead', LeadSchema);
