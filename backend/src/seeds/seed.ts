import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { FulfillmentCenter } from '../models/FulfillmentCenter';
import { Product } from '../models/Product';
import { Order } from '../models/Order';
import { Shipment } from '../models/Shipment';
import { Lead } from '../models/Lead';
import { InventoryTransaction } from '../models/InventoryTransaction';
import {
  SEED_USERS,
  SEED_FULFILLMENT_CENTERS,
  SEED_PRODUCTS,
  SEED_LEADS,
  SEED_ORDERS,
} from './seedData';

dotenv.config();

const seedDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/wareiq_demo';

  console.log('🔄 Connecting to MongoDB at:', mongoUri);
  try {
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB. Clearing existing demo collections...');

    await Promise.all([
      User.deleteMany({}),
      FulfillmentCenter.deleteMany({}),
      Product.deleteMany({}),
      Order.deleteMany({}),
      Shipment.deleteMany({}),
      Lead.deleteMany({}),
      InventoryTransaction.deleteMany({}),
    ]);

    console.log('🌱 Seeding Users...');
    const userDocs: any[] = [];
    for (const u of SEED_USERS) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(u.password, salt);
      const created = await User.create({
        name: u.name,
        email: u.email.toLowerCase(),
        passwordHash,
        role: u.role,
        companyName: u.companyName,
        phone: u.phone,
        isActive: u.isActive,
      });
      userDocs.push(created);
    }

    console.log('🌱 Seeding Fulfillment Centers...');
    await FulfillmentCenter.insertMany(SEED_FULFILLMENT_CENTERS);

    console.log('🌱 Seeding Products & Initial Inventory Transactions...');
    for (const p of SEED_PRODUCTS) {
      const availableQuantity = Math.max(0, p.quantity - p.reservedQuantity);
      let status: 'In Stock' | 'Low Stock' | 'Out of Stock' = 'In Stock';
      if (p.quantity === 0) status = 'Out of Stock';
      else if (availableQuantity <= p.reorderLevel) status = 'Low Stock';

      const created = await Product.create({
        sku: p.sku,
        name: p.name,
        category: p.category,
        brand: p.brand,
        quantity: p.quantity,
        reservedQuantity: p.reservedQuantity,
        availableQuantity,
        reorderLevel: p.reorderLevel,
        fulfillmentCenter: p.fulfillmentCenter,
        status,
      });

      if (p.quantity > 0) {
        await InventoryTransaction.create({
          sku: created.sku,
          fulfillmentCenter: created.fulfillmentCenter,
          type: 'INBOUND',
          quantity: p.quantity,
          referenceId: `SEED-INB-${p.sku}`,
          previousQuantity: 0,
          newQuantity: p.quantity,
          reason: 'Initial warehouse stock allocation',
        });
      }
    }

    console.log('🌱 Seeding Leads / CRM pipeline...');
    const adminUser = userDocs.find((u) => u.role === 'admin');
    for (const lead of SEED_LEADS) {
      await Lead.create({
        ...lead,
        assignedTo: adminUser?._id,
      });
    }

    console.log('🌱 Seeding Orders & Live Tracking Events...');
    const customerUser = userDocs.find((u) => u.role === 'customer');

    for (const o of SEED_ORDERS) {
      const createdOrder = await Order.create({
        ...o,
        customerId: customerUser?._id,
      });

      // Generate realistic timeline events for each order
      const isDelivered = o.shippingStatus === 'Delivered';
      const isNDR = o.shippingStatus === 'NDR';

      const events: any[] = [
        {
          status: 'Order Confirmed',
          location: o.fulfillmentCenter,
          description: 'Order routing optimized via WareIQ Smart Inventory Placement',
          timestamp: new Date(o.orderDate.getTime()),
        },
        {
          status: 'Picked & Packed',
          location: o.fulfillmentCenter,
          description: 'Security polybag sealed and barcoded for dispatch',
          timestamp: new Date(o.orderDate.getTime() + 3600000 * 2),
        },
        {
          status: 'Dispatched',
          location: o.fulfillmentCenter,
          description: `Handed over to carrier partner ${o.courier}`,
          timestamp: new Date(o.orderDate.getTime() + 3600000 * 4),
        },
      ];

      if (isDelivered) {
        events.push(
          {
            status: 'In Transit',
            location: 'Intermediate Hub',
            description: `Shipment arrived at ${o.deliveryCity} Gateway`,
            timestamp: new Date(o.orderDate.getTime() + 3600000 * 12),
          },
          {
            status: 'Out for Delivery',
            location: o.deliveryCity,
            description: 'Assigned to delivery associate. Contactless OTP verification enabled.',
            timestamp: new Date(o.orderDate.getTime() + 3600000 * 20),
          },
          {
            status: 'Delivered',
            location: o.deliveryCity,
            description: 'Package delivered to recipient successfully.',
            timestamp: o.deliveredAt || new Date(o.orderDate.getTime() + 3600000 * 24),
          }
        );
      } else if (isNDR) {
        events.push(
          {
            status: 'In Transit',
            location: 'Destination Hub',
            description: `Package arrived at ${o.deliveryCity} delivery center`,
            timestamp: new Date(o.orderDate.getTime() + 3600000 * 8),
          },
          {
            status: 'Out for Delivery',
            location: o.deliveryCity,
            description: 'Dispatched with delivery rider',
            timestamp: new Date(o.orderDate.getTime() + 3600000 * 14),
          },
          {
            status: 'NDR',
            location: o.deliveryCity,
            description: 'Delivery attempted: Customer unavailable. Smart WhatsApp verification triggered.',
            timestamp: new Date(o.orderDate.getTime() + 3600000 * 16),
          }
        );
      } else {
        events.push({
          status: 'In Transit',
          location: 'Air Cargo / Surface Linehaul Hub',
          description: 'Package in linehaul transit to destination city hub',
          timestamp: new Date(o.orderDate.getTime() + 3600000 * 8),
        });
      }

      await Shipment.create({
        awbNumber: o.awbNumber,
        orderId: o.orderId,
        courier: o.courier,
        origin: o.fulfillmentCenter,
        destination: `${o.deliveryCity} (${o.pincode})`,
        currentStatus: isDelivered ? 'Delivered' : isNDR ? 'NDR' : 'In Transit',
        estimatedDelivery: o.expectedDeliveryDate,
        deliveredAt: o.deliveredAt,
        events: events.reverse(), // most recent first
      });
    }

    console.log('✨ WareIQ Demo Database Seeded Successfully!');
    console.log('--------------------------------------------------');
    console.log('Demo Credentials:');
    console.log('👑 Admin:      admin@wareiq-demo.com / Password@123');
    console.log('⚡ Operations: ops@wareiq-demo.com   / Password@123');
    console.log('🛍️ Customer:   demo@brandmerchant.com / Password@123');
    console.log('--------------------------------------------------');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
