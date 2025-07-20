import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { enrollCourse, getEnrollments } from '../controller/enrollment.js';

const router = express.Router();

router.post('/:courseId', authMiddleware, enrollCourse);
router.get('/', authMiddleware, getEnrollments);

export default router;
