import { Router } from 'express';
import {
  getInventory,
  getProductById,
  createProduct,
  adjustStock,
  getTransactions,
} from '../controllers/inventory.controller';
import { validateBody } from '../middleware/validate';
import { createProductSchema, adjustStockSchema } from '../validators/inventory.validator';
import { authenticate, authorize } from '../middleware/auth';
import { USER_ROLES } from '../config/constants';

const router = Router();

router.use(authenticate);

router.get('/', getInventory);
router.get('/transactions', getTransactions);
router.get('/:id', getProductById);

router.post(
  '/',
  authorize([USER_ROLES.ADMIN, USER_ROLES.OPERATIONS]),
  validateBody(createProductSchema),
  createProduct
);

router.post(
  '/adjust',
  authorize([USER_ROLES.ADMIN, USER_ROLES.OPERATIONS, USER_ROLES.CUSTOMER]),
  validateBody(adjustStockSchema),
  adjustStock
);

export default router;
