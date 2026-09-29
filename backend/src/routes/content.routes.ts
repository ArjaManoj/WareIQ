import { Router } from 'express';
import {
  getServices,
  getIndustries,
  getFAQs,
  getAnnouncements,
} from '../controllers/content.controller';

const router = Router();

router.get('/services', getServices);
router.get('/industries', getIndustries);
router.get('/faqs', getFAQs);
router.get('/announcements', getAnnouncements);

export default router;
