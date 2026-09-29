import mongoose, { Schema, Document } from 'mongoose';
import { CHANNELS, COURIERS } from '../config/constants';

export interface IOrderItem {
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface IOrder extends Document {
  orderId: string;
  customerId: mongoose.Types.ObjectId;
  customerName: string;
  channel: string;
  orderDate: Date;
  fulfillmentCenter: string;
  items: IOrderItem[];
  totalItems: number;
  totalAmount: number;
  paymentStatus: 'Paid' | 'COD' | 'Pending';
  fulfillmentStatus: 'Unfulfilled' | 'Picked' | 'Packed' | 'Fulfilled' | 'Cancelled';
  shippingStatus: string;
  courier: string;
  awbNumber: string;
  deliveryCity: string;
  pincode: string;
  expectedDeliveryDate: Date;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema({
  sku: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true, default: 0 },
});

const OrderSchema: Schema = new Schema(
  {
    orderId: { type: String, required: true, unique: true, uppercase: true, trim: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'User' },
    customerName: { type: String, required: true, trim: true },
    channel: {
      type: String,
      enum: Object.values(CHANNELS),
      default: CHANNELS.D2C,
    },
    orderDate: { type: Date, default: Date.now },
    fulfillmentCenter: { type: String, required: true },
    items: [OrderItemSchema],
    totalItems: { type: Number, required: true, default: 1 },
    totalAmount: { type: Number, required: true, default: 0 },
    paymentStatus: {
      type: String,
      enum: ['Paid', 'COD', 'Pending'],
      default: 'Paid',
    },
    fulfillmentStatus: {
      type: String,
      enum: ['Unfulfilled', 'Picked', 'Packed', 'Fulfilled', 'Cancelled'],
      default: 'Unfulfilled',
    },
    shippingStatus: {
      type: String,
      default: 'Manifested',
    },
    courier: {
      type: String,
      enum: COURIERS,
      default: 'Delhivery',
    },
    awbNumber: { type: String, required: true, unique: true, uppercase: true, trim: true },
    deliveryCity: { type: String, required: true },
    pincode: { type: String, required: true },
    expectedDeliveryDate: { type: Date, required: true },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>('Order', OrderSchema);
