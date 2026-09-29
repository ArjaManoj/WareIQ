import { Router } from 'express';
import {
  getFulfillmentCenters,
  getFCById,
  createFC,
  updateFC,
} from '../controllers/fc.controller';
import { authenticate, authorize } from '../middleware/auth';
import { USER_ROLES } from '../config/constants';

const router = Router();

// Publicly readable for /network page
router.get('/', getFulfillmentCenters);
router.get('/:id', getFCById);

// Admin-managed network modifications
router.post('/', authenticate, authorize([USER_ROLES.ADMIN]), createFC);
router.patch('/:id', authenticate, authorize([USER_ROLES.ADMIN]), updateFC);

export default router;
