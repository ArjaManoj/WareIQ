import { Router } from 'express';
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from '../controllers/order.controller';
import { validateBody } from '../middleware/validate';
import { createOrderSchema, updateOrderStatusSchema } from '../validators/order.validator';
import { authenticate, authorize } from '../middleware/auth';
import { USER_ROLES } from '../config/constants';

const router = Router();

router.use(authenticate);

router.get('/', getOrders);
router.get('/:id', getOrderById);
router.post(
  '/',
  authorize([USER_ROLES.ADMIN, USER_ROLES.OPERATIONS, USER_ROLES.CUSTOMER]),
  validateBody(createOrderSchema),
  createOrder
);
router.patch(
  '/:id',
  authorize([USER_ROLES.ADMIN, USER_ROLES.OPERATIONS]),
  validateBody(updateOrderStatusSchema),
  updateOrder
);
router.delete('/:id', authorize([USER_ROLES.ADMIN]), deleteOrder);

export default router;
