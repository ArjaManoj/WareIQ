import { Router } from 'express';
import { getDashboardSummary, getOrderAnalytics } from '../controllers/analytics.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/summary', getDashboardSummary);
router.get('/orders', getOrderAnalytics);

export default router;
