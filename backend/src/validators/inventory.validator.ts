import { z } from 'zod';
import { INVENTORY_TRANSACTION_TYPES } from '../config/constants';

export const createProductSchema = z.object({
  sku: z.string().min(3, 'SKU must be at least 3 characters'),
  name: z.string().min(2, 'Product name is required'),
  category: z.string().min(2, 'Category is required'),
  brand: z.string().min(2, 'Brand is required'),
  quantity: z.number().min(0, 'Initial quantity must be 0 or greater'),
  reorderLevel: z.number().min(0, 'Reorder level must be 0 or greater').default(10),
  fulfillmentCenter: z.string().min(2, 'Fulfillment Center is required'),
});

export const adjustStockSchema = z.object({
  sku: z.string().min(1, 'SKU is required'),
  fulfillmentCenter: z.string().min(1, 'Fulfillment Center is required'),
  type: z.enum([
    INVENTORY_TRANSACTION_TYPES.INBOUND,
    INVENTORY_TRANSACTION_TYPES.OUTBOUND,
    INVENTORY_TRANSACTION_TYPES.RETURN,
    INVENTORY_TRANSACTION_TYPES.ADJUSTMENT,
    INVENTORY_TRANSACTION_TYPES.TRANSFER,
  ]),
  quantity: z.number().int().refine((val) => val !== 0, {
    message: 'Quantity cannot be zero',
  }),
  reason: z.string().min(3, 'Reason for inventory transaction is required'),
  referenceId: z.string().optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type AdjustStockInput = z.infer<typeof adjustStockSchema>;
