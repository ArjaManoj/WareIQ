import mongoose, { Schema, Document } from 'mongoose';
import { ZONES } from '../config/constants';

export interface IFulfillmentCenter extends Document {
  name: string;
  city: string;
  state: string;
  zone: 'North' | 'West' | 'South' | 'East';
  address: string;
  pincode: string;
  services: string[];
  operatingStatus: 'Active' | 'Maintenance' | 'Planning';
  capacityPercentage: number;
  createdAt: Date;
  updatedAt: Date;
}

const FulfillmentCenterSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    zone: {
      type: String,
      enum: ZONES,
      required: true,
    },
    address: { type: String, required: true, trim: true },
    pincode: { type: String, required: true, trim: true },
    services: [{ type: String }],
    operatingStatus: {
      type: String,
      enum: ['Active', 'Maintenance', 'Planning'],
      default: 'Active',
    },
    capacityPercentage: { type: Number, default: 75, min: 0, max: 100 },
  },
  { timestamps: true }
);

export const FulfillmentCenter = mongoose.model<IFulfillmentCenter>(
  'FulfillmentCenter',
  FulfillmentCenterSchema
);
