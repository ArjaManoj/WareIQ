import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  sku: string;
  name: string;
  category: string;
  brand: string;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  reorderLevel: number;
  fulfillmentCenter: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    sku: { type: String, required: true, unique: true, uppercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 0, default: 0 },
    reservedQuantity: { type: Number, required: true, min: 0, default: 0 },
    availableQuantity: { type: Number, required: true, min: 0, default: 0 },
    reorderLevel: { type: Number, required: true, min: 0, default: 10 },
    fulfillmentCenter: { type: String, required: true },
    status: {
      type: String,
      enum: ['In Stock', 'Low Stock', 'Out of Stock'],
      default: 'In Stock',
    },
  },
  { timestamps: true }
);

ProductSchema.pre('save', function (this: IProduct, next) {
  this.availableQuantity = Math.max(0, this.quantity - this.reservedQuantity);
  if (this.quantity === 0) {
    this.status = 'Out of Stock';
  } else if (this.availableQuantity <= this.reorderLevel) {
    this.status = 'Low Stock';
  } else {
    this.status = 'In Stock';
  }
  next();
});

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
