import { z } from 'zod';
import { CHANNELS, COURIERS } from '../config/constants';

export const createOrderSchema = z.object({
  customerName: z.string().min(2, 'Customer name is required'),
  channel: z.enum([CHANNELS.D2C, CHANNELS.MARKETPLACE, CHANNELS.QUICK_COMMERCE, CHANNELS.B2B]).default(CHANNELS.D2C),
  fulfillmentCenter: z.string().min(2, 'Fulfillment Center is required'),
  items: z.array(
    z.object({
      sku: z.string().min(1, 'SKU is required'),
      name: z.string().min(1, 'Item name is required'),
      quantity: z.number().min(1, 'Quantity must be at least 1'),
      unitPrice: z.number().min(0, 'Unit price must be non-negative'),
    })
  ).min(1, 'Order must contain at least 1 item'),
  paymentStatus: z.enum(['Paid', 'COD', 'Pending']).default('Paid'),
  courier: z.enum(COURIERS).default('Delhivery'),
  deliveryCity: z.string().min(2, 'Delivery city is required'),
  pincode: z.string().min(6, 'Valid 6-digit PIN code required'),
  expectedDeliveryDays: z.number().min(1).default(2),
});

export const updateOrderStatusSchema = z.object({
  fulfillmentStatus: z.enum(['Unfulfilled', 'Picked', 'Packed', 'Fulfilled', 'Cancelled']).optional(),
  shippingStatus: z.string().optional(),
  paymentStatus: z.enum(['Paid', 'COD', 'Pending']).optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
