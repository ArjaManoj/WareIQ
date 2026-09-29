import mongoose, { Schema, Document } from 'mongoose';
import { COURIERS, SHIPMENT_STATUSES, ShipmentStatus } from '../config/constants';

export interface IShipmentEvent {
  status: string;
  location: string;
  description: string;
  timestamp: Date;
}

export interface IShipment extends Document {
  awbNumber: string;
  orderId: string;
  courier: string;
  origin: string;
  destination: string;
  currentStatus: ShipmentStatus;
  estimatedDelivery: Date;
  deliveredAt?: Date;
  events: IShipmentEvent[];
  createdAt: Date;
  updatedAt: Date;
}

const ShipmentEventSchema = new Schema({
  status: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ShipmentSchema: Schema = new Schema(
  {
    awbNumber: { type: String, required: true, unique: true, uppercase: true, trim: true },
    orderId: { type: String, required: true, uppercase: true, trim: true },
    courier: { type: String, enum: COURIERS, required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    currentStatus: {
      type: String,
      enum: Object.values(SHIPMENT_STATUSES),
      default: SHIPMENT_STATUSES.ORDER_CONFIRMED,
    },
    estimatedDelivery: { type: Date, required: true },
    deliveredAt: { type: Date },
    events: [ShipmentEventSchema],
  },
  { timestamps: true }
);

export const Shipment = mongoose.model<IShipment>('Shipment', ShipmentSchema);
