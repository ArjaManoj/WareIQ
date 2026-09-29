import { Router } from 'express';
import { getUsers, updateUser } from '../controllers/user.controller';
import { authenticate, authorize } from '../middleware/auth';
import { USER_ROLES } from '../config/constants';

const router = Router();

router.use(authenticate);
router.use(authorize([USER_ROLES.ADMIN]));

router.get('/', getUsers);
router.patch('/:id', updateUser);

export default router;
