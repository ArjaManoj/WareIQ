import { Router } from 'express';
import authRoutes from './auth.routes';
import leadRoutes from './lead.routes';
import orderRoutes from './order.routes';
import shipmentRoutes from './shipment.routes';
import inventoryRoutes from './inventory.routes';
import fcRoutes from './fc.routes';
import analyticsRoutes from './analytics.routes';
import userRoutes from './user.routes';
import contentRoutes from './content.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/leads', leadRoutes);
router.use('/orders', orderRoutes);
router.use('/shipments', shipmentRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/fulfillment-centers', fcRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/users', userRoutes);
router.use('/content', contentRoutes);

export default router;
