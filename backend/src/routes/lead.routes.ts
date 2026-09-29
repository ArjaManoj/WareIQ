import { Router } from 'express';
import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
} from '../controllers/lead.controller';
import { validateBody } from '../middleware/validate';
import { createLeadSchema, updateLeadSchema } from '../validators/lead.validator';
import { authenticate, authorize } from '../middleware/auth';
import { USER_ROLES } from '../config/constants';

const router = Router();

// Public lead submission from website multi-step contact form
router.post('/', validateBody(createLeadSchema), createLead);

// Protected Admin/Operations CRM lead management
router.get('/', authenticate, authorize([USER_ROLES.ADMIN, USER_ROLES.OPERATIONS]), getLeads);
router.get('/:id', authenticate, authorize([USER_ROLES.ADMIN, USER_ROLES.OPERATIONS]), getLeadById);
router.patch(
  '/:id',
  authenticate,
  authorize([USER_ROLES.ADMIN, USER_ROLES.OPERATIONS]),
  validateBody(updateLeadSchema),
  updateLead
);
router.delete('/:id', authenticate, authorize([USER_ROLES.ADMIN]), deleteLead);

export default router;
