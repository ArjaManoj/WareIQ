import mongoose, { Schema, Document } from 'mongoose';
import { INVENTORY_TRANSACTION_TYPES } from '../config/constants';

export interface IInventoryTransaction extends Document {
  sku: string;
  fulfillmentCenter: string;
  type: 'INBOUND' | 'OUTBOUND' | 'RETURN' | 'ADJUSTMENT' | 'TRANSFER';
  quantity: number;
  referenceId: string;
  previousQuantity: number;
  newQuantity: number;
  reason?: string;
  createdAt: Date;
}

const InventoryTransactionSchema: Schema = new Schema(
  {
    sku: { type: String, required: true, uppercase: true, trim: true },
    fulfillmentCenter: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: Object.values(INVENTORY_TRANSACTION_TYPES),
      required: true,
    },
    quantity: { type: Number, required: true },
    referenceId: { type: String, required: true, trim: true },
    previousQuantity: { type: Number, required: true },
    newQuantity: { type: Number, required: true },
    reason: { type: String, trim: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const InventoryTransaction = mongoose.model<IInventoryTransaction>(
  'InventoryTransaction',
  InventoryTransactionSchema
);
