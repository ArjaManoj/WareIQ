import { Router } from 'express';
import {
  trackShipment,
  getShipments,
  addShipmentEvent,
} from '../controllers/shipment.controller';
import { authenticate, authorize } from '../middleware/auth';
import { USER_ROLES } from '../config/constants';

const router = Router();

// Public shipment tracking endpoint (used by /track on website)
router.get('/track/:identifier', trackShipment);

// Protected operations/admin shipment listing and event posting
router.get('/', authenticate, authorize([USER_ROLES.ADMIN, USER_ROLES.OPERATIONS]), getShipments);
router.post(
  '/:awbNumber/events',
  authenticate,
  authorize([USER_ROLES.ADMIN, USER_ROLES.OPERATIONS]),
  addShipmentEvent
);

export default router;
