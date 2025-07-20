import express from 'express';
import { getOverviewStats, getUserActivityStats } from '../controller/statsController.js';

const router = express.Router();

router.get('/overview', getOverviewStats);
router.get('/user/:userId', getUserActivityStats);

export default router;
